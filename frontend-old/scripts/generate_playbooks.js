const fs = require('fs');
const path = require('path');

// Load existing playbook
const existingPB = require('../data/playbook_db.js');
const existingIds = new Set(Object.keys(existingPB));

// Load all tools from icon scan
const iconDir = path.join(__dirname, '../icons/Architecture-Service-Icons_01302026');
function walk(dir) {
  let r = [];
  if (!fs.existsSync(dir)) return r;
  for (const i of fs.readdirSync(dir)) {
    const f = path.join(dir, i);
    if (fs.statSync(f).isDirectory()) r = r.concat(walk(f));
    else if (i.endsWith('_64.svg')) {
      let cat = path.basename(path.dirname(path.dirname(f))).replace('Arch_', '').replace(/-/g, ' ');
      let name = i.replace('Arch_', '').replace('_64.svg', '').replace(/-/g, ' ');
      let id = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      r.push({ id, name, category: cat });
    }
  }
  return r;
}
const allTools = walk(iconDir);
const missing = allTools.filter(t => !existingIds.has(t.id));
console.log(`Found ${missing.length} services without playbooks. Generating...`);

// ============================================================
// CATEGORY-BASED TEMPLATES
// ============================================================
// Each category has: default setup steps, common connections, and pipeline templates
const categoryTemplates = {
  "Analytics": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new resource or cluster", l:`${n} → Create`},
      {s:3, a:"Configure data source and input format", l:"Settings → Data source"},
      {s:4, a:"Set up IAM role for access permissions", l:"IAM → Roles → Create role"},
      {s:5, a:"Configure output destination (S3 or downstream)", l:"Output → S3 bucket"},
      {s:6, a:"Start processing and monitor results", l:`${n} → Monitor`}
    ],
    connections: [
      {id:"amazonsimplestorageservice", n:"S3", d:"Store input/output data", c:"Storage"},
      {id:"awsglue", n:"Glue", d:"ETL and data catalog integration", c:"Analytics"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Access control and permissions", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor metrics and logs", c:"Management"},
      {id:"awslambda", n:"Lambda", d:"Trigger processing on events", c:"Compute"},
      {id:"amazonathena", n:"Athena", d:"Query processed results with SQL", c:"Analytics"}
    ],
    pipelines: (n) => [
      {name:"Data Lake Analytics", desc:"Ingest → Process → Query",
       steps:[{n:"S3",r:"Raw Data",c:"green"},{n,r:"Process",c:"blue"},{n:"Athena",r:"Query",c:"teal"},{n:"QuickSight",r:"Visualize",c:"purple"}]},
      {name:"Streaming Pipeline", desc:"Real-time data flow",
       steps:[{n:"Kinesis",r:"Ingest",c:"blue"},{n,r:"Transform",c:"purple"},{n:"S3",r:"Store",c:"green"},{n:"CloudWatch",r:"Monitor",c:"red"}]}
    ]
  },
  "Application Integration": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new integration or workflow", l:`${n} → Create`},
      {s:3, a:"Define source and target services", l:"Configuration → Source/Target"},
      {s:4, a:"Set up IAM permissions for cross-service access", l:"IAM → Roles"},
      {s:5, a:"Configure error handling and retry logic", l:"Settings → Error handling"},
      {s:6, a:"Deploy and test the integration", l:`${n} → Deploy`}
    ],
    connections: [
      {id:"awslambda", n:"Lambda", d:"Execute custom logic", c:"Compute"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Store integration data", c:"Storage"},
      {id:"amazonsimplequeueservice", n:"SQS", d:"Queue messages between services", c:"Integration"},
      {id:"amazonsimplenotificationservice", n:"SNS", d:"Send notifications", c:"Integration"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Manage permissions", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor integration health", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"Event-Driven Architecture", desc:"Decouple services with events",
       steps:[{n:"EventBridge",r:"Event Bus",c:"pink"},{n,r:"Route",c:"blue"},{n:"Lambda",r:"Process",c:"yellow"},{n:"DynamoDB",r:"Store",c:"blue"}]},
      {name:"Async Messaging", desc:"Reliable message delivery",
       steps:[{n:"SNS",r:"Publish",c:"red"},{n,r:"Integrate",c:"purple"},{n:"SQS",r:"Queue",c:"orange"},{n:"Lambda",r:"Consume",c:"yellow"}]}
    ]
  },
  "Artificial Intelligence": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new model, project, or endpoint", l:`${n} → Create`},
      {s:3, a:"Upload or connect training data from S3", l:"Data → S3 bucket"},
      {s:4, a:"Configure model parameters and instance type", l:"Configuration → Settings"},
      {s:5, a:"Set up IAM role with required permissions", l:"IAM → Roles → Create role"},
      {s:6, a:"Deploy model and create inference endpoint", l:`${n} → Deploy`}
    ],
    connections: [
      {id:"amazonsimplestorageservice", n:"S3", d:"Store training data and model artifacts", c:"Storage"},
      {id:"awslambda", n:"Lambda", d:"Invoke model for inference", c:"Compute"},
      {id:"amazonapigateway", n:"API Gateway", d:"Expose model as REST API", c:"Networking"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Control access to AI resources", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor inference metrics", c:"Management"},
      {id:"amazonsagemaker", n:"SageMaker", d:"Advanced ML training pipeline", c:"AI/ML"}
    ],
    pipelines: (n) => [
      {name:"AI-Powered API", desc:"Model serving via API Gateway",
       steps:[{n:"API Gateway",r:"Request",c:"red"},{n:"Lambda",r:"Invoke",c:"yellow"},{n,r:"Inference",c:"purple"},{n:"DynamoDB",r:"Cache Results",c:"blue"}]},
      {name:"Training Pipeline", desc:"End-to-end ML workflow",
       steps:[{n:"S3",r:"Training Data",c:"green"},{n,r:"Train Model",c:"purple"},{n:"S3",r:"Model Artifact",c:"green"},{n:"Lambda",r:"Deploy",c:"yellow"}]}
    ]
  },
  "Blockchain": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new blockchain network", l:`${n} → Create Network`},
      {s:3, a:"Choose framework (Hyperledger Fabric or Ethereum)", l:"Framework → Select"},
      {s:4, a:"Configure member nodes and voting policy", l:"Network → Members"},
      {s:5, a:"Set up IAM and VPC access", l:"IAM + VPC → Configure"},
      {s:6, a:"Deploy chaincode and test transactions", l:`${n} → Chaincode`}
    ],
    connections: [
      {id:"amazonvirtualprivatecloud", n:"VPC", d:"Network isolation for nodes", c:"Networking"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Member access control", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor node health", c:"Management"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Store chain data backups", c:"Storage"},
      {id:"awslambda", n:"Lambda", d:"Trigger on blockchain events", c:"Compute"}
    ],
    pipelines: (n) => [
      {name:"Blockchain App", desc:"Decentralized application pattern",
       steps:[{n:"API Gateway",r:"Client Request",c:"red"},{n:"Lambda",r:"Business Logic",c:"yellow"},{n,r:"Write to Chain",c:"blue"},{n:"S3",r:"Backup",c:"green"}]}
    ]
  },
  "Business Applications": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new instance or workspace", l:`${n} → Create`},
      {s:3, a:"Configure user access and permissions", l:"Users → Add users"},
      {s:4, a:"Set up email domain or communication channels", l:"Settings → Domain"},
      {s:5, a:"Integrate with existing directory (AD or SSO)", l:"Directory → Connect"},
      {s:6, a:"Test and roll out to team", l:`${n} → Launch`}
    ],
    connections: [
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"User access management", c:"Security"},
      {id:"amazoncognito", n:"Cognito", d:"User authentication", c:"Security"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Store files and attachments", c:"Storage"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor usage metrics", c:"Management"},
      {id:"amazonsimplenotificationservice", n:"SNS", d:"Send notifications", c:"Integration"}
    ],
    pipelines: (n) => [
      {name:"Business Notification Flow", desc:"Automated team communication",
       steps:[{n:"EventBridge",r:"Trigger",c:"pink"},{n:"Lambda",r:"Format",c:"yellow"},{n,r:"Notify",c:"blue"},{n:"CloudWatch",r:"Log",c:"red"}]}
    ]
  },
  "Cloud Financial Management": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → Billing → ${n}`},
      {s:2, a:"Enable cost tracking and create budget", l:`${n} → Create`},
      {s:3, a:"Set alert thresholds and notification emails", l:"Alerts → Configure"},
      {s:4, a:"Tag resources for cost allocation", l:"Cost Allocation Tags → Activate"},
      {s:5, a:"Review cost breakdown by service/region", l:`${n} → Reports`}
    ],
    connections: [
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Billing alarms", c:"Management"},
      {id:"amazonsimplenotificationservice", n:"SNS", d:"Budget alert notifications", c:"Integration"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Billing access control", c:"Security"},
      {id:"awslambda", n:"Lambda", d:"Automated cost actions", c:"Compute"}
    ],
    pipelines: (n) => [
      {name:"Cost Alert Pipeline", desc:"Automated budget monitoring",
       steps:[{n,r:"Track Costs",c:"green"},{n:"CloudWatch",r:"Alarm",c:"red"},{n:"SNS",r:"Alert",c:"orange"},{n:"Lambda",r:"Action",c:"yellow"}]}
    ]
  },
  "Compute": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create or launch a new compute resource", l:`${n} → Create / Launch`},
      {s:3, a:"Choose instance type or configuration", l:"Configuration → Instance type"},
      {s:4, a:"Configure networking (VPC, subnet, security group)", l:"VPC → Subnets → SG"},
      {s:5, a:"Assign IAM role for permissions", l:"IAM → Instance Profile"},
      {s:6, a:"Launch and SSH/connect to verify", l:`${n} → Connect`}
    ],
    connections: [
      {id:"amazonvirtualprivatecloud", n:"VPC", d:"Network isolation", c:"Networking"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Instance permissions", c:"Security"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Store artifacts and logs", c:"Storage"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor CPU, memory, network", c:"Management"},
      {id:"elasticloadbalancing", n:"ALB", d:"Distribute traffic", c:"Networking"},
      {id:"awscloudformation", n:"CloudFormation", d:"Infrastructure as code", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"Web Application Deployment", desc:"Load-balanced compute",
       steps:[{n:"Route 53",r:"DNS",c:"purple"},{n:"ALB",r:"Load Balance",c:"blue"},{n,r:"Run App",c:"orange"},{n:"RDS",r:"Database",c:"blue"}]},
      {name:"Auto-Scaling Architecture", desc:"Dynamic capacity",
       steps:[{n:"CloudWatch",r:"Metrics",c:"red"},{n,r:"Scale",c:"orange"},{n:"S3",r:"Assets",c:"green"},{n:"CloudFront",r:"CDN",c:"purple"}]}
    ]
  },
  "Containers": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a cluster or registry", l:`${n} → Create Cluster`},
      {s:3, a:"Define task definition or deployment config", l:"Task Definitions → Create"},
      {s:4, a:"Configure networking (VPC, subnets, SG)", l:"VPC → Configure"},
      {s:5, a:"Set up IAM roles for task execution", l:"IAM → Task Execution Role"},
      {s:6, a:"Deploy service and verify running tasks", l:`${n} → Services → Deploy`}
    ],
    connections: [
      {id:"amazonvirtualprivatecloud", n:"VPC", d:"Container networking", c:"Networking"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Task execution roles", c:"Security"},
      {id:"amazonelasticcontainerregistry", n:"ECR", d:"Container image registry", c:"Containers"},
      {id:"elasticloadbalancing", n:"ALB", d:"Service load balancing", c:"Networking"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Container monitoring", c:"Management"},
      {id:"awsfargate", n:"Fargate", d:"Serverless containers", c:"Compute"}
    ],
    pipelines: (n) => [
      {name:"Container CI/CD", desc:"Build → Push → Deploy",
       steps:[{n:"CodeBuild",r:"Build Image",c:"blue"},{n:"ECR",r:"Push",c:"orange"},{n,r:"Deploy",c:"green"},{n:"ALB",r:"Route Traffic",c:"purple"}]},
      {name:"Microservices", desc:"Service mesh architecture",
       steps:[{n:"Route 53",r:"DNS",c:"purple"},{n:"ALB",r:"Ingress",c:"blue"},{n,r:"Services",c:"green"},{n:"DynamoDB",r:"Data",c:"blue"}]}
    ]
  },
  "Customer Enablement": {
    setup: (n) => [
      {s:1, a:`Navigate to ${n}`, l:`Console → ${n}`},
      {s:2, a:"Sign up or enable the service", l:`${n} → Get Started`},
      {s:3, a:"Configure your account or team settings", l:"Settings → Configure"},
      {s:4, a:"Explore available resources and documentation", l:`${n} → Resources`}
    ],
    connections: [
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Account access control", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor usage", c:"Management"}
    ],
    pipelines: (n) => []
  },
  "Databases": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new database or cluster", l:`${n} → Create Database`},
      {s:3, a:"Choose engine version and instance class", l:"Engine → Configuration"},
      {s:4, a:"Configure VPC, subnet group, and security group", l:"VPC → Subnet Group → SG"},
      {s:5, a:"Set up master credentials (or use Secrets Manager)", l:"Credentials → Secrets Manager"},
      {s:6, a:"Create database and note the endpoint", l:`${n} → Endpoint`}
    ],
    connections: [
      {id:"amazonvirtualprivatecloud", n:"VPC", d:"Database networking", c:"Networking"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Database authentication", c:"Security"},
      {id:"awssecretsmanager", n:"Secrets Manager", d:"Rotate credentials securely", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor CPU, connections, IOPS", c:"Management"},
      {id:"awslambda", n:"Lambda", d:"Serverless database access", c:"Compute"},
      {id:"awscloudformation", n:"CloudFormation", d:"Define as infrastructure code", c:"Management"},
      {id:"amazonelasticcomputecloud", n:"EC2", d:"App server connects to DB", c:"Compute"}
    ],
    pipelines: (n) => [
      {name:"Classic Web + Database", desc:"EC2 + RDS pattern",
       steps:[{n,r:"Create Database",c:"blue"},{n:"Secrets Manager",r:"Store Creds",c:"purple"},{n:"EC2",r:"Connect App",c:"orange"},{n:"CloudWatch",r:"Monitor",c:"red"}]},
      {name:"Serverless Database Access", desc:"Lambda with database",
       steps:[{n:"API Gateway",r:"Request",c:"red"},{n:"Lambda",r:"Query DB",c:"yellow"},{n,r:"Data Store",c:"blue"},{n:"CloudWatch",r:"Logs",c:"red"}]}
    ]
  },
  "Developer Tools": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new project or environment", l:`${n} → Create`},
      {s:3, a:"Connect source code repository", l:"Source → Connect repo"},
      {s:4, a:"Configure build or deployment settings", l:"Settings → Build spec"},
      {s:5, a:"Set up IAM service role", l:"IAM → Service Role"},
      {s:6, a:"Run first build/deploy and verify", l:`${n} → Start`}
    ],
    connections: [
      {id:"amazonsimplestorageservice", n:"S3", d:"Store build artifacts", c:"Storage"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Service permissions", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Build and deploy logs", c:"Management"},
      {id:"awslambda", n:"Lambda", d:"Custom build actions", c:"Compute"},
      {id:"awscloudformation", n:"CloudFormation", d:"Deploy infrastructure", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"CI/CD Pipeline", desc:"Source → Build → Deploy",
       steps:[{n:"CodeCommit",r:"Source",c:"blue"},{n:"CodeBuild",r:"Build",c:"green"},{n,r:"Pipeline",c:"purple"},{n:"CodeDeploy",r:"Deploy",c:"orange"}]},
      {name:"Infrastructure Pipeline", desc:"IaC deployment",
       steps:[{n,r:"Trigger",c:"blue"},{n:"CloudFormation",r:"Deploy Stack",c:"orange"},{n:"CloudWatch",r:"Monitor",c:"red"},{n:"SNS",r:"Notify",c:"pink"}]}
    ]
  },
  "End User Computing": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a directory or workspace", l:`${n} → Create`},
      {s:3, a:"Choose bundle type (compute + storage)", l:"Bundle → Select"},
      {s:4, a:"Configure VPC and directory service", l:"VPC → Directory"},
      {s:5, a:"Add users and assign workspaces", l:"Users → Add"},
      {s:6, a:"Launch and distribute client URLs", l:`${n} → Launch`}
    ],
    connections: [
      {id:"amazonvirtualprivatecloud", n:"VPC", d:"Workspace networking", c:"Networking"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Admin access control", c:"Security"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Persistent storage", c:"Storage"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor workspace health", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"Virtual Desktop Infrastructure", desc:"Managed desktop delivery",
       steps:[{n:"IAM",r:"Auth User",c:"yellow"},{n,r:"Virtual Desktop",c:"blue"},{n:"S3",r:"User Files",c:"green"},{n:"CloudWatch",r:"Monitor",c:"red"}]}
    ]
  },
  "Front End Web Mobile": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new app or resource", l:`${n} → Create`},
      {s:3, a:"Configure SDK and integration settings", l:"Settings → SDK"},
      {s:4, a:"Set up authentication with Cognito", l:"Cognito → User Pool"},
      {s:5, a:"Deploy and test on device", l:`${n} → Deploy`}
    ],
    connections: [
      {id:"amazoncognito", n:"Cognito", d:"User sign-in and sign-up", c:"Security"},
      {id:"awsamplify", n:"Amplify", d:"Frontend hosting and CI/CD", c:"Frontend"},
      {id:"amazonapigateway", n:"API Gateway", d:"Backend API access", c:"Networking"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Asset and file storage", c:"Storage"},
      {id:"awslambda", n:"Lambda", d:"Serverless backend", c:"Compute"}
    ],
    pipelines: (n) => [
      {name:"Full-Stack Serverless", desc:"Frontend + Backend",
       steps:[{n:"Amplify",r:"Host Frontend",c:"orange"},{n:"Cognito",r:"Auth",c:"red"},{n:"API Gateway",r:"API",c:"blue"},{n:"Lambda",r:"Backend",c:"yellow"}]}
    ]
  },
  "Games": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new game server fleet or stream", l:`${n} → Create`},
      {s:3, a:"Upload game build or configure streaming", l:"Builds → Upload"},
      {s:4, a:"Configure fleet scaling and regions", l:"Fleet → Auto Scaling"},
      {s:5, a:"Set up matchmaking or session management", l:"Matchmaking → Configure"},
      {s:6, a:"Launch and test player connections", l:`${n} → Launch`}
    ],
    connections: [
      {id:"amazonelasticcomputecloud", n:"EC2", d:"Game server instances", c:"Compute"},
      {id:"amazondynamodb", n:"DynamoDB", d:"Player data and leaderboards", c:"Database"},
      {id:"amazoncognito", n:"Cognito", d:"Player authentication", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor server performance", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"Multiplayer Game Backend", desc:"Session-based game server",
       steps:[{n:"Cognito",r:"Player Auth",c:"red"},{n,r:"Game Server",c:"blue"},{n:"DynamoDB",r:"Player Data",c:"purple"},{n:"CloudWatch",r:"Metrics",c:"red"}]}
    ]
  }
};

// Additional categories with similar patterns
const moreTemplates = {
  "General Icons": categoryTemplates["Business Applications"],
  "Internet of Things": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → IoT → ${n}`},
      {s:2, a:"Register a new thing or device", l:`${n} → Register`},
      {s:3, a:"Create and download device certificates", l:"Security → Certificates"},
      {s:4, a:"Attach IoT policy to certificate", l:"Policies → Attach"},
      {s:5, a:"Configure MQTT topic and rules", l:"Message Routing → Rules"},
      {s:6, a:"Test with MQTT test client", l:`IoT → MQTT Test Client`}
    ],
    connections: [
      {id:"awslambda", n:"Lambda", d:"Process IoT messages", c:"Compute"},
      {id:"amazondynamodb", n:"DynamoDB", d:"Store device data", c:"Database"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Store device logs", c:"Storage"},
      {id:"amazonkinesis", n:"Kinesis", d:"Stream device telemetry", c:"Analytics"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor IoT metrics", c:"Management"},
      {id:"amazonsimplenotificationservice", n:"SNS", d:"Alert on device events", c:"Integration"}
    ],
    pipelines: (n) => [
      {name:"IoT Data Pipeline", desc:"Device → Cloud → Analytics",
       steps:[{n,r:"Device Data",c:"teal"},{n:"Lambda",r:"Process",c:"yellow"},{n:"DynamoDB",r:"Store",c:"blue"},{n:"QuickSight",r:"Dashboard",c:"purple"}]},
      {name:"IoT Alert System", desc:"Monitor and notify",
       steps:[{n,r:"Telemetry",c:"teal"},{n:"CloudWatch",r:"Alarm",c:"red"},{n:"SNS",r:"Alert",c:"orange"},{n:"Lambda",r:"Remediate",c:"yellow"}]}
    ]
  },
  "Management Tools": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Enable or configure the service", l:`${n} → Settings`},
      {s:3, a:"Set up dashboards or monitoring rules", l:"Dashboards → Create"},
      {s:4, a:"Configure alerts and notification channels", l:"Alerts → SNS Topic"},
      {s:5, a:"Review compliance and operational data", l:`${n} → Reports`}
    ],
    connections: [
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Centralized monitoring", c:"Management"},
      {id:"amazonsimplenotificationservice", n:"SNS", d:"Alert notifications", c:"Integration"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Admin access control", c:"Security"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Store logs and reports", c:"Storage"},
      {id:"awslambda", n:"Lambda", d:"Automated remediation", c:"Compute"}
    ],
    pipelines: (n) => [
      {name:"Operations Dashboard", desc:"Monitor → Alert → Fix",
       steps:[{n,r:"Collect Data",c:"blue"},{n:"CloudWatch",r:"Dashboard",c:"red"},{n:"SNS",r:"Alert",c:"orange"},{n:"Lambda",r:"Auto-Fix",c:"yellow"}]}
    ]
  },
  "Media Services": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → Media → ${n}`},
      {s:2, a:"Create a new channel, pipeline, or job", l:`${n} → Create`},
      {s:3, a:"Configure input source (S3 or live stream)", l:"Input → Configure"},
      {s:4, a:"Set output format and destination", l:"Output → S3 / CloudFront"},
      {s:5, a:"Set up IAM role for media processing", l:"IAM → Service Role"},
      {s:6, a:"Start processing and monitor", l:`${n} → Start`}
    ],
    connections: [
      {id:"amazonsimplestorageservice", n:"S3", d:"Store media files", c:"Storage"},
      {id:"amazoncloudfront", n:"CloudFront", d:"CDN for media delivery", c:"Networking"},
      {id:"awslambda", n:"Lambda", d:"Media processing triggers", c:"Compute"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Access control", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor transcoding jobs", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"Video Processing", desc:"Upload → Transcode → Deliver",
       steps:[{n:"S3",r:"Upload",c:"green"},{n,r:"Process",c:"blue"},{n:"S3",r:"Output",c:"green"},{n:"CloudFront",r:"Stream",c:"purple"}]}
    ]
  },
  "Migration Transfer": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → Migration → ${n}`},
      {s:2, a:"Create a migration task or transfer job", l:`${n} → Create`},
      {s:3, a:"Configure source and destination endpoints", l:"Endpoints → Source / Target"},
      {s:4, a:"Set up networking (VPN/Direct Connect)", l:"Networking → Configure"},
      {s:5, a:"Start migration and monitor progress", l:`${n} → Start → Monitor`}
    ],
    connections: [
      {id:"amazonsimplestorageservice", n:"S3", d:"Migration staging area", c:"Storage"},
      {id:"amazonvirtualprivatecloud", n:"VPC", d:"Network connectivity", c:"Networking"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Migration permissions", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Track migration progress", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"Cloud Migration", desc:"On-prem → AWS",
       steps:[{n,r:"Migrate Data",c:"blue"},{n:"S3",r:"Staging",c:"green"},{n:"EC2",r:"Target Server",c:"orange"},{n:"CloudWatch",r:"Verify",c:"red"}]}
    ]
  },
  "Networking Content Delivery": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new resource (VPC, distribution, etc.)", l:`${n} → Create`},
      {s:3, a:"Configure routing, subnets, or origins", l:"Configuration → Routes"},
      {s:4, a:"Set up security groups or WAF rules", l:"Security → Configure"},
      {s:5, a:"Attach to compute resources (EC2, Lambda, etc.)", l:"Targets → Attach"},
      {s:6, a:"Test connectivity and DNS resolution", l:`${n} → Test`}
    ],
    connections: [
      {id:"amazonelasticcomputecloud", n:"EC2", d:"Backend compute targets", c:"Compute"},
      {id:"awslambda", n:"Lambda", d:"Edge functions", c:"Compute"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Static content origin", c:"Storage"},
      {id:"amazonroute53", n:"Route 53", d:"DNS resolution", c:"Networking"},
      {id:"awswaf", n:"WAF", d:"Web application firewall", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Traffic monitoring", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"Global Content Delivery", desc:"Origin → Edge → User",
       steps:[{n:"S3",r:"Origin",c:"green"},{n,r:"Network",c:"blue"},{n:"CloudFront",r:"Edge Cache",c:"purple"},{n:"Route 53",r:"DNS",c:"purple"}]},
      {name:"Secure API Network", desc:"Firewall + Load Balancing",
       steps:[{n:"WAF",r:"Filter",c:"red"},{n,r:"Route",c:"blue"},{n:"ALB",r:"Load Balance",c:"blue"},{n:"EC2",r:"Backend",c:"orange"}]}
    ]
  },
  "Quantum Technologies": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a notebook instance", l:`${n} → Notebooks → Create`},
      {s:3, a:"Choose quantum hardware provider", l:"Devices → Select"},
      {s:4, a:"Write and submit quantum circuit", l:"Notebook → Code → Submit"},
      {s:5, a:"Retrieve results from S3", l:"S3 → Results bucket"}
    ],
    connections: [
      {id:"amazonsimplestorageservice", n:"S3", d:"Store quantum task results", c:"Storage"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Access quantum resources", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor task execution", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"Quantum Computing", desc:"Submit → Execute → Analyze",
       steps:[{n,r:"Submit Circuit",c:"purple"},{n:"S3",r:"Results",c:"green"},{n:"Lambda",r:"Analyze",c:"yellow"},{n:"QuickSight",r:"Visualize",c:"teal"}]}
    ]
  },
  "Robotics": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a robot application", l:`${n} → Create App`},
      {s:3, a:"Configure simulation environment", l:"Simulation → Create"},
      {s:4, a:"Upload robot application bundle to S3", l:"S3 → Upload"},
      {s:5, a:"Run simulation and review results", l:`${n} → Simulate`}
    ],
    connections: [
      {id:"amazonsimplestorageservice", n:"S3", d:"Store application bundles", c:"Storage"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Service permissions", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Simulation monitoring", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"Robot Simulation", desc:"Build → Simulate → Deploy",
       steps:[{n:"S3",r:"App Bundle",c:"green"},{n,r:"Simulate",c:"blue"},{n:"CloudWatch",r:"Metrics",c:"red"},{n:"IoT Core",r:"Deploy to Robot",c:"teal"}]}
    ]
  },
  "Satellite": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Reserve satellite contact time", l:`${n} → Schedule Contact`},
      {s:3, a:"Configure ground station antenna and dataflow", l:"Config → Dataflow"},
      {s:4, a:"Set up EC2 instance to receive data", l:"EC2 → Launch"},
      {s:5, a:"Process downlinked data", l:`${n} → Data → S3`}
    ],
    connections: [
      {id:"amazonelasticcomputecloud", n:"EC2", d:"Process satellite data", c:"Compute"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Store downlink data", c:"Storage"},
      {id:"amazonvirtualprivatecloud", n:"VPC", d:"Secure data delivery", c:"Networking"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor contacts", c:"Management"}
    ],
    pipelines: (n) => [
      {name:"Satellite Data Pipeline", desc:"Downlink → Process → Store",
       steps:[{n,r:"Downlink",c:"blue"},{n:"EC2",r:"Process",c:"orange"},{n:"S3",r:"Store",c:"green"},{n:"Lambda",r:"Analyze",c:"yellow"}]}
    ]
  },
  "Security Identity Compliance": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → Security → ${n}`},
      {s:2, a:"Enable or configure the security service", l:`${n} → Enable`},
      {s:3, a:"Set up detection rules or policies", l:"Rules → Create"},
      {s:4, a:"Configure alert destinations (SNS, CloudWatch)", l:"Notifications → Configure"},
      {s:5, a:"Review findings and compliance status", l:`${n} → Findings`}
    ],
    connections: [
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Access and policy management", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Security monitoring", c:"Management"},
      {id:"amazonsimplenotificationservice", n:"SNS", d:"Security alert notifications", c:"Integration"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Store logs and findings", c:"Storage"},
      {id:"awslambda", n:"Lambda", d:"Automated remediation", c:"Compute"},
      {id:"awscloudtrail", n:"CloudTrail", d:"API activity logging", c:"Security"}
    ],
    pipelines: (n) => [
      {name:"Security Monitoring", desc:"Detect → Alert → Respond",
       steps:[{n,r:"Detect Threat",c:"red"},{n:"CloudWatch",r:"Log Event",c:"red"},{n:"SNS",r:"Alert Team",c:"orange"},{n:"Lambda",r:"Auto-Remediate",c:"yellow"}]},
      {name:"Compliance Audit", desc:"Continuous compliance",
       steps:[{n,r:"Scan Resources",c:"red"},{n:"CloudTrail",r:"Audit Trail",c:"blue"},{n:"S3",r:"Archive Logs",c:"green"},{n:"QuickSight",r:"Report",c:"purple"}]}
    ]
  },
  "Storage": {
    setup: (n) => [
      {s:1, a:`Open ${n} in AWS Console`, l:`Console → ${n}`},
      {s:2, a:"Create a new volume, filesystem, or gateway", l:`${n} → Create`},
      {s:3, a:"Configure storage class and performance", l:"Configuration → Storage class"},
      {s:4, a:"Set up VPC and mount targets", l:"VPC → Mount targets"},
      {s:5, a:"Attach to EC2 or configure client access", l:"EC2 → Attach / Mount"},
      {s:6, a:"Set up backup and lifecycle policies", l:`${n} → Lifecycle`}
    ],
    connections: [
      {id:"amazonelasticcomputecloud", n:"EC2", d:"Attach storage to instances", c:"Compute"},
      {id:"amazonvirtualprivatecloud", n:"VPC", d:"Storage networking", c:"Networking"},
      {id:"awsidentityandaccessmanagement", n:"IAM", d:"Access permissions", c:"Security"},
      {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor storage metrics", c:"Management"},
      {id:"amazonsimplestorageservice", n:"S3", d:"Backup and archival", c:"Storage"},
      {id:"awslambda", n:"Lambda", d:"Event-driven processing", c:"Compute"}
    ],
    pipelines: (n) => [
      {name:"Backup Architecture", desc:"Automated data protection",
       steps:[{n,r:"Primary Storage",c:"green"},{n:"S3",r:"Backup",c:"green"},{n:"S3 Glacier",r:"Archive",c:"blue"},{n:"CloudWatch",r:"Monitor",c:"red"}]},
      {name:"High-Performance Storage", desc:"Compute + Fast Storage",
       steps:[{n:"EC2",r:"Compute",c:"orange"},{n,r:"Fast Storage",c:"green"},{n:"CloudWatch",r:"IOPS Monitor",c:"red"},{n:"IAM",r:"Access Control",c:"yellow"}]}
    ]
  }
};

// Merge all templates
const allTemplates = {...categoryTemplates, ...moreTemplates};

// ============================================================
// GENERATE PLAYBOOK ENTRIES
// ============================================================
const newEntries = {};
let generated = 0;

missing.forEach(service => {
  const template = allTemplates[service.category];
  if (!template) {
    // Fallback: use Management Tools template for unknown categories
    const fallback = allTemplates["Management Tools"];
    newEntries[service.id] = {
      setup: fallback.setup(service.name),
      connections: fallback.connections,
      pipelines: fallback.pipelines(service.name)
    };
  } else {
    newEntries[service.id] = {
      setup: template.setup(service.name),
      connections: template.connections,
      pipelines: template.pipelines(service.name)
    };
  }
  generated++;
});

console.log(`Generated ${generated} new playbook entries.`);

// ============================================================
// WRITE MERGED playbook_db.js
// ============================================================
const merged = {...existingPB, ...newEntries};
const output = `// Auto-generated Playbook DB — ${Object.keys(merged).length} services
// Last updated: ${new Date().toISOString().split('T')[0]}
module.exports = ${JSON.stringify(merged, null, 2)};
`;

const outPath = path.join(__dirname, '../data/playbook_db.js');
fs.writeFileSync(outPath, output);
console.log(`✅ Wrote ${Object.keys(merged).length} total playbooks → data/playbook_db.js`);
