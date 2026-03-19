import React, { useCallback, useRef, useState } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    useReactFlow,
    MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AwsResourceNode } from './nodes/AwsResourceNode';
import { AwsGroupNode } from './nodes/AwsGroupNode';

import { MousePointer2, Hand, Trash2 } from 'lucide-react';

const nodeTypes = { awsNode: AwsResourceNode, awsGroup: AwsGroupNode };

export const DiagramCanvas = ({ allTools }) => {
    const reactFlowWrapper = useRef(null);
    const { screenToFlowPosition, getNodes } = useReactFlow();

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
    const onConnect = useCallback((connection) => setEdges((eds) => addEdge({...connection, type: 'smoothstep', animated: false, style: { strokeWidth: 2, stroke: '#545b64' }}, eds)), []);

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
        },
        [screenToFlowPosition, allTools, getNodes],
    );

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
                onNodeContextMenu={onNodeContextMenu}
                onEdgeContextMenu={onEdgeContextMenu}
                onPaneClick={closeMenus}
                onPaneContextMenu={(e) => { e.preventDefault(); closeMenus(); }}
                panOnDrag={mode === 'hand' ? true : [1, 2]} // Middle/Right click pan if in pointer mode
                selectionOnDrag={mode === 'pointer'}
                panOnScroll={true}
                zoomOnDoubleClick={false}
                nodeTypes={nodeTypes}
                fitView
                defaultEdgeOptions={{ type: 'smoothstep' }}
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

            {/* Floating Context Menu for Edges */}
            {edgeMenu && (
                <div 
                    style={{ left: edgeMenu.x, top: edgeMenu.y }}
                    className="absolute z-20 bg-white shadow-xl w-52 text-sm font-sans flex flex-col border border-gray-300"
                >
                    <div className="bg-slate-800 text-white px-3 py-2 flex justify-between items-center shrink-0">
                        <span className="text-xs font-bold tracking-wide">Edit Line</span>
                        <button onClick={closeMenus} className="text-gray-300 hover:text-white">&times;</button>
                    </div>

                    <div className="p-3 flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[11px] font-semibold text-gray-700">Line Color</span>
                            <div className="flex gap-2 w-full justify-between">
                                <button onClick={() => updateSelectedEdgeColor('#545b64')} style={{ backgroundColor: '#545b64' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform"></button>
                                <button onClick={() => updateSelectedEdgeColor('#3b82f6')} style={{ backgroundColor: '#3b82f6' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform"></button>
                                <button onClick={() => updateSelectedEdgeColor('#22c55e')} style={{ backgroundColor: '#22c55e' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform"></button>
                                <button onClick={() => updateSelectedEdgeColor('#ef4444')} style={{ backgroundColor: '#ef4444' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform"></button>
                                <button onClick={() => updateSelectedEdgeColor('#f97316')} style={{ backgroundColor: '#f97316' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform"></button>
                                <button onClick={() => updateSelectedEdgeColor('#a855f7')} style={{ backgroundColor: '#a855f7' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform"></button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-[11px] font-semibold text-gray-700">Line Pattern</span>
                            <div className="flex flex-col gap-1">
                                <button onClick={() => updateSelectedEdgeStyle('none', false)} className="px-2 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-xs text-left cursor-pointer">Solid Path</button>
                                <button onClick={() => updateSelectedEdgeStyle('5 5', false)} className="px-2 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-xs text-left cursor-pointer">Dashed Path</button>
                                <button onClick={() => updateSelectedEdgeStyle('5 5', true)} className="px-2 py-1 bg-[#f0f8ff] border border-[#0073bb] text-[#0073bb] hover:bg-blue-50 text-xs text-left cursor-pointer font-medium">Animated Flow</button>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-gray-200">
                            <button onClick={() => setEdges(eds => eds.filter(e => e.id !== edgeMenu.id)) || setEdgeMenu(null)} className="w-full px-2 py-1.5 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 text-xs cursor-pointer font-medium">Delete Connection</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Properties Panel for Custom Groups via Right Click */}
            {nodeMenu && nodeMenu.type === 'awsGroup' && (
                <div style={{ left: nodeMenu.x, top: nodeMenu.y }} className="absolute z-20 bg-white shadow-xl border border-gray-300 w-64 text-sm font-sans flex flex-col">
                    <div className="bg-slate-800 text-white px-3 py-2 flex justify-between items-center shrink-0">
                        <span className="text-xs font-bold tracking-wide">Boundary Properties</span>
                        <button onClick={closeMenus} className="text-gray-300 hover:text-white">&times;</button>
                    </div>

                    <div className="p-3 flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-semibold text-gray-700">Label</span>
                            <input 
                                type="text" 
                                className="border border-gray-300 bg-white text-xs px-2 py-1.5 w-full focus:outline-none focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb]" 
                                value={nodeMenu.data.label || ''} 
                                onChange={e => updateSelectedGroupData('label', e.target.value)} 
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-semibold text-gray-700">Theme Color</span>
                            <div className="flex gap-2 w-full justify-between mt-1">
                                <button onClick={() => updateSelectedGroupData('color', 'dark')} style={{ backgroundColor: '#232f3e' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform" title="AWS Dark"></button>
                                <button onClick={() => updateSelectedGroupData('color', 'blue')} style={{ backgroundColor: '#3b82f6' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform" title="Blue"></button>
                                <button onClick={() => updateSelectedGroupData('color', 'green')} style={{ backgroundColor: '#22c55e' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform" title="Green"></button>
                                <button onClick={() => updateSelectedGroupData('color', 'orange')} style={{ backgroundColor: '#f97316' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform" title="Orange"></button>
                                <button onClick={() => updateSelectedGroupData('color', 'slate')} style={{ backgroundColor: '#64748b' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform" title="Slate"></button>
                                <button onClick={() => updateSelectedGroupData('color', 'purple')} style={{ backgroundColor: '#a855f7' }} className="w-5 h-5 cursor-pointer ring-1 ring-inset ring-black/20 hover:scale-110 transition-transform" title="Purple"></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold text-gray-700">Style</span>
                                <select 
                                    className="border border-gray-300 bg-white text-xs px-2 py-1.5 w-full focus:outline-none focus:border-[#0073bb] cursor-pointer"
                                    value={nodeMenu.data.fillStyle || 'outline'}
                                    onChange={e => updateSelectedGroupData('fillStyle', e.target.value)}
                                >
                                    <option value="outline">Outline</option>
                                    <option value="solid">Solid</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold text-gray-700">Stroke</span>
                                <select 
                                    className="border border-gray-300 bg-white text-xs px-2 py-1.5 w-full focus:outline-none focus:border-[#0073bb] cursor-pointer"
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

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold text-gray-700">Dash</span>
                                <select 
                                    className="border border-gray-300 bg-white text-xs px-2 py-1.5 w-full focus:outline-none focus:border-[#0073bb] cursor-pointer"
                                    value={nodeMenu.data.borderStyle || 'solid'}
                                    onChange={e => updateSelectedGroupData('borderStyle', e.target.value)}
                                >
                                    <option value="solid">Solid</option>
                                    <option value="dashed">Dashed</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold text-gray-700">Icon</span>
                                <select 
                                    className="border border-gray-300 bg-white text-xs px-2 py-1.5 w-full focus:outline-none focus:border-[#0073bb] cursor-pointer"
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
                        
                        <div className="mt-1 pt-3 border-t border-gray-200">
                            <button onClick={() => setNodes(nds => nds.filter(n => n.id !== nodeMenu.id)) || closeMenus()} className="w-full text-center py-1.5 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold hover:bg-red-100 cursor-pointer">
                                Delete Boundary
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
