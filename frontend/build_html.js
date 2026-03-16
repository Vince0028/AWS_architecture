const fs = require('fs');
const path = require('path');

const iconDir = "../Icon-package_01302026.31b40d126ed27079b708594940ad577a86150582/Architecture-Service-Icons_01302026";
const absIconDir = path.join(__dirname, iconDir);

let allTools = [];

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (item.endsWith('_64.svg')) {
            let parentDirName = path.basename(path.dirname(path.dirname(fullPath)));
            let category = parentDirName.replace('Arch_', '').replace(/-/g, ' ');
            let name = item.replace('Arch_', '').replace('_64.svg', '').replace(/-/g, ' ');
            let id = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            let relPath = fullPath.substring(absIconDir.length + 1).replace(/\\/g, '/');
            allTools.push({
                id, name, category, icon: "../Icon-package_01302026.31b40d126ed27079b708594940ad577a86150582/Architecture-Service-Icons_01302026/" + relPath
            });
        }
    }
}
walk(absIconDir);

const vibeDB = {
    "amazonec2": { popular: true, vibe: "Like Railway or Render: but you own the entire computer.", explanation: "A raw virtual server in the cloud where you can install anything such as Linux: Windows: or Docker.", analogy: "A Rental Car. You drive it: gas it: and park it: but you can go anywhere.", fact: "PERFECT FOR HIGH-POWER PYTHON SCRIPTS AND ALWAYS-ON BOTS.", components: ["General Purpose Instances", "Compute Optimized", "Memory Optimized"] },
    "amazons3": { popular: true, vibe: "Like Vercel Blob or Uploadthing.", explanation: "Infinite cloud storage buckets where you can dump images, videos, and backups programmatically.", analogy: "A massive infinite storage room with numbered boxes.", fact: "THE BACKBONE OF THE INTERNET. ALMOST EVERY APP USES IT FOR IMAGES AND ASSETS.", components: ["Standard Storage", "Intelligent Tiering", "Glacier Deep Archive"] },
    "awslambda": { popular: true, vibe: "Like Vercel Serverless Functions or Cloudflare Workers.", explanation: "Run your code in response to events (like an HTTP request) without thinking about servers.", analogy: "A vending machine for your code; you only pay when someone pushes the button.", fact: "SCALES FROM ZERO TO TENS OF THOUSANDS OF REQUESTS INSTANTLY WITH NO CONFIGURATION.", components: ["Triggers & Events", "Execution Environment", "Destinations"] },
    "amazonrds": { popular: true, vibe: "Like Supabase Postgres or Neon, but you pay Bezos.", explanation: "A fully managed relational database (Postgres, MySQL) that AWS backs up, patches, and replicates for you.", analogy: "A filing cabinet that automatically sorts, backs up, and fixes its own drawers.", fact: "THE STANDARD CHOICE FOR TRADITIONAL APP BACKENDS.", components: ["Amazon Aurora", "Multi-AZ Deployments", "Read Replicas"] },
    "awsiam": { popular: true, vibe: "Like Clerk or Auth0, but strictly for AWS internal security.", explanation: "The security system that controls exactly who (and what) can access your AWS resources using policies.", analogy: "The bouncer at the club who thoroughly checks IDs and VIP passes before letting you enter a room.", fact: "NEVER USE YOUR ROOT ACCOUNT FOR DAILY TASKS. ALWAYS CREATE IAM USERS.", components: ["IAM Users", "IAM Groups", "IAM Roles & Policies"] },
    "amazondynamodb": { popular: true, vibe: "Like Firebase Firestore or MongoDB Atlas.", explanation: "A hyper-fast NoSQL database that can handle millions of requests per second.", analogy: "A high-speed rolodex that instantly finds the card you want, no matter how many millions of cards there are.", fact: "USED HEAVILY BY RETAIL SITES AND GAMING LEADERBOARDS GLOBALLY.", components: ["Tables & Items", "Partition & Sort Keys", "Global Secondary Indexes"] },
    "amazoncloudfront": { popular: true, vibe: "Like Cloudflare CDN.", explanation: "A global network that caches your website's assets near users so it loads blazingly fast no matter where they live.", analogy: "A massive fleet of delivery drivers stationed around the globe.", fact: "REDUCES LATENCY GREATLY FOR INTERNATIONAL USERS BY CACHING DATA LOCALLY.", components: ["Edge Locations", "Distributions", "Origins"] },
    "amazonroute53": { popular: true, vibe: "Like Vercel Domains or Namecheap.", explanation: "A highly available Domain Name System (DNS) web service to route users to Internet applications.", analogy: "The internet's switchboard operator directing traffic intelligently.", fact: "IT HAS A 100% SLA GUARANTEE, WHICH IS INCREDIBLY RARE IN CLOUD COMPUTING.", components: ["Hosted Zones", "Traffic Policies", "Health Checks"] },
    "amazonvpc": { popular: true, vibe: "Like an invisible Tailscale or ZeroTier.", explanation: "A logically isolated section of the AWS Cloud where you can launch resources in a virtual network you define.", analogy: "Your own private fenced-in yard inside the massive AWS neighborhood.", fact: "KEEPS YOUR PRIVATE DATABASES HIDDEN AWAY FROM THE DANGEROUS PUBLIC INTERNET.", components: ["Subnets", "Route Tables", "Internet Gateways"] },
    "amazonsqs": { popular: true, vibe: "Like Upstash Kafka or RabbitMQ.", explanation: "A message queuing service that decouples microservices and distributed systems.", analogy: "A highly robust holding pen for tasks waiting to be processed by background workers.", fact: "PREVENTS YOUR APP FROM CRASHING WHEN THERE'S A SUDDEN HUGE SPIKE IN TRAFFIC.", components: ["Standard Queues", "FIFO Queues", "Dead Letter Queues"] }
};

let processedTools = allTools.map(tool => {
    let custom = vibeDB[tool.id];
    if (custom) return { ...tool, ...custom };
    return {
        ...tool,
        popular: false,
        vibe: "Like a standard enterprise utility tool.",
        explanation: "A specialized AWS service providing " + tool.name + " functionality for " + tool.category + ".",
        analogy: "A piece of the AWS machine dedicated to " + tool.category + ".",
        fact: "PART OF THE 200+ SERVICES AWS PROVIDES.",
        components: ["Core Feature", "Integration", "Security"]
    };
});
processedTools.sort((a, b) => a.name.localeCompare(b.name));

const finalJsonStr = JSON.stringify(processedTools).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const htmlCode = '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
'    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'    <title>AWS Console - Compiled Explanations</title>\n    <script src="https://cdn.tailwindcss.com"></script>\n' +
'    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>\n' +
'    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>\n' +
'    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>\n' +
'    <style>\n' +
'        html { scroll-behavior: smooth; }\n' +
'        body { font-family: "Amazon Ember", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f2f3f3; color: #16191f; overflow: hidden; }\n' +
'        .aws-header { background-color: #232f3e; color: white; display: flex; align-items: center; padding: 0 1rem; height: 3.5rem; }\n' +
'        .aws-card { background: white; border: 1px solid #eaeded; box-shadow: 0 1px 1px 0 rgba(0,28,36,.03), 0 1px 1px -1px rgba(0,28,36,.05); border-radius: 4px; padding: 1rem; cursor: pointer; transition: all 0.1s; }\n' +
'        .aws-card:hover { border-color: #0073bb; box-shadow: 0 2px 5px rgba(0,115,187,.2); }\n' +
'        .sidebar { background-color: #ffffff; border-right: 1px solid #eaeded; width: 250px; flex-shrink: 0; overflow-y: auto; height: calc(100vh - 3.5rem); }\n' +
'        .sidebar-item { padding: 0.5rem 1rem; cursor: pointer; color: #545b64; font-size: 0.9rem; border-left: 3px solid transparent; }\n' +
'        .sidebar-item.active { background-color: #f2f8fd; color: #0073bb; font-weight: 700; border-left: 3px solid #0073bb; }\n' +
'        .sidebar-item:hover:not(.active) { background-color: #fafafa; color: #16191f; }\n' +
'        .vibe-title { color: #d13212; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }\n' +
'        .simple-desc-title { color: #00529b; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }\n' +
'        .analogy-box { background-color: #f1faff; border-left: 4px solid #00a1c9; padding: 1.25rem; margin: 1.5rem 0; }\n' +
'        .analogy-title { color: #0073bb; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }\n' +
'        .fact-text { color: #8a94a6; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }\n' +
'    </style>\n</head>\n<body>\n    <div id="root"></div>\n' +
'    <script type="text/babel">\n' +
'        const ALL_TOOLS = JSON.parse(\'' + finalJsonStr + '\');\n' +
'        const App = () => {\n' +
'            const [selectedTool, setSelectedTool] = React.useState(null);\n' +
'            const [search, setSearch] = React.useState("");\n' +
'            const [activeCategory, setActiveCategory] = React.useState("All");\n' +
'\n' +
'            // Group tools by categories\n' +
'            const categoriesMap = { "?? Essentials": ALL_TOOLS.filter(t => t.popular) };\n' +
'            const otherTools = ALL_TOOLS.filter(t => !t.popular);\n' +
'            otherTools.forEach(t => { if (!categoriesMap[t.category]) categoriesMap[t.category] = []; categoriesMap[t.category].push(t); });\n' +
'            const sortedCategories = ["?? Essentials", ...Object.keys(categoriesMap).filter(c => c !== "?? Essentials").sort()];\n' +
'\n' +
'            // Filter functionality (Filter bar above dashboard)\n' +
'            const getFilteredCategories = () => {\n' +
'                const query = search.toLowerCase();\n' +
'                let filteredMap = [];\n' +
'                sortedCategories.forEach(cat => {\n' +
'                    if (activeCategory !== "All" && activeCategory !== cat) return;\n' +
'                    let tools = categoriesMap[cat];\n' +
'                    if (query) {\n' +
'                        tools = tools.filter(t => \n' +
'                            t.name.toLowerCase().includes(query) || \n' +
'                            t.category.toLowerCase().includes(query) ||\n' +
'                            t.vibe.toLowerCase().includes(query)\n' +
'                        );\n' +
'                    }\n' +
'                    if (tools.length > 0) {\n' +
'                        filteredMap.push({ name: cat, tools: tools });\n' +
'                    }\n' +
'                });\n' +
'                return filteredMap;\n' +
'            };\n' +
'\n' +
'            const renderedCategories = getFilteredCategories();\n' +
'\n' +
'            const scrollToCategory = (catName) => {\n' +
'                setActiveCategory(catName);\n' +
'                const el = document.getElementById("cat-" + catName.replace(/\\s+/g, ""));\n' +
'                if(el) {\n' +
'                    el.scrollIntoView({ behavior: "smooth" });\n' +
'                }\n' +
'            };\n' +
'\n' +
'            const renderDashboard = () => (\n' +
'                <div className="flex h-[calc(100vh-3.5rem)] w-full">\n' +
'                    {/* Desktop Sidebar Quick Links */}\n' +
'                    <div className="sidebar py-4 hidden md:block">\n' +
'                        <div className="px-4 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Categories</div>\n' +
'                        <div onClick={() => setActiveCategory("All")} className={"sidebar-item " + (activeCategory === "All" ? "active" : "")}>\n' +
'                            All Services\n' +
'                        </div>\n' +
'                        {sortedCategories.map(cat => (\n' +
'                            <div key={cat} onClick={() => scrollToCategory(cat)} className={"sidebar-item " + (activeCategory === cat ? "active" : "")}>\n' +
'                                {cat}\n' +
'                            </div>\n' +
'                        ))}\n' +
'                    </div>\n' +
'\n' +
'                    <div className="flex-1 overflow-y-auto bg-[#f8f9fa]">\n' +
'                        {/* Sticky Filter Bar on top of the dashboard section */}\n' +
'                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">\n' +
'                            <div>\n' +
'                                <h1 className="text-2xl font-bold text-[#16191f]">AWS Services Collection</h1>\n' +
'                                <p className="text-gray-500 text-sm">Compiled through titles with direct explanations.</p>\n' +
'                            </div>\n' +
'                            <div className="w-full md:w-96 relative">\n' +
'                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">\n' +
'                                   <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>\n' +
'                                </div>\n' +
'                                <input \n' +
'                                    type="text" \n' +
'                                    placeholder="Filter by name, category, or vibe..." \n' +
'                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded focus:bg-white focus:outline-none focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb]"\n' +
'                                    value={search}\n' +
'                                    onChange={e => setSearch(e.target.value)}\n' +
'                                />\n' +
'                            </div>\n' +
'                        </div>\n' +
'\n' +
'                        {/* Main Grid By Categories */}\n' +
'                        <div className="p-8 max-w-7xl mx-auto">\n' +
'                            {renderedCategories.length === 0 && (\n' +
'                                <div className="text-center py-20">\n' +
'                                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
'                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />\n' +
'                                    </svg>\n' +
'                                    <h3 className="text-lg font-medium text-gray-900">No tools found</h3>\n' +
'                                    <p className="mt-1 text-gray-500">We could not find anything matching your filter.</p>\n' +
'                                </div>\n' +
'                            )}\n' +
'\n' +
'                            {renderedCategories.map(cat => (\n' +
'                                <div key={cat.name} id={"cat-" + cat.name.replace(/\\s+/g, "")} className="mb-12">\n' +
'                                    <div className="flex items-center mb-6">\n' +
'                                        <h2 className={"text-xl font-bold " + (cat.name === "?? Essentials" ? "text-[#d13212]" : "text-[#232f3e]")}>\n' +
'                                            {cat.name}\n' +
'                                        </h2>\n' +
'                                        <div className="ml-4 flex-1 h-px bg-gray-200"></div>\n' +
'                                        <span className="ml-4 text-sm font-semibold text-gray-400 bg-gray-100 py-1 px-2 rounded-full">{cat.tools.length}</span>\n' +
'                                    </div>\n' +
'                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">\n' +
'                                        {cat.tools.map(tool => (\n' +
'                                            <div key={tool.id} onClick={() => setSelectedTool(tool)} className="aws-card flex flex-col group">\n' +
'                                                <div className="flex items-center space-x-3 mb-3">\n' +
'                                                    <img src={tool.icon} className="w-8 h-8 object-contain" onError={(e)=>e.target.style.display="none"} />\n' +
'                                                    <span className="font-bold text-[#232f3e] group-hover:text-[#0073bb] transition-colors">{tool.name}</span>\n' +
'                                                </div>\n' +
'                                                {tool.popular ? (\n' +
'                                                    <p className="text-xs text-gray-600 mt-auto line-clamp-2">{tool.vibe}</p>\n' +
'                                                ) : (\n' +
'                                                    <p className="text-xs text-gray-400 mt-auto line-clamp-2">{tool.explanation}</p>\n' +
'                                                )}\n' +
'                                            </div>\n' +
'                                        ))}\n' +
'                                    </div>\n' +
'                                </div>\n' +
'                            ))}\n' +
'                        </div>\n' +
'                    </div>\n' +
'                </div>\n' +
'            );\n' +
'\n' +
'            const renderDetails = () => (\n' +
'                <div className="bg-white min-h-[calc(100vh-3.5rem)] p-8 overflow-y-auto w-full">\n' +
'                    <button onClick={() => setSelectedTool(null)} className="text-[#0073bb] hover:underline flex items-center mb-8 font-medium bg-transparent border-none cursor-pointer">\n' +
'                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>\n' +
'                        Back to Dashboard\n' +
'                    </button>\n' +
'\n' +
'                    <div className="max-w-2xl bg-white">\n' +
'                        <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-gray-100">\n' +
'                            <div className="w-16 h-16 rounded border border-gray-200 flex items-center justify-center p-2 bg-gray-50">\n' +
'                                <img src={selectedTool.icon} className="w-full h-full object-contain" onError={(e)=>e.target.style.display="none"} />\n' +
'                            </div>\n' +
'                            <h2 className="text-3xl font-bold text-[#16191f] tracking-tight">{selectedTool.name}</h2>\n' +
'                        </div>\n' +
'\n' +
'                        <div className="mb-8">\n' +
'                            <span className="vibe-title">THE VIBE</span>\n' +
'                            <p className="text-[1.1rem] text-[#334155] font-normal leading-relaxed">{selectedTool.vibe}</p>\n' +
'                        </div>\n' +
'\n' +
'                        <div className="mb-8">\n' +
'                            <span className="simple-desc-title">SIMPLE EXPLANATION</span>\n' +
'                            <p className="text-[1.1rem] text-[#334155] font-normal leading-relaxed">{selectedTool.explanation}</p>\n' +
'                        </div>\n' +
'\n' +
'                        <div className="analogy-box">\n' +
'                            <span className="analogy-title">THE ANALOGY</span>\n' +
'                            <p className="text-[1.2rem] text-[#00529b] font-serif leading-relaxed italic">"{selectedTool.analogy}"</p>\n' +
'                        </div>\n' +
'\n' +
'                        <div className="mt-8 pt-6 border-t border-gray-100">\n' +
'                            <p className="fact-text">FACT: {selectedTool.fact}</p>\n' +
'                        </div>\n' +
'                    </div>\n' +
'                </div>\n' +
'            );\n' +
'\n' +
'            return (\n' +
'                <div className="min-h-screen flex flex-col w-full">\n' +
'                    <header className="aws-header w-full border-b border-[#161e2d]">\n' +
'                        <svg width="30" height="18" viewBox="0 0 36 22" fill="none" className="mr-4">\n' +
'                            <path d="M18 0L36 22H0L18 0Z" fill="white"/>\n' +
'                        </svg>\n' +
'                        <span className="font-bold text-lg tracking-tight">AWS Management Architecture</span>\n' +
'                    </header>\n' +
'                    <main className="flex-1 w-full relative">\n' +
'                        {selectedTool ? renderDetails() : renderDashboard()}\n' +
'                    </main>\n' +
'                </div>\n' +
'            );\n' +
'        };\n' +
'        const root = ReactDOM.createRoot(document.getElementById("root"));\n' +
'        root.render(<App />);\n' +
'    </script>\n</body>\n</html>';

fs.writeFileSync('./index.html', htmlCode);
console.log('Successfully added comprehensive dashboard with titles, filter bar, and image 1 style cards.');
