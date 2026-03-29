import React, { useEffect, useState, useMemo } from 'react';
import { Type, ChevronDown, ChevronRight, Star } from 'lucide-react';
import { generalResources } from '../../data/generalResources';
import { awsResourceIconGroups } from '../../data/awsResourceIcons';

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

const RESOURCE_GROUP_TO_SERVICE_CATEGORY = {
    'IoT': 'Internet of Things',
    'Management Governance': 'Management Tools',
};

const MAX_SEARCH_ITEMS_PER_CATEGORY = 36;
const MAX_SEARCH_RESULTS_TOTAL = 80;

// Group boundary types with their styles and official AWS group icons
const GROUP_ITEMS = [
    { type: 'region', label: 'Region', borderColor: '#232f3e', textColor: '#232f3e', icon: 'icons/Architecture-Group-Icons_01302026/Region_32.svg', dashed: true },
    { type: 'vpc', label: 'VPC', borderColor: '#16a34a', textColor: '#15803d', icon: 'icons/Architecture-Group-Icons_01302026/Virtual-private-cloud-VPC_32.svg', dashed: false },
    { type: 'subnet-public', label: 'Public Subnet', borderColor: '#2563eb', textColor: '#2563eb', icon: 'icons/Architecture-Group-Icons_01302026/Public-subnet_32.svg', dashed: false },
    { type: 'subnet-private', label: 'Private Subnet', borderColor: '#64748b', textColor: '#64748b', icon: 'icons/Architecture-Group-Icons_01302026/Private-subnet_32.svg', dashed: false },
    { type: 'custom', label: 'Custom Group', borderColor: '#c084fc', textColor: '#7e22ce', icon: null, dashed: false },
];

// Collapsible section component
const CollapsibleSection = ({ title, icon, count, defaultOpen, children, accentColor, isDarkMode }) => {
    const [open, setOpen] = useState(defaultOpen || false);

    useEffect(() => {
        if (defaultOpen) {
            setOpen(true);
        }
    }, [defaultOpen]);

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
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                {icon && <img src={'/' + icon} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} draggable="false" />}
                <span style={{ flex: 1 }}>{title}</span>
                {count != null && (
                    <span style={{ fontSize: '10px', fontWeight: 600, color: isDarkMode ? '#f1f5f9' : '#9ca3af', backgroundColor: isDarkMode ? '#334155' : '#f3f4f6', padding: '1px 6px', borderRadius: '8px' }}>{count}</span>
                )}
            </button>
            {open && (
                <div style={{ padding: '4px 0 8px 0' }}>
                    {typeof children === 'function' ? children() : children}
                </div>
            )}
        </div>
    );
};

export const ToolSidebar = ({ allTools, isDarkMode, isMobile = false, isOpen = true, onClose }) => {
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

    const getDisplayIconPath = (iconPath) => {
        if (!isDarkMode) return iconPath;
        return iconPath
            .replace('/Res_48_Light/', '/Res_48_Dark/')
            .replace('_Light.svg', '_Dark.svg');
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

    const safeResourceGroups = useMemo(() => {
        const source = Array.isArray(awsResourceIconGroups)
            ? awsResourceIconGroups
            : Object.values(awsResourceIconGroups || {});

        return source
            .filter(group => group && typeof group.title === 'string')
            .map(group => ({
                ...group,
                items: Array.isArray(group.items) ? group.items.filter(item => item && typeof item.name === 'string') : []
            }));
    }, []);

    const filteredResourceGroups = useMemo(() => {
        return safeResourceGroups
            .map(group => {
                if (!isSearching) {
                    return group;
                }

                const titleMatch = group.title.toLowerCase().includes(searchLower);
                const items = titleMatch
                    ? group.items
                    : group.items.filter(item => item.name.toLowerCase().includes(searchLower));

                return { ...group, items };
            })
            .filter(group => group.items.length > 0);
    }, [safeResourceGroups, searchLower, isSearching]);

    const flattenedSearchResourceItems = useMemo(() => {
        if (!isSearching) return [];
        return filteredResourceGroups.flatMap(group => group.items);
    }, [filteredResourceGroups, isSearching]);

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

    const resourceItemsByCategory = useMemo(() => {
        const map = {};
        filteredResourceGroups.forEach(group => {
            const category = RESOURCE_GROUP_TO_SERVICE_CATEGORY[group.title] || group.title;
            if (!map[category]) map[category] = [];
            map[category].push(...group.items);
        });
        return map;
    }, [filteredResourceGroups]);

    const totalResourceItems = useMemo(
        () => Object.values(resourceItemsByCategory).reduce((sum, items) => sum + items.length, 0),
        [resourceItemsByCategory]
    );

    // Sort categories by predefined order
    const sortedCategories = useMemo(() => {
        const cats = Array.from(new Set([...Object.keys(categorized), ...Object.keys(resourceItemsByCategory)]));
        return cats.sort((a, b) => {
            const ai = CATEGORY_ORDER.indexOf(a);
            const bi = CATEGORY_ORDER.indexOf(b);
            return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        });
    }, [categorized, resourceItemsByCategory]);

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
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#eff6ff';
                e.currentTarget.style.borderColor = isDarkMode ? '#475569' : '#bfdbfe';
            }}
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
                color: isDarkMode ? '#f8fafc' : '#4b5563', 
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
            key={item.id + '-' + item.icon + '-gen'} 
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
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f0fdf4';
                e.currentTarget.style.borderColor = isDarkMode ? '#475569' : '#bbf7d0';
            }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
        >
            <img 
                src={"/" + getDisplayIconPath(item.icon)} 
                alt={item.name} 
                draggable="false" 
                style={{ width: 32, height: 32, objectFit: 'contain', pointerEvents: 'none', flexShrink: 0, filter: isDarkMode ? 'brightness(1.22) contrast(1.15)' : 'none' }} 
            />
            <span style={{ 
                fontSize: '9px', 
                fontWeight: 600, 
                color: isDarkMode ? '#f8fafc' : '#4b5563', 
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
            className={`tool-sidebar-root shrink-0 border-l flex flex-col h-full shadow-xl z-20 ${isDarkMode ? 'dark' : ''}`}
            style={{ 
                width: isMobile ? 'min(92vw, 340px)' : '320px',
                minWidth: isMobile ? 'min(92vw, 340px)' : '320px',
                maxWidth: isMobile ? 'min(92vw, 340px)' : '320px',
                borderLeft: '1px solid #e5e7eb',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                position: isMobile ? 'absolute' : 'relative',
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: isMobile ? 40 : 20,
                transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(100%)') : 'none',
                transition: isMobile ? 'transform 0.2s ease' : 'none'
            }}
        >
            {/* Header + Search */}
            <div style={{ padding: '12px', borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`, flexShrink: 0, backgroundColor: isDarkMode ? '#0f172a' : 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ fontWeight: 700, color: isDarkMode ? '#f8fafc' : '#1f2937', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 0 }}>
                        <img src="/icons/Architecture-Group-Icons_01302026/AWS-Cloud-logo_32.svg" alt="AWS" style={{ width: 22, height: 22 }} />
                        Architect Tools
                    </h3>
                    {isMobile && (
                        <button
                            onClick={() => onClose && onClose()}
                            aria-label="Close tools sidebar"
                            style={{
                                border: `1px solid ${isDarkMode ? '#475569' : '#d1d5db'}`,
                                borderRadius: '6px',
                                background: isDarkMode ? '#111827' : '#ffffff',
                                color: isDarkMode ? '#e2e8f0' : '#374151',
                                fontSize: '12px',
                                fontWeight: 600,
                                padding: '5px 8px',
                                cursor: 'pointer'
                            }}
                        >
                            Close
                        </button>
                    )}
                </div>
                <input 
                    type="text" 
                    placeholder="Search services, categories..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ 
                        width: '100%', 
                        padding: '7px 10px', 
                        fontSize: '12px', 
                        border: `1px solid ${isDarkMode ? '#475569' : '#d1d5db'}`, 
                        borderRadius: '6px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.15s',
                        backgroundColor: isDarkMode ? '#111827' : '#ffffff',
                        color: isDarkMode ? '#f8fafc' : '#1f2937'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#0073bb'; e.target.style.boxShadow = '0 0 0 2px rgba(0,115,187,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = isDarkMode ? '#475569' : '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                    spellCheck="false"
                />
            </div>
            
            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                
                {/* ═══════════ ANNOTATIONS & TEXT ═══════════ */}
                <CollapsibleSection title="Annotations & Text" defaultOpen={false} accentColor={isDarkMode ? '#e2e8f0' : '#6b7280'} isDarkMode={isDarkMode}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', padding: '0 4px' }}>
                            <div 
                                draggable 
                                onDragStart={(e) => { e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'textNode' })); e.dataTransfer.effectAllowed = 'move'; }} 
                                style={{ border: `1px solid ${isDarkMode ? '#475569' : '#d1d5db'}`, borderRadius: '6px', backgroundColor: isDarkMode ? '#111827' : 'white', padding: '10px 8px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.15s ease' }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#eff6ff'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDarkMode ? '#475569' : '#d1d5db'; e.currentTarget.style.backgroundColor = isDarkMode ? '#111827' : 'white'; }}
                            >
                                <Type size={20} strokeWidth={1.5} color={isDarkMode ? '#e2e8f0' : '#6b7280'} />
                                <span style={{ fontSize: '12px', fontWeight: 600, color: isDarkMode ? '#f8fafc' : '#374151' }}>Freeform Text</span>
                            </div>
                        </div>
                    </CollapsibleSection>

                {/* ═══════════ AWS GROUPS / BOUNDARIES ═══════════ */}
                <CollapsibleSection title="AWS / Groups" defaultOpen={true} count={GROUP_ITEMS.length + 1} accentColor={isDarkMode ? '#f8fafc' : '#232f3e'} isDarkMode={isDarkMode}>
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
                                        backgroundColor: isDarkMode ? '#111827' : 'white', 
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
                                    <span style={{ fontSize: '9px', fontWeight: 700, color: isDarkMode ? '#f8fafc' : g.textColor, lineHeight: '1.15' }}>{g.label}</span>
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
                                    backgroundColor: isDarkMode ? '#111827' : 'white', 
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
                                <span style={{ fontSize: '16px', fontWeight: 800, color: isDarkMode ? '#f8fafc' : '#1f2937' }}>①</span>
                                <span style={{ fontSize: '9px', fontWeight: 700, color: isDarkMode ? '#f8fafc' : '#1f2937', lineHeight: '1.15' }}>Step Bubble</span>
                            </div>
                        </div>
                    </CollapsibleSection>

                {/* ═══════════ GENERAL RESOURCES ═══════════ */}
                {filteredGeneral.length > 0 && (
                    <CollapsibleSection title="AWS / General Resources" defaultOpen={!isSearching} count={filteredGeneral.length} accentColor={isDarkMode ? '#86efac' : '#065f46'} isDarkMode={isDarkMode}>
                        <div style={iconGrid}>
                            {filteredGeneral.map(renderGenericTile)}
                        </div>
                    </CollapsibleSection>
                )}

                {/* Divider */}
                <div style={{ borderTop: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`, margin: '4px 0' }} />

                {/* ═══════════ ESSENTIALS (always shown with star) ═══════════ */}
                {essentials.length > 0 && (
                    <CollapsibleSection 
                        title="★ Essentials" 
                        defaultOpen={!isSearching} 
                        count={essentials.length} 
                        accentColor={isDarkMode ? '#fcd34d' : '#b45309'}
                        isDarkMode={isDarkMode}
                    >
                        <div style={iconGrid}>
                            {essentials.map(renderIconTile)}
                        </div>
                    </CollapsibleSection>
                )}

                {/* ═══════════ SEARCH RESULTS ═══════════ */}
                {isSearching && (
                    <CollapsibleSection
                        title="Search Results"
                        defaultOpen={true}
                        count={filtered.length + filteredGeneral.length + flattenedSearchResourceItems.length}
                        accentColor={isDarkMode ? '#f8fafc' : '#1f2937'}
                        isDarkMode={isDarkMode}
                    >
                        <div style={iconGrid}>
                            {filtered.slice(0, MAX_SEARCH_RESULTS_TOTAL).map(renderIconTile)}
                            {filteredGeneral.slice(0, MAX_SEARCH_RESULTS_TOTAL).map(renderGenericTile)}
                            {flattenedSearchResourceItems.slice(0, MAX_SEARCH_RESULTS_TOTAL).map(renderGenericTile)}
                        </div>
                        {(filtered.length + filteredGeneral.length + flattenedSearchResourceItems.length) > (MAX_SEARCH_RESULTS_TOTAL * 3) && (
                            <div style={{ padding: '6px 4px 0', fontSize: '11px', color: isDarkMode ? '#cbd5e1' : '#6b7280' }}>
                                Showing a limited set of results. Keep typing to narrow matches.
                            </div>
                        )}
                    </CollapsibleSection>
                )}

                {/* ═══════════ AWS SERVICE CATEGORIES ═══════════ */}
                {!isSearching && sortedCategories.map((cat) => {
                    const tools = categorized[cat] || [];
                    const resourceItems = resourceItemsByCategory[cat] || [];
                    if (tools.length === 0 && resourceItems.length === 0) return null;

                    const displayTools = tools.slice(0, Math.min(MAX_SEARCH_ITEMS_PER_CATEGORY, tools.length));
                    const resourceSlotsLeft = Math.max(0, MAX_SEARCH_ITEMS_PER_CATEGORY - displayTools.length);
                    const displayResourceItems = resourceItems.slice(0, resourceSlotsLeft);
                    const hiddenCount = (tools.length + resourceItems.length) - (displayTools.length + displayResourceItems.length);

                    return (
                        <CollapsibleSection 
                            key={cat}
                            title={cat} 
                            icon={CATEGORY_ICONS[cat]} 
                            count={tools.length + resourceItems.length}
                            defaultOpen={false}
                            accentColor={isDarkMode ? '#e2e8f0' : '#374151'}
                            isDarkMode={isDarkMode}
                        >
                            <div style={iconGrid}>
                                {displayTools.map(renderIconTile)}
                                {displayResourceItems.map(renderGenericTile)}
                            </div>
                            {hiddenCount > 0 && (
                                <div style={{ padding: '6px 4px 0', fontSize: '11px', color: isDarkMode ? '#cbd5e1' : '#6b7280' }}>
                                    Showing first {displayTools.length + displayResourceItems.length} items in this category.
                                </div>
                            )}
                        </CollapsibleSection>
                    );
                })}

                {/* Empty state */}
                {filtered.length === 0 && filteredGeneral.length === 0 && totalResourceItems === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px 8px', color: isDarkMode ? '#cbd5e1' : '#9ca3af', fontSize: '13px' }}>
                        No services found for "{search}"
                    </div>
                )}
            </div>
        </aside>
    );
};
