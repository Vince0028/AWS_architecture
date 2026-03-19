import React, { useState } from 'react';
import { User, Users, Folder, FileText, Type } from 'lucide-react';

export const ToolSidebar = ({ allTools }) => {
    const [search, setSearch] = useState("");

    const onDragStart = (event, tool) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'awsNode', toolId: tool.id }));
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragGroupStart = (event, groupType) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'awsGroup', groupType }));
        event.dataTransfer.effectAllowed = 'move';
    };

    // Deduplicate tools in case backend/json has repeats with slightly different IDs
    const uniqueTools = Array.from(new Map(allTools.map(t => [t.name.trim(), t])).values());
    const filtered = uniqueTools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));

    const essentials = filtered.filter(t => t.popular);
    const others = filtered.filter(t => !t.popular);

    const renderToolCard = (tool) => (
        <div 
            key={tool.id + '-' + tool.name} 
            draggable 
            onDragStart={(e) => onDragStart(e, tool)}
            title={tool.name}
            style={{
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '4px',
                cursor: 'grab',
                backgroundColor: 'white',
                textAlign: 'center',
                boxSizing: 'border-box',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                height: '85px',
                overflow: 'hidden',
                width: '100%',
                minWidth: 0
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.backgroundColor = 'white'; }}
        >
            <div style={{ flexShrink: 0, width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                <img 
                    src={"/" + tool.icon} 
                    alt={tool.name} 
                    draggable="false" 
                    style={{ maxWidth: '28px', maxHeight: '28px', objectFit: 'contain', pointerEvents: 'none' }} 
                />
            </div>
            <span 
                style={{ 
                    fontSize: '10px', 
                    fontWeight: 600, 
                    color: '#374151', 
                    lineHeight: '1.2', 
                    width: '100%', 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordBreak: 'break-word',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    padding: '0 2px',
                    boxSizing: 'border-box',
                    whiteSpace: 'normal'
                }}
            >
                {tool.name}
            </span>
        </div>
    );

    return (
        <aside 
            className="shrink-0 bg-white border-l border-gray-200 flex flex-col h-full shadow-xl z-20"
            style={{ 
                width: '320px', 
                minWidth: '320px', 
                maxWidth: '320px',
                borderLeft: '1px solid #e5e7eb',
                fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
        >
            <div style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', flexShrink: 0, backgroundColor: 'white' }}>
                <h3 style={{ fontWeight: 700, color: '#1f2937', marginBottom: '12px', fontSize: '15px' }}>Architect Tools</h3>
                <input 
                    type="text" 
                    placeholder="Search AWS services..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ 
                        width: '100%', 
                        padding: '6px 10px', 
                        fontSize: '13px', 
                        border: '1px solid #d1d5db', 
                        borderRadius: '4px',
                        outline: 'none',
                        boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 1px #0073bb'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                    spellCheck="false"
                />
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Annotations & Text</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                        <div 
                            draggable 
                            onDragStart={(e) => { e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'textNode' })); e.dataTransfer.effectAllowed = 'move'; }} 
                            style={{ border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', padding: '12px 8px', cursor: 'grab', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', boxSizing: 'border-box', color: '#4b5563', transition: 'all 0.15s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#eff6ff'; e.currentTarget.style.color = '#1d4ed8'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#4b5563'; }}
                        >
                            <Type size={24} strokeWidth={1.5} color="currentColor" />
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'inherit', textAlign: 'center' }}>Freeform Text</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Structural Shapes</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div 
                            draggable 
                            onDragStart={(e) => { e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'shapeNode', shapeType: 'user' })); e.dataTransfer.effectAllowed = 'move'; }} 
                            style={{ border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', padding: '12px 8px', cursor: 'grab', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', boxSizing: 'border-box', color: '#4b5563', transition: 'all 0.15s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#eff6ff'; e.currentTarget.style.color = '#1d4ed8'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#4b5563'; }}
                        >
                            <User size={24} strokeWidth={1.5} color="currentColor" />
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'inherit', textAlign: 'center' }}>User / Actor</span>
                        </div>
                        <div 
                            draggable 
                            onDragStart={(e) => { e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'shapeNode', shapeType: 'users' })); e.dataTransfer.effectAllowed = 'move'; }} 
                            style={{ border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', padding: '12px 8px', cursor: 'grab', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', boxSizing: 'border-box', color: '#4b5563', transition: 'all 0.15s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#eff6ff'; e.currentTarget.style.color = '#1d4ed8'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#4b5563'; }}
                        >
                            <Users size={24} strokeWidth={1.5} color="currentColor" />
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'inherit', textAlign: 'center' }}>User Group</span>
                        </div>
                        <div 
                            draggable 
                            onDragStart={(e) => { e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'shapeNode', shapeType: 'folder' })); e.dataTransfer.effectAllowed = 'move'; }} 
                            style={{ border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', padding: '12px 8px', cursor: 'grab', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', boxSizing: 'border-box', color: '#4b5563', transition: 'all 0.15s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#eff6ff'; e.currentTarget.style.color = '#1d4ed8'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#4b5563'; }}
                        >
                            <Folder size={24} strokeWidth={1.5} color="currentColor" />
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'inherit', textAlign: 'center' }}>Group Folder</span>
                        </div>
                        <div 
                            draggable 
                            onDragStart={(e) => { e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'shapeNode', shapeType: 'document' })); e.dataTransfer.effectAllowed = 'move'; }} 
                            style={{ border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', padding: '12px 8px', cursor: 'grab', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', boxSizing: 'border-box', color: '#4b5563', transition: 'all 0.15s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#eff6ff'; e.currentTarget.style.color = '#1d4ed8'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#4b5563'; }}
                        >
                            <FileText size={24} strokeWidth={1.5} color="currentColor" />
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'inherit', textAlign: 'center' }}>Document / Note</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Boundaries</h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div 
                            draggable 
                            onDragStart={(e) => onDragGroupStart(e, 'region')} 
                            style={{ border: '2px dashed #0073bb', borderRadius: '6px', backgroundColor: 'white', padding: '8px', cursor: 'grab', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#0073bb', boxSizing: 'border-box' }}
                        >
                            Region
                        </div>
                        <div 
                            draggable 
                            onDragStart={(e) => onDragGroupStart(e, 'vpc')} 
                            style={{ border: '2px solid #16a34a', borderRadius: '6px', backgroundColor: 'white', padding: '8px', cursor: 'grab', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#15803d', boxSizing: 'border-box' }}
                        >
                            VPC
                        </div>
                        <div 
                            draggable 
                            onDragStart={(e) => onDragGroupStart(e, 'subnet-public')} 
                            style={{ border: '2px solid #60a5fa', borderRadius: '6px', backgroundColor: 'white', padding: '8px', cursor: 'grab', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#2563eb', boxSizing: 'border-box' }}
                        >
                            Public Subnet
                        </div>
                        <div 
                            draggable 
                            onDragStart={(e) => onDragGroupStart(e, 'subnet-private')} 
                            style={{ border: '2px solid #94a3b8', borderRadius: '6px', backgroundColor: 'white', padding: '8px', cursor: 'grab', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#64748b', boxSizing: 'border-box' }}
                        >
                            Private Subnet
                        </div>
                        <div 
                            draggable 
                            onDragStart={(e) => onDragGroupStart(e, 'custom')} 
                            style={{ border: '2px solid #c084fc', borderRadius: '6px', backgroundColor: 'white', padding: '8px', cursor: 'grab', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#7e22ce', boxSizing: 'border-box' }}
                        >
                            Custom Boundary
                        </div>
                        <div 
                            draggable 
                            onDragStart={(e) => { e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'stepBubble' })); e.dataTransfer.effectAllowed = 'move'; }} 
                            style={{ border: '2px solid #1f2937', borderRadius: '6px', backgroundColor: 'white', padding: '8px', cursor: 'grab', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#111827', boxSizing: 'border-box' }}
                        >
                            Step Bubble
                        </div>
                    </div>
                </div>

                {essentials.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Essentials</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '8px', gridAutoRows: '85px' }}>
                            {essentials.map(renderToolCard)}
                        </div>
                    </div>
                )}

                {others.length > 0 && (
                    <div>
                        <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>All Services</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '8px', gridAutoRows: '85px' }}>
                            {others.map(renderToolCard)}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};
