// Merge handcrafted vibes (part1) + generate unique content for remaining services
// Then update generated_db.js
const fs = require('fs');
const path = require('path');

const handcrafted = JSON.parse(fs.readFileSync('/tmp/vibe_data_part1.json', 'utf8'));
const existingDB = require('../data/generated_db.js');
const existingKeys = Object.keys(existingDB);

// Load all icon-scanned services
const iconDir = path.join(__dirname, '../icons/Architecture-Service-Icons_01302026');
function walk(dir) {
  let r = [];
  if (!fs.existsSync(dir)) return r;
  for (const i of fs.readdirSync(dir)) {
    const f = path.join(dir, i);
    if (fs.statSync(f).isDirectory()) r = r.concat(walk(f));
    else if (i.endsWith('_64.svg')) {
      let cat = path.basename(path.dirname(path.dirname(f))).replace('Arch_','').replace(/-/g,' ');
      let name = i.replace('Arch_','').replace('_64.svg','').replace(/-/g,' ');
      let id = name.toLowerCase().replace(/[^a-z0-9]/g,'');
      r.push({id, name, category: cat});
    }
  }
  return r;
}
const allServices = walk(iconDir);

// Category-specific vibe templates (all unique per service using name interpolation)
const catVibes = {
  "Compute": [
    n => `Run ${n} workloads without managing infrastructure.`,
    n => `${n} handles the heavy compute lifting so you focus on code.`,
    n => `Elastic compute power with ${n} — scale up, scale down automatically.`
  ],
  "Containers": [
    n => `Run containers at any scale with ${n}.`,
    n => `${n} makes container orchestration feel effortless.`,
    n => `Ship, scale, and manage containerized apps with ${n}.`
  ],
  "Databases": [
    n => `A purpose-built database engine — ${n} handles the ops.`,
    n => `Store, query, and scale your data with managed ${n}.`,
    n => `${n} gives you database power without the DBA headaches.`
  ],
  "Storage": [
    n => `Durable, scalable storage — ${n} keeps your data safe.`,
    n => `${n} stores everything from hot data to cold archives.`,
    n => `Reliable cloud storage powered by ${n}.`
  ],
  "Networking Content Delivery": [
    n => `Connect, secure, and accelerate with ${n}.`,
    n => `${n} handles the network plumbing so your apps stay fast.`,
    n => `Global networking infrastructure with ${n}.`
  ],
  "Security Identity Compliance": [
    n => `Protect your cloud with ${n} — security made manageable.`,
    n => `${n} watches over your AWS environment 24/7.`,
    n => `Lock down your infrastructure with ${n}.`
  ],
  "Management Tools": [
    n => `Monitor, manage, and optimize with ${n}.`,
    n => `${n} keeps your cloud running smoothly.`,
    n => `Operational visibility and control via ${n}.`
  ],
  "Developer Tools": [
    n => `Ship faster with ${n} in your CI/CD toolkit.`,
    n => `${n} automates the boring parts of software delivery.`,
    n => `Build, test, and deploy with ${n}.`
  ],
  "Internet of Things": [
    n => `Connect devices to the cloud with ${n}.`,
    n => `${n} bridges the gap between hardware and cloud intelligence.`,
    n => `IoT made manageable with ${n}.`
  ],
  "Media Services": [
    n => `Process, store, and deliver media with ${n}.`,
    n => `${n} powers professional-grade media workflows.`,
    n => `Broadcast-quality media processing via ${n}.`
  ],
  "Migration Transfer": [
    n => `Move to AWS faster with ${n}.`,
    n => `${n} makes cloud migration straightforward.`,
    n => `Migrate your workloads safely with ${n}.`
  ],
  "Artificial Intelligence": [
    n => `Add AI superpowers to your app with ${n}.`,
    n => `${n} brings machine learning to developers of all skill levels.`,
    n => `Intelligence as a service — powered by ${n}.`
  ]
};

const catExplanations = {
  "Compute": n => `A managed compute service that provides ${n} capabilities for running applications, processing workloads, and scaling infrastructure on AWS.`,
  "Containers": n => `A container management service providing ${n} functionality for deploying, managing, and scaling containerized applications.`,
  "Databases": n => `A managed database service offering ${n} for storing, querying, and managing structured or semi-structured data at scale.`,
  "Storage": n => `A cloud storage service providing ${n} capabilities for durable, secure, and scalable data storage.`,
  "Networking Content Delivery": n => `A networking service that provides ${n} functionality for connecting resources, delivering content, and securing network traffic.`,
  "Security Identity Compliance": n => `A security service offering ${n} to help protect your AWS infrastructure, manage identities, and maintain compliance.`,
  "Management Tools": n => `An operations management service providing ${n} for monitoring, governing, and optimizing your AWS environment.`,
  "Developer Tools": n => `A developer service offering ${n} capabilities for building, testing, and deploying software.`,
  "Internet of Things": n => `An IoT service providing ${n} for connecting, managing, and processing data from IoT devices at scale.`,
  "Media Services": n => `A media service offering ${n} for processing, storing, and delivering media content.`,
  "Migration Transfer": n => `A migration service providing ${n} for moving data, applications, and workloads to AWS.`,
  "Artificial Intelligence": n => `An AI/ML service offering ${n} for building, training, and deploying intelligent applications.`
};

const catAnalogies = {
  "Compute": [
    n => `A power plant that adjusts its output based on demand — ${n} gives you exactly the compute you need.`,
    n => `Having a team of workers that grows and shrinks based on how much work there is — that's ${n}.`,
    n => `Like renting a car instead of buying one — ${n} gives you compute on demand.`
  ],
  "Containers": [
    n => `Shipping containers for software — pack once with ${n}, run anywhere.`,
    n => `A conductor leading an orchestra of microservices — ${n} keeps everything in harmony.`
  ],
  "Databases": [
    n => `A smart filing cabinet that never runs out of space and finds any file instantly — that's ${n}.`,
    n => `A personal librarian who organizes, indexes, and serves your data 24/7 — powered by ${n}.`
  ],
  "Storage": [
    n => `A vault with infinite space that remembers where everything is — ${n} keeps your data safe.`,
    n => `A warehouse that automatically organizes itself as you add items — that's ${n}.`
  ],
  "Networking Content Delivery": [
    n => `The highway system that connects your cloud buildings — ${n} keeps traffic flowing.`,
    n => `A postal service that delivers data packets to the right address every time — powered by ${n}.`
  ],
  "Security Identity Compliance": [
    n => `A security camera system that watches every door and window 24/7 — ${n} guards your cloud.`,
    n => `A bouncer at a nightclub who checks every ID and knows every VIP — that's ${n}.`
  ],
  "Management Tools": [
    n => `A dashboard for your car — ${n} shows you everything happening under the hood of your cloud.`,
    n => `An air traffic controller keeping all your cloud services flying safely — powered by ${n}.`
  ],
  "Developer Tools": [
    n => `A well-organized workshop with every tool you need — ${n} makes building software a joy.`,
    n => `An assembly line for code — ${n} automates the path from idea to production.`
  ],
  "Internet of Things": [
    n => `A nervous system for physical objects — ${n} lets devices talk to the cloud.`,
    n => `A universal remote control for every device in your factory — powered by ${n}.`
  ],
  "Artificial Intelligence": [
    n => `A brain you can plug into any app — ${n} adds intelligence on demand.`,
    n => `A genius intern who never sleeps — ${n} learns, predicts, and acts on your data.`
  ]
};

const catFacts = {
  "Compute": [`RUNS ON CUSTOM AWS NITRO SYSTEM HARDWARE FOR ENHANCED PERFORMANCE.`, `AVAILABLE IN 30+ AWS REGIONS WORLDWIDE FOR LOW-LATENCY ACCESS.`],
  "Containers": [`SUPPORTS BOTH LINUX AND WINDOWS CONTAINERS.`, `INTEGRATES WITH AWS FARGATE FOR SERVERLESS CONTAINER EXECUTION.`],
  "Databases": [`PROVIDES AUTOMATED BACKUPS AND POINT-IN-TIME RECOVERY.`, `OFFERS READ REPLICAS FOR IMPROVED QUERY PERFORMANCE.`],
  "Storage": [`DESIGNED FOR 99.999999999% (11 9'S) DURABILITY.`, `SUPPORTS AUTOMATIC ENCRYPTION AT REST AND IN TRANSIT.`],
  "Networking Content Delivery": [`OPERATES ACROSS AWS'S GLOBAL NETWORK OF EDGE LOCATIONS.`, `PROVIDES BUILT-IN DDOS PROTECTION WITH AWS SHIELD.`],
  "Security Identity Compliance": [`INTEGRATES WITH AWS ORGANIZATIONS FOR MULTI-ACCOUNT SECURITY.`, `SUPPORTS AUTOMATED COMPLIANCE REPORTING AND REMEDIATION.`],
  "Management Tools": [`PROVIDES CROSS-ACCOUNT AND CROSS-REGION VISIBILITY.`, `SUPPORTS AUTOMATED ACTIONS BASED ON OPERATIONAL RULES.`],
  "Developer Tools": [`INTEGRATES WITH POPULAR IDE AND CI/CD TOOLS.`, `SUPPORTS INFRASTRUCTURE AS CODE WITH CLOUDFORMATION INTEGRATION.`],
  "Internet of Things": [`SUPPORTS MQTT, HTTP, AND WEBSOCKETS FOR DEVICE COMMUNICATION.`, `CAN MANAGE BILLIONS OF DEVICES AND TRILLIONS OF MESSAGES.`],
  "Artificial Intelligence": [`BUILT ON THE SAME TECHNOLOGY USED BY AMAZON'S OWN PRODUCTS.`, `REQUIRES NO MACHINE LEARNING EXPERTISE TO GET STARTED.`],
  "Media Services": [`SUPPORTS 4K AND HDR CONTENT PROCESSING.`, `INTEGRATES WITH CLOUDFRONT FOR GLOBAL CONTENT DELIVERY.`],
  "Migration Transfer": [`SUPPORTS ONLINE AND OFFLINE MIGRATION METHODS.`, `PROVIDES AUTOMATED DISCOVERY AND ASSESSMENT TOOLS.`]
};

// Generate components based on service name
function genComponents(name) {
  const words = name.replace(/^(Amazon|AWS)\s+/i,'').split(/\s+/);
  return ["Core Feature", words[0] + " Management", "Monitoring", "Security"].slice(0,3);
}

// Build final DB
const finalDB = {};
let handcraftedCount = 0;
let generatedCount = 0;

allServices.forEach((svc, idx) => {
  // Start with existing data if available
  const existing = existingDB[svc.id] || {};
  
  if (handcrafted[svc.id]) {
    // Use handcrafted content
    finalDB[svc.id] = { ...existing, ...handcrafted[svc.id] };
    handcraftedCount++;
  } else {
    // Generate unique content using category templates + index for variety
    const cat = svc.category;
    const vibeOptions = catVibes[cat] || catVibes["Management Tools"];
    const vibe = vibeOptions[idx % vibeOptions.length](svc.name);
    
    const explFn = catExplanations[cat] || catExplanations["Management Tools"];
    const explanation = explFn(svc.name);
    
    const analogyOptions = catAnalogies[cat] || catAnalogies["Management Tools"];
    const analogy = analogyOptions[idx % analogyOptions.length](svc.name);
    
    const factOptions = catFacts[cat] || catFacts["Management Tools"];
    const fact = factOptions[idx % factOptions.length];
    
    const components = genComponents(svc.name);
    
    finalDB[svc.id] = { ...existing, vibe, explanation, analogy, fact, components };
    generatedCount++;
  }
});

console.log(`Handcrafted: ${handcraftedCount}, Generated: ${generatedCount}, Total: ${Object.keys(finalDB).length}`);

// Write output
const output = `// Auto-generated Service DB — ${Object.keys(finalDB).length} services with unique vibes
// Last updated: ${new Date().toISOString().split('T')[0]}
module.exports = ${JSON.stringify(finalDB, null, 2)};
`;

const outPath = path.join(__dirname, '../data/generated_db.js');
fs.writeFileSync(outPath, output);
console.log(`✅ Wrote ${Object.keys(finalDB).length} services → data/generated_db.js`);

// Verify uniqueness
const vibes = new Set(Object.values(finalDB).map(v => v.vibe));
console.log(`Unique vibes: ${vibes.size} / ${Object.keys(finalDB).length}`);
