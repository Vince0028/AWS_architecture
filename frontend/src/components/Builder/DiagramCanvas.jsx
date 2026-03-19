import React, { useCallback, useRef, useState } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    useReactFlow,
    useViewport,
    MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AwsResourceNode } from './nodes/AwsResourceNode';
import { AwsGroupNode } from './nodes/AwsGroupNode';
import { StepBubbleNode } from './nodes/StepBubbleNode';
import { EditableEdge } from './edges/EditableEdge';

import { MousePointer2, Hand, Trash2 } from 'lucide-react';

const nodeTypes = { awsNode: AwsResourceNode, awsGroup: AwsGroupNode, stepBubble: StepBubbleNode };
const edgeTypes = { smoothstep: EditableEdge, editable: EditableEdge };

export const DiagramCanvas = ({ allTools }) => {
    const reactFlowWrapper = useRef(null);
    const { screenToFlowPosition, getNodes } = useReactFlow();
    const { x: viewportX, y: viewportY, zoom } = useViewport();

    const [helperLines, setHelperLines] = useState({ horizontal: null, vertical: null });

    const [nodes, setNodes] = useState(() => {
        try {
            const saved = localStorage.getItem('aws_builder_nodes');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });
    const [edges, setEdges] = useState(() => {
        try {
            const saved = localStorage.getItem('aws_builder_edges');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem('aws_builder_nodes', JSON.stringify(nodes));
            localStorage.setItem('aws_builder_edges', JSON.stringify(edges));
        }, 500);
        return () => clearTimeout(timeout);
    }, [nodes, edges]);
    const [mode, setMode] = useState('pointer'); // 'pointer' or 'hand'

    // Context Menus
    const [nodeMenu, setNodeMenu] = useState(null); // { id, x, y, type, data }
    const [edgeMenu, setEdgeMenu] = useState(null); // { id, x, y }

    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
    const onConnect = useCallback((connection) => setEdges((eds) => {
        const newEdge = {
            ...connection,
            id: `edge_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            type: 'editable',
            animated: false,
            style: { strokeWidth: 2, stroke: '#545b64' }
        };
        return eds.concat(newEdge);
    }), []);

    const onNodeContextMenu = (event, node) => {
        event.preventDefault();
        event.stopPropagation();
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        setNodeMenu({
            id: node.id,
            type: node.type,
            data: node.data,
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        setEdgeMenu(null);
    };

    const onEdgeContextMenu = (event, edge) => {
        event.preventDefault();
        event.stopPropagation();
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        setEdgeMenu({
            id: edge.id,
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        setNodeMenu(null);
    };

    const closeMenus = () => {
        setEdgeMenu(null);
        setNodeMenu(null);
    };

    const onEdgeClick = (event, edge) => {
        event.stopPropagation();
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        setEdgeMenu({
            id: edge.id,
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
    };

    const updateSelectedEdgeStyle = (dashArray, animated) => {
        if (!edgeMenu) return;
        setEdges(eds => eds.map(e => {
            if (e.id === edgeMenu.id) {
                return { 
                    ...e, 
                    animated: animated, 
                    style: { ...e.style, strokeDasharray: dashArray } 
                };
            }
            return e;
        }));
    };

    const updateSelectedEdgeType = (type) => {
        if (!edgeMenu) return;
        setEdges(eds => eds.map(e => e.id === edgeMenu.id ? { ...e, type } : e));
    };

    const updateSelectedEdgeColor = (hexCode) => {
        if (!edgeMenu) return;
        setEdges(eds => eds.map(e => {
            if (e.id === edgeMenu.id) {
                return { 
                    ...e, 
                    style: { ...e.style, stroke: hexCode } 
                };
            }
            return e;
        }));
    };

    const updateSelectedGroupData = (key, value) => {
        if (!nodeMenu) return;
        setNodes(nds => nds.map(n => {
            if (n.id === nodeMenu.id) {
                return { ...n, data: { ...n.data, [key]: value } };
            }
            return n;
        }));
        // Update menu state too so inputs reflect changes
        setNodeMenu(prev => ({ ...prev, data: { ...prev.data, [key]: value } }));
    };

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const dataStr = event.dataTransfer.getData('application/reactflow');
            if (!dataStr) return;
            const dropData = JSON.parse(dataStr);

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            // Handle inserting nodes INSIDE a group
            const targetNodes = getNodes();
            let parentNodeId = null;
            
            // Find ALL groups that contain the drop point to handle deeply nested boundaries
            const matchingParents = targetNodes.filter(n => {
                if (n.type !== 'awsGroup') return false;
                
                // When resized, React Flow might store dimensions in multiple places
                const w = n.measured?.width || n.width || parseInt(n.style?.width, 10) || 500;
                const h = n.measured?.height || n.height || parseInt(n.style?.height, 10) || 300;
                
                // For position, React Flow uses positionAbsolute for global coordinates, or computed.positionAbsolute
                // If neither exists reliably, we MUST sum the nested parent tree manually!
                let absX = n.positionAbsolute?.x ?? n.computed?.positionAbsolute?.x ?? n.position.x;
                let absY = n.positionAbsolute?.y ?? n.computed?.positionAbsolute?.y ?? n.position.y;
                
                // If it relies purely on local n.position.x but HAS a parent, we recursively traverse up to calculate global x,y
                if (typeof n.positionAbsolute === 'undefined' && typeof n.computed?.positionAbsolute === 'undefined' && n.parentId) {
                    let currParentId = n.parentId;
                    while (currParentId) {
                        const pNode = targetNodes.find(pn => pn.id === currParentId);
                        if (!pNode) break;
                        absX += (pNode.positionAbsolute?.x ?? pNode.computed?.positionAbsolute?.x ?? pNode.position.x);
                        absY += (pNode.positionAbsolute?.y ?? pNode.computed?.positionAbsolute?.y ?? pNode.position.y);
                        currParentId = pNode.parentId;
                    }
                }
                
                const bounds = {
                    left: absX,
                    top: absY,
                    right: absX + w,
                    bottom: absY + h
                };
                return position.x >= bounds.left && position.x <= bounds.right && 
                       position.y >= bounds.top && position.y <= bounds.bottom;
            });

            // Sort logic: 1. Strict Descendants (Children) 2. Area (Smaller wins)
            matchingParents.sort((a, b) => {
                // If 'a' is a direct or indirect descendant of 'b', 'a' is deeper and wins (comes first: -1)
                let currentAParent = a.parentId;
                while (currentAParent) {
                    if (currentAParent === b.id) return -1;
                    const parentNode = targetNodes.find(n => n.id === currentAParent);
                    currentAParent = parentNode ? parentNode.parentId : null;
                }
                
                // If 'b' is a direct or indirect descendant of 'a', 'b' is deeper and wins (comes first: 1)
                let currentBParent = b.parentId;
                while (currentBParent) {
                    if (currentBParent === a.id) return 1;
                    const parentNode = targetNodes.find(n => n.id === currentBParent);
                    currentBParent = parentNode ? parentNode.parentId : null;
                }
                
                // Fallback to Area
                const wA = a.measured?.width || a.width || parseInt(a.style?.width, 10) || 500;
                const hA = a.measured?.height || a.height || parseInt(a.style?.height, 10) || 300;
                const areaA = wA * hA;
                
                const wB = b.measured?.width || b.width || parseInt(b.style?.width, 10) || 500;
                const hB = b.measured?.height || b.height || parseInt(b.style?.height, 10) || 300;
                const areaB = wB * hB;
                
                return areaA - areaB;
            });

            const parentNode = matchingParents.length > 0 ? matchingParents[0] : null;

            if (parentNode) {
                parentNodeId = parentNode.id;
                // adjust absolute position to child relative coordinates
                position.x -= (parentNode.positionAbsolute?.x || parentNode.position.x);
                position.y -= (parentNode.positionAbsolute?.y || parentNode.position.y);
            }

            if (dropData.type === 'awsNode') {
                const tool = allTools.find(t => t.id === dropData.toolId);
                if (!tool) return;
                const newNode = {
                    id: `node_${Date.now()}`,
                    type: 'awsNode',
                    position,
                    data: { label: tool.name, icon: tool.icon, toolInfo: tool },
                    parentId: parentNodeId,
                    extent: parentNodeId ? 'parent' : undefined
                };
                setNodes((nds) => nds.concat(newNode));
            } 
            else if (dropData.type === 'awsGroup') {
                const newNode = {
                    id: `group_${Date.now()}`,
                    type: 'awsGroup',
                    position,
                    data: { groupType: dropData.groupType },
                    style: { width: 500, height: 300 },
                    parentId: parentNodeId,
                    extent: parentNodeId ? 'parent' : undefined
                };
                setNodes((nds) => nds.concat(newNode));
            }
            else if (dropData.type === 'stepBubble') {
                const newNode = {
                    id: `step_${Date.now()}`,
                    type: 'stepBubble',
                    position,
                    data: { step: '1', color: '#16191f' },
                    parentId: parentNodeId,
                    extent: parentNodeId ? 'parent' : undefined
                };
                setNodes((nds) => nds.concat(newNode));
            }
        },
        [screenToFlowPosition, allTools, getNodes],
    );

    // Standardizes the recursive absolute coordinate fetching logic for Figma-style precision
    const getAbsolutePosition = (nodeData, allNodes) => {
        let absX = nodeData.positionAbsolute?.x ?? nodeData.computed?.positionAbsolute?.x ?? nodeData.position.x;
        let absY = nodeData.positionAbsolute?.y ?? nodeData.computed?.positionAbsolute?.y ?? nodeData.position.y;
        
        if (typeof nodeData.positionAbsolute === 'undefined' && typeof nodeData.computed?.positionAbsolute === 'undefined' && nodeData.parentId) {
            let currParentId = nodeData.parentId;
            while (currParentId) {
                const pNode = allNodes.find(pn => pn.id === currParentId);
                if (!pNode) break;
                absX += (pNode.positionAbsolute?.x ?? pNode.computed?.positionAbsolute?.x ?? pNode.position.x);
                absY += (pNode.positionAbsolute?.y ?? pNode.computed?.positionAbsolute?.y ?? pNode.position.y);
                currParentId = pNode.parentId;
            }
        }
        return { x: absX, y: absY };
    };

    // Auto-draw Figma Alignment Action Guidelines while actively dragging
    const onNodeDrag = useCallback((event, node) => {
        const nds = getNodes();
        let horizontal = null;
        let vertical = null;
        const threshold = 15;

        const nodeAbs = getAbsolutePosition(node, nds);

        for (let n of nds) {
            if (n.id === node.id || n.parentId !== node.parentId) continue;
            
            const nAbs = getAbsolutePosition(n, nds);
            
            // Y-axis alignment (Horizontal dash)
            if (Math.abs(nAbs.y - nodeAbs.y) < threshold) {
                horizontal = nAbs.y; 
            }
            
            // X-axis alignment (Vertical dash)
            if (Math.abs(nAbs.x - nodeAbs.x) < threshold) {
                vertical = nAbs.x; 
            }
        }

        setHelperLines({ horizontal, vertical });
    }, [getNodes]);

    // Figma-style Smart Alignment: Auto-snap to exact X or Y of nearby nodes on drop
    const onNodeDragStop = useCallback((event, node) => {
        setHelperLines({ horizontal: null, vertical: null });
        setNodes((nds) => {
            let snapped = false;
            let newX = node.position.x;
            let newY = node.position.y;
            const threshold = 15;

            // Find closest nodes on X and Y axes
            for (let n of nds) {
                if (n.id === node.id || n.parentId !== node.parentId) continue;
                
                // Snap Y axis (Horizontal Alignment)
                if (Math.abs(n.position.y - node.position.y) < threshold) {
                    newY = n.position.y;
                    snapped = true;
                }
                
                // Snap X axis (Vertical Alignment)
                if (Math.abs(n.position.x - node.position.x) < threshold) {
                    newX = n.position.x;
                    snapped = true;
                }
            }

            if (snapped) {
                return nds.map(n => n.id === node.id ? { ...n, position: { x: newX, y: newY } } : n);
            }
            return nds;
        });
    }, []);

    return (
        <div className="flex-1 right-0 h-full relative" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeDrag={onNodeDrag}
                onNodeDragStop={onNodeDragStop}
                onNodeContextMenu={onNodeContextMenu}
                onEdgeContextMenu={onEdgeContextMenu}
                onPaneClick={closeMenus}
                onPaneContextMenu={(e) => { e.preventDefault(); closeMenus(); }}
                panOnDrag={mode === 'hand' ? true : [1, 2]} // Middle/Right click pan if in pointer mode
                selectionOnDrag={mode === 'pointer'}
                panOnScroll={true}
                zoomOnDoubleClick={false}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                defaultEdgeOptions={{ type: 'editable' }}
                className="bg-[#f2f3f3]"
            >
                <Background color="#cbd5e1" gap={20} size={1.5} />
                <Controls />
                <MiniMap zoomable pannable nodeColor={(n) => n.type === 'awsGroup' ? '#e2e8f0' : '#0073bb'} />
            </ReactFlow>

            {/* Toolbar for Hand / Pointer mode */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-white p-1.5 rounded-lg shadow-xl border border-gray-200 flex gap-2">
                <button 
                    onClick={() => setMode('pointer')} 
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${mode === 'pointer' ? 'bg-[#0073bb] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                    title="Select & Move (V)"
                >
                    <MousePointer2 size={16} />
                    <span className="text-xs font-bold text-inherit">Pointer</span>
                </button>
                <button 
                    onClick={() => setMode('hand')} 
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${mode === 'hand' ? 'bg-[#0073bb] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                    title="Pan Canvas (H)"
                >
                    <Hand size={16} />
                    <span className="text-xs font-bold text-inherit">Hand</span>
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button 
                    onClick={() => {
                        if (window.confirm('Are you sure you want to clear your entire architecture?')) {
                            setNodes([]);
                            setEdges([]);
                            localStorage.removeItem('aws_builder_nodes');
                            localStorage.removeItem('aws_builder_edges');
                        }
                    }} 
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-red-600 hover:bg-red-50`}
                    title="Clear Canvas"
                >
                    <Trash2 size={16} />
                    <span className="text-xs font-bold text-inherit">Clear</span>
                </button>
            </div>
            
            <div className="absolute top-4 left-4 z-10 bg-white/90 p-3 rounded shadow-md text-[0.65rem] border border-gray-200 pointer-events-none">
                <span className="font-bold text-[#16191f]">Shortcuts:</span>
                <ul className="text-gray-600 ml-4 list-disc mt-1">
                    <li><b>Right-Click</b> any box or line to edit settings.</li>
                    <li>Drag a Group (like VPC) first.</li>
                    <li>Drag Service nodes <b>inside</b> a group.</li>
                    <li>Select and press <b>Backspace</b> to delete.</li>
                </ul>
            </div>

            {/* Figma Helper Lines Overlay */}
            {helperLines.horizontal !== null && (
                <div 
                    className="absolute left-0 w-full pointer-events-none" 
                    style={{ 
                        top: helperLines.horizontal * zoom + viewportY, 
                        zIndex: 9999,
                        borderTop: '2px dashed #0073bb',
                        opacity: 0.8 
                    }} 
                />
            )}
            {helperLines.vertical !== null && (
                <div 
                    className="absolute top-0 h-full pointer-events-none" 
                    style={{ 
                        left: helperLines.vertical * zoom + viewportX, 
                        zIndex: 9999,
                        borderLeft: '2px dashed #0073bb',
                        opacity: 0.8 
                    }} 
                />
            )}

            {/* Click-away transparent backdrop */}
            {(nodeMenu || edgeMenu) && (
                <div 
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 15 }} 
                    onClick={(e) => { e.stopPropagation(); closeMenus(); }}
                    onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); closeMenus(); }}
                />
            )}

            {/* Floating Context Menu for Edges */}
            {edgeMenu && (() => {
                const selectedEdge = edges.find(e => e.id === edgeMenu.id) || {};
                const currentType = selectedEdge.type || 'editable';
                const currentDash = selectedEdge.style?.strokeDasharray || 'none';
                const isAnimated = selectedEdge.animated || false;

                const getShapeStyle = (typeMatch) => currentType === typeMatch
                    ? { padding: '4px 8px', backgroundColor: '#f0f8ff', border: '1px solid #0073bb', color: '#0073bb', fontSize: '12px', textAlign: 'left', cursor: 'pointer', fontWeight: 500 }
                    : { padding: '4px 8px', backgroundColor: 'white', border: '1px solid #d1d5db', color: 'black', fontSize: '12px', textAlign: 'left', cursor: 'pointer', fontWeight: 500 };

                const getPatternStyle = (dashMatch, animMatch) => (currentDash === dashMatch && isAnimated === animMatch)
                    ? { padding: '4px 8px', backgroundColor: '#f0f8ff', border: '1px solid #0073bb', color: '#0073bb', fontSize: '12px', textAlign: 'left', cursor: 'pointer', fontWeight: 500 }
                    : { padding: '4px 8px', backgroundColor: 'white', border: '1px solid #d1d5db', color: 'black', fontSize: '12px', textAlign: 'left', cursor: 'pointer' };

                return (
                    <div 
                        style={{ left: edgeMenu.x, top: edgeMenu.y, position: 'absolute', zIndex: 20, backgroundColor: 'white', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', border: '1px solid #d1d5db', width: '208px', fontSize: '14px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.025em' }}>Edit Line</span>
                            <button onClick={closeMenus} style={{ color: '#d1d5db', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }} onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='#d1d5db'}>&times;</button>
                        </div>

                        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Line Color</span>
                                <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'space-between' }}>
                                    <button onClick={() => updateSelectedEdgeColor('#545b64')} style={{ backgroundColor: '#545b64', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }}></button>
                                    <button onClick={() => updateSelectedEdgeColor('#3b82f6')} style={{ backgroundColor: '#3b82f6', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }}></button>
                                    <button onClick={() => updateSelectedEdgeColor('#22c55e')} style={{ backgroundColor: '#22c55e', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }}></button>
                                    <button onClick={() => updateSelectedEdgeColor('#ef4444')} style={{ backgroundColor: '#ef4444', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }}></button>
                                    <button onClick={() => updateSelectedEdgeColor('#f97316')} style={{ backgroundColor: '#f97316', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }}></button>
                                    <button onClick={() => updateSelectedEdgeColor('#a855f7')} style={{ backgroundColor: '#a855f7', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }}></button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Line Shape</span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <button onClick={() => updateSelectedEdgeType('editable')} style={getShapeStyle('editable')} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#f9fafb'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor=currentType==='editable'?'#f0f8ff':'white'}>Perpendicular (Straight)</button>
                                    <button onClick={() => updateSelectedEdgeType('default')} style={getShapeStyle('default')} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#f9fafb'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor=currentType==='default'?'#f0f8ff':'white'}>Curved Route</button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Line Pattern</span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <button onClick={() => updateSelectedEdgeStyle('none', false)} style={getPatternStyle('none', false)} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#f9fafb'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor=(currentDash==='none'&&!isAnimated)?'#f0f8ff':'white'}>Solid Path</button>
                                    <button onClick={() => updateSelectedEdgeStyle('5 5', false)} style={getPatternStyle('5 5', false)} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#f9fafb'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor=(currentDash==='5 5'&&!isAnimated)?'#f0f8ff':'white'}>Dashed Path</button>
                                    <button onClick={() => updateSelectedEdgeStyle('5 5', true)} style={getPatternStyle('5 5', true)} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#f9fafb'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor=(currentDash==='5 5'&&isAnimated)?'#f0f8ff':'white'}>Animated Flow</button>
                                </div>
                            </div>

                            <div style={{ paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                                <button onClick={() => { setEdges(eds => eds.filter(e => e.id !== edgeMenu.id)); setEdgeMenu(null); }} style={{ width: '100%', padding: '6px 8px', backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#fee2e2'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#fef2f2'}>Delete Connection</button>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Floating Properties Panel for Custom Groups via Right Click */}
            {nodeMenu && nodeMenu.type === 'awsGroup' && (
                <div style={{ left: nodeMenu.x, top: nodeMenu.y, position: 'absolute', zIndex: 20, backgroundColor: 'white', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', border: '1px solid #d1d5db', width: '256px', fontSize: '14px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.025em' }}>Boundary Properties</span>
                        <button onClick={closeMenus} style={{ color: '#d1d5db', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }} onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='#d1d5db'}>&times;</button>
                    </div>

                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151', paddingBottom: '2px' }}>Label (Black text inside boundary)</span>
                            <input 
                                type="text" 
                                style={{ border: '1px solid #d1d5db', backgroundColor: 'white', color: 'black', fontSize: '12px', padding: '6px 8px', width: '100%', boxSizing: 'border-box', outline: 'none' }} 
                                value={nodeMenu.data.label || ''} 
                                onChange={e => updateSelectedGroupData('label', e.target.value)} 
                                onFocus={e => e.currentTarget.style.borderColor = '#0073bb'}
                                onBlur={e => e.currentTarget.style.borderColor = '#d1d5db'}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Theme Color</span>
                            <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'space-between', marginTop: '4px' }}>
                                <button onClick={() => updateSelectedGroupData('color', 'dark')} style={{ backgroundColor: '#232f3e', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }} title="AWS Dark"></button>
                                <button onClick={() => updateSelectedGroupData('color', 'blue')} style={{ backgroundColor: '#3b82f6', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }} title="Blue"></button>
                                <button onClick={() => updateSelectedGroupData('color', 'green')} style={{ backgroundColor: '#22c55e', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }} title="Green"></button>
                                <button onClick={() => updateSelectedGroupData('color', 'orange')} style={{ backgroundColor: '#f97316', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }} title="Orange"></button>
                                <button onClick={() => updateSelectedGroupData('color', 'slate')} style={{ backgroundColor: '#64748b', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }} title="Slate"></button>
                                <button onClick={() => updateSelectedGroupData('color', 'purple')} style={{ backgroundColor: '#a855f7', width: '20px', height: '20px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)' }} title="Purple"></button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Style</span>
                                <select 
                                    style={{ border: '1px solid #d1d5db', backgroundColor: 'white', color: 'black', fontSize: '12px', padding: '6px 8px', width: '100%', boxSizing: 'border-box', outline: 'none', cursor: 'pointer' }}
                                    value={nodeMenu.data.fillStyle || 'outline'}
                                    onChange={e => updateSelectedGroupData('fillStyle', e.target.value)}
                                >
                                    <option value="outline">Outline</option>
                                    <option value="solid">Solid</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Stroke</span>
                                <select 
                                    style={{ border: '1px solid #d1d5db', backgroundColor: 'white', color: 'black', fontSize: '12px', padding: '6px 8px', width: '100%', boxSizing: 'border-box', outline: 'none', cursor: 'pointer' }}
                                    value={nodeMenu.data.borderWidth || 2}
                                    onChange={e => updateSelectedGroupData('borderWidth', parseInt(e.target.value))}
                                >
                                    <option value={1}>1px</option>
                                    <option value={2}>2px</option>
                                    <option value={3}>3px</option>
                                    <option value={4}>4px</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Dash</span>
                                <select 
                                    style={{ border: '1px solid #d1d5db', backgroundColor: 'white', color: 'black', fontSize: '12px', padding: '6px 8px', width: '100%', boxSizing: 'border-box', outline: 'none', cursor: 'pointer' }}
                                    value={nodeMenu.data.borderStyle || 'solid'}
                                    onChange={e => updateSelectedGroupData('borderStyle', e.target.value)}
                                >
                                    <option value="solid">Solid</option>
                                    <option value="dashed">Dashed</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Icon</span>
                                <select 
                                    style={{ border: '1px solid #d1d5db', backgroundColor: 'white', color: 'black', fontSize: '12px', padding: '6px 8px', width: '100%', boxSizing: 'border-box', outline: 'none', cursor: 'pointer' }}
                                    value={nodeMenu.data.iconName || 'box'}
                                    onChange={e => updateSelectedGroupData('iconName', e.target.value)}
                                >
                                    <option value="cloud">Cloud</option>
                                    <option value="globe">Globe</option>
                                    <option value="lock">Lock</option>
                                    <option value="shield">Shield</option>
                                    <option value="server">Server</option>
                                    <option value="grid">Grid</option>
                                    <option value="box">Box</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        
                        <div style={{ marginTop: '4px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                            <button 
                                onClick={() => { setNodes(nds => nds.filter(n => n.id !== nodeMenu.id)); closeMenus(); }} 
                                style={{ width: '100%', textAlign: 'center', padding: '6px 0', backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                                onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#fee2e2'} 
                                onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#fef2f2'}
                            >
                                Delete Boundary
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
