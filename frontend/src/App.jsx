import { useState } from 'react';
import ALL_TOOLS from './data/tools.json';
import { ServiceModal } from './components/ServiceModal';
import { BuilderLayout } from './components/Builder/BuilderLayout';
import { LayoutGrid, Network } from 'lucide-react';

function App() {
    const [currentView, setCurrentView] = useState("playbook"); // "playbook" or "builder"

    const [selectedTool, setSelectedTool] = useState(null);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeTab, setActiveTab] = useState("vibe");

    const categoriesMap = { "Essentials": ALL_TOOLS.filter(t => t.popular) };
    const otherTools = ALL_TOOLS.filter(t => !t.popular);
    otherTools.forEach(t => { 
        if (!categoriesMap[t.category]) categoriesMap[t.category] = []; 
        categoriesMap[t.category].push(t); 
    });
    const sortedCategories = ["Essentials", ...Object.keys(categoriesMap).filter(c => c !== "Essentials").sort()];

    const getFilteredCategories = () => {
        const query = search.toLowerCase();
        let filteredMap = [];
        sortedCategories.forEach(cat => {
            if (activeCategory !== "All" && activeCategory !== cat) return;
            let tools = categoriesMap[cat];
            if (query) {
                tools = tools.filter(t => 
                    t.name.toLowerCase().includes(query) || 
                    t.category.toLowerCase().includes(query) ||
                    t.vibe.toLowerCase().includes(query)
                );
            }
            if (tools.length > 0) {
                filteredMap.push({ name: cat, tools: tools });
            }
        });
        return filteredMap;
    };

    const renderedCategories = getFilteredCategories();

    const scrollToCategory = (catName) => {
        setActiveCategory(catName);
        const el = document.getElementById("cat-" + catName.replace(/\s+/g, ""));
        if(el) el.scrollIntoView({ behavior: "smooth" });
    };

    const openTool = (tool) => {
        setSelectedTool(tool);
        setActiveTab("vibe");
    };

    const handleConnectionClick = (connId) => {
        const found = ALL_TOOLS.find(t => t.id === connId);
        if (found) openTool(found);
    };

    return (
        <div className="min-h-screen flex flex-col w-full h-screen overflow-hidden">
            <header className="aws-header w-full border-b border-[#161e2d] flex-shrink-0 relative z-20">
                <img src="/images/AWSCC_APC_LOGO.jpg" style={{width:32,height:32,borderRadius:4,objectFit:"contain"}} className="mr-3" />
                <span className="font-bold text-lg tracking-tight hidden sm:block">AWS Management Architecture</span>
                
                {/* View Toggle */}
                <div className="mx-auto flex bg-[#161e2d] rounded-lg p-1 border border-[#303e52]">
                    <button 
                        onClick={() => setCurrentView("playbook")}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${currentView === "playbook" ? "bg-[#0073bb] text-white shadow-sm" : "text-gray-400 hover:text-white hover:bg-[#232f3e]"}`}
                    >
                        <LayoutGrid size={16} />
                        Service Playbook
                    </button>
                    <button 
                        onClick={() => setCurrentView("builder")}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${currentView === "builder" ? "bg-[#0073bb] text-white shadow-sm" : "text-gray-400 hover:text-white hover:bg-[#232f3e]"}`}
                    >
                        <Network size={16} />
                        Diagram Builder
                    </button>
                </div>

                <span className="ml-auto text-sm text-gray-400 hidden sm:block">{ALL_TOOLS.length} services</span>
            </header>

            <main className="flex-1 w-full relative flex h-full overflow-hidden bg-white">
                {currentView === "builder" ? (
                    <BuilderLayout allTools={ALL_TOOLS} />
                ) : (
                    <div className="flex w-full h-full">
                        <div className="sidebar py-4 hidden md:block">
                            <div className="px-4 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Categories</div>
                            <div onClick={() => setActiveCategory("All")} className={"sidebar-item " + (activeCategory === "All" ? "active" : "")}>
                                All Services
                            </div>
                            {sortedCategories.map(cat => (
                                <div key={cat} onClick={() => scrollToCategory(cat)} className={"sidebar-item " + (activeCategory === cat ? "active" : "")}>
                                    {cat}
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 overflow-y-auto bg-[#f8f9fa] h-full">
                            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-[#16191f]">Vibe-to-Cloud Playbook</h1>
                                    <p className="text-gray-500 text-sm">Click any service for setup guides, connections & pipeline architectures.</p>
                                </div>
                                <div className="w-full md:w-96 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                       <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Filter by name, category, or vibe..." 
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded focus:bg-white focus:outline-none focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb]"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="p-8 max-w-7xl mx-auto">
                                {renderedCategories.length === 0 && (
                                    <div className="text-center py-20">
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900">No tools found</h3>
                                        <p className="mt-1 text-gray-500">We could not find anything matching your filter.</p>
                                    </div>
                                )}

                                {renderedCategories.map(cat => (
                                    <div key={cat.name} id={"cat-" + cat.name.replace(/\s+/g, "")} className="mb-12">
                                        <div className="flex items-center mb-6">
                                            <h2 className="text-xl font-bold text-[#232f3e]">
                                                {cat.name}
                                            </h2>
                                            <div className="ml-4 flex-1 h-px bg-gray-200"></div>
                                            <span className="ml-4 text-sm font-semibold text-gray-400 bg-gray-100 py-1 px-2 rounded-full">{cat.tools.length}</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {cat.tools.map(tool => (
                                                <div key={tool.id} onClick={() => openTool(tool)} className="aws-card flex flex-col group">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <img src={'/' + tool.icon} className="w-8 h-8 object-contain" onError={(e)=>e.target.style.display="none"} />
                                                        <span className="font-bold text-[#232f3e] group-hover:text-[#0073bb] transition-colors">{tool.name}</span>
                                                    </div>
                                                    {tool.popular ? (
                                                        <p className="text-xs text-gray-600 mt-auto line-clamp-2">{tool.vibe}</p>
                                                    ) : (
                                                        <p className="text-xs text-gray-400 mt-auto line-clamp-2">{tool.explanation}</p>
                                                    )}
                                                    {tool.setup && <div className="mt-2"><span style={{fontSize:"0.6rem",color:"#0073bb",fontWeight:700,background:"#f2f8fd",padding:"2px 6px",borderRadius:4,border:"1px solid #d5e8f6"}}>PLAYBOOK</span></div>}
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
                    />
                )}
            </main>
        </div>
    );
}

export default App;
