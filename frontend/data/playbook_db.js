// Playbook Database - Setup guides, connections, and pipeline architectures
// Color keys: yellow=Security, purple=Compute, green=Storage, red=Database, blue=Networking, violet=Integration, teal=Analytics, pink=AI/ML, lime=DevTools, amber=Management, cyan=IoT, orange=Migration
const playbookDB = {

// ======================== STORAGE ========================
"amazonsimplestorageservice": {
  setup: [
    {s:1, a:"Go to S3 Console → Click 'Create Bucket'", l:"S3 > Buckets > Create bucket"},
    {s:2, a:"Enter a globally unique bucket name, select your region", l:"Name + Region fields"},
    {s:3, a:"Configure Block Public Access (ON=private, OFF+policy=public)", l:"Block Public Access section"},
    {s:4, a:"Enable Versioning (recommended), choose encryption (SSE-S3)", l:"Properties tab"},
    {s:5, a:"Click 'Create Bucket' → Upload files via drag-and-drop", l:"Final confirmation"}
  ],
  connections: [
    {id:"amazoncloudfront", n:"CloudFront", d:"CDN serves S3 content globally with caching", c:"Networking"},
    {id:"awslambda", n:"Lambda", d:"S3 events trigger Lambda functions on upload/delete", c:"Compute"},
    {id:"amazonelasticcomputecloud", n:"EC2", d:"EC2 instances read/write S3 via SDK or CLI", c:"Compute"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Bucket policies + IAM roles control access", c:"Security"},
    {id:"amazonathena", n:"Athena", d:"Query S3 data directly with SQL", c:"Analytics"},
    {id:"amazondynamodb", n:"DynamoDB", d:"Store metadata in DynamoDB, files in S3", c:"Database"},
    {id:"awsglue", n:"Glue", d:"ETL jobs read/write data from S3 data lakes", c:"Analytics"},
    {id:"amazonsimplenotificationservice", n:"SNS", d:"Notify subscribers on object create/delete", c:"Integration"},
    {id:"amazonsimplequeueservice", n:"SQS", d:"Queue S3 event notifications for async processing", c:"Integration"},
    {id:"amazonredshift", n:"Redshift", d:"COPY/UNLOAD data between S3 and warehouse", c:"Analytics"},
    {id:"amazonroute53", n:"Route 53", d:"Alias record for S3 static website endpoint", c:"Networking"},
    {id:"awscloudformation", n:"CloudFormation", d:"Automate bucket creation via IaC", c:"Management"}
  ],
  pipelines: [
    {name:"Static Website Hosting", desc:"Host React/Vue/Next.js static site", steps:[
      {e:"🌐",n:"Route 53",r:"Domain",c:"blue"},{e:"🌐",n:"CloudFront",r:"CDN",c:"blue"},{e:"📦",n:"S3",r:"Static Files",c:"green"},{e:"🔐",n:"IAM",r:"Bucket Policy",c:"yellow"}
    ]},
    {name:"Serverless File Upload API", desc:"Users upload files via API", steps:[
      {e:"🔐",n:"IAM",r:"Create Role",c:"yellow"},{e:"📦",n:"S3",r:"Create Bucket",c:"green"},{e:"⚡",n:"Lambda",r:"Signed URL",c:"purple"},{e:"🚪",n:"API Gateway",r:"Expose Endpoint",c:"blue"}
    ]},
    {name:"Data Lake + Analytics", desc:"Store raw data, query on-demand", steps:[
      {e:"📦",n:"S3",r:"Data Lake",c:"green"},{e:"🔄",n:"Glue",r:"ETL Crawler",c:"teal"},{e:"🔍",n:"Athena",r:"SQL Query",c:"teal"},{e:"📊",n:"QuickSight",r:"Dashboard",c:"teal"}
    ]}
  ]
},

// ======================== COMPUTE ========================
"amazonelasticcomputecloud": {
  setup: [
    {s:1, a:"Go to EC2 Console → Click 'Launch Instance'", l:"EC2 > Instances > Launch"},
    {s:2, a:"Name your instance, choose AMI (Amazon Linux 2023 / Ubuntu)", l:"Name + AMI selection"},
    {s:3, a:"Select Instance Type (t2.micro = free tier), create Key Pair", l:"Instance type + Key pair"},
    {s:4, a:"Configure Security Group — open ports 22 (SSH), 80 (HTTP), 443 (HTTPS)", l:"Network settings"},
    {s:5, a:"Click 'Launch Instance' → Connect via SSH using key pair", l:"Launch confirmation"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Read/write files from EC2 using SDK or CLI", c:"Storage"},
    {id:"amazonrds", n:"RDS", d:"EC2 app connects to RDS database via private endpoint", c:"Database"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Instance roles give EC2 permissions without keys", c:"Security"},
    {id:"amazonvirtualprivatecloud", n:"VPC", d:"EC2 lives inside VPC with subnets and security groups", c:"Networking"},
    {id:"amazoncloudfront", n:"CloudFront", d:"Cache and accelerate content served by EC2", c:"Networking"},
    {id:"amazonroute53", n:"Route 53", d:"Point domain to EC2 public IP or Load Balancer", c:"Networking"},
    {id:"awscloudformation", n:"CloudFormation", d:"Create EC2 infrastructure from templates", c:"Management"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor CPU, memory, disk metrics and set alarms", c:"Management"}
  ],
  pipelines: [
    {name:"Classic Web Server", desc:"Simple server with domain", steps:[
      {e:"🌐",n:"VPC",r:"Create Network",c:"blue"},{e:"🔐",n:"IAM",r:"Instance Role",c:"yellow"},{e:"🖥️",n:"EC2",r:"Launch Server",c:"purple"},{e:"🌐",n:"Route 53",r:"Domain",c:"blue"}
    ]},
    {name:"Scalable Web App", desc:"Auto-scaling behind load balancer", steps:[
      {e:"🌐",n:"VPC",r:"Subnets",c:"blue"},{e:"🖥️",n:"EC2",r:"Launch Template",c:"purple"},{e:"📈",n:"Auto Scaling",r:"Group",c:"purple"},{e:"⚖️",n:"ELB",r:"Load Balancer",c:"blue"},{e:"🌐",n:"Route 53",r:"DNS",c:"blue"}
    ]},
    {name:"Full-Stack with Database", desc:"App server + managed database", steps:[
      {e:"🌐",n:"VPC",r:"Network",c:"blue"},{e:"💾",n:"RDS",r:"Database",c:"red"},{e:"🖥️",n:"EC2",r:"App Server",c:"purple"},{e:"⚖️",n:"ELB",r:"Load Balancer",c:"blue"},{e:"🌐",n:"CloudFront",r:"CDN",c:"blue"}
    ]}
  ]
},

"awslambda": {
  setup: [
    {s:1, a:"Go to Lambda Console → Click 'Create Function'", l:"Lambda > Functions > Create"},
    {s:2, a:"Choose 'Author from scratch', name it, select runtime (Node.js / Python)", l:"Function config"},
    {s:3, a:"Assign an IAM execution role (create new or use existing)", l:"Permissions section"},
    {s:4, a:"Write or paste your function code in the inline editor", l:"Code tab"},
    {s:5, a:"Click 'Deploy' → Test with a sample event", l:"Deploy + Test buttons"}
  ],
  connections: [
    {id:"amazonapigateway", n:"API Gateway", d:"REST/HTTP API triggers Lambda on every request", c:"Networking"},
    {id:"amazonsimplestorageservice", n:"S3", d:"S3 events (upload, delete) trigger Lambda", c:"Storage"},
    {id:"amazondynamodb", n:"DynamoDB", d:"DynamoDB Streams trigger Lambda on data changes", c:"Database"},
    {id:"amazonsimplequeueservice", n:"SQS", d:"Lambda polls SQS queue and processes messages", c:"Integration"},
    {id:"amazonsimplenotificationservice", n:"SNS", d:"SNS pushes notifications to Lambda", c:"Integration"},
    {id:"amazoneventbridge", n:"EventBridge", d:"Schedule Lambda like a cron job", c:"Integration"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor Lambda logs, errors, duration", c:"Management"},
    {id:"awsstepfunctions", n:"Step Functions", d:"Orchestrate multiple Lambdas in a workflow", c:"Integration"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Execution role defines what Lambda can access", c:"Security"},
    {id:"amazonrds", n:"RDS", d:"Connect to databases via RDS Proxy", c:"Database"}
  ],
  pipelines: [
    {name:"Serverless REST API", desc:"The classic serverless backend", steps:[
      {e:"🔐",n:"IAM",r:"Create Role",c:"yellow"},{e:"💾",n:"DynamoDB",r:"Create Table",c:"red"},{e:"⚡",n:"Lambda",r:"Write Function",c:"purple"},{e:"🚪",n:"API Gateway",r:"Expose URL",c:"blue"}
    ]},
    {name:"Event-Driven File Processing", desc:"React to S3 uploads automatically", steps:[
      {e:"📦",n:"S3",r:"Upload Trigger",c:"green"},{e:"⚡",n:"Lambda",r:"Process File",c:"purple"},{e:"💾",n:"DynamoDB",r:"Store Metadata",c:"red"},{e:"📢",n:"SNS",r:"Notify User",c:"violet"}
    ]},
    {name:"Scheduled Cron Job", desc:"Run tasks on a schedule", steps:[
      {e:"🔐",n:"IAM",r:"Create Role",c:"yellow"},{e:"⚡",n:"Lambda",r:"Write Function",c:"purple"},{e:"⏰",n:"EventBridge",r:"Schedule Rule",c:"violet"},{e:"📊",n:"CloudWatch",r:"Monitor Logs",c:"amber"}
    ]}
  ]
},

// ======================== SECURITY ========================
"awsidentityandaccessmanagement": {
  setup: [
    {s:1, a:"Go to IAM Console → Navigate to Users / Roles / Policies", l:"IAM > Dashboard"},
    {s:2, a:"Click 'Create User' → set username, enable console/programmatic access", l:"IAM > Users > Create"},
    {s:3, a:"Attach policies (use managed like AmazonS3ReadOnlyAccess or create custom)", l:"Permissions tab"},
    {s:4, a:"For services: 'Create Role' → select trusted entity (Lambda, EC2)", l:"IAM > Roles > Create"},
    {s:5, a:"Enable MFA on root and all human users", l:"Security credentials tab"}
  ],
  connections: [
    {id:"awslambda", n:"Lambda", d:"Execution roles define what Lambda can do", c:"Compute"},
    {id:"amazonelasticcomputecloud", n:"EC2", d:"Instance profiles let EC2 assume roles", c:"Compute"},
    {id:"amazonsimplestorageservice", n:"S3", d:"Bucket policies + IAM policies control access", c:"Storage"},
    {id:"amazoncognito", n:"Cognito", d:"Federated identities mapped to IAM roles", c:"Security"},
    {id:"amazonapigateway", n:"API Gateway", d:"IAM authorization on API endpoints", c:"Networking"},
    {id:"awscloudtrail", n:"CloudTrail", d:"Audit all IAM API calls", c:"Management"},
    {id:"awsorganizations", n:"Organizations", d:"Service Control Policies for multi-account", c:"Management"}
  ],
  pipelines: [
    {name:"Secure Multi-User Setup", desc:"Set up team access properly", steps:[
      {e:"🔐",n:"IAM",r:"Create Admin Group",c:"yellow"},{e:"🔐",n:"IAM",r:"Create Users",c:"yellow"},{e:"🔐",n:"IAM",r:"Attach Policies",c:"yellow"},{e:"🔐",n:"IAM",r:"Enable MFA",c:"yellow"}
    ]},
    {name:"Service-to-Service Trust", desc:"Let AWS services talk to each other", steps:[
      {e:"🔐",n:"IAM",r:"Create Policy",c:"yellow"},{e:"🔐",n:"IAM",r:"Create Role",c:"yellow"},{e:"⚡",n:"Lambda/EC2",r:"Attach Role",c:"purple"},{e:"📋",n:"CloudTrail",r:"Audit",c:"amber"}
    ]}
  ]
},

// ======================== DATABASE ========================
"amazondynamodb": {
  setup: [
    {s:1, a:"Go to DynamoDB Console → Click 'Create Table'", l:"DynamoDB > Tables > Create"},
    {s:2, a:"Enter Table name, define Partition Key (e.g. userId string)", l:"Table settings"},
    {s:3, a:"Optionally add a Sort Key for composite queries", l:"Sort key field"},
    {s:4, a:"Choose capacity: On-demand (pay per request) or Provisioned", l:"Capacity settings"},
    {s:5, a:"Click 'Create Table' → Add items via console or SDK", l:"Items explorer"}
  ],
  connections: [
    {id:"awslambda", n:"Lambda", d:"CRUD operations + Streams trigger Lambda", c:"Compute"},
    {id:"amazonapigateway", n:"API Gateway", d:"Direct integration or via Lambda for REST", c:"Networking"},
    {id:"amazonsimplestorageservice", n:"S3", d:"Store large files in S3, metadata in DynamoDB", c:"Storage"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Fine-grained access control per table/item", c:"Security"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor read/write capacity, throttles, errors", c:"Management"},
    {id:"awsappsync", n:"AppSync", d:"GraphQL API with DynamoDB resolvers", c:"Integration"},
    {id:"awsstepfunctions", n:"Step Functions", d:"Multi-step workflows interacting with DynamoDB", c:"Integration"},
    {id:"awsglue", n:"Glue", d:"ETL from DynamoDB to S3/Redshift", c:"Analytics"}
  ],
  pipelines: [
    {name:"Simple CRUD Backend", desc:"Standard serverless database pattern", steps:[
      {e:"🔐",n:"IAM",r:"Create Role",c:"yellow"},{e:"💾",n:"DynamoDB",r:"Create Table",c:"red"},{e:"⚡",n:"Lambda",r:"CRUD Functions",c:"purple"},{e:"🚪",n:"API Gateway",r:"REST API",c:"blue"}
    ]},
    {name:"Real-Time Stream Processing", desc:"React to database changes", steps:[
      {e:"💾",n:"DynamoDB",r:"Enable Streams",c:"red"},{e:"⚡",n:"Lambda",r:"Stream Processor",c:"purple"},{e:"📢",n:"SNS",r:"Notify",c:"violet"},{e:"📊",n:"CloudWatch",r:"Monitor",c:"amber"}
    ]}
  ]
},

"amazonrds": {
  setup: [
    {s:1, a:"Go to RDS Console → Click 'Create Database'", l:"RDS > Databases > Create"},
    {s:2, a:"Choose engine: PostgreSQL / MySQL / Aurora", l:"Engine selection"},
    {s:3, a:"Select Free Tier template, set Master username + password", l:"Template + credentials"},
    {s:4, a:"Configure VPC, Subnet Group, Security Group (open port 3306/5432)", l:"Connectivity section"},
    {s:5, a:"Click 'Create Database' → Copy the endpoint URL for your app", l:"Database details"}
  ],
  connections: [
    {id:"amazonelasticcomputecloud", n:"EC2", d:"App on EC2 connects to RDS via VPC", c:"Compute"},
    {id:"awslambda", n:"Lambda", d:"Connect via RDS Proxy for connection pooling", c:"Compute"},
    {id:"amazonvirtualprivatecloud", n:"VPC", d:"RDS runs inside VPC with security groups", c:"Networking"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"IAM database authentication", c:"Security"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor CPU, connections, storage, IOPS", c:"Management"},
    {id:"awssecretsmanager", n:"Secrets Manager", d:"Securely rotate database credentials", c:"Security"},
    {id:"awscloudformation", n:"CloudFormation", d:"Define RDS instances as code", c:"Management"}
  ],
  pipelines: [
    {name:"Traditional Web App Database", desc:"Classic EC2 + RDS pattern", steps:[
      {e:"🌐",n:"VPC",r:"Private Subnets",c:"blue"},{e:"💾",n:"RDS",r:"Create Database",c:"red"},{e:"🔑",n:"Secrets Manager",r:"Store Creds",c:"yellow"},{e:"🖥️",n:"EC2",r:"Connect App",c:"purple"}
    ]},
    {name:"Serverless + RDS", desc:"Lambda with database access", steps:[
      {e:"🌐",n:"VPC",r:"Subnets",c:"blue"},{e:"💾",n:"RDS",r:"Database",c:"red"},{e:"💾",n:"RDS Proxy",r:"Pool Connections",c:"red"},{e:"⚡",n:"Lambda",r:"Query DB",c:"purple"},{e:"🚪",n:"API Gateway",r:"Expose",c:"blue"}
    ]}
  ]
},

// ======================== NETWORKING ========================
"amazonvirtualprivatecloud": {
  setup: [
    {s:1, a:"Go to VPC Console → Click 'Create VPC'", l:"VPC > Your VPCs > Create"},
    {s:2, a:"Choose 'VPC and more' to auto-create subnets + route tables + IGW", l:"VPC wizard"},
    {s:3, a:"Set CIDR block (e.g. 10.0.0.0/16)", l:"IPv4 CIDR"},
    {s:4, a:"Configure public subnets (web) and private subnets (databases)", l:"Subnet config"},
    {s:5, a:"Attach Internet Gateway for public internet access", l:"Route table + IGW"}
  ],
  connections: [
    {id:"amazonelasticcomputecloud", n:"EC2", d:"All EC2 instances launch inside VPC subnets", c:"Compute"},
    {id:"amazonrds", n:"RDS", d:"Database instances in private VPC subnets", c:"Database"},
    {id:"awslambda", n:"Lambda", d:"Lambda can run inside VPC for private access", c:"Compute"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"VPC endpoint policies", c:"Security"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"VPC Flow Logs monitoring", c:"Management"}
  ],
  pipelines: [
    {name:"Standard 3-Tier Network", desc:"Public + private subnet architecture", steps:[
      {e:"🌐",n:"VPC",r:"Create",c:"blue"},{e:"🌐",n:"Subnets",r:"Public + Private",c:"blue"},{e:"🚪",n:"IGW",r:"Internet Gateway",c:"blue"},{e:"🔒",n:"NAT GW",r:"Private Outbound",c:"blue"},{e:"📋",n:"Routes",r:"Route Tables",c:"blue"}
    ]}
  ]
},

"amazonapigateway": {
  setup: [
    {s:1, a:"Go to API Gateway Console → Click 'Create API'", l:"API Gateway > Create"},
    {s:2, a:"Choose HTTP API (simpler/cheaper) or REST API (full-featured)", l:"API type selection"},
    {s:3, a:"Add routes/resources (e.g. GET /users, POST /users)", l:"Routes section"},
    {s:4, a:"Attach Lambda integration to each route", l:"Integration target"},
    {s:5, a:"Click 'Deploy' to a stage (dev/prod) → Copy invoke URL", l:"Deploy button"}
  ],
  connections: [
    {id:"awslambda", n:"Lambda", d:"Primary backend — invokes Lambda per request", c:"Compute"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"IAM-based API authorization", c:"Security"},
    {id:"amazoncognito", n:"Cognito", d:"JWT-based user authentication", c:"Security"},
    {id:"amazondynamodb", n:"DynamoDB", d:"Direct integration without Lambda", c:"Database"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Log all API requests, monitor latency", c:"Management"},
    {id:"awswaf", n:"WAF", d:"Protect APIs from attacks", c:"Security"},
    {id:"amazoncloudfront", n:"CloudFront", d:"CDN caching for API responses", c:"Networking"},
    {id:"amazonroute53", n:"Route 53", d:"Map custom domain to API endpoint", c:"Networking"}
  ],
  pipelines: [
    {name:"Full Serverless API", desc:"Complete API with database", steps:[
      {e:"🔐",n:"IAM",r:"Roles",c:"yellow"},{e:"💾",n:"DynamoDB",r:"Table",c:"red"},{e:"⚡",n:"Lambda",r:"Functions",c:"purple"},{e:"🚪",n:"API Gateway",r:"Routes",c:"blue"},{e:"🌐",n:"Route 53",r:"Custom Domain",c:"blue"}
    ]},
    {name:"Authenticated API", desc:"API with user auth", steps:[
      {e:"👤",n:"Cognito",r:"User Pool",c:"yellow"},{e:"⚡",n:"Lambda",r:"Functions",c:"purple"},{e:"🚪",n:"API Gateway",r:"JWT Authorizer",c:"blue"},{e:"🛡️",n:"WAF",r:"Rate Limiting",c:"yellow"}
    ]}
  ]
},

"amazoncloudfront": {
  setup: [
    {s:1, a:"Go to CloudFront Console → Click 'Create Distribution'", l:"CloudFront > Create"},
    {s:2, a:"Set Origin Domain to S3 bucket, EC2, or ALB endpoint", l:"Origin settings"},
    {s:3, a:"Configure Cache Behavior (default: cache everything, TTL)", l:"Behavior settings"},
    {s:4, a:"Add Alternate Domain (CNAME) and attach ACM SSL Certificate", l:"Settings section"},
    {s:5, a:"Click 'Create Distribution' → Update Route 53 to point here", l:"DNS config"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Origin for static sites, images, videos", c:"Storage"},
    {id:"amazonroute53", n:"Route 53", d:"Alias record pointing domain to CloudFront", c:"Networking"},
    {id:"awscertificatemanager", n:"ACM", d:"Free SSL certificates for custom domains", c:"Security"},
    {id:"awswaf", n:"WAF", d:"Protect distribution from web attacks", c:"Security"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor cache hit rates, request counts", c:"Management"},
    {id:"awslambda", n:"Lambda@Edge", d:"Run code at CDN edge locations", c:"Compute"}
  ],
  pipelines: [
    {name:"Global Static Website", desc:"CDN-backed static site", steps:[
      {e:"📦",n:"S3",r:"Upload Files",c:"green"},{e:"🌐",n:"CloudFront",r:"Distribution",c:"blue"},{e:"🔒",n:"ACM",r:"SSL Cert",c:"yellow"},{e:"🌐",n:"Route 53",r:"Custom Domain",c:"blue"}
    ]}
  ]
},

"amazonroute53": {
  setup: [
    {s:1, a:"Go to Route 53 Console → Click 'Create Hosted Zone'", l:"Route 53 > Hosted Zones"},
    {s:2, a:"Enter your domain name → create hosted zone", l:"Domain name field"},
    {s:3, a:"Add DNS Records: A record, CNAME, or Alias to resources", l:"Record sets"},
    {s:4, a:"If external registrar, update nameservers to Route 53's NS records", l:"NS records"},
    {s:5, a:"Enable health checks for failover routing (optional)", l:"Health checks"}
  ],
  connections: [
    {id:"amazoncloudfront", n:"CloudFront", d:"Alias record to CloudFront distribution", c:"Networking"},
    {id:"amazonelasticcomputecloud", n:"EC2", d:"A record to EC2 Elastic IP", c:"Compute"},
    {id:"amazonapigateway", n:"API Gateway", d:"Custom domain mapping", c:"Networking"},
    {id:"amazonsimplestorageservice", n:"S3", d:"Alias for S3 static website endpoint", c:"Storage"},
    {id:"awscertificatemanager", n:"ACM", d:"DNS validation for SSL certificates", c:"Security"}
  ],
  pipelines: [
    {name:"Domain → AWS Resource", desc:"Connect your domain to AWS", steps:[
      {e:"🌐",n:"Route 53",r:"Register Domain",c:"blue"},{e:"🌐",n:"Route 53",r:"Hosted Zone",c:"blue"},{e:"🔒",n:"ACM",r:"Request Cert",c:"yellow"},{e:"🌐",n:"Route 53",r:"Alias Record",c:"blue"}
    ]}
  ]
},

// ======================== INTEGRATION ========================
"amazonsimplequeueservice": {
  setup: [
    {s:1, a:"Go to SQS Console → Click 'Create Queue'", l:"SQS > Queues > Create"},
    {s:2, a:"Choose Standard (best-effort ordering) or FIFO (strict)", l:"Queue type"},
    {s:3, a:"Set visibility timeout (how long message hidden while processing)", l:"Configuration"},
    {s:4, a:"Configure Dead-letter Queue for failed messages", l:"DLQ settings"},
    {s:5, a:"Click 'Create Queue' → Send a test message", l:"Queue actions"}
  ],
  connections: [
    {id:"awslambda", n:"Lambda", d:"Lambda polls SQS and processes messages", c:"Compute"},
    {id:"amazonsimplenotificationservice", n:"SNS", d:"SNS fan-out to multiple SQS queues", c:"Integration"},
    {id:"amazonsimplestorageservice", n:"S3", d:"S3 event notifications sent to SQS", c:"Storage"},
    {id:"amazonapigateway", n:"API Gateway", d:"API can push messages into SQS", c:"Networking"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor queue depth, message age", c:"Management"}
  ],
  pipelines: [
    {name:"Async Worker Pattern", desc:"Decouple request from processing", steps:[
      {e:"🚪",n:"API Gateway",r:"Receive Request",c:"blue"},{e:"📬",n:"SQS",r:"Queue Message",c:"violet"},{e:"⚡",n:"Lambda",r:"Process",c:"purple"},{e:"💾",n:"DynamoDB",r:"Store Result",c:"red"}
    ]}
  ]
},

"amazonsimplenotificationservice": {
  setup: [
    {s:1, a:"Go to SNS Console → Click 'Create Topic'", l:"SNS > Topics > Create"},
    {s:2, a:"Choose Standard or FIFO topic, name it", l:"Topic type"},
    {s:3, a:"Click 'Create Subscription' → protocol (Email/SQS/Lambda/HTTP)", l:"Subscription"},
    {s:4, a:"Enter endpoint (email address, SQS ARN, Lambda ARN)", l:"Endpoint field"},
    {s:5, a:"Confirm subscription (email requires clicking link)", l:"Confirmation"}
  ],
  connections: [
    {id:"amazonsimplequeueservice", n:"SQS", d:"Fan-out: one SNS message → multiple queues", c:"Integration"},
    {id:"awslambda", n:"Lambda", d:"SNS triggers Lambda on new messages", c:"Compute"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"CloudWatch Alarms trigger SNS", c:"Management"},
    {id:"amazoneventbridge", n:"EventBridge", d:"Forward specific events to SNS", c:"Integration"}
  ],
  pipelines: [
    {name:"Alert System", desc:"Get notified when things go wrong", steps:[
      {e:"📊",n:"CloudWatch",r:"Alarm Triggers",c:"amber"},{e:"📢",n:"SNS",r:"Topic",c:"violet"},{e:"📧",n:"Email/SMS",r:"Notify Team",c:"violet"}
    ]}
  ]
},

"awsstepfunctions": {
  setup: [
    {s:1, a:"Go to Step Functions Console → Click 'Create State Machine'", l:"Step Functions > Create"},
    {s:2, a:"Choose Visual workflow studio or write ASL (JSON)", l:"Design mode"},
    {s:3, a:"Drag-and-drop Lambda tasks, Wait states, Choice states", l:"Workflow canvas"},
    {s:4, a:"Configure IAM execution role", l:"Permissions"},
    {s:5, a:"Click 'Create' → Start execution → Watch graph turn green", l:"Execution view"}
  ],
  connections: [
    {id:"awslambda", n:"Lambda", d:"Most common — invoke Lambda at each step", c:"Compute"},
    {id:"amazondynamodb", n:"DynamoDB", d:"Direct read/write without Lambda", c:"Database"},
    {id:"amazonsimplequeueservice", n:"SQS", d:"Send messages from workflow", c:"Integration"},
    {id:"amazonsimplenotificationservice", n:"SNS", d:"Send notifications from steps", c:"Integration"},
    {id:"amazonapigateway", n:"API Gateway", d:"Start workflows from API calls", c:"Networking"},
    {id:"amazoneventbridge", n:"EventBridge", d:"Schedule workflow executions", c:"Integration"}
  ],
  pipelines: [
    {name:"Order Processing Pipeline", desc:"Multi-step business logic", steps:[
      {e:"🚪",n:"API Gateway",r:"Receive Order",c:"blue"},{e:"🔄",n:"Step Functions",r:"Start",c:"violet"},{e:"⚡",n:"Lambda",r:"Validate",c:"purple"},{e:"⚡",n:"Lambda",r:"Charge",c:"purple"},{e:"📢",n:"SNS",r:"Confirm",c:"violet"}
    ]}
  ]
},

"amazoneventbridge": {
  setup: [
    {s:1, a:"Go to EventBridge Console → Click 'Create Rule'", l:"EventBridge > Rules > Create"},
    {s:2, a:"Choose Schedule (cron/rate) or Event Pattern (AWS events)", l:"Rule type"},
    {s:3, a:"For cron: enter expression like cron(0 12 * * ? *) for noon daily", l:"Schedule config"},
    {s:4, a:"Set target: Lambda, SQS, SNS, Step Functions, etc.", l:"Target selection"},
    {s:5, a:"Click 'Create' → Rule fires automatically", l:"Rule dashboard"}
  ],
  connections: [
    {id:"awslambda", n:"Lambda", d:"Most common target — scheduled invocation", c:"Compute"},
    {id:"awsstepfunctions", n:"Step Functions", d:"Start workflows on schedule", c:"Integration"},
    {id:"amazonsimplequeueservice", n:"SQS", d:"Route events to queues", c:"Integration"},
    {id:"amazonsimplenotificationservice", n:"SNS", d:"Send notifications on events", c:"Integration"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor rule invocations", c:"Management"}
  ],
  pipelines: [
    {name:"Scheduled Cron Job", desc:"Run tasks automatically", steps:[
      {e:"⏰",n:"EventBridge",r:"Cron Rule",c:"violet"},{e:"⚡",n:"Lambda",r:"Execute Task",c:"purple"},{e:"💾",n:"DynamoDB/S3",r:"Store Results",c:"red"},{e:"📢",n:"SNS",r:"Notify on Fail",c:"violet"}
    ]}
  ]
},

// ======================== ANALYTICS ========================
"amazonathena": {
  setup: [
    {s:1, a:"Go to Athena Console → Set query result location (S3 bucket)", l:"Athena > Settings"},
    {s:2, a:"Create a database using CREATE DATABASE mydb;", l:"Query editor"},
    {s:3, a:"Create a table pointing to S3 data with column definitions", l:"DDL query"},
    {s:4, a:"Run SQL queries directly on your S3 data", l:"Query editor"},
    {s:5, a:"Optionally use Glue Crawler to auto-discover schemas", l:"Glue integration"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Queries data stored in S3 directly", c:"Storage"},
    {id:"awsglue", n:"Glue", d:"Glue Data Catalog provides metadata/schema", c:"Analytics"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Control who can query which tables", c:"Security"}
  ],
  pipelines: [
    {name:"Ad-Hoc Data Analysis", desc:"Query S3 data with SQL", steps:[
      {e:"📦",n:"S3",r:"Store Raw Data",c:"green"},{e:"🔄",n:"Glue",r:"Discover Schema",c:"teal"},{e:"🔍",n:"Athena",r:"Run SQL",c:"teal"},{e:"📊",n:"QuickSight",r:"Visualize",c:"teal"}
    ]}
  ]
},

"amazonredshift": {
  setup: [
    {s:1, a:"Go to Redshift Console → Click 'Create Cluster'", l:"Redshift > Clusters > Create"},
    {s:2, a:"Choose node type (dc2.large for dev) and number of nodes", l:"Cluster config"},
    {s:3, a:"Set admin username + password, configure VPC", l:"Credentials + network"},
    {s:4, a:"Click 'Create Cluster' → Use Query Editor v2 to run SQL", l:"Query Editor"},
    {s:5, a:"Load data from S3 using COPY command", l:"SQL command"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"COPY loads data from S3; UNLOAD exports to S3", c:"Storage"},
    {id:"awsglue", n:"Glue", d:"ETL jobs prepare and load data", c:"Analytics"},
    {id:"amazonathena", n:"Athena", d:"Federated queries across Redshift and S3", c:"Analytics"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Cluster roles for S3 access", c:"Security"}
  ],
  pipelines: [
    {name:"Data Warehouse", desc:"Central analytics database", steps:[
      {e:"📦",n:"S3",r:"Raw Data",c:"green"},{e:"🔄",n:"Glue",r:"ETL",c:"teal"},{e:"🏢",n:"Redshift",r:"Load & Query",c:"teal"},{e:"📊",n:"QuickSight",r:"Dashboard",c:"teal"}
    ]}
  ]
},

"amazonkinesis": {
  setup: [
    {s:1, a:"Go to Kinesis Console → Click 'Create Data Stream'", l:"Kinesis > Data Streams > Create"},
    {s:2, a:"Enter stream name and set shard count (or use on-demand)", l:"Stream config"},
    {s:3, a:"Use AWS SDK in your app to put records into the stream", l:"Producer code"},
    {s:4, a:"Set up a consumer (Lambda, Kinesis Data Analytics, or custom)", l:"Consumer config"},
    {s:5, a:"Monitor via CloudWatch metrics", l:"Monitoring tab"}
  ],
  connections: [
    {id:"awslambda", n:"Lambda", d:"Consume stream records with Lambda", c:"Compute"},
    {id:"amazondatafirehose", n:"Firehose", d:"Buffer and deliver stream data to S3", c:"Analytics"},
    {id:"amazonsimplestorageservice", n:"S3", d:"Final destination for streamed data", c:"Storage"},
    {id:"amazondynamodb", n:"DynamoDB", d:"Store processed stream results", c:"Database"}
  ],
  pipelines: [
    {name:"Real-Time Analytics", desc:"Process streaming data", steps:[
      {e:"📡",n:"App/IoT",r:"Produce Records",c:"cyan"},{e:"🌊",n:"Kinesis",r:"Stream",c:"teal"},{e:"⚡",n:"Lambda",r:"Transform",c:"purple"},{e:"🔥",n:"Firehose",r:"Deliver",c:"teal"},{e:"📦",n:"S3",r:"Store",c:"green"}
    ]}
  ]
},

"awsglue": {
  setup: [
    {s:1, a:"Go to Glue Console → Click 'Add Crawler'", l:"Glue > Crawlers > Create"},
    {s:2, a:"Point crawler at your S3 data source", l:"Data source config"},
    {s:3, a:"Assign IAM role with S3 and Glue permissions", l:"IAM role selection"},
    {s:4, a:"Set target database in Glue Data Catalog", l:"Output config"},
    {s:5, a:"Run the crawler → auto-discovers schemas + creates tables", l:"Run crawler"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Primary data source and target for ETL", c:"Storage"},
    {id:"amazonathena", n:"Athena", d:"Uses Glue Data Catalog for table definitions", c:"Analytics"},
    {id:"amazonredshift", n:"Redshift", d:"ETL jobs load data into Redshift", c:"Analytics"},
    {id:"amazonrds", n:"RDS", d:"ETL from relational databases", c:"Database"}
  ],
  pipelines: [
    {name:"Automated Data Pipeline", desc:"Discover, transform, query", steps:[
      {e:"📦",n:"S3",r:"Raw Data Lands",c:"green"},{e:"🔄",n:"Glue",r:"Crawl Schema",c:"teal"},{e:"🔄",n:"Glue",r:"ETL Job",c:"teal"},{e:"📦",n:"S3",r:"Clean Data",c:"green"},{e:"🔍",n:"Athena",r:"Query",c:"teal"}
    ]}
  ]
},

"amazonsagemaker": {
  setup: [
    {s:1, a:"Go to SageMaker Console → Open Studio or create Notebook Instance", l:"SageMaker > Notebooks"},
    {s:2, a:"Create notebook, import dataset from S3", l:"Jupyter environment"},
    {s:3, a:"Use built-in algorithm or bring your own training script", l:"Training config"},
    {s:4, a:"Click 'Create Training Job' → select instance and S3 paths", l:"Training jobs"},
    {s:5, a:"Deploy trained model as a real-time endpoint", l:"Endpoints section"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Store training data, models, outputs", c:"Storage"},
    {id:"awslambda", n:"Lambda", d:"Invoke SageMaker endpoints for inference", c:"Compute"},
    {id:"amazonapigateway", n:"API Gateway", d:"Expose ML models as REST APIs", c:"Networking"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Execution roles for accessing services", c:"Security"}
  ],
  pipelines: [
    {name:"ML API", desc:"Train and serve ML model", steps:[
      {e:"📦",n:"S3",r:"Upload Data",c:"green"},{e:"🧠",n:"SageMaker",r:"Train Model",c:"pink"},{e:"🧠",n:"SageMaker",r:"Deploy Endpoint",c:"pink"},{e:"⚡",n:"Lambda",r:"Invoke",c:"purple"},{e:"🚪",n:"API Gateway",r:"Expose",c:"blue"}
    ]}
  ]
},

// ======================== MANAGEMENT ========================
"amazoncloudwatch": {
  setup: [
    {s:1, a:"Go to CloudWatch Console — metrics auto-collected for most services", l:"CloudWatch > Metrics"},
    {s:2, a:"Create Dashboard → add widgets for CPU, memory, errors", l:"Dashboards > Create"},
    {s:3, a:"Create Alarm → select metric, set threshold, link to SNS", l:"Alarms > Create"},
    {s:4, a:"View Log Groups for Lambda, EC2, API Gateway logs", l:"Logs > Log groups"},
    {s:5, a:"Create Metric Filters to extract custom metrics from logs", l:"Log group actions"}
  ],
  connections: [
    {id:"awslambda", n:"Lambda", d:"All Lambda logs go here automatically", c:"Compute"},
    {id:"amazonelasticcomputecloud", n:"EC2", d:"CPU, network, disk metrics", c:"Compute"},
    {id:"amazonsimplenotificationservice", n:"SNS", d:"Alarms trigger SNS notifications", c:"Integration"},
    {id:"amazonrds", n:"RDS", d:"Database metrics and insights", c:"Database"},
    {id:"amazonapigateway", n:"API Gateway", d:"Request count, latency, error rates", c:"Networking"}
  ],
  pipelines: [
    {name:"Full Observability Stack", desc:"Monitor everything", steps:[
      {e:"⚡",n:"Lambda/EC2/RDS",r:"Emit Metrics",c:"purple"},{e:"📊",n:"CloudWatch",r:"Collect",c:"amber"},{e:"📊",n:"CloudWatch",r:"Create Alarms",c:"amber"},{e:"📢",n:"SNS",r:"Alert Team",c:"violet"}
    ]}
  ]
},

"awscloudformation": {
  setup: [
    {s:1, a:"Go to CloudFormation Console → Click 'Create Stack'", l:"CloudFormation > Stacks > Create"},
    {s:2, a:"Upload YAML/JSON template or use sample template", l:"Template source"},
    {s:3, a:"Enter stack name and configure parameters", l:"Parameters"},
    {s:4, a:"Review IAM capabilities acknowledgment", l:"Capabilities"},
    {s:5, a:"Click 'Submit' → Watch events tab as resources get created", l:"Stack events"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Store templates; create S3 via stacks", c:"Storage"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Create roles/policies via templates", c:"Security"},
    {id:"awslambda", n:"Lambda", d:"Deploy Lambda functions with code from S3", c:"Compute"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor stack creation events", c:"Management"}
  ],
  pipelines: [
    {name:"Full Infrastructure Deployment", desc:"Define everything as code", steps:[
      {e:"📦",n:"S3",r:"Upload Template",c:"green"},{e:"🏗️",n:"CloudFormation",r:"Create Stack",c:"amber"},{e:"🌐",n:"VPC+EC2+RDS",r:"Auto-Created",c:"blue"},{e:"📊",n:"CloudWatch",r:"Monitor",c:"amber"}
    ]}
  ]
},

// ======================== MORE SERVICES ========================
"awsamplify": {
  setup: [
    {s:1, a:"Go to Amplify Console → Click 'New App' > 'Host Web App'", l:"Amplify > All apps > New"},
    {s:2, a:"Connect your Git repository (GitHub, GitLab, Bitbucket)", l:"Repository selection"},
    {s:3, a:"Select branch, configure build settings (auto-detected)", l:"Build config"},
    {s:4, a:"Click 'Save and Deploy' → Amplify builds and hosts automatically", l:"Deployment"},
    {s:5, a:"Add a custom domain in Domain Management", l:"Domain settings"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Static asset hosting behind the scenes", c:"Storage"},
    {id:"amazoncloudfront", n:"CloudFront", d:"CDN distribution auto-configured", c:"Networking"},
    {id:"amazonroute53", n:"Route 53", d:"Custom domain setup", c:"Networking"},
    {id:"amazoncognito", n:"Cognito", d:"User authentication (sign-up, MFA)", c:"Security"},
    {id:"amazondynamodb", n:"DynamoDB", d:"NoSQL via Amplify DataStore", c:"Database"},
    {id:"awslambda", n:"Lambda", d:"Serverless functions for backend", c:"Compute"}
  ],
  pipelines: [
    {name:"Full-Stack React App", desc:"Git push to deploy full-stack", steps:[
      {e:"🐙",n:"GitHub",r:"Push Code",c:"lime"},{e:"🚀",n:"Amplify",r:"Build+Deploy",c:"lime"},{e:"👤",n:"Cognito",r:"Auth",c:"yellow"},{e:"🔄",n:"AppSync",r:"API",c:"violet"},{e:"💾",n:"DynamoDB",r:"Database",c:"red"}
    ]}
  ]
},

"awsfargate": {
  setup: [
    {s:1, a:"Go to ECS Console → Click 'Create Cluster'", l:"ECS > Clusters > Create"},
    {s:2, a:"Choose Fargate as infrastructure provider", l:"Cluster config"},
    {s:3, a:"Create Task Definition — container image, CPU, memory", l:"Task definitions"},
    {s:4, a:"Create Service — set desired task count and load balancer", l:"Service config"},
    {s:5, a:"Deploy → Fargate handles all server provisioning", l:"Service dashboard"}
  ],
  connections: [
    {id:"amazonelasticcontainerregistry", n:"ECR", d:"Container Registry stores Docker images", c:"Containers"},
    {id:"amazonelasticcontainerservice", n:"ECS", d:"Orchestration layer managing tasks", c:"Containers"},
    {id:"amazonvirtualprivatecloud", n:"VPC", d:"Tasks run in VPC subnets", c:"Networking"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Task execution roles", c:"Security"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Container logs and metrics", c:"Management"},
    {id:"amazonrds", n:"RDS", d:"Connect containers to databases", c:"Database"}
  ],
  pipelines: [
    {name:"Containerized Web Service", desc:"Docker container deployment", steps:[
      {e:"📦",n:"ECR",r:"Push Image",c:"purple"},{e:"📋",n:"ECS",r:"Task Definition",c:"purple"},{e:"🐳",n:"Fargate",r:"Run Tasks",c:"purple"},{e:"⚖️",n:"ALB",r:"Load Balancer",c:"blue"},{e:"🌐",n:"Route 53",r:"Domain",c:"blue"}
    ]}
  ]
},

"amazonelasticcontainerservice": {
  setup: [
    {s:1, a:"Go to ECS Console → Click 'Create Cluster'", l:"ECS > Clusters > Create"},
    {s:2, a:"Choose Fargate or EC2 infrastructure", l:"Cluster config"},
    {s:3, a:"Create Task Definition (container, ports, env vars, CPU, memory)", l:"Task definitions"},
    {s:4, a:"Create Service (desired count, deployment strategy, load balancer)", l:"Service config"},
    {s:5, a:"Deploy → Monitor tasks in cluster dashboard", l:"Cluster > Services"}
  ],
  connections: [
    {id:"amazonelasticcontainerregistry", n:"ECR", d:"Pull container images", c:"Containers"},
    {id:"awsfargate", n:"Fargate", d:"Run tasks without managing EC2", c:"Compute"},
    {id:"amazonvirtualprivatecloud", n:"VPC", d:"Network isolation", c:"Networking"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Task execution + task role", c:"Security"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Container logs and metrics", c:"Management"}
  ],
  pipelines: [
    {name:"Microservices on ECS", desc:"Run multiple services", steps:[
      {e:"📦",n:"ECR",r:"Push Images",c:"purple"},{e:"🐳",n:"ECS",r:"Create Cluster",c:"purple"},{e:"🐳",n:"ECS",r:"Service per App",c:"purple"},{e:"⚖️",n:"ALB",r:"Route Traffic",c:"blue"},{e:"📊",n:"CloudWatch",r:"Monitor",c:"amber"}
    ]}
  ]
},

"amazoncognito": {
  setup: [
    {s:1, a:"Go to Cognito Console → Click 'Create User Pool'", l:"Cognito > User Pools > Create"},
    {s:2, a:"Configure sign-in options (email, phone, username)", l:"Sign-in experience"},
    {s:3, a:"Set password policies and enable MFA", l:"Security settings"},
    {s:4, a:"Configure app client (for your web/mobile app)", l:"App integration"},
    {s:5, a:"Use Hosted UI or integrate via Amplify SDK", l:"Integration"}
  ],
  connections: [
    {id:"amazonapigateway", n:"API Gateway", d:"JWT authorizer validates tokens", c:"Networking"},
    {id:"awslambda", n:"Lambda", d:"Custom auth triggers", c:"Compute"},
    {id:"awsamplify", n:"Amplify", d:"Built-in auth library", c:"DevTools"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Identity pools map to IAM roles", c:"Security"},
    {id:"amazondynamodb", n:"DynamoDB", d:"User-specific data patterns", c:"Database"}
  ],
  pipelines: [
    {name:"Authenticated Web App", desc:"Add user login to your app", steps:[
      {e:"👤",n:"Cognito",r:"Create User Pool",c:"yellow"},{e:"👤",n:"Cognito",r:"App Client",c:"yellow"},{e:"🚪",n:"API Gateway",r:"JWT Authorizer",c:"blue"},{e:"⚡",n:"Lambda",r:"Protected",c:"purple"}
    ]}
  ]
},

"amazondatafirehose": {
  setup: [
    {s:1, a:"Go to Firehose Console → Click 'Create Delivery Stream'", l:"Firehose > Create"},
    {s:2, a:"Choose source (Direct PUT, Kinesis Data Stream)", l:"Source config"},
    {s:3, a:"Choose destination (S3, Redshift, OpenSearch, HTTP)", l:"Destination config"},
    {s:4, a:"Configure buffer size and interval (e.g. 5 MB or 60 seconds)", l:"Buffer settings"},
    {s:5, a:"Optionally enable data transformation via Lambda", l:"Transform config"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Primary destination for streaming data", c:"Storage"},
    {id:"amazonredshift", n:"Redshift", d:"Load streaming data into warehouse", c:"Analytics"},
    {id:"awslambda", n:"Lambda", d:"Transform data in-flight before delivery", c:"Compute"},
    {id:"amazonkinesis", n:"Kinesis", d:"Source data from Kinesis Streams", c:"Analytics"}
  ],
  pipelines: [
    {name:"Log Aggregation Pipeline", desc:"Collect and analyze logs", steps:[
      {e:"📡",n:"App",r:"Send Logs",c:"purple"},{e:"🔥",n:"Firehose",r:"Buffer",c:"teal"},{e:"⚡",n:"Lambda",r:"Transform",c:"purple"},{e:"📦",n:"S3",r:"Store",c:"green"},{e:"🔍",n:"Athena",r:"Analyze",c:"teal"}
    ]}
  ]
},

"amazonmq": {
  setup: [
    {s:1, a:"Go to Amazon MQ Console → Click 'Create Broker'", l:"Amazon MQ > Brokers > Create"},
    {s:2, a:"Choose engine (ActiveMQ or RabbitMQ) and deployment mode", l:"Engine selection"},
    {s:3, a:"Set broker name, instance type, and admin credentials", l:"Broker config"},
    {s:4, a:"Configure VPC, subnets, and security groups", l:"Network settings"},
    {s:5, a:"Click 'Create Broker' → Connect using endpoint URL", l:"Broker details"}
  ],
  connections: [
    {id:"amazonelasticcomputecloud", n:"EC2", d:"Application producers/consumers on EC2", c:"Compute"},
    {id:"awslambda", n:"Lambda", d:"Lambda can consume messages", c:"Compute"},
    {id:"amazonvirtualprivatecloud", n:"VPC", d:"Runs inside VPC for isolation", c:"Networking"},
    {id:"amazoncloudwatch", n:"CloudWatch", d:"Monitor broker metrics", c:"Management"}
  ],
  pipelines: [
    {name:"Legacy App Migration", desc:"Move message brokers to cloud", steps:[
      {e:"🌐",n:"VPC",r:"Private Network",c:"blue"},{e:"📨",n:"Amazon MQ",r:"Create Broker",c:"violet"},{e:"🖥️",n:"EC2",r:"Producer",c:"purple"},{e:"🖥️",n:"EC2",r:"Consumer",c:"purple"},{e:"📊",n:"CloudWatch",r:"Monitor",c:"amber"}
    ]}
  ]
},

"amazoncloudsearch": {
  setup: [
    {s:1, a:"Go to CloudSearch Console → Click 'Create Domain'", l:"CloudSearch > Create"},
    {s:2, a:"Define your index fields (text, int, date, etc.)", l:"Index config"},
    {s:3, a:"Upload sample documents in JSON/XML format", l:"Upload documents"},
    {s:4, a:"Configure access policies (IP-based or IAM)", l:"Access policies"},
    {s:5, a:"Use the search endpoint URL in your application", l:"Domain dashboard"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Batch upload documents from S3", c:"Storage"},
    {id:"awslambda", n:"Lambda", d:"Index new data and process results", c:"Compute"},
    {id:"amazondynamodb", n:"DynamoDB", d:"Sync DynamoDB data to search index", c:"Database"}
  ],
  pipelines: [
    {name:"App Search Engine", desc:"Add search to your app", steps:[
      {e:"💾",n:"DynamoDB",r:"Source Data",c:"red"},{e:"⚡",n:"Lambda",r:"Index",c:"purple"},{e:"🔎",n:"CloudSearch",r:"Search",c:"teal"},{e:"🖥️",n:"App",r:"Results",c:"purple"}
    ]}
  ]
},

"amazondatazone": {
  setup: [
    {s:1, a:"Go to DataZone Console → Click 'Create Domain'", l:"DataZone > Create domain"},
    {s:2, a:"Configure domain name and service role", l:"Domain settings"},
    {s:3, a:"Create a project within the domain", l:"Projects section"},
    {s:4, a:"Add data sources (S3, RDS, Redshift, Glue catalogs)", l:"Data sources"},
    {s:5, a:"Publish data assets for discovery by other teams", l:"Data catalog"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Discover and govern S3 data assets", c:"Storage"},
    {id:"awsglue", n:"Glue", d:"Integrates with Glue Data Catalog", c:"Analytics"},
    {id:"amazonredshift", n:"Redshift", d:"Catalog and share Redshift datasets", c:"Analytics"}
  ],
  pipelines: [
    {name:"Data Governance", desc:"Centralize data discovery", steps:[
      {e:"📦",n:"S3+RDS+Redshift",r:"Data Sources",c:"green"},{e:"🗂️",n:"DataZone",r:"Catalog",c:"teal"},{e:"👤",n:"Teams",r:"Discover+Query",c:"teal"}
    ]}
  ]
},

"amazonemr": {
  setup: [
    {s:1, a:"Go to EMR Console → Click 'Create Cluster'", l:"EMR > Clusters > Create"},
    {s:2, a:"Choose EMR release, select applications (Spark, Hive, Presto)", l:"Software config"},
    {s:3, a:"Select instance types and number of nodes", l:"Hardware config"},
    {s:4, a:"Set S3 log location and IAM roles", l:"General settings"},
    {s:5, a:"Click 'Create Cluster' → Submit Spark/Hive jobs", l:"Cluster dashboard"}
  ],
  connections: [
    {id:"amazonsimplestorageservice", n:"S3", d:"Input/output data, logs, scripts in S3", c:"Storage"},
    {id:"awsglue", n:"Glue", d:"Shared Data Catalog for Spark/Hive", c:"Analytics"},
    {id:"amazonelasticcomputecloud", n:"EC2", d:"EMR runs on EC2 instances", c:"Compute"},
    {id:"awsidentityandaccessmanagement", n:"IAM", d:"Service roles and instance profiles", c:"Security"}
  ],
  pipelines: [
    {name:"Big Data Processing", desc:"Process massive datasets", steps:[
      {e:"📦",n:"S3",r:"Raw Data",c:"green"},{e:"🔥",n:"EMR",r:"Spark Job",c:"teal"},{e:"📦",n:"S3",r:"Processed",c:"green"},{e:"🔍",n:"Athena/Redshift",r:"Query",c:"teal"}
    ]}
  ]
}

};

module.exports = playbookDB;
