import React, { useState, useMemo } from 'react';
import { Type, ChevronDown, ChevronRight, Star } from 'lucide-react';
import { generalResources } from '../../data/generalResources';

// Category icon mapping — maps category names to their official AWS category icon
const CATEGORY_ICONS = {
    'Analytics': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Analytics_48.svg',
    'Application Integration': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Application-Integration_48.svg',
    'Artificial Intelligence': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Artificial-Intelligence_48.svg',
    'Blockchain': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Blockchain_48.svg',
    'Business Applications': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Business-Applications_48.svg',
    'Cloud Financial Management': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Cloud-Financial-Management_48.svg',
    'Compute': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Compute_48.svg',
    'Containers': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Containers_48.svg',
    'Customer Enablement': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Customer-Enablement_48.svg',
    'Databases': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Databases_48.svg',
    'Developer Tools': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Developer-Tools_48.svg',
    'End User Computing': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_End-User-Computing_48.svg',
    'Front End Web Mobile': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Front-End-Web-Mobile_48.svg',
    'Games': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Games_48.svg',
    'Internet of Things': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Internet-of-Things_48.svg',
    'Management Tools': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Management-Tools_48.svg',
    'Media Services': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Media-Services_48.svg',
    'Migration Modernization': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Migration-Modernization_48.svg',
    'Networking Content Delivery': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Networking-Content-Delivery_48.svg',
    'Quantum Technologies': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Quantum-Technologies_48.svg',
    'Satellite': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Satellite_48.svg',
    'Security Identity': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Security-Identity_48.svg',
    'Storage': 'icons/Category-Icons_01302026/Arch-Category_48/Arch-Category_Storage_48.svg',
};

// Category display order (most-used first)
const CATEGORY_ORDER = [
    'Compute', 'Networking Content Delivery', 'Storage', 'Databases', 
    'Security Identity', 'Containers', 'Application Integration', 
    'Management Tools', 'Analytics', 'Developer Tools', 
    'Artificial Intelligence', 'Front End Web Mobile', 'Business Applications',
    'Media Services', 'Internet of Things', 'Migration Modernization',
    'Cloud Financial Management', 'Customer Enablement', 'End User Computing',
    'Games', 'Blockchain', 'Quantum Technologies', 'Satellite'
];

// Group boundary types with their styles and official AWS group icons
const GROUP_ITEMS = [
    { type: 'region', label: 'Region', borderColor: '#232f3e', textColor: '#232f3e', icon: 'icons/Architecture-Group-Icons_01302026/Region_32.svg', dashed: true },
    { type: 'vpc', label: 'VPC', borderColor: '#16a34a', textColor: '#15803d', icon: 'icons/Architecture-Group-Icons_01302026/Virtual-private-cloud-VPC_32.svg', dashed: false },
    { type: 'subnet-public', label: 'Public Subnet', borderColor: '#2563eb', textColor: '#2563eb', icon: 'icons/Architecture-Group-Icons_01302026/Public-subnet_32.svg', dashed: false },
    { type: 'subnet-private', label: 'Private Subnet', borderColor: '#64748b', textColor: '#64748b', icon: 'icons/Architecture-Group-Icons_01302026/Private-subnet_32.svg', dashed: false },
    { type: 'custom', label: 'Custom Group', borderColor: '#c084fc', textColor: '#7e22ce', icon: null, dashed: false },
];

// Collapsible section component
const CollapsibleSection = ({ title, icon, count, defaultOpen, children, accentColor }) => {
    const [open, setOpen] = useState(defaultOpen || false);
    return (
        <div style={{ marginBottom: '4px' }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 4px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: accentColor || '#374151',
                    textAlign: 'left',
                    borderRadius: '4px',
                    transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                {icon && <img src={'/' + icon} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} draggable="false" />}
                <span style={{ flex: 1 }}>{title}</span>
                {count != null && (
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', backgroundColor: '#f3f4f6', padding: '1px 6px', borderRadius: '8px' }}>{count}</span>
                )}
            </button>
            {open && (
                <div style={{ padding: '4px 0 8px 0' }}>
                    {children}
                </div>
            )}
        </div>
    );
};

export const ToolSidebar = ({ allTools }) => {
    const [search, setSearch] = useState("");

    const onDragStart = (event, tool) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'awsNode', toolId: tool.id }));
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragGenericStart = (event, item) => {
        // For general resource icons, we create a special awsNode with the icon and label
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ 
            type: 'awsNode', 
            toolId: item.id,
            // pass the full item so DiagramCanvas can use it as a fallback
            genericItem: item
        }));
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragGroupStart = (event, groupType) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'awsGroup', groupType }));
        event.dataTransfer.effectAllowed = 'move';
    };

    // Deduplicate
    const uniqueTools = useMemo(() => 
        Array.from(new Map(allTools.map(t => [t.name.trim(), t])).values()),
        [allTools]
    );

    const searchLower = search.toLowerCase();
    const isSearching = searchLower.length > 0;

    const filtered = useMemo(() => 
        uniqueTools.filter(t => t.name.toLowerCase().includes(searchLower) || t.category.toLowerCase().includes(searchLower)),
        [uniqueTools, searchLower]
    );

    const filteredGeneral = useMemo(() =>
        generalResources.filter(r => r.name.toLowerCase().includes(searchLower) || 'general resources'.includes(searchLower)),
        [searchLower]
    );

    const essentials = useMemo(() => filtered.filter(t => t.popular), [filtered]);

    // Group by category  
    const categorized = useMemo(() => {
        const map = {};
        filtered.forEach(t => {
            if (!map[t.category]) map[t.category] = [];
            map[t.category].push(t);
        });
        return map;
    }, [filtered]);

    // Sort categories by predefined order
    const sortedCategories = useMemo(() => {
        const cats = Object.keys(categorized);
        return cats.sort((a, b) => {
            const ai = CATEGORY_ORDER.indexOf(a);
            const bi = CATEGORY_ORDER.indexOf(b);
            return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        });
    }, [categorized]);

    // Compact icon tile renderer for AWS service nodes
    const renderIconTile = (tool) => (
        <div 
            key={tool.id + '-tile'} 
            draggable 
            onDragStart={(e) => onDragStart(e, tool)}
            title={tool.name + '\n' + (tool.vibe || '')}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '3px',
                cursor: 'grab',
                textAlign: 'center',
                padding: '6px 2px',
                borderRadius: '6px',
                border: '1px solid transparent',
                transition: 'all 0.12s ease',
                minHeight: '62px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#eff6ff'; e.currentTarget.style.borderColor = '#bfdbfe'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
        >
            <img 
                src={"/" + tool.icon} 
                alt={tool.name} 
                draggable="false" 
                style={{ width: 32, height: 32, objectFit: 'contain', pointerEvents: 'none', flexShrink: 0 }} 
            />
            <span style={{ 
                fontSize: '9px', 
                fontWeight: 600, 
                color: '#4b5563', 
                lineHeight: '1.15', 
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                width: '100%',
            }}>
                {tool.name.replace('Amazon ', '').replace('AWS ', '')}
            </span>
        </div>
    );

    // Compact icon tile for general resource items
    const renderGenericTile = (item) => (
        <div 
            key={item.id + '-gen'} 
            draggable 
            onDragStart={(e) => onDragGenericStart(e, item)}
            title={item.name}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '3px',
                cursor: 'grab',
                textAlign: 'center',
                padding: '6px 2px',
                borderRadius: '6px',
                border: '1px solid transparent',
                transition: 'all 0.12s ease',
                minHeight: '62px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0fdf4'; e.currentTarget.style.borderColor = '#bbf7d0'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
        >
            <img 
                src={"/" + item.icon} 
                alt={item.name} 
                draggable="false" 
                style={{ width: 32, height: 32, objectFit: 'contain', pointerEvents: 'none', flexShrink: 0 }} 
            />
            <span style={{ 
                fontSize: '9px', 
                fontWeight: 600, 
                color: '#4b5563', 
                lineHeight: '1.15', 
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                width: '100%',
            }}>
                {item.name}
            </span>
        </div>
    );

    const iconGrid = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' };

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
            {/* Header + Search */}
            <div style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', flexShrink: 0, backgroundColor: 'white' }}>
                <h3 style={{ fontWeight: 700, color: '#1f2937', marginBottom: '10px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img src="/icons/Architecture-Group-Icons_01302026/AWS-Cloud-logo_32.svg" alt="AWS" style={{ width: 22, height: 22 }} />
                    Architect Tools
                </h3>
                <input 
                    type="text" 
                    placeholder="Search services, categories..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ 
                        width: '100%', 
                        padding: '7px 10px', 
                        fontSize: '12px', 
                        border: '1px solid #d1d5db', 
                        borderRadius: '6px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.15s'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#0073bb'; e.target.style.boxShadow = '0 0 0 2px rgba(0,115,187,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                    spellCheck="false"
                />
            </div>
            
            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                
                {/* ═══════════ ANNOTATIONS & TEXT ═══════════ */}
                {(!isSearching || 'text annotation freeform'.includes(searchLower)) && (
                    <CollapsibleSection title="Annotations & Text" defaultOpen={false} accentColor="#6b7280">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', padding: '0 4px' }}>
                            <div 
                                draggable 
                                onDragStart={(e) => { e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'textNode' })); e.dataTransfer.effectAllowed = 'move'; }} 
                                style={{ border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', padding: '10px 8px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.15s ease' }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#eff6ff'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = 'white'; }}
                            >
                                <Type size={20} strokeWidth={1.5} color="#6b7280" />
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>Freeform Text</span>
                            </div>
                        </div>
                    </CollapsibleSection>
                )}

                {/* ═══════════ AWS GROUPS / BOUNDARIES ═══════════ */}
                {(!isSearching || 'group boundary region vpc subnet'.includes(searchLower)) && (
                    <CollapsibleSection title="AWS / Groups" defaultOpen={true} count={GROUP_ITEMS.length + 1} accentColor="#232f3e">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', padding: '0 4px' }}>
                            {GROUP_ITEMS.map(g => (
                                <div 
                                    key={g.type}
                                    draggable 
                                    onDragStart={(e) => onDragGroupStart(e, g.type)} 
                                    title={g.label}
                                    style={{ 
                                        border: `2px ${g.dashed ? 'dashed' : 'solid'} ${g.borderColor}`, 
                                        borderRadius: '6px', 
                                        backgroundColor: 'white', 
                                        padding: '8px 4px', 
                                        cursor: 'grab', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        gap: '4px',
                                        textAlign: 'center',
                                        transition: 'all 0.15s ease',
                                        minHeight: '60px',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    {g.icon && <img src={'/' + g.icon} alt={g.label} style={{ width: 22, height: 22, objectFit: 'contain' }} draggable="false" />}
                                    <span style={{ fontSize: '9px', fontWeight: 700, color: g.textColor, lineHeight: '1.15' }}>{g.label}</span>
                                </div>
                            ))}
                            {/* Step Bubble */}
                            <div 
                                draggable 
                                onDragStart={(e) => { e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'stepBubble' })); e.dataTransfer.effectAllowed = 'move'; }} 
                                title="Step Bubble"
                                style={{ 
                                    border: '2px solid #1f2937', 
                                    borderRadius: '6px', 
                                    backgroundColor: 'white', 
                                    padding: '8px 4px', 
                                    cursor: 'grab', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    gap: '4px',
                                    textAlign: 'center',
                                    transition: 'all 0.15s ease',
                                    minHeight: '60px',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <span style={{ fontSize: '16px', fontWeight: 800, color: '#1f2937' }}>①</span>
                                <span style={{ fontSize: '9px', fontWeight: 700, color: '#1f2937', lineHeight: '1.15' }}>Step Bubble</span>
                            </div>
                        </div>
                    </CollapsibleSection>
                )}

                {/* ═══════════ GENERAL RESOURCES ═══════════ */}
                {filteredGeneral.length > 0 && (
                    <CollapsibleSection title="AWS / General Resources" defaultOpen={!isSearching} count={filteredGeneral.length} accentColor="#065f46">
                        <div style={iconGrid}>
                            {filteredGeneral.map(renderGenericTile)}
                        </div>
                    </CollapsibleSection>
                )}

                {/* Divider */}
                <div style={{ borderTop: '1px solid #e5e7eb', margin: '4px 0' }} />

                {/* ═══════════ ESSENTIALS (always shown with star) ═══════════ */}
                {essentials.length > 0 && (
                    <CollapsibleSection 
                        title="★ Essentials" 
                        defaultOpen={!isSearching} 
                        count={essentials.length} 
                        accentColor="#b45309"
                    >
                        <div style={iconGrid}>
                            {essentials.map(renderIconTile)}
                        </div>
                    </CollapsibleSection>
                )}

                {/* ═══════════ AWS SERVICE CATEGORIES ═══════════ */}
                {sortedCategories.map(cat => {
                    const tools = categorized[cat];
                    if (!tools || tools.length === 0) return null;
                    return (
                        <CollapsibleSection 
                            key={cat}
                            title={cat} 
                            icon={CATEGORY_ICONS[cat]} 
                            count={tools.length}
                            defaultOpen={isSearching}
                            accentColor="#374151"
                        >
                            <div style={iconGrid}>
                                {tools.map(renderIconTile)}
                            </div>
                        </CollapsibleSection>
                    );
                })}

                {/* Empty state */}
                {filtered.length === 0 && filteredGeneral.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px 8px', color: '#9ca3af', fontSize: '13px' }}>
                        No services found for "{search}"
                    </div>
                )}
            </div>
        </aside>
    );
};
