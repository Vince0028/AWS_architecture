const fs = require('fs');
const path = require('path');

const iconDir = "../icons/Architecture-Service-Icons_01302026";
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
                id, name, category, icon: "icons/Architecture-Service-Icons_01302026/" + relPath
            });
        }
    }
}
walk(absIconDir);

// --- Load both data sources ---
const allToolsDB = require('../data/generated_db.js');
const playbookDB = require('../data/playbook_db.js');

const popularIds = [
    'amazonelasticcomputecloud', 'amazonsimplestorageservice', 'awslambda',
    'amazonrds', 'awsidentityandaccessmanagement', 'amazondynamodb',
    'amazoncloudfront', 'amazonroute53', 'amazonvirtualprivatecloud', 'amazonsimplequeueservice'
];

let processedTools = allTools.map(tool => {
    let custom = allToolsDB[tool.id];
    let playbook = playbookDB[tool.id];
    let isPopular = popularIds.includes(tool.id);

    let base = custom ? { ...tool, ...custom, popular: isPopular } : {
        ...tool, popular: isPopular,
        vibe: "Like a standard enterprise utility tool.",
        explanation: "A specialized AWS service providing " + tool.name + " functionality for " + tool.category + ".",
        analogy: "A piece of the AWS machine dedicated to " + tool.category + ".",
        fact: "PART OF THE 200+ SERVICES AWS PROVIDES.",
        components: ["Core Feature", "Integration", "Security"]
    };

    if (playbook) {
        base.setup = playbook.setup;
        base.connections = playbook.connections;
        base.pipelines = playbook.pipelines;
    }

    return base;
});
processedTools.sort((a, b) => a.name.localeCompare(b.name));

// --- Build icon lookup map for pipeline steps ---
// Maps short names like "S3", "Lambda", "DynamoDB" to their icon paths
const iconLookup = {};
allTools.forEach(t => {
    // Full name: "Amazon Simple Storage Service"
    iconLookup[t.name.toLowerCase()] = t.icon;
    // Short forms from name parts
    let short = t.name.replace(/^(Amazon|AWS)\s+/i, '').trim();
    iconLookup[short.toLowerCase()] = t.icon;
});
// Manual short-name overrides for common pipeline names
const shortNameMap = {
    "s3": "amazonsimplestorageservice",
    "ec2": "amazonelasticcomputecloud",
    "lambda": "awslambda",
    "iam": "awsidentityandaccessmanagement",
    "dynamodb": "amazondynamodb",
    "rds": "amazonrds",
    "vpc": "amazonvirtualprivatecloud",
    "cloudfront": "amazoncloudfront",
    "route 53": "amazonroute53",
    "api gateway": "amazonapigateway",
    "sqs": "amazonsimplequeueservice",
    "sns": "amazonsimplenotificationservice",
    "cloudwatch": "amazoncloudwatch",
    "cloudformation": "awscloudformation",
    "step functions": "awsstepfunctions",
    "eventbridge": "amazoneventbridge",
    "cognito": "amazoncognito",
    "amplify": "awsamplify",
    "athena": "amazonathena",
    "redshift": "amazonredshift",
    "kinesis": "amazonkinesis",
    "firehose": "amazondatafirehose",
    "glue": "awsglue",
    "sagemaker": "amazonsagemaker",
    "fargate": "awsfargate",
    "ecs": "amazonelasticcontainerservice",
    "ecr": "amazonelasticcontainerregistry",
    "emr": "amazonemr",
    "waf": "awswaf",
    "acm": "awscertificatemanager",
    "secrets manager": "awssecretsmanager",
    "cloudtrail": "awscloudtrail",
    "amazon mq": "amazonmq",
    "cloudsearch": "amazoncloudsearch",
    "datazone": "amazondatazone",
    "appsync": "awsappsync",
    "quicksight": "amazonquicksuite",
    "alb": "elasticloadbalancing",
    "nlb": "elasticloadbalancing",
    "elb": "elasticloadbalancing",
    "load balancer": "elasticloadbalancing",
    "email/sms": "amazonsimplenotificationservice",
    "email": "amazonsimpleemailservice",
    "ses": "amazonsimpleemailservice",
};
// Build final icon map: shortName -> iconPath
const toolById = {};
allTools.forEach(t => { toolById[t.id] = t; });
const pipelineIconMap = {};
Object.entries(shortNameMap).forEach(([short, id]) => {
    if (toolById[id]) pipelineIconMap[short] = toolById[id].icon;
});

const finalJsonStr = JSON.stringify(processedTools).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const iconMapStr = JSON.stringify(pipelineIconMap).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

// ============================================================
// HTML TEMPLATE
// ============================================================
const htmlCode = '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
'    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'    <title>AWS Console - Vibe-to-Cloud Playbook</title>\n    <link rel="icon" type="image/jpeg" href="images/AWSCC_APC_LOGO.jpg">\n    <script src="https://cdn.tailwindcss.com"></script>\n' +
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
// Playbook additions
'        .playbook-tab { padding: 0.6rem 1rem; cursor: pointer; border: none; background: transparent; color: #545b64; font-size: 0.85rem; font-weight: 600; border-bottom: 3px solid transparent; font-family: inherit; }\n' +
'        .playbook-tab.active { color: #0073bb; border-bottom-color: #0073bb; }\n' +
'        .playbook-tab:hover:not(.active) { color: #16191f; }\n' +
'        .setup-step { display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.75rem 0; border-bottom: 1px solid #eaeded; }\n' +
'        .setup-step:last-child { border-bottom: none; }\n' +
'        .step-num { width: 28px; height: 28px; border-radius: 50%; background: #0073bb; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0; }\n' +
'        .conn-row { display: grid; grid-template-columns: 90px 24px 130px 1fr; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 4px; transition: background 0.1s; cursor: pointer; }\n' +
'        .conn-row:hover { background: #f2f8fd; }\n' +
'        .cat-badge { padding: 2px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; background: #f2f3f3; color: #545b64; border: 1px solid #eaeded; }\n' +
'        .pipeline-card { background: #fafafa; border: 1px solid #eaeded; border-radius: 4px; padding: 1rem; margin-bottom: 0.75rem; }\n' +
'        .pipeline-flow { display: flex; align-items: center; gap: 0.35rem; overflow-x: auto; padding: 0.5rem 0; }\n' +
'        .pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.75rem; border-radius: 4px; font-size: 0.78rem; font-weight: 600; white-space: nowrap; flex-shrink: 0; background: white; border: 1px solid #eaeded; color: #16191f; }\n' +
'        .pill-arrow { color: #aab7b8; font-size: 1rem; flex-shrink: 0; }\n' +
// Modal overlay
'        .modal-overlay { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; padding: 1rem; background: rgba(0,0,0,0.4); }\n' +
'        .modal-content { background: white; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); width: 100%; max-width: 720px; height: 80vh; overflow: hidden; display: flex; flex-direction: column; border: 1px solid #eaeded; }\n' +
'    </style>\n</head>\n<body>\n    <div id="root"></div>\n' +
'    <script type="text/babel">\n' +
'        const ALL_TOOLS = JSON.parse(\'' + finalJsonStr + '\');\n' +
'        const ICON_MAP = JSON.parse(\'' + iconMapStr + '\');\n' +
'\n' +
'        const getIcon = (name) => {\n' +
'            if (!name) return "";\n' +
'            let n = name.toLowerCase().trim();\n' +
'            if (ICON_MAP[n]) return ICON_MAP[n];\n' +
'            if (n.includes("/")) { const p = n.split("/")[0].trim(); if (ICON_MAP[p]) return ICON_MAP[p]; }\n' +
'            const aliases = {"rds proxy":"rds","internet gateway":"vpc","igw":"vpc","nat gw":"vpc","nat gateway":"vpc","subnets":"vpc","subnet":"vpc","routes":"vpc","route tables":"vpc","route table":"vpc","security groups":"vpc","nacl":"vpc","alb":"ec2","nlb":"ec2","ebs":"ec2","auto scaling":"ec2","target group":"ec2","elastic ip":"ec2","launch template":"ec2","user data":"ec2","role":"iam","policy":"iam","create role":"iam","attach role":"iam","iam role":"iam","bucket":"s3","bucket policy":"s3","object":"s3","attach policy":"iam","function":"lambda","trigger":"lambda","layer":"lambda","table":"dynamodb","create table":"dynamodb","database":"rds","create database":"rds","instance":"ec2","cluster":"ecs","task def":"ecs","task definition":"ecs","distribution":"cloudfront","origin":"cloudfront","hosted zone":"route 53","record":"route 53","queue":"sqs","topic":"sns","alarm":"cloudwatch","log group":"cloudwatch","logs":"cloudwatch","metrics":"cloudwatch","stack":"cloudformation","template":"cloudformation","pipeline":"glue","crawler":"glue","stream":"kinesis","firehose stream":"firehose","notebook":"sagemaker","endpoint":"sagemaker","user pool":"cognito","identity pool":"cognito","state machine":"step functions","rule":"eventbridge","event bus":"eventbridge","secret":"secrets manager","certificate":"acm","web acl":"waf","trail":"cloudtrail","query":"athena","workgroup":"redshift","app":"amplify","service":"fargate","repository":"ecr","lambda/ec2":"lambda","creds":"secrets manager","store creds":"secrets manager"};\n' +
'            if (aliases[n] && ICON_MAP[aliases[n]]) return ICON_MAP[aliases[n]];\n' +
'            for (const [key, val] of Object.entries(aliases)) { if (n.includes(key)) { if (ICON_MAP[val]) return ICON_MAP[val]; } }\n' +
'            for (let i = 0; i < ALL_TOOLS.length; i++) {\n' +
'                const tid = ALL_TOOLS[i].id;\n' +
'                const tname = ALL_TOOLS[i].name.toLowerCase();\n' +
'                if (tname.includes(n) || n.includes(tname) || tid.includes(n.replace(/\\s+/g, ""))) return ALL_TOOLS[i].icon;\n' +
'            }\n' +
'            return "";\n' +
'        };\n' +
'\n' +
'        const PILL_COLORS = {\n' +
'            yellow: { bg: "#fef9e7", border: "#f5d56b", text: "#8a6d3b" },\n' +
'            purple: { bg: "#f3eef8", border: "#c5afe0", text: "#6b3fa0" },\n' +
'            green:  { bg: "#e9f7ef", border: "#82ccab", text: "#1e7e34" },\n' +
'            red:    { bg: "#fde9e9", border: "#e8a0a0", text: "#a71d2a" },\n' +
'            blue:   { bg: "#e7f3fe", border: "#8ec4e8", text: "#0073bb" },\n' +
'            violet: { bg: "#f0e7fe", border: "#b89ce8", text: "#6b3fa0" },\n' +
'            teal:   { bg: "#e6f7f5", border: "#7ecdc4", text: "#117a65" },\n' +
'            pink:   { bg: "#fde7f0", border: "#e8a0be", text: "#a71d5d" },\n' +
'            lime:   { bg: "#f0f7e6", border: "#b2d88a", text: "#3d6b1e" },\n' +
'            amber:  { bg: "#fef3e2", border: "#e8c77a", text: "#8a6d1e" },\n' +
'            cyan:   { bg: "#e6f7fa", border: "#7ecdd8", text: "#117a8a" },\n' +
'            orange: { bg: "#fef0e6", border: "#e8b07a", text: "#8a4b1e" },\n' +
'        };\n' +
'\n' +
// PipelineFlow uses AWS icons
'        const PipelineFlow = ({ steps }) => (\n' +
'            <div className="pipeline-flow">\n' +
'                {steps.map((step, i) => {\n' +
'                    const color = PILL_COLORS[step.c] || PILL_COLORS.blue;\n' +
'                    const iconSrc = getIcon(step.n);\n' +
'                    return (\n' +
'                        <React.Fragment key={i}>\n' +
'                            {i > 0 && <span className="pill-arrow">→</span>}\n' +
'                            <div className="pill" style={{ background: color.bg, borderColor: color.border, color: color.text }}>\n' +
'                                {iconSrc ? (\n' +
'                                    <img src={iconSrc} style={{width:20,height:20,objectFit:"contain"}} onError={(e)=>e.target.style.display="none"} />\n' +
'                                ) : (\n' +
'                                    <div style={{width:20,height:20,borderRadius:4,background:color.border,opacity:0.5,flexShrink:0}}></div>\n' +
'                                )}\n' +
'                                <div style={{display:"flex",flexDirection:"column",lineHeight:"1.2"}}>\n' +
'                                    <span style={{fontWeight:700,fontSize:"0.75rem"}}>{step.n}</span>\n' +
'                                    <span style={{fontSize:"0.6rem",opacity:0.7,fontWeight:400}}>{step.r}</span>\n' +
'                                </div>\n' +
'                            </div>\n' +
'                        </React.Fragment>\n' +
'                    );\n' +
'                })}\n' +
'            </div>\n' +
'        );\n' +
'\n' +
// Main App
'        const App = () => {\n' +
'            const [selectedTool, setSelectedTool] = React.useState(null);\n' +
'            const [search, setSearch] = React.useState("");\n' +
'            const [activeCategory, setActiveCategory] = React.useState("All");\n' +
'            const [activeTab, setActiveTab] = React.useState("vibe");\n' +
'\n' +
// FIX #1: "Essentials" without star
'            const categoriesMap = { "Essentials": ALL_TOOLS.filter(t => t.popular) };\n' +
'            const otherTools = ALL_TOOLS.filter(t => !t.popular);\n' +
'            otherTools.forEach(t => { if (!categoriesMap[t.category]) categoriesMap[t.category] = []; categoriesMap[t.category].push(t); });\n' +
'            const sortedCategories = ["Essentials", ...Object.keys(categoriesMap).filter(c => c !== "Essentials").sort()];\n' +
'\n' +
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
'                const el = document.getElementById("cat-" + catName.replace(/\\\\s+/g, ""));\n' +
'                if(el) el.scrollIntoView({ behavior: "smooth" });\n' +
'            };\n' +
'\n' +
'            const openTool = (tool) => {\n' +
'                setSelectedTool(tool);\n' +
'                setActiveTab(tool.setup ? "setup" : "vibe");\n' +
'            };\n' +
'\n' +
'            const handleConnectionClick = (connId) => {\n' +
'                const found = ALL_TOOLS.find(t => t.id === connId);\n' +
'                if (found) openTool(found);\n' +
'            };\n' +
'\n' +
// Dashboard (original, with FIX #1 applied: no star, no red)
'            const renderDashboard = () => (\n' +
'                <div className="flex h-[calc(100vh-3.5rem)] w-full">\n' +
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
'                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">\n' +
'                            <div>\n' +
'                                <h1 className="text-2xl font-bold text-[#16191f]">Vibe-to-Cloud Playbook</h1>\n' +
'                                <p className="text-gray-500 text-sm">Click any service for setup guides, connections & pipeline architectures.</p>\n' +
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
'                                <div key={cat.name} id={"cat-" + cat.name.replace(/\\\\s+/g, "")} className="mb-12">\n' +
'                                    <div className="flex items-center mb-6">\n' +
// FIX #1: no red, all categories same color
'                                        <h2 className="text-xl font-bold text-[#232f3e]">\n' +
'                                            {cat.name}\n' +
'                                        </h2>\n' +
'                                        <div className="ml-4 flex-1 h-px bg-gray-200"></div>\n' +
'                                        <span className="ml-4 text-sm font-semibold text-gray-400 bg-gray-100 py-1 px-2 rounded-full">{cat.tools.length}</span>\n' +
'                                    </div>\n' +
'                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">\n' +
'                                        {cat.tools.map(tool => (\n' +
'                                            <div key={tool.id} onClick={() => openTool(tool)} className="aws-card flex flex-col group">\n' +
'                                                <div className="flex items-center space-x-3 mb-3">\n' +
'                                                    <img src={tool.icon} className="w-8 h-8 object-contain" onError={(e)=>e.target.style.display="none"} />\n' +
'                                                    <span className="font-bold text-[#232f3e] group-hover:text-[#0073bb] transition-colors">{tool.name}</span>\n' +
'                                                </div>\n' +
'                                                {tool.popular ? (\n' +
'                                                    <p className="text-xs text-gray-600 mt-auto line-clamp-2">{tool.vibe}</p>\n' +
'                                                ) : (\n' +
'                                                    <p className="text-xs text-gray-400 mt-auto line-clamp-2">{tool.explanation}</p>\n' +
'                                                )}\n' +
'                                                {tool.setup && <div className="mt-2"><span style={{fontSize:"0.6rem",color:"#0073bb",fontWeight:700,background:"#f2f8fd",padding:"2px 6px",borderRadius:4,border:"1px solid #d5e8f6"}}>PLAYBOOK</span></div>}\n' +
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
// FIX #2: Modal instead of full-page navigation
'            const renderModal = () => (\n' +
'                <div className="modal-overlay" onClick={() => setSelectedTool(null)}>\n' +
'                    <div className="modal-content" onClick={e => e.stopPropagation()}>\n' +
// Modal header
'                        <div style={{padding:"1rem 1.5rem",display:"flex",alignItems:"center",gap:"1rem",borderBottom:"1px solid #eaeded",flexShrink:0}}>\n' +
'                            <div style={{width:48,height:48,borderRadius:4,border:"1px solid #eaeded",display:"flex",alignItems:"center",justifyContent:"center",padding:6,background:"#fafafa",flexShrink:0}}>\n' +
'                                <img src={selectedTool.icon} style={{width:"100%",height:"100%",objectFit:"contain"}} onError={(e)=>e.target.style.display="none"} />\n' +
'                            </div>\n' +
'                            <div style={{flex:1,minWidth:0}}>\n' +
'                                <h2 style={{margin:0,fontSize:"1.3rem",fontWeight:700,color:"#16191f"}}>{selectedTool.name}</h2>\n' +
'                                <span style={{color:"#545b64",fontSize:"0.8rem"}}>{selectedTool.category}</span>\n' +
'                            </div>\n' +
'                            <button onClick={() => setSelectedTool(null)} style={{background:"#fafafa",border:"1px solid #eaeded",borderRadius:4,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#545b64",flexShrink:0}}>\n' +
'                                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>\n' +
'                            </button>\n' +
'                        </div>\n' +
// Tab bar
'                        <div style={{display:"flex",borderBottom:"1px solid #eaeded",padding:"0 1.5rem",flexShrink:0}}>\n' +
'                            <button className={"playbook-tab " + (activeTab === "vibe" ? "active" : "")} onClick={() => setActiveTab("vibe")}>Overview</button>\n' +
'                            <button className={"playbook-tab " + (activeTab === "setup" ? "active" : "")} onClick={() => setActiveTab("setup")}>Setup Guide</button>\n' +
'                            <button className={"playbook-tab " + (activeTab === "connections" ? "active" : "")} onClick={() => setActiveTab("connections")}>Connections{selectedTool.connections ? " (" + selectedTool.connections.length + ")" : ""}</button>\n' +
'                        </div>\n' +
// Tab content
'                        <div style={{padding:"1.5rem",overflowY:"auto",flex:1}}>\n' +
// Overview tab (original vibe/explanation/analogy/fact)
'                            {activeTab === "vibe" && (\n' +
'                                <div>\n' +
'                                    <div className="mb-6">\n' +
'                                        <span className="vibe-title">THE VIBE</span>\n' +
'                                        <p style={{fontSize:"1rem",color:"#334155",lineHeight:1.6}}>{selectedTool.vibe}</p>\n' +
'                                    </div>\n' +
'                                    <div className="mb-6">\n' +
'                                        <span className="simple-desc-title">SIMPLE EXPLANATION</span>\n' +
'                                        <p style={{fontSize:"1rem",color:"#334155",lineHeight:1.6}}>{selectedTool.explanation}</p>\n' +
'                                    </div>\n' +
'                                    <div className="analogy-box">\n' +
'                                        <span className="analogy-title">THE ANALOGY</span>\n' +
'                                        <p style={{fontSize:"1.05rem",color:"#00529b",fontStyle:"italic",lineHeight:1.5}}>{selectedTool.analogy}</p>\n' +
'                                    </div>\n' +
'                                    <div style={{marginTop:"1.5rem",paddingTop:"1rem",borderTop:"1px solid #eaeded"}}>\n' +
'                                        <p className="fact-text">FACT: {selectedTool.fact}</p>\n' +
'                                    </div>\n' +
'                                </div>\n' +
'                            )}\n' +
// Setup tab
'                            {activeTab === "setup" && (\n' +
'                                <div>\n' +
'                                    {!selectedTool.setup ? (\n' +
'                                        <p style={{color:"#8a94a6",fontStyle:"italic"}}>Setup playbook coming soon for this service.</p>\n' +
'                                    ) : (\n' +
'                                        <div>\n' +
'                                            <div className="mb-4"><span style={{color:"#1e7e34",fontWeight:700,fontSize:"0.8rem",textTransform:"uppercase"}}>CONSOLE WALKTHROUGH</span></div>\n' +
'                                            {selectedTool.setup.map((step, i) => (\n' +
'                                                <div key={i} className="setup-step">\n' +
'                                                    <div className="step-num">{step.s}</div>\n' +
'                                                    <div>\n' +
'                                                        <p style={{margin:0,color:"#16191f",fontWeight:500,fontSize:"0.9rem"}}>{step.a}</p>\n' +
'                                                        <span style={{color:"#8a94a6",fontSize:"0.75rem",fontFamily:"monospace",background:"#f2f3f3",padding:"2px 6px",borderRadius:4,marginTop:4,display:"inline-block",border:"1px solid #eaeded"}}>{step.l}</span>\n' +
'                                                    </div>\n' +
'                                                </div>\n' +
'                                            ))}\n' +
'                                            {selectedTool.pipelines && selectedTool.pipelines.length > 0 && (\n' +
'                                                <div style={{marginTop:"1.5rem",paddingTop:"1rem",borderTop:"1px solid #eaeded"}}>\n' +
'                                                    <span style={{color:"#6b3fa0",fontWeight:700,fontSize:"0.8rem",textTransform:"uppercase",display:"block",marginBottom:"1rem"}}>COMMON ARCHITECTURES</span>\n' +
'                                                    {selectedTool.pipelines.map((pipeline, pi) => (\n' +
'                                                        <div key={pi} className="pipeline-card">\n' +
'                                                            <div style={{marginBottom:"0.4rem"}}>\n' +
'                                                                <span style={{fontWeight:700,color:"#16191f",fontSize:"0.9rem"}}>{pipeline.name}</span>\n' +
'                                                                <span style={{color:"#8a94a6",fontSize:"0.8rem",marginLeft:"0.5rem"}}>— {pipeline.desc}</span>\n' +
'                                                            </div>\n' +
'                                                            <PipelineFlow steps={pipeline.steps} />\n' +
'                                                        </div>\n' +
'                                                    ))}\n' +
'                                                </div>\n' +
'                                            )}\n' +
'                                        </div>\n' +
'                                    )}\n' +
'                                </div>\n' +
'                            )}\n' +
// Connections tab
'                            {activeTab === "connections" && (\n' +
'                                <div>\n' +
'                                    {!selectedTool.connections || selectedTool.connections.length === 0 ? (\n' +
'                                        <p style={{color:"#8a94a6",fontStyle:"italic"}}>Connection details coming soon for this service.</p>\n' +
'                                    ) : (\n' +
'                                        <div>\n' +
'                                            <div className="mb-4"><span style={{color:"#0073bb",fontWeight:700,fontSize:"0.8rem",textTransform:"uppercase"}}>COMPATIBLE SERVICES ({selectedTool.connections.length})</span></div>\n' +
'                                            {selectedTool.connections.map((conn, i) => {\n' +
'                                                const cIcon = getIcon(conn.n);\n' +
'                                                return (\n' +
'                                                <div key={i} className="conn-row" onClick={() => handleConnectionClick(conn.id)} title={"View " + conn.n}>\n' +
'                                                    <span className="cat-badge">{conn.c}</span>\n' +
'                                                    {cIcon ? <img src={cIcon} style={{width:22,height:22,objectFit:"contain",flexShrink:0}} onError={(e)=>e.target.style.display="none"} /> : <div style={{width:22,height:22,borderRadius:4,background:"#eaeded",flexShrink:0}}></div>}\n' +
'                                                    <span style={{fontWeight:700,color:"#0073bb",fontSize:"0.85rem",minWidth:120,cursor:"pointer"}}>{conn.n}</span>\n' +
'                                                    <span style={{color:"#545b64",fontSize:"0.8rem",flex:1}}>{conn.d}</span>\n' +
'                                                </div>\n' +
'                                                );\n' +
'                                            })}\n' +
'                                        </div>\n' +
'                                    )}\n' +
'                                </div>\n' +
'                            )}\n' +
'                        </div>\n' +
'                    </div>\n' +
'                </div>\n' +
'            );\n' +
'\n' +
// Root render
'            return (\n' +
'                <div className="min-h-screen flex flex-col w-full">\n' +
'                    <header className="aws-header w-full border-b border-[#161e2d]">\n' +
'                        <img src="images/AWSCC_APC_LOGO.jpg" style={{width:32,height:32,borderRadius:4,objectFit:"contain"}} className="mr-3" />\n' +
'                        <span className="font-bold text-lg tracking-tight">AWS Management Architecture</span>\n' +
'                        <span className="ml-auto text-sm text-gray-400">{ALL_TOOLS.length} services</span>\n' +
'                    </header>\n' +
'                    <main className="flex-1 w-full relative">\n' +
'                        {renderDashboard()}\n' +
'                        {selectedTool && renderModal()}\n' +
'                    </main>\n' +
'                </div>\n' +
'            );\n' +
'        };\n' +
'        const root = ReactDOM.createRoot(document.getElementById("root"));\n' +
'        root.render(<App />);\n' +
'    </script>\n</body>\n</html>';

fs.writeFileSync(path.join(__dirname, '../index.html'), htmlCode);
console.log('✅ Built → frontend/index.html');
