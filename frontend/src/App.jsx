import { useEffect, useState } from 'react';
import ALL_TOOLS from './data/tools.json';
import { ServiceModal } from './components/ServiceModal';
import { BuilderLayout } from './components/Builder/BuilderLayout';
import { DeepDiveGuide } from './components/DeepDiveGuide';
import { DEEP_DIVE_GUIDES } from './data/deepDiveData';
import { LayoutGrid, Moon, Network, Sun } from 'lucide-react';

function App() {
    const [currentView, setCurrentView] = useState('playbook'); 
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const savedTheme = localStorage.getItem('aws_theme_mode');
            return savedTheme ? savedTheme === 'dark' : false;
        } catch {
            return false;
        }
    });

    const [selectedTool, setSelectedTool] = useState(null);
    const [deepDiveTool, setDeepDiveTool] = useState(null);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeTab, setActiveTab] = useState('vibe');

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('theme-dark');
        } else {
            root.classList.remove('theme-dark');
        }

        try {
            localStorage.setItem('aws_theme_mode', isDarkMode ? 'dark' : 'light');
        } catch {
            // Ignore storage write errors in restricted environments.
        }
    }, [isDarkMode]);

    const categoriesMap = { Essentials: ALL_TOOLS.filter(t => t.popular) };
    const otherTools = ALL_TOOLS.filter(t => !t.popular);
    otherTools.forEach(t => {
        if (!categoriesMap[t.category]) categoriesMap[t.category] = [];
        categoriesMap[t.category].push(t);
    });
    const sortedCategories = ['Essentials', ...Object.keys(categoriesMap).filter(c => c !== 'Essentials').sort()];

    const getFilteredCategories = () => {
        const query = search.toLowerCase();
        const filteredMap = [];
        sortedCategories.forEach(cat => {
            if (activeCategory !== 'All' && activeCategory !== cat) return;
            let tools = categoriesMap[cat];
            if (query) {
                tools = tools.filter(t =>
                    t.name.toLowerCase().includes(query) ||
                    t.category.toLowerCase().includes(query) ||
                    t.vibe.toLowerCase().includes(query)
                );
            }
            if (tools.length > 0) {
                filteredMap.push({ name: cat, tools });
            }
        });
        return filteredMap;
    };

    const renderedCategories = getFilteredCategories();

    const scrollToCategory = (catName) => {
        setActiveCategory(catName);
        const el = document.getElementById('cat-' + catName.replace(/\s+/g, ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const openTool = (tool) => {
        setSelectedTool(tool);
        setActiveTab('vibe');
    };

    const handleConnectionClick = (connId) => {
        const found = ALL_TOOLS.find(t => t.id === connId);
        if (found) openTool(found);
    };

    const openDeepDive = (tool) => {
        setSelectedTool(null);    // Close the modal
        setDeepDiveTool(tool);    // Open deep dive page
    };

    const closeDeepDive = () => {
        setDeepDiveTool(null);
    };

    const deepDiveData = deepDiveTool ? DEEP_DIVE_GUIDES[deepDiveTool.id] : null;

    return (
        <div className={`min-h-screen flex flex-col w-full h-screen overflow-hidden ${isDarkMode ? 'app-theme-dark' : ''}`}>
            <header className="aws-header w-full border-b border-[#161e2d] flex-shrink-0 relative z-20 gap-2 sm:gap-3">
                <img src="/images/AWSCC_APC_LOGO.jpg" style={{ width: 32, height: 32, borderRadius: 4, objectFit: 'contain' }} className="mr-2 sm:mr-3 shrink-0" />
                <span className="sm:hidden flex-1 text-center font-bold tracking-tight text-base leading-tight text-white/95 px-2">AWS Architecture</span>
                <span className="hidden sm:block font-bold text-lg tracking-tight">AWS Management Architecture</span>

                <div className="flex w-full sm:w-auto sm:mx-auto bg-[#161e2d] rounded-lg p-1 border border-[#303e52] order-3 sm:order-none">
                    <button
                        onClick={() => { setCurrentView('playbook'); closeDeepDive(); }}
                        className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${currentView === 'playbook' && !deepDiveTool ? 'bg-[#0073bb] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-[#232f3e]'}`}
                    >
                        <LayoutGrid size={16} />
                        <span className="hidden sm:inline">Service Playbook</span>
                        <span className="sm:hidden">Playbook</span>
                    </button>
                    <button
                        onClick={() => { setCurrentView('builder'); closeDeepDive(); }}
                        className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${currentView === 'builder' ? 'bg-[#0073bb] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-[#232f3e]'}`}
                    >
                        <Network size={16} />
                        <span className="hidden sm:inline">Diagram Builder</span>
                        <span className="sm:hidden">Builder</span>
                    </button>
                </div>

                <button
                    onClick={() => setIsDarkMode(prev => !prev)}
                    className="ml-2 sm:ml-4 p-2 rounded-md border border-[#4b5563] text-gray-200 hover:text-white hover:bg-[#1b2735] transition-colors shrink-0"
                    title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                <span className="ml-3 text-sm text-gray-400 hidden sm:block">{ALL_TOOLS.length} services</span>
            </header>

            <main className={`flex-1 w-full relative flex h-full overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
                {currentView === 'builder' ? (
                    <BuilderLayout allTools={ALL_TOOLS} isDarkMode={isDarkMode} />
                ) : deepDiveTool && deepDiveData ? (
                    /* ═══════════════════════════════════════════════ */
                    /* DEEP DIVE FULL-PAGE VIEW                       */
                    /* ═══════════════════════════════════════════════ */
                    <div className="flex w-full h-full">
                        {/* Sidebar — same as main playbook */}
                        <div className="sidebar py-4 hidden md:block">
                            <div className={`px-4 mb-4 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Categories</div>
                            <div onClick={() => { closeDeepDive(); setActiveCategory('All'); }} className={'sidebar-item ' + (activeCategory === 'All' ? 'active' : '')}>
                                All Services
                            </div>
                            {sortedCategories.map(cat => (
                                <div key={cat} onClick={() => { closeDeepDive(); scrollToCategory(cat); }} className={'sidebar-item ' + (activeCategory === cat ? 'active' : '')}>
                                    {cat}
                                </div>
                            ))}
                        </div>

                        {/* Center content — Deep Dive Guide */}
                        <div className={`flex-1 overflow-y-auto h-full ${isDarkMode ? 'bg-slate-900' : 'bg-[#f8f9fa]'}`}>
                            {/* Breadcrumb header */}
                            <div className={`sticky top-0 border-b z-10 shadow-sm px-4 md:px-6 py-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                    <button
                                        onClick={closeDeepDive}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            padding: '6px 12px',
                                            background: isDarkMode ? '#1e293b' : '#ffffff',
                                            border: `1px solid ${isDarkMode ? '#475569' : '#aab7b8'}`,
                                            borderRadius: 4,
                                            cursor: 'pointer',
                                            color: isDarkMode ? '#e0f2fe' : '#16191f',
                                            fontSize: '0.82rem',
                                            fontWeight: 600,
                                            fontFamily: 'inherit',
                                            transition: 'all 0.15s ease',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = isDarkMode ? '#38bdf8' : '#0073bb'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = isDarkMode ? '#475569' : '#aab7b8'}
                                    >
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Back to Playbook
                                    </button>
                                    <div style={{
                                        width: 1,
                                        height: 24,
                                        background: isDarkMode ? '#334155' : '#d1d5db',
                                        display: 'none',
                                    }} className="sm:block" />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <img src={"/" + deepDiveTool.icon} style={{width:28,height:28,objectFit:"contain"}} onError={(e)=>e.target.style.display="none"} />
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '1rem', color: isDarkMode ? '#f1f5f9' : '#16191f', lineHeight: 1.2 }}>
                                                {deepDiveTool.name}
                                            </div>
                                            <div style={{ fontSize: '0.72rem', color: isDarkMode ? '#94a3b8' : '#545b64' }}>
                                                Deep Dive Setup Guide
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Deep Dive content */}
                            <div style={{ padding: '16px', maxWidth: 900, margin: '0 auto' }} className="md:p-6">
                                {/* Service info banner */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 16,
                                    flexWrap: 'wrap',
                                    padding: '20px 24px',
                                    background: isDarkMode ? '#0f172a' : '#ffffff',
                                    border: `1px solid ${isDarkMode ? '#334155' : '#eaeded'}`,
                                    borderRadius: 8,
                                    marginBottom: 24,
                                }}>
                                    <div style={{
                                        width:56, height:56, borderRadius:8,
                                        background: isDarkMode ? '#1e293b' : '#f8f9fa',
                                        border: `1px solid ${isDarkMode ? '#334155' : '#eaeded'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        padding: 8, flexShrink: 0,
                                    }}>
                                        <img src={"/" + deepDiveTool.icon} style={{width:"100%",height:"100%",objectFit:"contain"}} onError={(e)=>e.target.style.display="none"} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h1 style={{
                                            margin: 0, fontSize: '1.4rem', fontWeight: 700,
                                            color: isDarkMode ? '#f1f5f9' : '#16191f',
                                        }}>
                                            {deepDiveTool.name}
                                        </h1>
                                        <p style={{
                                            margin: '4px 0 0', fontSize: '0.85rem', lineHeight: 1.5,
                                            color: isDarkMode ? '#94a3b8' : '#545b64',
                                        }}>
                                            {deepDiveTool.explanation}
                                        </p>
                                    </div>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: 4,
                                        fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                                        background: isDarkMode ? '#082f49' : '#f2f8fd',
                                        color: isDarkMode ? '#7dd3fc' : '#0073bb',
                                        border: `1px solid ${isDarkMode ? '#0c4a6e' : '#d5e8f6'}`,
                                        flexShrink: 0,
                                    }}>
                                        {deepDiveTool.category}
                                    </span>
                                </div>

                                {/* The DeepDiveGuide component */}
                                <DeepDiveGuide data={deepDiveData} isDarkMode={isDarkMode} />
                            </div>
                        </div>
                    </div>
                ) : (
                    /* ═══════════════════════════════════════════════ */
                    /* NORMAL PLAYBOOK VIEW                           */
                    /* ═══════════════════════════════════════════════ */
                    <div className="flex w-full h-full">
                        <div className="sidebar py-4 hidden md:block">
                            <div className={`px-4 mb-4 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Categories</div>
                            <div onClick={() => setActiveCategory('All')} className={'sidebar-item ' + (activeCategory === 'All' ? 'active' : '')}>
                                All Services
                            </div>
                            {sortedCategories.map(cat => (
                                <div key={cat} onClick={() => scrollToCategory(cat)} className={'sidebar-item ' + (activeCategory === cat ? 'active' : '')}>
                                    {cat}
                                </div>
                            ))}
                        </div>

                        <div className={`flex-1 overflow-y-auto h-full ${isDarkMode ? 'bg-slate-900' : 'bg-[#f8f9fa]'}`}>
                            <div className={`sticky top-0 border-b p-4 md:p-6 z-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
                                <div>
                                    <h1 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-[#16191f]'}`}>Vibe-to-Cloud Playbook</h1>
                                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Click any service for setup guides, connections & pipeline architectures.</p>
                                </div>
                                <div className="w-full md:w-96 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className={`h-5 w-5 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Filter by name, category, or vibe..."
                                        className={`w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#0073bb] ${isDarkMode ? 'bg-slate-800 border-slate-600 text-slate-100 focus:bg-slate-800 focus:border-[#38bdf8]' : 'bg-gray-50 border-gray-300 focus:bg-white focus:border-[#0073bb]'}`}
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
                                {renderedCategories.length === 0 && (
                                    <div className="text-center py-20">
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <h3 className={`text-lg font-medium ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>No tools found</h3>
                                        <p className={`mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>We could not find anything matching your filter.</p>
                                    </div>
                                )}

                                {renderedCategories.map(cat => (
                                    <div key={cat.name} id={'cat-' + cat.name.replace(/\s+/g, '')} className="mb-12">
                                        <div className="flex items-center mb-6">
                                            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-[#232f3e]'}`}>
                                                {cat.name}
                                            </h2>
                                            <div className={`ml-4 flex-1 h-px ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>
                                            <span className={`ml-4 text-sm font-semibold py-1 px-2 rounded-full ${isDarkMode ? 'text-slate-300 bg-slate-800' : 'text-gray-400 bg-gray-100'}`}>{cat.tools.length}</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {cat.tools.map(tool => (
                                                <div key={tool.id} onClick={() => openTool(tool)} className="aws-card flex flex-col group">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <img src={'/' + tool.icon} className="w-8 h-8 object-contain" onError={(e) => e.target.style.display = 'none'} />
                                                        <span className={`font-bold transition-colors ${isDarkMode ? 'text-slate-100 group-hover:text-[#38bdf8]' : 'text-[#232f3e] group-hover:text-[#0073bb]'}`}>{tool.name}</span>
                                                    </div>
                                                    {tool.popular ? (
                                                        <p className={`text-xs mt-auto line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>{tool.vibe}</p>
                                                    ) : (
                                                        <p className={`text-xs mt-auto line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>{tool.explanation}</p>
                                                    )}
                                                    {tool.setup && (
                                                        <div className="mt-2">
                                                            <span style={{ fontSize: '0.6rem', color: isDarkMode ? '#7dd3fc' : '#0073bb', fontWeight: 700, background: isDarkMode ? '#082f49' : '#f2f8fd', padding: '2px 6px', borderRadius: 4, border: `1px solid ${isDarkMode ? '#0c4a6e' : '#d5e8f6'}` }}>PLAYBOOK</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {selectedTool && (
                    <ServiceModal
                        selectedTool={selectedTool}
                        setSelectedTool={setSelectedTool}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        handleConnectionClick={handleConnectionClick}
                        onOpenDeepDive={openDeepDive}
                        isDarkMode={isDarkMode}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
