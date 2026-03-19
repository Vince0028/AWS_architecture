// Auto-generated Playbook DB — 301 services
// Last updated: 2026-03-16
module.exports = {
  "amazonsimplestorageservice": {
    "setup": [
      {
        "s": 1,
        "a": "Go to S3 Console → Click 'Create Bucket'",
        "l": "S3 > Buckets > Create bucket"
      },
      {
        "s": 2,
        "a": "Enter a globally unique bucket name, select your region",
        "l": "Name + Region fields"
      },
      {
        "s": 3,
        "a": "Configure Block Public Access (ON=private, OFF+policy=public)",
        "l": "Block Public Access section"
      },
      {
        "s": 4,
        "a": "Enable Versioning (recommended), choose encryption (SSE-S3)",
        "l": "Properties tab"
      },
      {
        "s": 5,
        "a": "Click 'Create Bucket' → Upload files via drag-and-drop",
        "l": "Final confirmation"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN serves S3 content globally with caching",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "S3 events trigger Lambda functions on upload/delete",
        "c": "Compute"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "EC2 instances read/write S3 via SDK or CLI",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Bucket policies + IAM roles control access",
        "c": "Security"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query S3 data directly with SQL",
        "c": "Analytics"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store metadata in DynamoDB, files in S3",
        "c": "Database"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL jobs read/write data from S3 data lakes",
        "c": "Analytics"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Notify subscribers on object create/delete",
        "c": "Integration"
      },
      {
        "id": "amazonsimplequeueservice",
        "n": "SQS",
        "d": "Queue S3 event notifications for async processing",
        "c": "Integration"
      },
      {
        "id": "amazonredshift",
        "n": "Redshift",
        "d": "COPY/UNLOAD data between S3 and warehouse",
        "c": "Analytics"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "Alias record for S3 static website endpoint",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Automate bucket creation via IaC",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Static Website Hosting",
        "desc": "Host React/Vue/Next.js static site",
        "steps": [
          {
            "e": "🌐",
            "n": "Route 53",
            "r": "Domain",
            "c": "blue"
          },
          {
            "e": "🌐",
            "n": "CloudFront",
            "r": "CDN",
            "c": "blue"
          },
          {
            "e": "📦",
            "n": "S3",
            "r": "Static Files",
            "c": "green"
          },
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Bucket Policy",
            "c": "yellow"
          }
        ]
      },
      {
        "name": "Serverless File Upload API",
        "desc": "Users upload files via API",
        "steps": [
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Create Role",
            "c": "yellow"
          },
          {
            "e": "📦",
            "n": "S3",
            "r": "Create Bucket",
            "c": "green"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Signed URL",
            "c": "purple"
          },
          {
            "e": "🚪",
            "n": "API Gateway",
            "r": "Expose Endpoint",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Data Lake + Analytics",
        "desc": "Store raw data, query on-demand",
        "steps": [
          {
            "e": "📦",
            "n": "S3",
            "r": "Data Lake",
            "c": "green"
          },
          {
            "e": "🔄",
            "n": "Glue",
            "r": "ETL Crawler",
            "c": "teal"
          },
          {
            "e": "🔍",
            "n": "Athena",
            "r": "SQL Query",
            "c": "teal"
          },
          {
            "e": "📊",
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "teal"
          }
        ]
      }
    ]
  },
  "amazonelasticcomputecloud": {
    "setup": [
      {
        "s": 1,
        "a": "Go to EC2 Console → Click 'Launch Instance'",
        "l": "EC2 > Instances > Launch"
      },
      {
        "s": 2,
        "a": "Name your instance, choose AMI (Amazon Linux 2023 / Ubuntu)",
        "l": "Name + AMI selection"
      },
      {
        "s": 3,
        "a": "Select Instance Type (t2.micro = free tier), create Key Pair",
        "l": "Instance type + Key pair"
      },
      {
        "s": 4,
        "a": "Configure Security Group — open ports 22 (SSH), 80 (HTTP), 443 (HTTPS)",
        "l": "Network settings"
      },
      {
        "s": 5,
        "a": "Click 'Launch Instance' → Connect via SSH using key pair",
        "l": "Launch confirmation"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Read/write files from EC2 using SDK or CLI",
        "c": "Storage"
      },
      {
        "id": "amazonrds",
        "n": "RDS",
        "d": "EC2 app connects to RDS database via private endpoint",
        "c": "Database"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance roles give EC2 permissions without keys",
        "c": "Security"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "EC2 lives inside VPC with subnets and security groups",
        "c": "Networking"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "Cache and accelerate content served by EC2",
        "c": "Networking"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "Point domain to EC2 public IP or Load Balancer",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Create EC2 infrastructure from templates",
        "c": "Management"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, disk metrics and set alarms",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Classic Web Server",
        "desc": "Simple server with domain",
        "steps": [
          {
            "e": "🌐",
            "n": "VPC",
            "r": "Create Network",
            "c": "blue"
          },
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Instance Role",
            "c": "yellow"
          },
          {
            "e": "🖥️",
            "n": "EC2",
            "r": "Launch Server",
            "c": "purple"
          },
          {
            "e": "🌐",
            "n": "Route 53",
            "r": "Domain",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Scalable Web App",
        "desc": "Auto-scaling behind load balancer",
        "steps": [
          {
            "e": "🌐",
            "n": "VPC",
            "r": "Subnets",
            "c": "blue"
          },
          {
            "e": "🖥️",
            "n": "EC2",
            "r": "Launch Template",
            "c": "purple"
          },
          {
            "e": "📈",
            "n": "Auto Scaling",
            "r": "Group",
            "c": "purple"
          },
          {
            "e": "⚖️",
            "n": "ELB",
            "r": "Load Balancer",
            "c": "blue"
          },
          {
            "e": "🌐",
            "n": "Route 53",
            "r": "DNS",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Full-Stack with Database",
        "desc": "App server + managed database",
        "steps": [
          {
            "e": "🌐",
            "n": "VPC",
            "r": "Network",
            "c": "blue"
          },
          {
            "e": "💾",
            "n": "RDS",
            "r": "Database",
            "c": "red"
          },
          {
            "e": "🖥️",
            "n": "EC2",
            "r": "App Server",
            "c": "purple"
          },
          {
            "e": "⚖️",
            "n": "ELB",
            "r": "Load Balancer",
            "c": "blue"
          },
          {
            "e": "🌐",
            "n": "CloudFront",
            "r": "CDN",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "awslambda": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Lambda Console → Click 'Create Function'",
        "l": "Lambda > Functions > Create"
      },
      {
        "s": 2,
        "a": "Choose 'Author from scratch', name it, select runtime (Node.js / Python)",
        "l": "Function config"
      },
      {
        "s": 3,
        "a": "Assign an IAM execution role (create new or use existing)",
        "l": "Permissions section"
      },
      {
        "s": 4,
        "a": "Write or paste your function code in the inline editor",
        "l": "Code tab"
      },
      {
        "s": 5,
        "a": "Click 'Deploy' → Test with a sample event",
        "l": "Deploy + Test buttons"
      }
    ],
    "connections": [
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "REST/HTTP API triggers Lambda on every request",
        "c": "Networking"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "S3 events (upload, delete) trigger Lambda",
        "c": "Storage"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "DynamoDB Streams trigger Lambda on data changes",
        "c": "Database"
      },
      {
        "id": "amazonsimplequeueservice",
        "n": "SQS",
        "d": "Lambda polls SQS queue and processes messages",
        "c": "Integration"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "SNS pushes notifications to Lambda",
        "c": "Integration"
      },
      {
        "id": "amazoneventbridge",
        "n": "EventBridge",
        "d": "Schedule Lambda like a cron job",
        "c": "Integration"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor Lambda logs, errors, duration",
        "c": "Management"
      },
      {
        "id": "awsstepfunctions",
        "n": "Step Functions",
        "d": "Orchestrate multiple Lambdas in a workflow",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Execution role defines what Lambda can access",
        "c": "Security"
      },
      {
        "id": "amazonrds",
        "n": "RDS",
        "d": "Connect to databases via RDS Proxy",
        "c": "Database"
      }
    ],
    "pipelines": [
      {
        "name": "Serverless REST API",
        "desc": "The classic serverless backend",
        "steps": [
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Create Role",
            "c": "yellow"
          },
          {
            "e": "💾",
            "n": "DynamoDB",
            "r": "Create Table",
            "c": "red"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Write Function",
            "c": "purple"
          },
          {
            "e": "🚪",
            "n": "API Gateway",
            "r": "Expose URL",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Event-Driven File Processing",
        "desc": "React to S3 uploads automatically",
        "steps": [
          {
            "e": "📦",
            "n": "S3",
            "r": "Upload Trigger",
            "c": "green"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Process File",
            "c": "purple"
          },
          {
            "e": "💾",
            "n": "DynamoDB",
            "r": "Store Metadata",
            "c": "red"
          },
          {
            "e": "📢",
            "n": "SNS",
            "r": "Notify User",
            "c": "violet"
          }
        ]
      },
      {
        "name": "Scheduled Cron Job",
        "desc": "Run tasks on a schedule",
        "steps": [
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Create Role",
            "c": "yellow"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Write Function",
            "c": "purple"
          },
          {
            "e": "⏰",
            "n": "EventBridge",
            "r": "Schedule Rule",
            "c": "violet"
          },
          {
            "e": "📊",
            "n": "CloudWatch",
            "r": "Monitor Logs",
            "c": "amber"
          }
        ]
      }
    ]
  },
  "awsidentityandaccessmanagement": {
    "setup": [
      {
        "s": 1,
        "a": "Go to IAM Console → Navigate to Users / Roles / Policies",
        "l": "IAM > Dashboard"
      },
      {
        "s": 2,
        "a": "Click 'Create User' → set username, enable console/programmatic access",
        "l": "IAM > Users > Create"
      },
      {
        "s": 3,
        "a": "Attach policies (use managed like AmazonS3ReadOnlyAccess or create custom)",
        "l": "Permissions tab"
      },
      {
        "s": 4,
        "a": "For services: 'Create Role' → select trusted entity (Lambda, EC2)",
        "l": "IAM > Roles > Create"
      },
      {
        "s": 5,
        "a": "Enable MFA on root and all human users",
        "l": "Security credentials tab"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Execution roles define what Lambda can do",
        "c": "Compute"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Instance profiles let EC2 assume roles",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Bucket policies + IAM policies control access",
        "c": "Storage"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "Federated identities mapped to IAM roles",
        "c": "Security"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "IAM authorization on API endpoints",
        "c": "Networking"
      },
      {
        "id": "awscloudtrail",
        "n": "CloudTrail",
        "d": "Audit all IAM API calls",
        "c": "Management"
      },
      {
        "id": "awsorganizations",
        "n": "Organizations",
        "d": "Service Control Policies for multi-account",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Secure Multi-User Setup",
        "desc": "Set up team access properly",
        "steps": [
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Create Admin Group",
            "c": "yellow"
          },
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Create Users",
            "c": "yellow"
          },
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Attach Policies",
            "c": "yellow"
          },
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Enable MFA",
            "c": "yellow"
          }
        ]
      },
      {
        "name": "Service-to-Service Trust",
        "desc": "Let AWS services talk to each other",
        "steps": [
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Create Policy",
            "c": "yellow"
          },
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Create Role",
            "c": "yellow"
          },
          {
            "e": "⚡",
            "n": "Lambda/EC2",
            "r": "Attach Role",
            "c": "purple"
          },
          {
            "e": "📋",
            "n": "CloudTrail",
            "r": "Audit",
            "c": "amber"
          }
        ]
      }
    ]
  },
  "amazondynamodb": {
    "setup": [
      {
        "s": 1,
        "a": "Go to DynamoDB Console → Click 'Create Table'",
        "l": "DynamoDB > Tables > Create"
      },
      {
        "s": 2,
        "a": "Enter Table name, define Partition Key (e.g. userId string)",
        "l": "Table settings"
      },
      {
        "s": 3,
        "a": "Optionally add a Sort Key for composite queries",
        "l": "Sort key field"
      },
      {
        "s": 4,
        "a": "Choose capacity: On-demand (pay per request) or Provisioned",
        "l": "Capacity settings"
      },
      {
        "s": 5,
        "a": "Click 'Create Table' → Add items via console or SDK",
        "l": "Items explorer"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "CRUD operations + Streams trigger Lambda",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Direct integration or via Lambda for REST",
        "c": "Networking"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store large files in S3, metadata in DynamoDB",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Fine-grained access control per table/item",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor read/write capacity, throttles, errors",
        "c": "Management"
      },
      {
        "id": "awsappsync",
        "n": "AppSync",
        "d": "GraphQL API with DynamoDB resolvers",
        "c": "Integration"
      },
      {
        "id": "awsstepfunctions",
        "n": "Step Functions",
        "d": "Multi-step workflows interacting with DynamoDB",
        "c": "Integration"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL from DynamoDB to S3/Redshift",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Simple CRUD Backend",
        "desc": "Standard serverless database pattern",
        "steps": [
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Create Role",
            "c": "yellow"
          },
          {
            "e": "💾",
            "n": "DynamoDB",
            "r": "Create Table",
            "c": "red"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "CRUD Functions",
            "c": "purple"
          },
          {
            "e": "🚪",
            "n": "API Gateway",
            "r": "REST API",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Real-Time Stream Processing",
        "desc": "React to database changes",
        "steps": [
          {
            "e": "💾",
            "n": "DynamoDB",
            "r": "Enable Streams",
            "c": "red"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Stream Processor",
            "c": "purple"
          },
          {
            "e": "📢",
            "n": "SNS",
            "r": "Notify",
            "c": "violet"
          },
          {
            "e": "📊",
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "amber"
          }
        ]
      }
    ]
  },
  "amazonrds": {
    "setup": [
      {
        "s": 1,
        "a": "Go to RDS Console → Click 'Create Database'",
        "l": "RDS > Databases > Create"
      },
      {
        "s": 2,
        "a": "Choose engine: PostgreSQL / MySQL / Aurora",
        "l": "Engine selection"
      },
      {
        "s": 3,
        "a": "Select Free Tier template, set Master username + password",
        "l": "Template + credentials"
      },
      {
        "s": 4,
        "a": "Configure VPC, Subnet Group, Security Group (open port 3306/5432)",
        "l": "Connectivity section"
      },
      {
        "s": 5,
        "a": "Click 'Create Database' → Copy the endpoint URL for your app",
        "l": "Database details"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "App on EC2 connects to RDS via VPC",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Connect via RDS Proxy for connection pooling",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "RDS runs inside VPC with security groups",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "IAM database authentication",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, connections, storage, IOPS",
        "c": "Management"
      },
      {
        "id": "awssecretsmanager",
        "n": "Secrets Manager",
        "d": "Securely rotate database credentials",
        "c": "Security"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Define RDS instances as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Traditional Web App Database",
        "desc": "Classic EC2 + RDS pattern",
        "steps": [
          {
            "e": "🌐",
            "n": "VPC",
            "r": "Private Subnets",
            "c": "blue"
          },
          {
            "e": "💾",
            "n": "RDS",
            "r": "Create Database",
            "c": "red"
          },
          {
            "e": "🔑",
            "n": "Secrets Manager",
            "r": "Store Creds",
            "c": "yellow"
          },
          {
            "e": "🖥️",
            "n": "EC2",
            "r": "Connect App",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Serverless + RDS",
        "desc": "Lambda with database access",
        "steps": [
          {
            "e": "🌐",
            "n": "VPC",
            "r": "Subnets",
            "c": "blue"
          },
          {
            "e": "💾",
            "n": "RDS",
            "r": "Database",
            "c": "red"
          },
          {
            "e": "💾",
            "n": "RDS Proxy",
            "r": "Pool Connections",
            "c": "red"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Query DB",
            "c": "purple"
          },
          {
            "e": "🚪",
            "n": "API Gateway",
            "r": "Expose",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "amazonvirtualprivatecloud": {
    "setup": [
      {
        "s": 1,
        "a": "Go to VPC Console → Click 'Create VPC'",
        "l": "VPC > Your VPCs > Create"
      },
      {
        "s": 2,
        "a": "Choose 'VPC and more' to auto-create subnets + route tables + IGW",
        "l": "VPC wizard"
      },
      {
        "s": 3,
        "a": "Set CIDR block (e.g. 10.0.0.0/16)",
        "l": "IPv4 CIDR"
      },
      {
        "s": 4,
        "a": "Configure public subnets (web) and private subnets (databases)",
        "l": "Subnet config"
      },
      {
        "s": 5,
        "a": "Attach Internet Gateway for public internet access",
        "l": "Route table + IGW"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "All EC2 instances launch inside VPC subnets",
        "c": "Compute"
      },
      {
        "id": "amazonrds",
        "n": "RDS",
        "d": "Database instances in private VPC subnets",
        "c": "Database"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Lambda can run inside VPC for private access",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "VPC endpoint policies",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "VPC Flow Logs monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Standard 3-Tier Network",
        "desc": "Public + private subnet architecture",
        "steps": [
          {
            "e": "🌐",
            "n": "VPC",
            "r": "Create",
            "c": "blue"
          },
          {
            "e": "🌐",
            "n": "Subnets",
            "r": "Public + Private",
            "c": "blue"
          },
          {
            "e": "🚪",
            "n": "IGW",
            "r": "Internet Gateway",
            "c": "blue"
          },
          {
            "e": "🔒",
            "n": "NAT GW",
            "r": "Private Outbound",
            "c": "blue"
          },
          {
            "e": "📋",
            "n": "Routes",
            "r": "Route Tables",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "amazonapigateway": {
    "setup": [
      {
        "s": 1,
        "a": "Go to API Gateway Console → Click 'Create API'",
        "l": "API Gateway > Create"
      },
      {
        "s": 2,
        "a": "Choose HTTP API (simpler/cheaper) or REST API (full-featured)",
        "l": "API type selection"
      },
      {
        "s": 3,
        "a": "Add routes/resources (e.g. GET /users, POST /users)",
        "l": "Routes section"
      },
      {
        "s": 4,
        "a": "Attach Lambda integration to each route",
        "l": "Integration target"
      },
      {
        "s": 5,
        "a": "Click 'Deploy' to a stage (dev/prod) → Copy invoke URL",
        "l": "Deploy button"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Primary backend — invokes Lambda per request",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "IAM-based API authorization",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "JWT-based user authentication",
        "c": "Security"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Direct integration without Lambda",
        "c": "Database"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Log all API requests, monitor latency",
        "c": "Management"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Protect APIs from attacks",
        "c": "Security"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN caching for API responses",
        "c": "Networking"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "Map custom domain to API endpoint",
        "c": "Networking"
      }
    ],
    "pipelines": [
      {
        "name": "Full Serverless API",
        "desc": "Complete API with database",
        "steps": [
          {
            "e": "🔐",
            "n": "IAM",
            "r": "Roles",
            "c": "yellow"
          },
          {
            "e": "💾",
            "n": "DynamoDB",
            "r": "Table",
            "c": "red"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Functions",
            "c": "purple"
          },
          {
            "e": "🚪",
            "n": "API Gateway",
            "r": "Routes",
            "c": "blue"
          },
          {
            "e": "🌐",
            "n": "Route 53",
            "r": "Custom Domain",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Authenticated API",
        "desc": "API with user auth",
        "steps": [
          {
            "e": "👤",
            "n": "Cognito",
            "r": "User Pool",
            "c": "yellow"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Functions",
            "c": "purple"
          },
          {
            "e": "🚪",
            "n": "API Gateway",
            "r": "JWT Authorizer",
            "c": "blue"
          },
          {
            "e": "🛡️",
            "n": "WAF",
            "r": "Rate Limiting",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazoncloudfront": {
    "setup": [
      {
        "s": 1,
        "a": "Go to CloudFront Console → Click 'Create Distribution'",
        "l": "CloudFront > Create"
      },
      {
        "s": 2,
        "a": "Set Origin Domain to S3 bucket, EC2, or ALB endpoint",
        "l": "Origin settings"
      },
      {
        "s": 3,
        "a": "Configure Cache Behavior (default: cache everything, TTL)",
        "l": "Behavior settings"
      },
      {
        "s": 4,
        "a": "Add Alternate Domain (CNAME) and attach ACM SSL Certificate",
        "l": "Settings section"
      },
      {
        "s": 5,
        "a": "Click 'Create Distribution' → Update Route 53 to point here",
        "l": "DNS config"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Origin for static sites, images, videos",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "Alias record pointing domain to CloudFront",
        "c": "Networking"
      },
      {
        "id": "awscertificatemanager",
        "n": "ACM",
        "d": "Free SSL certificates for custom domains",
        "c": "Security"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Protect distribution from web attacks",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor cache hit rates, request counts",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda@Edge",
        "d": "Run code at CDN edge locations",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Global Static Website",
        "desc": "CDN-backed static site",
        "steps": [
          {
            "e": "📦",
            "n": "S3",
            "r": "Upload Files",
            "c": "green"
          },
          {
            "e": "🌐",
            "n": "CloudFront",
            "r": "Distribution",
            "c": "blue"
          },
          {
            "e": "🔒",
            "n": "ACM",
            "r": "SSL Cert",
            "c": "yellow"
          },
          {
            "e": "🌐",
            "n": "Route 53",
            "r": "Custom Domain",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "amazonroute53": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Route 53 Console → Click 'Create Hosted Zone'",
        "l": "Route 53 > Hosted Zones"
      },
      {
        "s": 2,
        "a": "Enter your domain name → create hosted zone",
        "l": "Domain name field"
      },
      {
        "s": 3,
        "a": "Add DNS Records: A record, CNAME, or Alias to resources",
        "l": "Record sets"
      },
      {
        "s": 4,
        "a": "If external registrar, update nameservers to Route 53's NS records",
        "l": "NS records"
      },
      {
        "s": 5,
        "a": "Enable health checks for failover routing (optional)",
        "l": "Health checks"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "Alias record to CloudFront distribution",
        "c": "Networking"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "A record to EC2 Elastic IP",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Custom domain mapping",
        "c": "Networking"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Alias for S3 static website endpoint",
        "c": "Storage"
      },
      {
        "id": "awscertificatemanager",
        "n": "ACM",
        "d": "DNS validation for SSL certificates",
        "c": "Security"
      }
    ],
    "pipelines": [
      {
        "name": "Domain → AWS Resource",
        "desc": "Connect your domain to AWS",
        "steps": [
          {
            "e": "🌐",
            "n": "Route 53",
            "r": "Register Domain",
            "c": "blue"
          },
          {
            "e": "🌐",
            "n": "Route 53",
            "r": "Hosted Zone",
            "c": "blue"
          },
          {
            "e": "🔒",
            "n": "ACM",
            "r": "Request Cert",
            "c": "yellow"
          },
          {
            "e": "🌐",
            "n": "Route 53",
            "r": "Alias Record",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "amazonsimplequeueservice": {
    "setup": [
      {
        "s": 1,
        "a": "Go to SQS Console → Click 'Create Queue'",
        "l": "SQS > Queues > Create"
      },
      {
        "s": 2,
        "a": "Choose Standard (best-effort ordering) or FIFO (strict)",
        "l": "Queue type"
      },
      {
        "s": 3,
        "a": "Set visibility timeout (how long message hidden while processing)",
        "l": "Configuration"
      },
      {
        "s": 4,
        "a": "Configure Dead-letter Queue for failed messages",
        "l": "DLQ settings"
      },
      {
        "s": 5,
        "a": "Click 'Create Queue' → Send a test message",
        "l": "Queue actions"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Lambda polls SQS and processes messages",
        "c": "Compute"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "SNS fan-out to multiple SQS queues",
        "c": "Integration"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "S3 event notifications sent to SQS",
        "c": "Storage"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "API can push messages into SQS",
        "c": "Networking"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor queue depth, message age",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Async Worker Pattern",
        "desc": "Decouple request from processing",
        "steps": [
          {
            "e": "🚪",
            "n": "API Gateway",
            "r": "Receive Request",
            "c": "blue"
          },
          {
            "e": "📬",
            "n": "SQS",
            "r": "Queue Message",
            "c": "violet"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Process",
            "c": "purple"
          },
          {
            "e": "💾",
            "n": "DynamoDB",
            "r": "Store Result",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonsimplenotificationservice": {
    "setup": [
      {
        "s": 1,
        "a": "Go to SNS Console → Click 'Create Topic'",
        "l": "SNS > Topics > Create"
      },
      {
        "s": 2,
        "a": "Choose Standard or FIFO topic, name it",
        "l": "Topic type"
      },
      {
        "s": 3,
        "a": "Click 'Create Subscription' → protocol (Email/SQS/Lambda/HTTP)",
        "l": "Subscription"
      },
      {
        "s": 4,
        "a": "Enter endpoint (email address, SQS ARN, Lambda ARN)",
        "l": "Endpoint field"
      },
      {
        "s": 5,
        "a": "Confirm subscription (email requires clicking link)",
        "l": "Confirmation"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplequeueservice",
        "n": "SQS",
        "d": "Fan-out: one SNS message → multiple queues",
        "c": "Integration"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "SNS triggers Lambda on new messages",
        "c": "Compute"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "CloudWatch Alarms trigger SNS",
        "c": "Management"
      },
      {
        "id": "amazoneventbridge",
        "n": "EventBridge",
        "d": "Forward specific events to SNS",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Alert System",
        "desc": "Get notified when things go wrong",
        "steps": [
          {
            "e": "📊",
            "n": "CloudWatch",
            "r": "Alarm Triggers",
            "c": "amber"
          },
          {
            "e": "📢",
            "n": "SNS",
            "r": "Topic",
            "c": "violet"
          },
          {
            "e": "📧",
            "n": "Email/SMS",
            "r": "Notify Team",
            "c": "violet"
          }
        ]
      }
    ]
  },
  "awsstepfunctions": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Step Functions Console → Click 'Create State Machine'",
        "l": "Step Functions > Create"
      },
      {
        "s": 2,
        "a": "Choose Visual workflow studio or write ASL (JSON)",
        "l": "Design mode"
      },
      {
        "s": 3,
        "a": "Drag-and-drop Lambda tasks, Wait states, Choice states",
        "l": "Workflow canvas"
      },
      {
        "s": 4,
        "a": "Configure IAM execution role",
        "l": "Permissions"
      },
      {
        "s": 5,
        "a": "Click 'Create' → Start execution → Watch graph turn green",
        "l": "Execution view"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Most common — invoke Lambda at each step",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Direct read/write without Lambda",
        "c": "Database"
      },
      {
        "id": "amazonsimplequeueservice",
        "n": "SQS",
        "d": "Send messages from workflow",
        "c": "Integration"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications from steps",
        "c": "Integration"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Start workflows from API calls",
        "c": "Networking"
      },
      {
        "id": "amazoneventbridge",
        "n": "EventBridge",
        "d": "Schedule workflow executions",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Order Processing Pipeline",
        "desc": "Multi-step business logic",
        "steps": [
          {
            "e": "🚪",
            "n": "API Gateway",
            "r": "Receive Order",
            "c": "blue"
          },
          {
            "e": "🔄",
            "n": "Step Functions",
            "r": "Start",
            "c": "violet"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Validate",
            "c": "purple"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Charge",
            "c": "purple"
          },
          {
            "e": "📢",
            "n": "SNS",
            "r": "Confirm",
            "c": "violet"
          }
        ]
      }
    ]
  },
  "amazoneventbridge": {
    "setup": [
      {
        "s": 1,
        "a": "Go to EventBridge Console → Click 'Create Rule'",
        "l": "EventBridge > Rules > Create"
      },
      {
        "s": 2,
        "a": "Choose Schedule (cron/rate) or Event Pattern (AWS events)",
        "l": "Rule type"
      },
      {
        "s": 3,
        "a": "For cron: enter expression like cron(0 12 * * ? *) for noon daily",
        "l": "Schedule config"
      },
      {
        "s": 4,
        "a": "Set target: Lambda, SQS, SNS, Step Functions, etc.",
        "l": "Target selection"
      },
      {
        "s": 5,
        "a": "Click 'Create' → Rule fires automatically",
        "l": "Rule dashboard"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Most common target — scheduled invocation",
        "c": "Compute"
      },
      {
        "id": "awsstepfunctions",
        "n": "Step Functions",
        "d": "Start workflows on schedule",
        "c": "Integration"
      },
      {
        "id": "amazonsimplequeueservice",
        "n": "SQS",
        "d": "Route events to queues",
        "c": "Integration"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications on events",
        "c": "Integration"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor rule invocations",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Scheduled Cron Job",
        "desc": "Run tasks automatically",
        "steps": [
          {
            "e": "⏰",
            "n": "EventBridge",
            "r": "Cron Rule",
            "c": "violet"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Execute Task",
            "c": "purple"
          },
          {
            "e": "💾",
            "n": "DynamoDB/S3",
            "r": "Store Results",
            "c": "red"
          },
          {
            "e": "📢",
            "n": "SNS",
            "r": "Notify on Fail",
            "c": "violet"
          }
        ]
      }
    ]
  },
  "amazonathena": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Athena Console → Set query result location (S3 bucket)",
        "l": "Athena > Settings"
      },
      {
        "s": 2,
        "a": "Create a database using CREATE DATABASE mydb;",
        "l": "Query editor"
      },
      {
        "s": 3,
        "a": "Create a table pointing to S3 data with column definitions",
        "l": "DDL query"
      },
      {
        "s": 4,
        "a": "Run SQL queries directly on your S3 data",
        "l": "Query editor"
      },
      {
        "s": 5,
        "a": "Optionally use Glue Crawler to auto-discover schemas",
        "l": "Glue integration"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Queries data stored in S3 directly",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "Glue Data Catalog provides metadata/schema",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control who can query which tables",
        "c": "Security"
      }
    ],
    "pipelines": [
      {
        "name": "Ad-Hoc Data Analysis",
        "desc": "Query S3 data with SQL",
        "steps": [
          {
            "e": "📦",
            "n": "S3",
            "r": "Store Raw Data",
            "c": "green"
          },
          {
            "e": "🔄",
            "n": "Glue",
            "r": "Discover Schema",
            "c": "teal"
          },
          {
            "e": "🔍",
            "n": "Athena",
            "r": "Run SQL",
            "c": "teal"
          },
          {
            "e": "📊",
            "n": "QuickSight",
            "r": "Visualize",
            "c": "teal"
          }
        ]
      }
    ]
  },
  "amazonredshift": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Redshift Console → Click 'Create Cluster'",
        "l": "Redshift > Clusters > Create"
      },
      {
        "s": 2,
        "a": "Choose node type (dc2.large for dev) and number of nodes",
        "l": "Cluster config"
      },
      {
        "s": 3,
        "a": "Set admin username + password, configure VPC",
        "l": "Credentials + network"
      },
      {
        "s": 4,
        "a": "Click 'Create Cluster' → Use Query Editor v2 to run SQL",
        "l": "Query Editor"
      },
      {
        "s": 5,
        "a": "Load data from S3 using COPY command",
        "l": "SQL command"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "COPY loads data from S3; UNLOAD exports to S3",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL jobs prepare and load data",
        "c": "Analytics"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Federated queries across Redshift and S3",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Cluster roles for S3 access",
        "c": "Security"
      }
    ],
    "pipelines": [
      {
        "name": "Data Warehouse",
        "desc": "Central analytics database",
        "steps": [
          {
            "e": "📦",
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "e": "🔄",
            "n": "Glue",
            "r": "ETL",
            "c": "teal"
          },
          {
            "e": "🏢",
            "n": "Redshift",
            "r": "Load & Query",
            "c": "teal"
          },
          {
            "e": "📊",
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "teal"
          }
        ]
      }
    ]
  },
  "amazonkinesis": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Kinesis Console → Click 'Create Data Stream'",
        "l": "Kinesis > Data Streams > Create"
      },
      {
        "s": 2,
        "a": "Enter stream name and set shard count (or use on-demand)",
        "l": "Stream config"
      },
      {
        "s": 3,
        "a": "Use AWS SDK in your app to put records into the stream",
        "l": "Producer code"
      },
      {
        "s": 4,
        "a": "Set up a consumer (Lambda, Kinesis Data Analytics, or custom)",
        "l": "Consumer config"
      },
      {
        "s": 5,
        "a": "Monitor via CloudWatch metrics",
        "l": "Monitoring tab"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Consume stream records with Lambda",
        "c": "Compute"
      },
      {
        "id": "amazondatafirehose",
        "n": "Firehose",
        "d": "Buffer and deliver stream data to S3",
        "c": "Analytics"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Final destination for streamed data",
        "c": "Storage"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store processed stream results",
        "c": "Database"
      }
    ],
    "pipelines": [
      {
        "name": "Real-Time Analytics",
        "desc": "Process streaming data",
        "steps": [
          {
            "e": "📡",
            "n": "App/IoT",
            "r": "Produce Records",
            "c": "cyan"
          },
          {
            "e": "🌊",
            "n": "Kinesis",
            "r": "Stream",
            "c": "teal"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Transform",
            "c": "purple"
          },
          {
            "e": "🔥",
            "n": "Firehose",
            "r": "Deliver",
            "c": "teal"
          },
          {
            "e": "📦",
            "n": "S3",
            "r": "Store",
            "c": "green"
          }
        ]
      }
    ]
  },
  "awsglue": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Glue Console → Click 'Add Crawler'",
        "l": "Glue > Crawlers > Create"
      },
      {
        "s": 2,
        "a": "Point crawler at your S3 data source",
        "l": "Data source config"
      },
      {
        "s": 3,
        "a": "Assign IAM role with S3 and Glue permissions",
        "l": "IAM role selection"
      },
      {
        "s": 4,
        "a": "Set target database in Glue Data Catalog",
        "l": "Output config"
      },
      {
        "s": 5,
        "a": "Run the crawler → auto-discovers schemas + creates tables",
        "l": "Run crawler"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Primary data source and target for ETL",
        "c": "Storage"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Uses Glue Data Catalog for table definitions",
        "c": "Analytics"
      },
      {
        "id": "amazonredshift",
        "n": "Redshift",
        "d": "ETL jobs load data into Redshift",
        "c": "Analytics"
      },
      {
        "id": "amazonrds",
        "n": "RDS",
        "d": "ETL from relational databases",
        "c": "Database"
      }
    ],
    "pipelines": [
      {
        "name": "Automated Data Pipeline",
        "desc": "Discover, transform, query",
        "steps": [
          {
            "e": "📦",
            "n": "S3",
            "r": "Raw Data Lands",
            "c": "green"
          },
          {
            "e": "🔄",
            "n": "Glue",
            "r": "Crawl Schema",
            "c": "teal"
          },
          {
            "e": "🔄",
            "n": "Glue",
            "r": "ETL Job",
            "c": "teal"
          },
          {
            "e": "📦",
            "n": "S3",
            "r": "Clean Data",
            "c": "green"
          },
          {
            "e": "🔍",
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          }
        ]
      }
    ]
  },
  "amazonsagemaker": {
    "setup": [
      {
        "s": 1,
        "a": "Go to SageMaker Console → Open Studio or create Notebook Instance",
        "l": "SageMaker > Notebooks"
      },
      {
        "s": 2,
        "a": "Create notebook, import dataset from S3",
        "l": "Jupyter environment"
      },
      {
        "s": 3,
        "a": "Use built-in algorithm or bring your own training script",
        "l": "Training config"
      },
      {
        "s": 4,
        "a": "Click 'Create Training Job' → select instance and S3 paths",
        "l": "Training jobs"
      },
      {
        "s": 5,
        "a": "Deploy trained model as a real-time endpoint",
        "l": "Endpoints section"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data, models, outputs",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke SageMaker endpoints for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose ML models as REST APIs",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Execution roles for accessing services",
        "c": "Security"
      }
    ],
    "pipelines": [
      {
        "name": "ML API",
        "desc": "Train and serve ML model",
        "steps": [
          {
            "e": "📦",
            "n": "S3",
            "r": "Upload Data",
            "c": "green"
          },
          {
            "e": "🧠",
            "n": "SageMaker",
            "r": "Train Model",
            "c": "pink"
          },
          {
            "e": "🧠",
            "n": "SageMaker",
            "r": "Deploy Endpoint",
            "c": "pink"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Invoke",
            "c": "purple"
          },
          {
            "e": "🚪",
            "n": "API Gateway",
            "r": "Expose",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "amazoncloudwatch": {
    "setup": [
      {
        "s": 1,
        "a": "Go to CloudWatch Console — metrics auto-collected for most services",
        "l": "CloudWatch > Metrics"
      },
      {
        "s": 2,
        "a": "Create Dashboard → add widgets for CPU, memory, errors",
        "l": "Dashboards > Create"
      },
      {
        "s": 3,
        "a": "Create Alarm → select metric, set threshold, link to SNS",
        "l": "Alarms > Create"
      },
      {
        "s": 4,
        "a": "View Log Groups for Lambda, EC2, API Gateway logs",
        "l": "Logs > Log groups"
      },
      {
        "s": 5,
        "a": "Create Metric Filters to extract custom metrics from logs",
        "l": "Log group actions"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "All Lambda logs go here automatically",
        "c": "Compute"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "CPU, network, disk metrics",
        "c": "Compute"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alarms trigger SNS notifications",
        "c": "Integration"
      },
      {
        "id": "amazonrds",
        "n": "RDS",
        "d": "Database metrics and insights",
        "c": "Database"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Request count, latency, error rates",
        "c": "Networking"
      }
    ],
    "pipelines": [
      {
        "name": "Full Observability Stack",
        "desc": "Monitor everything",
        "steps": [
          {
            "e": "⚡",
            "n": "Lambda/EC2/RDS",
            "r": "Emit Metrics",
            "c": "purple"
          },
          {
            "e": "📊",
            "n": "CloudWatch",
            "r": "Collect",
            "c": "amber"
          },
          {
            "e": "📊",
            "n": "CloudWatch",
            "r": "Create Alarms",
            "c": "amber"
          },
          {
            "e": "📢",
            "n": "SNS",
            "r": "Alert Team",
            "c": "violet"
          }
        ]
      }
    ]
  },
  "awscloudformation": {
    "setup": [
      {
        "s": 1,
        "a": "Go to CloudFormation Console → Click 'Create Stack'",
        "l": "CloudFormation > Stacks > Create"
      },
      {
        "s": 2,
        "a": "Upload YAML/JSON template or use sample template",
        "l": "Template source"
      },
      {
        "s": 3,
        "a": "Enter stack name and configure parameters",
        "l": "Parameters"
      },
      {
        "s": 4,
        "a": "Review IAM capabilities acknowledgment",
        "l": "Capabilities"
      },
      {
        "s": 5,
        "a": "Click 'Submit' → Watch events tab as resources get created",
        "l": "Stack events"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store templates; create S3 via stacks",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Create roles/policies via templates",
        "c": "Security"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Deploy Lambda functions with code from S3",
        "c": "Compute"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor stack creation events",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Full Infrastructure Deployment",
        "desc": "Define everything as code",
        "steps": [
          {
            "e": "📦",
            "n": "S3",
            "r": "Upload Template",
            "c": "green"
          },
          {
            "e": "🏗️",
            "n": "CloudFormation",
            "r": "Create Stack",
            "c": "amber"
          },
          {
            "e": "🌐",
            "n": "VPC+EC2+RDS",
            "r": "Auto-Created",
            "c": "blue"
          },
          {
            "e": "📊",
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "amber"
          }
        ]
      }
    ]
  },
  "awsamplify": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Amplify Console → Click 'New App' > 'Host Web App'",
        "l": "Amplify > All apps > New"
      },
      {
        "s": 2,
        "a": "Connect your Git repository (GitHub, GitLab, Bitbucket)",
        "l": "Repository selection"
      },
      {
        "s": 3,
        "a": "Select branch, configure build settings (auto-detected)",
        "l": "Build config"
      },
      {
        "s": 4,
        "a": "Click 'Save and Deploy' → Amplify builds and hosts automatically",
        "l": "Deployment"
      },
      {
        "s": 5,
        "a": "Add a custom domain in Domain Management",
        "l": "Domain settings"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static asset hosting behind the scenes",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN distribution auto-configured",
        "c": "Networking"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "Custom domain setup",
        "c": "Networking"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication (sign-up, MFA)",
        "c": "Security"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "NoSQL via Amplify DataStore",
        "c": "Database"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless functions for backend",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Full-Stack React App",
        "desc": "Git push to deploy full-stack",
        "steps": [
          {
            "e": "🐙",
            "n": "GitHub",
            "r": "Push Code",
            "c": "lime"
          },
          {
            "e": "🚀",
            "n": "Amplify",
            "r": "Build+Deploy",
            "c": "lime"
          },
          {
            "e": "👤",
            "n": "Cognito",
            "r": "Auth",
            "c": "yellow"
          },
          {
            "e": "🔄",
            "n": "AppSync",
            "r": "API",
            "c": "violet"
          },
          {
            "e": "💾",
            "n": "DynamoDB",
            "r": "Database",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsfargate": {
    "setup": [
      {
        "s": 1,
        "a": "Go to ECS Console → Click 'Create Cluster'",
        "l": "ECS > Clusters > Create"
      },
      {
        "s": 2,
        "a": "Choose Fargate as infrastructure provider",
        "l": "Cluster config"
      },
      {
        "s": 3,
        "a": "Create Task Definition — container image, CPU, memory",
        "l": "Task definitions"
      },
      {
        "s": 4,
        "a": "Create Service — set desired task count and load balancer",
        "l": "Service config"
      },
      {
        "s": 5,
        "a": "Deploy → Fargate handles all server provisioning",
        "l": "Service dashboard"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcontainerregistry",
        "n": "ECR",
        "d": "Container Registry stores Docker images",
        "c": "Containers"
      },
      {
        "id": "amazonelasticcontainerservice",
        "n": "ECS",
        "d": "Orchestration layer managing tasks",
        "c": "Containers"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Tasks run in VPC subnets",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Task execution roles",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Container logs and metrics",
        "c": "Management"
      },
      {
        "id": "amazonrds",
        "n": "RDS",
        "d": "Connect containers to databases",
        "c": "Database"
      }
    ],
    "pipelines": [
      {
        "name": "Containerized Web Service",
        "desc": "Docker container deployment",
        "steps": [
          {
            "e": "📦",
            "n": "ECR",
            "r": "Push Image",
            "c": "purple"
          },
          {
            "e": "📋",
            "n": "ECS",
            "r": "Task Definition",
            "c": "purple"
          },
          {
            "e": "🐳",
            "n": "Fargate",
            "r": "Run Tasks",
            "c": "purple"
          },
          {
            "e": "⚖️",
            "n": "ALB",
            "r": "Load Balancer",
            "c": "blue"
          },
          {
            "e": "🌐",
            "n": "Route 53",
            "r": "Domain",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "amazonelasticcontainerservice": {
    "setup": [
      {
        "s": 1,
        "a": "Go to ECS Console → Click 'Create Cluster'",
        "l": "ECS > Clusters > Create"
      },
      {
        "s": 2,
        "a": "Choose Fargate or EC2 infrastructure",
        "l": "Cluster config"
      },
      {
        "s": 3,
        "a": "Create Task Definition (container, ports, env vars, CPU, memory)",
        "l": "Task definitions"
      },
      {
        "s": 4,
        "a": "Create Service (desired count, deployment strategy, load balancer)",
        "l": "Service config"
      },
      {
        "s": 5,
        "a": "Deploy → Monitor tasks in cluster dashboard",
        "l": "Cluster > Services"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcontainerregistry",
        "n": "ECR",
        "d": "Pull container images",
        "c": "Containers"
      },
      {
        "id": "awsfargate",
        "n": "Fargate",
        "d": "Run tasks without managing EC2",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Task execution + task role",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Container logs and metrics",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Microservices on ECS",
        "desc": "Run multiple services",
        "steps": [
          {
            "e": "📦",
            "n": "ECR",
            "r": "Push Images",
            "c": "purple"
          },
          {
            "e": "🐳",
            "n": "ECS",
            "r": "Create Cluster",
            "c": "purple"
          },
          {
            "e": "🐳",
            "n": "ECS",
            "r": "Service per App",
            "c": "purple"
          },
          {
            "e": "⚖️",
            "n": "ALB",
            "r": "Route Traffic",
            "c": "blue"
          },
          {
            "e": "📊",
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "amber"
          }
        ]
      }
    ]
  },
  "amazoncognito": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Cognito Console → Click 'Create User Pool'",
        "l": "Cognito > User Pools > Create"
      },
      {
        "s": 2,
        "a": "Configure sign-in options (email, phone, username)",
        "l": "Sign-in experience"
      },
      {
        "s": 3,
        "a": "Set password policies and enable MFA",
        "l": "Security settings"
      },
      {
        "s": 4,
        "a": "Configure app client (for your web/mobile app)",
        "l": "App integration"
      },
      {
        "s": 5,
        "a": "Use Hosted UI or integrate via Amplify SDK",
        "l": "Integration"
      }
    ],
    "connections": [
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "JWT authorizer validates tokens",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom auth triggers",
        "c": "Compute"
      },
      {
        "id": "awsamplify",
        "n": "Amplify",
        "d": "Built-in auth library",
        "c": "DevTools"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Identity pools map to IAM roles",
        "c": "Security"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "User-specific data patterns",
        "c": "Database"
      }
    ],
    "pipelines": [
      {
        "name": "Authenticated Web App",
        "desc": "Add user login to your app",
        "steps": [
          {
            "e": "👤",
            "n": "Cognito",
            "r": "Create User Pool",
            "c": "yellow"
          },
          {
            "e": "👤",
            "n": "Cognito",
            "r": "App Client",
            "c": "yellow"
          },
          {
            "e": "🚪",
            "n": "API Gateway",
            "r": "JWT Authorizer",
            "c": "blue"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Protected",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "amazondatafirehose": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Firehose Console → Click 'Create Delivery Stream'",
        "l": "Firehose > Create"
      },
      {
        "s": 2,
        "a": "Choose source (Direct PUT, Kinesis Data Stream)",
        "l": "Source config"
      },
      {
        "s": 3,
        "a": "Choose destination (S3, Redshift, OpenSearch, HTTP)",
        "l": "Destination config"
      },
      {
        "s": 4,
        "a": "Configure buffer size and interval (e.g. 5 MB or 60 seconds)",
        "l": "Buffer settings"
      },
      {
        "s": 5,
        "a": "Optionally enable data transformation via Lambda",
        "l": "Transform config"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Primary destination for streaming data",
        "c": "Storage"
      },
      {
        "id": "amazonredshift",
        "n": "Redshift",
        "d": "Load streaming data into warehouse",
        "c": "Analytics"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Transform data in-flight before delivery",
        "c": "Compute"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Source data from Kinesis Streams",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Log Aggregation Pipeline",
        "desc": "Collect and analyze logs",
        "steps": [
          {
            "e": "📡",
            "n": "App",
            "r": "Send Logs",
            "c": "purple"
          },
          {
            "e": "🔥",
            "n": "Firehose",
            "r": "Buffer",
            "c": "teal"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Transform",
            "c": "purple"
          },
          {
            "e": "📦",
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "e": "🔍",
            "n": "Athena",
            "r": "Analyze",
            "c": "teal"
          }
        ]
      }
    ]
  },
  "amazonmq": {
    "setup": [
      {
        "s": 1,
        "a": "Go to Amazon MQ Console → Click 'Create Broker'",
        "l": "Amazon MQ > Brokers > Create"
      },
      {
        "s": 2,
        "a": "Choose engine (ActiveMQ or RabbitMQ) and deployment mode",
        "l": "Engine selection"
      },
      {
        "s": 3,
        "a": "Set broker name, instance type, and admin credentials",
        "l": "Broker config"
      },
      {
        "s": 4,
        "a": "Configure VPC, subnets, and security groups",
        "l": "Network settings"
      },
      {
        "s": 5,
        "a": "Click 'Create Broker' → Connect using endpoint URL",
        "l": "Broker details"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Application producers/consumers on EC2",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Lambda can consume messages",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Runs inside VPC for isolation",
        "c": "Networking"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor broker metrics",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Legacy App Migration",
        "desc": "Move message brokers to cloud",
        "steps": [
          {
            "e": "🌐",
            "n": "VPC",
            "r": "Private Network",
            "c": "blue"
          },
          {
            "e": "📨",
            "n": "Amazon MQ",
            "r": "Create Broker",
            "c": "violet"
          },
          {
            "e": "🖥️",
            "n": "EC2",
            "r": "Producer",
            "c": "purple"
          },
          {
            "e": "🖥️",
            "n": "EC2",
            "r": "Consumer",
            "c": "purple"
          },
          {
            "e": "📊",
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "amber"
          }
        ]
      }
    ]
  },
  "amazoncloudsearch": {
    "setup": [
      {
        "s": 1,
        "a": "Go to CloudSearch Console → Click 'Create Domain'",
        "l": "CloudSearch > Create"
      },
      {
        "s": 2,
        "a": "Define your index fields (text, int, date, etc.)",
        "l": "Index config"
      },
      {
        "s": 3,
        "a": "Upload sample documents in JSON/XML format",
        "l": "Upload documents"
      },
      {
        "s": 4,
        "a": "Configure access policies (IP-based or IAM)",
        "l": "Access policies"
      },
      {
        "s": 5,
        "a": "Use the search endpoint URL in your application",
        "l": "Domain dashboard"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Batch upload documents from S3",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Index new data and process results",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Sync DynamoDB data to search index",
        "c": "Database"
      }
    ],
    "pipelines": [
      {
        "name": "App Search Engine",
        "desc": "Add search to your app",
        "steps": [
          {
            "e": "💾",
            "n": "DynamoDB",
            "r": "Source Data",
            "c": "red"
          },
          {
            "e": "⚡",
            "n": "Lambda",
            "r": "Index",
            "c": "purple"
          },
          {
            "e": "🔎",
            "n": "CloudSearch",
            "r": "Search",
            "c": "teal"
          },
          {
            "e": "🖥️",
            "n": "App",
            "r": "Results",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "amazondatazone": {
    "setup": [
      {
        "s": 1,
        "a": "Go to DataZone Console → Click 'Create Domain'",
        "l": "DataZone > Create domain"
      },
      {
        "s": 2,
        "a": "Configure domain name and service role",
        "l": "Domain settings"
      },
      {
        "s": 3,
        "a": "Create a project within the domain",
        "l": "Projects section"
      },
      {
        "s": 4,
        "a": "Add data sources (S3, RDS, Redshift, Glue catalogs)",
        "l": "Data sources"
      },
      {
        "s": 5,
        "a": "Publish data assets for discovery by other teams",
        "l": "Data catalog"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Discover and govern S3 data assets",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "Integrates with Glue Data Catalog",
        "c": "Analytics"
      },
      {
        "id": "amazonredshift",
        "n": "Redshift",
        "d": "Catalog and share Redshift datasets",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Governance",
        "desc": "Centralize data discovery",
        "steps": [
          {
            "e": "📦",
            "n": "S3+RDS+Redshift",
            "r": "Data Sources",
            "c": "green"
          },
          {
            "e": "🗂️",
            "n": "DataZone",
            "r": "Catalog",
            "c": "teal"
          },
          {
            "e": "👤",
            "n": "Teams",
            "r": "Discover+Query",
            "c": "teal"
          }
        ]
      }
    ]
  },
  "amazonemr": {
    "setup": [
      {
        "s": 1,
        "a": "Go to EMR Console → Click 'Create Cluster'",
        "l": "EMR > Clusters > Create"
      },
      {
        "s": 2,
        "a": "Choose EMR release, select applications (Spark, Hive, Presto)",
        "l": "Software config"
      },
      {
        "s": 3,
        "a": "Select instance types and number of nodes",
        "l": "Hardware config"
      },
      {
        "s": 4,
        "a": "Set S3 log location and IAM roles",
        "l": "General settings"
      },
      {
        "s": 5,
        "a": "Click 'Create Cluster' → Submit Spark/Hive jobs",
        "l": "Cluster dashboard"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Input/output data, logs, scripts in S3",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "Shared Data Catalog for Spark/Hive",
        "c": "Analytics"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "EMR runs on EC2 instances",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service roles and instance profiles",
        "c": "Security"
      }
    ],
    "pipelines": [
      {
        "name": "Big Data Processing",
        "desc": "Process massive datasets",
        "steps": [
          {
            "e": "📦",
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "e": "🔥",
            "n": "EMR",
            "r": "Spark Job",
            "c": "teal"
          },
          {
            "e": "📦",
            "n": "S3",
            "r": "Processed",
            "c": "green"
          },
          {
            "e": "🔍",
            "n": "Athena/Redshift",
            "r": "Query",
            "c": "teal"
          }
        ]
      }
    ]
  },
  "amazonfinspace": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon FinSpace in AWS Console",
        "l": "Console → Amazon FinSpace"
      },
      {
        "s": 2,
        "a": "Create a new resource or cluster",
        "l": "Amazon FinSpace → Create"
      },
      {
        "s": 3,
        "a": "Configure data source and input format",
        "l": "Settings → Data source"
      },
      {
        "s": 4,
        "a": "Set up IAM role for access permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 5,
        "a": "Configure output destination (S3 or downstream)",
        "l": "Output → S3 bucket"
      },
      {
        "s": 6,
        "a": "Start processing and monitor results",
        "l": "Amazon FinSpace → Monitor"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store input/output data",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL and data catalog integration",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control and permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor metrics and logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger processing on events",
        "c": "Compute"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query processed results with SQL",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Lake Analytics",
        "desc": "Ingest → Process → Query",
        "steps": [
          {
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "n": "Amazon FinSpace",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Streaming Pipeline",
        "desc": "Real-time data flow",
        "steps": [
          {
            "n": "Kinesis",
            "r": "Ingest",
            "c": "blue"
          },
          {
            "n": "Amazon FinSpace",
            "r": "Transform",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonkinesisdatastreams": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Kinesis Data Streams in AWS Console",
        "l": "Console → Amazon Kinesis Data Streams"
      },
      {
        "s": 2,
        "a": "Create a new resource or cluster",
        "l": "Amazon Kinesis Data Streams → Create"
      },
      {
        "s": 3,
        "a": "Configure data source and input format",
        "l": "Settings → Data source"
      },
      {
        "s": 4,
        "a": "Set up IAM role for access permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 5,
        "a": "Configure output destination (S3 or downstream)",
        "l": "Output → S3 bucket"
      },
      {
        "s": 6,
        "a": "Start processing and monitor results",
        "l": "Amazon Kinesis Data Streams → Monitor"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store input/output data",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL and data catalog integration",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control and permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor metrics and logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger processing on events",
        "c": "Compute"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query processed results with SQL",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Lake Analytics",
        "desc": "Ingest → Process → Query",
        "steps": [
          {
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "n": "Amazon Kinesis Data Streams",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Streaming Pipeline",
        "desc": "Real-time data flow",
        "steps": [
          {
            "n": "Kinesis",
            "r": "Ingest",
            "c": "blue"
          },
          {
            "n": "Amazon Kinesis Data Streams",
            "r": "Transform",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonkinesisvideostreams": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Kinesis Video Streams in AWS Console",
        "l": "Console → Media → Amazon Kinesis Video Streams"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "Amazon Kinesis Video Streams → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "Amazon Kinesis Video Streams → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "Amazon Kinesis Video Streams",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "amazonmanagedserviceforapacheflink": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Managed Service for Apache Flink in AWS Console",
        "l": "Console → Amazon Managed Service for Apache Flink"
      },
      {
        "s": 2,
        "a": "Create a new resource or cluster",
        "l": "Amazon Managed Service for Apache Flink → Create"
      },
      {
        "s": 3,
        "a": "Configure data source and input format",
        "l": "Settings → Data source"
      },
      {
        "s": 4,
        "a": "Set up IAM role for access permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 5,
        "a": "Configure output destination (S3 or downstream)",
        "l": "Output → S3 bucket"
      },
      {
        "s": 6,
        "a": "Start processing and monitor results",
        "l": "Amazon Managed Service for Apache Flink → Monitor"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store input/output data",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL and data catalog integration",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control and permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor metrics and logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger processing on events",
        "c": "Compute"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query processed results with SQL",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Lake Analytics",
        "desc": "Ingest → Process → Query",
        "steps": [
          {
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "n": "Amazon Managed Service for Apache Flink",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Streaming Pipeline",
        "desc": "Real-time data flow",
        "steps": [
          {
            "n": "Kinesis",
            "r": "Ingest",
            "c": "blue"
          },
          {
            "n": "Amazon Managed Service for Apache Flink",
            "r": "Transform",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonmanagedstreamingforapachekafka": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Managed Streaming for Apache Kafka in AWS Console",
        "l": "Console → Amazon Managed Streaming for Apache Kafka"
      },
      {
        "s": 2,
        "a": "Create a new resource or cluster",
        "l": "Amazon Managed Streaming for Apache Kafka → Create"
      },
      {
        "s": 3,
        "a": "Configure data source and input format",
        "l": "Settings → Data source"
      },
      {
        "s": 4,
        "a": "Set up IAM role for access permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 5,
        "a": "Configure output destination (S3 or downstream)",
        "l": "Output → S3 bucket"
      },
      {
        "s": 6,
        "a": "Start processing and monitor results",
        "l": "Amazon Managed Streaming for Apache Kafka → Monitor"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store input/output data",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL and data catalog integration",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control and permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor metrics and logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger processing on events",
        "c": "Compute"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query processed results with SQL",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Lake Analytics",
        "desc": "Ingest → Process → Query",
        "steps": [
          {
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "n": "Amazon Managed Streaming for Apache Kafka",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Streaming Pipeline",
        "desc": "Real-time data flow",
        "steps": [
          {
            "n": "Kinesis",
            "r": "Ingest",
            "c": "blue"
          },
          {
            "n": "Amazon Managed Streaming for Apache Kafka",
            "r": "Transform",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonopensearchservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon OpenSearch Service in AWS Console",
        "l": "Console → Amazon OpenSearch Service"
      },
      {
        "s": 2,
        "a": "Create a new resource or cluster",
        "l": "Amazon OpenSearch Service → Create"
      },
      {
        "s": 3,
        "a": "Configure data source and input format",
        "l": "Settings → Data source"
      },
      {
        "s": 4,
        "a": "Set up IAM role for access permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 5,
        "a": "Configure output destination (S3 or downstream)",
        "l": "Output → S3 bucket"
      },
      {
        "s": 6,
        "a": "Start processing and monitor results",
        "l": "Amazon OpenSearch Service → Monitor"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store input/output data",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL and data catalog integration",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control and permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor metrics and logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger processing on events",
        "c": "Compute"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query processed results with SQL",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Lake Analytics",
        "desc": "Ingest → Process → Query",
        "steps": [
          {
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "n": "Amazon OpenSearch Service",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Streaming Pipeline",
        "desc": "Real-time data flow",
        "steps": [
          {
            "n": "Kinesis",
            "r": "Ingest",
            "c": "blue"
          },
          {
            "n": "Amazon OpenSearch Service",
            "r": "Transform",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awscleanrooms": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Clean Rooms in AWS Console",
        "l": "Console → AWS Clean Rooms"
      },
      {
        "s": 2,
        "a": "Create a new resource or cluster",
        "l": "AWS Clean Rooms → Create"
      },
      {
        "s": 3,
        "a": "Configure data source and input format",
        "l": "Settings → Data source"
      },
      {
        "s": 4,
        "a": "Set up IAM role for access permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 5,
        "a": "Configure output destination (S3 or downstream)",
        "l": "Output → S3 bucket"
      },
      {
        "s": 6,
        "a": "Start processing and monitor results",
        "l": "AWS Clean Rooms → Monitor"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store input/output data",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL and data catalog integration",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control and permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor metrics and logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger processing on events",
        "c": "Compute"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query processed results with SQL",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Lake Analytics",
        "desc": "Ingest → Process → Query",
        "steps": [
          {
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "n": "AWS Clean Rooms",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Streaming Pipeline",
        "desc": "Real-time data flow",
        "steps": [
          {
            "n": "Kinesis",
            "r": "Ingest",
            "c": "blue"
          },
          {
            "n": "AWS Clean Rooms",
            "r": "Transform",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsdataexchange": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Data Exchange in AWS Console",
        "l": "Console → AWS Data Exchange"
      },
      {
        "s": 2,
        "a": "Create a new resource or cluster",
        "l": "AWS Data Exchange → Create"
      },
      {
        "s": 3,
        "a": "Configure data source and input format",
        "l": "Settings → Data source"
      },
      {
        "s": 4,
        "a": "Set up IAM role for access permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 5,
        "a": "Configure output destination (S3 or downstream)",
        "l": "Output → S3 bucket"
      },
      {
        "s": 6,
        "a": "Start processing and monitor results",
        "l": "AWS Data Exchange → Monitor"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store input/output data",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL and data catalog integration",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control and permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor metrics and logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger processing on events",
        "c": "Compute"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query processed results with SQL",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Lake Analytics",
        "desc": "Ingest → Process → Query",
        "steps": [
          {
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "n": "AWS Data Exchange",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Streaming Pipeline",
        "desc": "Real-time data flow",
        "steps": [
          {
            "n": "Kinesis",
            "r": "Ingest",
            "c": "blue"
          },
          {
            "n": "AWS Data Exchange",
            "r": "Transform",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsentityresolution": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Entity Resolution in AWS Console",
        "l": "Console → AWS Entity Resolution"
      },
      {
        "s": 2,
        "a": "Create a new resource or cluster",
        "l": "AWS Entity Resolution → Create"
      },
      {
        "s": 3,
        "a": "Configure data source and input format",
        "l": "Settings → Data source"
      },
      {
        "s": 4,
        "a": "Set up IAM role for access permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 5,
        "a": "Configure output destination (S3 or downstream)",
        "l": "Output → S3 bucket"
      },
      {
        "s": 6,
        "a": "Start processing and monitor results",
        "l": "AWS Entity Resolution → Monitor"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store input/output data",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL and data catalog integration",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control and permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor metrics and logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger processing on events",
        "c": "Compute"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query processed results with SQL",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Lake Analytics",
        "desc": "Ingest → Process → Query",
        "steps": [
          {
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "n": "AWS Entity Resolution",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Streaming Pipeline",
        "desc": "Real-time data flow",
        "steps": [
          {
            "n": "Kinesis",
            "r": "Ingest",
            "c": "blue"
          },
          {
            "n": "AWS Entity Resolution",
            "r": "Transform",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsgluedatabrew": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Glue DataBrew in AWS Console",
        "l": "Console → AWS Glue DataBrew"
      },
      {
        "s": 2,
        "a": "Create a new resource or cluster",
        "l": "AWS Glue DataBrew → Create"
      },
      {
        "s": 3,
        "a": "Configure data source and input format",
        "l": "Settings → Data source"
      },
      {
        "s": 4,
        "a": "Set up IAM role for access permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 5,
        "a": "Configure output destination (S3 or downstream)",
        "l": "Output → S3 bucket"
      },
      {
        "s": 6,
        "a": "Start processing and monitor results",
        "l": "AWS Glue DataBrew → Monitor"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store input/output data",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL and data catalog integration",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control and permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor metrics and logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger processing on events",
        "c": "Compute"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query processed results with SQL",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Lake Analytics",
        "desc": "Ingest → Process → Query",
        "steps": [
          {
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "n": "AWS Glue DataBrew",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Streaming Pipeline",
        "desc": "Real-time data flow",
        "steps": [
          {
            "n": "Kinesis",
            "r": "Ingest",
            "c": "blue"
          },
          {
            "n": "AWS Glue DataBrew",
            "r": "Transform",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awslakeformation": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Lake Formation in AWS Console",
        "l": "Console → AWS Lake Formation"
      },
      {
        "s": 2,
        "a": "Create a new resource or cluster",
        "l": "AWS Lake Formation → Create"
      },
      {
        "s": 3,
        "a": "Configure data source and input format",
        "l": "Settings → Data source"
      },
      {
        "s": 4,
        "a": "Set up IAM role for access permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 5,
        "a": "Configure output destination (S3 or downstream)",
        "l": "Output → S3 bucket"
      },
      {
        "s": 6,
        "a": "Start processing and monitor results",
        "l": "AWS Lake Formation → Monitor"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store input/output data",
        "c": "Storage"
      },
      {
        "id": "awsglue",
        "n": "Glue",
        "d": "ETL and data catalog integration",
        "c": "Analytics"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control and permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor metrics and logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger processing on events",
        "c": "Compute"
      },
      {
        "id": "amazonathena",
        "n": "Athena",
        "d": "Query processed results with SQL",
        "c": "Analytics"
      }
    ],
    "pipelines": [
      {
        "name": "Data Lake Analytics",
        "desc": "Ingest → Process → Query",
        "steps": [
          {
            "n": "S3",
            "r": "Raw Data",
            "c": "green"
          },
          {
            "n": "AWS Lake Formation",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "Athena",
            "r": "Query",
            "c": "teal"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Streaming Pipeline",
        "desc": "Real-time data flow",
        "steps": [
          {
            "n": "Kinesis",
            "r": "Ingest",
            "c": "blue"
          },
          {
            "n": "AWS Lake Formation",
            "r": "Transform",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonappflow": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon AppFlow in AWS Console",
        "l": "Console → Amazon AppFlow"
      },
      {
        "s": 2,
        "a": "Create a new integration or workflow",
        "l": "Amazon AppFlow → Create"
      },
      {
        "s": 3,
        "a": "Define source and target services",
        "l": "Configuration → Source/Target"
      },
      {
        "s": 4,
        "a": "Set up IAM permissions for cross-service access",
        "l": "IAM → Roles"
      },
      {
        "s": 5,
        "a": "Configure error handling and retry logic",
        "l": "Settings → Error handling"
      },
      {
        "s": 6,
        "a": "Deploy and test the integration",
        "l": "Amazon AppFlow → Deploy"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Execute custom logic",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store integration data",
        "c": "Storage"
      },
      {
        "id": "amazonsimplequeueservice",
        "n": "SQS",
        "d": "Queue messages between services",
        "c": "Integration"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Manage permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor integration health",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Event-Driven Architecture",
        "desc": "Decouple services with events",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Event Bus",
            "c": "pink"
          },
          {
            "n": "Amazon AppFlow",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Async Messaging",
        "desc": "Reliable message delivery",
        "steps": [
          {
            "n": "SNS",
            "r": "Publish",
            "c": "red"
          },
          {
            "n": "Amazon AppFlow",
            "r": "Integrate",
            "c": "purple"
          },
          {
            "n": "SQS",
            "r": "Queue",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Consume",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonmanagedworkflowsforapacheairflow": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Managed Workflows for Apache Airflow in AWS Console",
        "l": "Console → Amazon Managed Workflows for Apache Airflow"
      },
      {
        "s": 2,
        "a": "Create a new integration or workflow",
        "l": "Amazon Managed Workflows for Apache Airflow → Create"
      },
      {
        "s": 3,
        "a": "Define source and target services",
        "l": "Configuration → Source/Target"
      },
      {
        "s": 4,
        "a": "Set up IAM permissions for cross-service access",
        "l": "IAM → Roles"
      },
      {
        "s": 5,
        "a": "Configure error handling and retry logic",
        "l": "Settings → Error handling"
      },
      {
        "s": 6,
        "a": "Deploy and test the integration",
        "l": "Amazon Managed Workflows for Apache Airflow → Deploy"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Execute custom logic",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store integration data",
        "c": "Storage"
      },
      {
        "id": "amazonsimplequeueservice",
        "n": "SQS",
        "d": "Queue messages between services",
        "c": "Integration"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Manage permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor integration health",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Event-Driven Architecture",
        "desc": "Decouple services with events",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Event Bus",
            "c": "pink"
          },
          {
            "n": "Amazon Managed Workflows for Apache Airflow",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Async Messaging",
        "desc": "Reliable message delivery",
        "steps": [
          {
            "n": "SNS",
            "r": "Publish",
            "c": "red"
          },
          {
            "n": "Amazon Managed Workflows for Apache Airflow",
            "r": "Integrate",
            "c": "purple"
          },
          {
            "n": "SQS",
            "r": "Queue",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Consume",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsappsync": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS AppSync in AWS Console",
        "l": "Console → AWS AppSync"
      },
      {
        "s": 2,
        "a": "Create a new integration or workflow",
        "l": "AWS AppSync → Create"
      },
      {
        "s": 3,
        "a": "Define source and target services",
        "l": "Configuration → Source/Target"
      },
      {
        "s": 4,
        "a": "Set up IAM permissions for cross-service access",
        "l": "IAM → Roles"
      },
      {
        "s": 5,
        "a": "Configure error handling and retry logic",
        "l": "Settings → Error handling"
      },
      {
        "s": 6,
        "a": "Deploy and test the integration",
        "l": "AWS AppSync → Deploy"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Execute custom logic",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store integration data",
        "c": "Storage"
      },
      {
        "id": "amazonsimplequeueservice",
        "n": "SQS",
        "d": "Queue messages between services",
        "c": "Integration"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Manage permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor integration health",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Event-Driven Architecture",
        "desc": "Decouple services with events",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Event Bus",
            "c": "pink"
          },
          {
            "n": "AWS AppSync",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Async Messaging",
        "desc": "Reliable message delivery",
        "steps": [
          {
            "n": "SNS",
            "r": "Publish",
            "c": "red"
          },
          {
            "n": "AWS AppSync",
            "r": "Integrate",
            "c": "purple"
          },
          {
            "n": "SQS",
            "r": "Queue",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Consume",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsb2bdatainterchange": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS B2B Data Interchange in AWS Console",
        "l": "Console → AWS B2B Data Interchange"
      },
      {
        "s": 2,
        "a": "Create a new integration or workflow",
        "l": "AWS B2B Data Interchange → Create"
      },
      {
        "s": 3,
        "a": "Define source and target services",
        "l": "Configuration → Source/Target"
      },
      {
        "s": 4,
        "a": "Set up IAM permissions for cross-service access",
        "l": "IAM → Roles"
      },
      {
        "s": 5,
        "a": "Configure error handling and retry logic",
        "l": "Settings → Error handling"
      },
      {
        "s": 6,
        "a": "Deploy and test the integration",
        "l": "AWS B2B Data Interchange → Deploy"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Execute custom logic",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store integration data",
        "c": "Storage"
      },
      {
        "id": "amazonsimplequeueservice",
        "n": "SQS",
        "d": "Queue messages between services",
        "c": "Integration"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Manage permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor integration health",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Event-Driven Architecture",
        "desc": "Decouple services with events",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Event Bus",
            "c": "pink"
          },
          {
            "n": "AWS B2B Data Interchange",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Async Messaging",
        "desc": "Reliable message delivery",
        "steps": [
          {
            "n": "SNS",
            "r": "Publish",
            "c": "red"
          },
          {
            "n": "AWS B2B Data Interchange",
            "r": "Integrate",
            "c": "purple"
          },
          {
            "n": "SQS",
            "r": "Queue",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Consume",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsexpressworkflows": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Express Workflows in AWS Console",
        "l": "Console → AWS Express Workflows"
      },
      {
        "s": 2,
        "a": "Create a new integration or workflow",
        "l": "AWS Express Workflows → Create"
      },
      {
        "s": 3,
        "a": "Define source and target services",
        "l": "Configuration → Source/Target"
      },
      {
        "s": 4,
        "a": "Set up IAM permissions for cross-service access",
        "l": "IAM → Roles"
      },
      {
        "s": 5,
        "a": "Configure error handling and retry logic",
        "l": "Settings → Error handling"
      },
      {
        "s": 6,
        "a": "Deploy and test the integration",
        "l": "AWS Express Workflows → Deploy"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Execute custom logic",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store integration data",
        "c": "Storage"
      },
      {
        "id": "amazonsimplequeueservice",
        "n": "SQS",
        "d": "Queue messages between services",
        "c": "Integration"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Manage permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor integration health",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Event-Driven Architecture",
        "desc": "Decouple services with events",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Event Bus",
            "c": "pink"
          },
          {
            "n": "AWS Express Workflows",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Async Messaging",
        "desc": "Reliable message delivery",
        "steps": [
          {
            "n": "SNS",
            "r": "Publish",
            "c": "red"
          },
          {
            "n": "AWS Express Workflows",
            "r": "Integrate",
            "c": "purple"
          },
          {
            "n": "SQS",
            "r": "Queue",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Consume",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonaugmentedaia2i": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Augmented AI A2I in AWS Console",
        "l": "Console → Amazon Augmented AI A2I"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Augmented AI A2I → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Augmented AI A2I → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Augmented AI A2I",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Augmented AI A2I",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonbedrockagentcore": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Bedrock AgentCore in AWS Console",
        "l": "Console → Amazon Bedrock AgentCore"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Bedrock AgentCore → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Bedrock AgentCore → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Bedrock AgentCore",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Bedrock AgentCore",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonbedrock": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Bedrock in AWS Console",
        "l": "Console → Amazon Bedrock"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Bedrock → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Bedrock → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Bedrock",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Bedrock",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazoncodeguru": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon CodeGuru in AWS Console",
        "l": "Console → Amazon CodeGuru"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon CodeGuru → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon CodeGuru → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon CodeGuru",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon CodeGuru",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazoncodewhisperer": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon CodeWhisperer in AWS Console",
        "l": "Console → Amazon CodeWhisperer"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon CodeWhisperer → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon CodeWhisperer → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon CodeWhisperer",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon CodeWhisperer",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazoncomprehendmedical": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Comprehend Medical in AWS Console",
        "l": "Console → Amazon Comprehend Medical"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Comprehend Medical → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Comprehend Medical → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Comprehend Medical",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Comprehend Medical",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazoncomprehend": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Comprehend in AWS Console",
        "l": "Console → Amazon Comprehend"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Comprehend → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Comprehend → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Comprehend",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Comprehend",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazondevopsguru": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon DevOps Guru in AWS Console",
        "l": "Console → Amazon DevOps Guru"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon DevOps Guru → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon DevOps Guru → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon DevOps Guru",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon DevOps Guru",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonelasticinference": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Elastic Inference in AWS Console",
        "l": "Console → Amazon Elastic Inference"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Elastic Inference → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Elastic Inference → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Elastic Inference",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Elastic Inference",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonforecast": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Forecast in AWS Console",
        "l": "Console → Amazon Forecast"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Forecast → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Forecast → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Forecast",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Forecast",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonfrauddetector": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Fraud Detector in AWS Console",
        "l": "Console → Amazon Fraud Detector"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Fraud Detector → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Fraud Detector → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Fraud Detector",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Fraud Detector",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonkendra": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Kendra in AWS Console",
        "l": "Console → Amazon Kendra"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Kendra → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Kendra → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Kendra",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Kendra",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonlex": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Lex in AWS Console",
        "l": "Console → Amazon Lex"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Lex → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Lex → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Lex",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Lex",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonlookoutforequipment": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Lookout for Equipment in AWS Console",
        "l": "Console → Amazon Lookout for Equipment"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Lookout for Equipment → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Lookout for Equipment → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Lookout for Equipment",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Lookout for Equipment",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonlookoutforvision": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Lookout for Vision in AWS Console",
        "l": "Console → Amazon Lookout for Vision"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Lookout for Vision → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Lookout for Vision → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Lookout for Vision",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Lookout for Vision",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonmonitron": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Monitron in AWS Console",
        "l": "Console → Amazon Monitron"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Monitron → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Monitron → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Monitron",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Monitron",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonnova": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Nova in AWS Console",
        "l": "Console → Amazon Nova"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Nova → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Nova → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Nova",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Nova",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonpersonalize": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Personalize in AWS Console",
        "l": "Console → Amazon Personalize"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Personalize → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Personalize → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Personalize",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Personalize",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonpolly": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Polly in AWS Console",
        "l": "Console → Amazon Polly"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Polly → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Polly → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Polly",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Polly",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonq": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Q in AWS Console",
        "l": "Console → Amazon Q"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Q → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Q → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Q",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Q",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonrekognition": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Rekognition in AWS Console",
        "l": "Console → Amazon Rekognition"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Rekognition → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Rekognition → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Rekognition",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Rekognition",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonsagemakerai": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon SageMaker AI in AWS Console",
        "l": "Console → Amazon SageMaker AI"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon SageMaker AI → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon SageMaker AI → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon SageMaker AI",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon SageMaker AI",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonsagemakergroundtruth": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon SageMaker Ground Truth in AWS Console",
        "l": "Console → Amazon SageMaker Ground Truth"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon SageMaker Ground Truth → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon SageMaker Ground Truth → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon SageMaker Ground Truth",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon SageMaker Ground Truth",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonsagemakerstudiolab": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon SageMaker Studio Lab in AWS Console",
        "l": "Console → Amazon SageMaker Studio Lab"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon SageMaker Studio Lab → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon SageMaker Studio Lab → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon SageMaker Studio Lab",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon SageMaker Studio Lab",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazontextract": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Textract in AWS Console",
        "l": "Console → Amazon Textract"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Textract → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Textract → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Textract",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Textract",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazontranscribe": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Transcribe in AWS Console",
        "l": "Console → Amazon Transcribe"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Transcribe → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Transcribe → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Transcribe",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Transcribe",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazontranslate": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Translate in AWS Console",
        "l": "Console → Amazon Translate"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Amazon Translate → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Amazon Translate → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Amazon Translate",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Amazon Translate",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "apachemxnetonaws": {
    "setup": [
      {
        "s": 1,
        "a": "Open Apache MXNet on AWS in AWS Console",
        "l": "Console → Apache MXNet on AWS"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "Apache MXNet on AWS → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "Apache MXNet on AWS → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "Apache MXNet on AWS",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "Apache MXNet on AWS",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsappstudio": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS App Studio in AWS Console",
        "l": "Console → AWS App Studio"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "AWS App Studio → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "AWS App Studio → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "AWS App Studio",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "AWS App Studio",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsdeeplearningamis": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Deep Learning AMIs in AWS Console",
        "l": "Console → AWS Deep Learning AMIs"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "AWS Deep Learning AMIs → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "AWS Deep Learning AMIs → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "AWS Deep Learning AMIs",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "AWS Deep Learning AMIs",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsdeeplearningcontainers": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Deep Learning Containers in AWS Console",
        "l": "Console → AWS Deep Learning Containers"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "AWS Deep Learning Containers → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "AWS Deep Learning Containers → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "AWS Deep Learning Containers",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "AWS Deep Learning Containers",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsdeepracer": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS DeepRacer in AWS Console",
        "l": "Console → AWS DeepRacer"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "AWS DeepRacer → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "AWS DeepRacer → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "AWS DeepRacer",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "AWS DeepRacer",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awshealthimaging": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS HealthImaging in AWS Console",
        "l": "Console → AWS HealthImaging"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "AWS HealthImaging → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "AWS HealthImaging → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "AWS HealthImaging",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "AWS HealthImaging",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awshealthlake": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS HealthLake in AWS Console",
        "l": "Console → AWS HealthLake"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "AWS HealthLake → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "AWS HealthLake → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "AWS HealthLake",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "AWS HealthLake",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awshealthomics": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS HealthOmics in AWS Console",
        "l": "Console → AWS HealthOmics"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "AWS HealthOmics → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "AWS HealthOmics → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "AWS HealthOmics",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "AWS HealthOmics",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awshealthscribe": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS HealthScribe in AWS Console",
        "l": "Console → AWS HealthScribe"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "AWS HealthScribe → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "AWS HealthScribe → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "AWS HealthScribe",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "AWS HealthScribe",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsneuron": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Neuron in AWS Console",
        "l": "Console → AWS Neuron"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "AWS Neuron → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "AWS Neuron → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "AWS Neuron",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "AWS Neuron",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awspanorama": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Panorama in AWS Console",
        "l": "Console → AWS Panorama"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "AWS Panorama → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "AWS Panorama → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "AWS Panorama",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "AWS Panorama",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "pytorchonaws": {
    "setup": [
      {
        "s": 1,
        "a": "Open PyTorch on AWS in AWS Console",
        "l": "Console → PyTorch on AWS"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "PyTorch on AWS → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "PyTorch on AWS → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "PyTorch on AWS",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "PyTorch on AWS",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "tensorflowonaws": {
    "setup": [
      {
        "s": 1,
        "a": "Open TensorFlow on AWS in AWS Console",
        "l": "Console → TensorFlow on AWS"
      },
      {
        "s": 2,
        "a": "Create a new model, project, or endpoint",
        "l": "TensorFlow on AWS → Create"
      },
      {
        "s": 3,
        "a": "Upload or connect training data from S3",
        "l": "Data → S3 bucket"
      },
      {
        "s": 4,
        "a": "Configure model parameters and instance type",
        "l": "Configuration → Settings"
      },
      {
        "s": 5,
        "a": "Set up IAM role with required permissions",
        "l": "IAM → Roles → Create role"
      },
      {
        "s": 6,
        "a": "Deploy model and create inference endpoint",
        "l": "TensorFlow on AWS → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store training data and model artifacts",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Invoke model for inference",
        "c": "Compute"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Expose model as REST API",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Control access to AI resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor inference metrics",
        "c": "Management"
      },
      {
        "id": "amazonsagemaker",
        "n": "SageMaker",
        "d": "Advanced ML training pipeline",
        "c": "AI/ML"
      }
    ],
    "pipelines": [
      {
        "name": "AI-Powered API",
        "desc": "Model serving via API Gateway",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Invoke",
            "c": "yellow"
          },
          {
            "n": "TensorFlow on AWS",
            "r": "Inference",
            "c": "purple"
          },
          {
            "n": "DynamoDB",
            "r": "Cache Results",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Training Pipeline",
        "desc": "End-to-end ML workflow",
        "steps": [
          {
            "n": "S3",
            "r": "Training Data",
            "c": "green"
          },
          {
            "n": "TensorFlow on AWS",
            "r": "Train Model",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Model Artifact",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Deploy",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonmanagedblockchain": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Managed Blockchain in AWS Console",
        "l": "Console → Amazon Managed Blockchain"
      },
      {
        "s": 2,
        "a": "Create a new blockchain network",
        "l": "Amazon Managed Blockchain → Create Network"
      },
      {
        "s": 3,
        "a": "Choose framework (Hyperledger Fabric or Ethereum)",
        "l": "Framework → Select"
      },
      {
        "s": 4,
        "a": "Configure member nodes and voting policy",
        "l": "Network → Members"
      },
      {
        "s": 5,
        "a": "Set up IAM and VPC access",
        "l": "IAM + VPC → Configure"
      },
      {
        "s": 6,
        "a": "Deploy chaincode and test transactions",
        "l": "Amazon Managed Blockchain → Chaincode"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation for nodes",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Member access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor node health",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store chain data backups",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Trigger on blockchain events",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Blockchain App",
        "desc": "Decentralized application pattern",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Client Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Business Logic",
            "c": "yellow"
          },
          {
            "n": "Amazon Managed Blockchain",
            "r": "Write to Chain",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          }
        ]
      }
    ]
  },
  "amazonchimesdk": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Chime SDK in AWS Console",
        "l": "Console → Amazon Chime SDK"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "Amazon Chime SDK → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "Amazon Chime SDK → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "Amazon Chime SDK",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonchime": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Chime in AWS Console",
        "l": "Console → Amazon Chime"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "Amazon Chime → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "Amazon Chime → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "Amazon Chime",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonconnect": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Connect in AWS Console",
        "l": "Console → Amazon Connect"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "Amazon Connect → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "Amazon Connect → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "Amazon Connect",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonpinpointapis": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Pinpoint APIs in AWS Console",
        "l": "Console → Amazon Pinpoint APIs"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "Amazon Pinpoint APIs → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "Amazon Pinpoint APIs → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "Amazon Pinpoint APIs",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonpinpoint": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Pinpoint in AWS Console",
        "l": "Console → Amazon Pinpoint"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "Amazon Pinpoint → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "Amazon Pinpoint → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "Amazon Pinpoint",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonquicksuite": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Quick Suite in AWS Console",
        "l": "Console → Amazon Quick Suite"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "Amazon Quick Suite → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "Amazon Quick Suite → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "Amazon Quick Suite",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonsimpleemailservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Simple Email Service in AWS Console",
        "l": "Console → Amazon Simple Email Service"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "Amazon Simple Email Service → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "Amazon Simple Email Service → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "Amazon Simple Email Service",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonworkdocssdk": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon WorkDocs SDK in AWS Console",
        "l": "Console → Amazon WorkDocs SDK"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "Amazon WorkDocs SDK → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "Amazon WorkDocs SDK → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "Amazon WorkDocs SDK",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonworkdocs": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon WorkDocs in AWS Console",
        "l": "Console → Amazon WorkDocs"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "Amazon WorkDocs → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "Amazon WorkDocs → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "Amazon WorkDocs",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonworkmail": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon WorkMail in AWS Console",
        "l": "Console → Amazon WorkMail"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "Amazon WorkMail → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "Amazon WorkMail → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "Amazon WorkMail",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsappfabric": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS AppFabric in AWS Console",
        "l": "Console → AWS AppFabric"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "AWS AppFabric → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "AWS AppFabric → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "AWS AppFabric",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsendusermessaging": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS End User Messaging in AWS Console",
        "l": "Console → AWS End User Messaging"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "AWS End User Messaging → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "AWS End User Messaging → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "AWS End User Messaging",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awssupplychain": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Supply Chain in AWS Console",
        "l": "Console → AWS Supply Chain"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "AWS Supply Chain → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "AWS Supply Chain → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "AWS Supply Chain",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awswickr": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Wickr in AWS Console",
        "l": "Console → AWS Wickr"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "AWS Wickr → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "AWS Wickr → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "AWS Wickr",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsbillingconductor": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Billing Conductor in AWS Console",
        "l": "Console → Billing → AWS Billing Conductor"
      },
      {
        "s": 2,
        "a": "Enable cost tracking and create budget",
        "l": "AWS Billing Conductor → Create"
      },
      {
        "s": 3,
        "a": "Set alert thresholds and notification emails",
        "l": "Alerts → Configure"
      },
      {
        "s": 4,
        "a": "Tag resources for cost allocation",
        "l": "Cost Allocation Tags → Activate"
      },
      {
        "s": 5,
        "a": "Review cost breakdown by service/region",
        "l": "AWS Billing Conductor → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Billing alarms",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Budget alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Billing access control",
        "c": "Security"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated cost actions",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Cost Alert Pipeline",
        "desc": "Automated budget monitoring",
        "steps": [
          {
            "n": "AWS Billing Conductor",
            "r": "Track Costs",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Action",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsbudgets": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Budgets in AWS Console",
        "l": "Console → Billing → AWS Budgets"
      },
      {
        "s": 2,
        "a": "Enable cost tracking and create budget",
        "l": "AWS Budgets → Create"
      },
      {
        "s": 3,
        "a": "Set alert thresholds and notification emails",
        "l": "Alerts → Configure"
      },
      {
        "s": 4,
        "a": "Tag resources for cost allocation",
        "l": "Cost Allocation Tags → Activate"
      },
      {
        "s": 5,
        "a": "Review cost breakdown by service/region",
        "l": "AWS Budgets → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Billing alarms",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Budget alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Billing access control",
        "c": "Security"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated cost actions",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Cost Alert Pipeline",
        "desc": "Automated budget monitoring",
        "steps": [
          {
            "n": "AWS Budgets",
            "r": "Track Costs",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Action",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awscostandusagereport": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Cost and Usage Report in AWS Console",
        "l": "Console → Billing → AWS Cost and Usage Report"
      },
      {
        "s": 2,
        "a": "Enable cost tracking and create budget",
        "l": "AWS Cost and Usage Report → Create"
      },
      {
        "s": 3,
        "a": "Set alert thresholds and notification emails",
        "l": "Alerts → Configure"
      },
      {
        "s": 4,
        "a": "Tag resources for cost allocation",
        "l": "Cost Allocation Tags → Activate"
      },
      {
        "s": 5,
        "a": "Review cost breakdown by service/region",
        "l": "AWS Cost and Usage Report → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Billing alarms",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Budget alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Billing access control",
        "c": "Security"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated cost actions",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Cost Alert Pipeline",
        "desc": "Automated budget monitoring",
        "steps": [
          {
            "n": "AWS Cost and Usage Report",
            "r": "Track Costs",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Action",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awscostexplorer": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Cost Explorer in AWS Console",
        "l": "Console → Billing → AWS Cost Explorer"
      },
      {
        "s": 2,
        "a": "Enable cost tracking and create budget",
        "l": "AWS Cost Explorer → Create"
      },
      {
        "s": 3,
        "a": "Set alert thresholds and notification emails",
        "l": "Alerts → Configure"
      },
      {
        "s": 4,
        "a": "Tag resources for cost allocation",
        "l": "Cost Allocation Tags → Activate"
      },
      {
        "s": 5,
        "a": "Review cost breakdown by service/region",
        "l": "AWS Cost Explorer → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Billing alarms",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Budget alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Billing access control",
        "c": "Security"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated cost actions",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Cost Alert Pipeline",
        "desc": "Automated budget monitoring",
        "steps": [
          {
            "n": "AWS Cost Explorer",
            "r": "Track Costs",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Action",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "reservedinstancereporting": {
    "setup": [
      {
        "s": 1,
        "a": "Open Reserved Instance Reporting in AWS Console",
        "l": "Console → Billing → Reserved Instance Reporting"
      },
      {
        "s": 2,
        "a": "Enable cost tracking and create budget",
        "l": "Reserved Instance Reporting → Create"
      },
      {
        "s": 3,
        "a": "Set alert thresholds and notification emails",
        "l": "Alerts → Configure"
      },
      {
        "s": 4,
        "a": "Tag resources for cost allocation",
        "l": "Cost Allocation Tags → Activate"
      },
      {
        "s": 5,
        "a": "Review cost breakdown by service/region",
        "l": "Reserved Instance Reporting → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Billing alarms",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Budget alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Billing access control",
        "c": "Security"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated cost actions",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Cost Alert Pipeline",
        "desc": "Automated budget monitoring",
        "steps": [
          {
            "n": "Reserved Instance Reporting",
            "r": "Track Costs",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Action",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "savingsplans": {
    "setup": [
      {
        "s": 1,
        "a": "Open Savings Plans in AWS Console",
        "l": "Console → Billing → Savings Plans"
      },
      {
        "s": 2,
        "a": "Enable cost tracking and create budget",
        "l": "Savings Plans → Create"
      },
      {
        "s": 3,
        "a": "Set alert thresholds and notification emails",
        "l": "Alerts → Configure"
      },
      {
        "s": 4,
        "a": "Tag resources for cost allocation",
        "l": "Cost Allocation Tags → Activate"
      },
      {
        "s": 5,
        "a": "Review cost breakdown by service/region",
        "l": "Savings Plans → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Billing alarms",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Budget alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Billing access control",
        "c": "Security"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated cost actions",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Cost Alert Pipeline",
        "desc": "Automated budget monitoring",
        "steps": [
          {
            "n": "Savings Plans",
            "r": "Track Costs",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Action",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazondcv": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon DCV in AWS Console",
        "l": "Console → Amazon DCV"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "Amazon DCV → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "Amazon DCV → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "Amazon DCV",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "Amazon DCV",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "amazonec2autoscaling": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon EC2 Auto Scaling in AWS Console",
        "l": "Console → Amazon EC2 Auto Scaling"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "Amazon EC2 Auto Scaling → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "Amazon EC2 Auto Scaling → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "Amazon EC2 Auto Scaling",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "Amazon EC2 Auto Scaling",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "amazonec2imagebuilder": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon EC2 Image Builder in AWS Console",
        "l": "Console → Amazon EC2 Image Builder"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "Amazon EC2 Image Builder → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "Amazon EC2 Image Builder → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "Amazon EC2 Image Builder",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "Amazon EC2 Image Builder",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "amazonec2": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon EC2 in AWS Console",
        "l": "Console → Amazon EC2"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "Amazon EC2 → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "Amazon EC2 → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "Amazon EC2",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "Amazon EC2",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "amazonelasticvmwareservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Elastic VMware Service in AWS Console",
        "l": "Console → Amazon Elastic VMware Service"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "Amazon Elastic VMware Service → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "Amazon Elastic VMware Service → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "Amazon Elastic VMware Service",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "Amazon Elastic VMware Service",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "amazonlightsailforresearch": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Lightsail for Research in AWS Console",
        "l": "Console → Amazon Lightsail for Research"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "Amazon Lightsail for Research → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "Amazon Lightsail for Research → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "Amazon Lightsail for Research",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "Amazon Lightsail for Research",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "amazonlightsail": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Lightsail in AWS Console",
        "l": "Console → Amazon Lightsail"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "Amazon Lightsail → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "Amazon Lightsail → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "Amazon Lightsail",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "Amazon Lightsail",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsapprunner": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS App Runner in AWS Console",
        "l": "Console → AWS App Runner"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS App Runner → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS App Runner → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS App Runner",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS App Runner",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsbatch": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Batch in AWS Console",
        "l": "Console → AWS Batch"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Batch → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Batch → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Batch",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Batch",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awscomputeoptimizer": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Compute Optimizer in AWS Console",
        "l": "Console → AWS Compute Optimizer"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Compute Optimizer → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Compute Optimizer → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Compute Optimizer",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awselasticbeanstalk": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elastic Beanstalk in AWS Console",
        "l": "Console → AWS Elastic Beanstalk"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Elastic Beanstalk → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Elastic Beanstalk → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Elastic Beanstalk",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Elastic Beanstalk",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awslocalzones": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Local Zones in AWS Console",
        "l": "Console → AWS Local Zones"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Local Zones → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Local Zones → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Local Zones",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Local Zones",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsnitroenclaves": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Nitro Enclaves in AWS Console",
        "l": "Console → AWS Nitro Enclaves"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Nitro Enclaves → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Nitro Enclaves → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Nitro Enclaves",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Nitro Enclaves",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsoutpostsfamily": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Outposts family in AWS Console",
        "l": "Console → AWS Outposts family"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Outposts family → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Outposts family → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Outposts family",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Outposts family",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsoutpostsrack": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Outposts rack in AWS Console",
        "l": "Console → AWS Outposts rack"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Outposts rack → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Outposts rack → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Outposts rack",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Outposts rack",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsoutpostsservers": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Outposts servers in AWS Console",
        "l": "Console → AWS Outposts servers"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Outposts servers → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Outposts servers → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Outposts servers",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Outposts servers",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsparallelcluster": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Parallel Cluster in AWS Console",
        "l": "Console → AWS Parallel Cluster"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Parallel Cluster → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Parallel Cluster → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Parallel Cluster",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Parallel Cluster",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsparallelcomputingservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Parallel Computing Service in AWS Console",
        "l": "Console → AWS Parallel Computing Service"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Parallel Computing Service → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Parallel Computing Service → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Parallel Computing Service",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Parallel Computing Service",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsserverlessapplicationrepository": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Serverless Application Repository in AWS Console",
        "l": "Console → AWS Serverless Application Repository"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Serverless Application Repository → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Serverless Application Repository → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Serverless Application Repository",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Serverless Application Repository",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awssimspaceweaver": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS SimSpace Weaver in AWS Console",
        "l": "Console → AWS SimSpace Weaver"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS SimSpace Weaver → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS SimSpace Weaver → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS SimSpace Weaver",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS SimSpace Weaver",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awswavelength": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Wavelength in AWS Console",
        "l": "Console → AWS Wavelength"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "AWS Wavelength → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "AWS Wavelength → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "AWS Wavelength",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "AWS Wavelength",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "bottlerocket": {
    "setup": [
      {
        "s": 1,
        "a": "Open Bottlerocket in AWS Console",
        "l": "Console → Bottlerocket"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "Bottlerocket → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "Bottlerocket → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "Bottlerocket",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "Bottlerocket",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "elasticfabricadapter": {
    "setup": [
      {
        "s": 1,
        "a": "Open Elastic Fabric Adapter in AWS Console",
        "l": "Console → Elastic Fabric Adapter"
      },
      {
        "s": 2,
        "a": "Create or launch a new compute resource",
        "l": "Elastic Fabric Adapter → Create / Launch"
      },
      {
        "s": 3,
        "a": "Choose instance type or configuration",
        "l": "Configuration → Instance type"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnet, security group)",
        "l": "VPC → Subnets → SG"
      },
      {
        "s": 5,
        "a": "Assign IAM role for permissions",
        "l": "IAM → Instance Profile"
      },
      {
        "s": 6,
        "a": "Launch and SSH/connect to verify",
        "l": "Elastic Fabric Adapter → Connect"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Network isolation",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Instance permissions",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store artifacts and logs",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, memory, network",
        "c": "Management"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Distribute traffic",
        "c": "Networking"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Infrastructure as code",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Web Application Deployment",
        "desc": "Load-balanced compute",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "Elastic Fabric Adapter",
            "r": "Run App",
            "c": "orange"
          },
          {
            "n": "RDS",
            "r": "Database",
            "c": "blue"
          }
        ]
      },
      {
        "name": "Auto-Scaling Architecture",
        "desc": "Dynamic capacity",
        "steps": [
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          },
          {
            "n": "Elastic Fabric Adapter",
            "r": "Scale",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Assets",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "CDN",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "amazonecsanywhere": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon ECS Anywhere in AWS Console",
        "l": "Console → Amazon ECS Anywhere"
      },
      {
        "s": 2,
        "a": "Create a cluster or registry",
        "l": "Amazon ECS Anywhere → Create Cluster"
      },
      {
        "s": 3,
        "a": "Define task definition or deployment config",
        "l": "Task Definitions → Create"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnets, SG)",
        "l": "VPC → Configure"
      },
      {
        "s": 5,
        "a": "Set up IAM roles for task execution",
        "l": "IAM → Task Execution Role"
      },
      {
        "s": 6,
        "a": "Deploy service and verify running tasks",
        "l": "Amazon ECS Anywhere → Services → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Container networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Task execution roles",
        "c": "Security"
      },
      {
        "id": "amazonelasticcontainerregistry",
        "n": "ECR",
        "d": "Container image registry",
        "c": "Containers"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Service load balancing",
        "c": "Networking"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Container monitoring",
        "c": "Management"
      },
      {
        "id": "awsfargate",
        "n": "Fargate",
        "d": "Serverless containers",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Container CI/CD",
        "desc": "Build → Push → Deploy",
        "steps": [
          {
            "n": "CodeBuild",
            "r": "Build Image",
            "c": "blue"
          },
          {
            "n": "ECR",
            "r": "Push",
            "c": "orange"
          },
          {
            "n": "Amazon ECS Anywhere",
            "r": "Deploy",
            "c": "green"
          },
          {
            "n": "ALB",
            "r": "Route Traffic",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Microservices",
        "desc": "Service mesh architecture",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Ingress",
            "c": "blue"
          },
          {
            "n": "Amazon ECS Anywhere",
            "r": "Services",
            "c": "green"
          },
          {
            "n": "DynamoDB",
            "r": "Data",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "amazoneksanywhere": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon EKS Anywhere in AWS Console",
        "l": "Console → Amazon EKS Anywhere"
      },
      {
        "s": 2,
        "a": "Create a cluster or registry",
        "l": "Amazon EKS Anywhere → Create Cluster"
      },
      {
        "s": 3,
        "a": "Define task definition or deployment config",
        "l": "Task Definitions → Create"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnets, SG)",
        "l": "VPC → Configure"
      },
      {
        "s": 5,
        "a": "Set up IAM roles for task execution",
        "l": "IAM → Task Execution Role"
      },
      {
        "s": 6,
        "a": "Deploy service and verify running tasks",
        "l": "Amazon EKS Anywhere → Services → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Container networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Task execution roles",
        "c": "Security"
      },
      {
        "id": "amazonelasticcontainerregistry",
        "n": "ECR",
        "d": "Container image registry",
        "c": "Containers"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Service load balancing",
        "c": "Networking"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Container monitoring",
        "c": "Management"
      },
      {
        "id": "awsfargate",
        "n": "Fargate",
        "d": "Serverless containers",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Container CI/CD",
        "desc": "Build → Push → Deploy",
        "steps": [
          {
            "n": "CodeBuild",
            "r": "Build Image",
            "c": "blue"
          },
          {
            "n": "ECR",
            "r": "Push",
            "c": "orange"
          },
          {
            "n": "Amazon EKS Anywhere",
            "r": "Deploy",
            "c": "green"
          },
          {
            "n": "ALB",
            "r": "Route Traffic",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Microservices",
        "desc": "Service mesh architecture",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Ingress",
            "c": "blue"
          },
          {
            "n": "Amazon EKS Anywhere",
            "r": "Services",
            "c": "green"
          },
          {
            "n": "DynamoDB",
            "r": "Data",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "amazoneksdistro": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon EKS Distro in AWS Console",
        "l": "Console → Amazon EKS Distro"
      },
      {
        "s": 2,
        "a": "Create a cluster or registry",
        "l": "Amazon EKS Distro → Create Cluster"
      },
      {
        "s": 3,
        "a": "Define task definition or deployment config",
        "l": "Task Definitions → Create"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnets, SG)",
        "l": "VPC → Configure"
      },
      {
        "s": 5,
        "a": "Set up IAM roles for task execution",
        "l": "IAM → Task Execution Role"
      },
      {
        "s": 6,
        "a": "Deploy service and verify running tasks",
        "l": "Amazon EKS Distro → Services → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Container networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Task execution roles",
        "c": "Security"
      },
      {
        "id": "amazonelasticcontainerregistry",
        "n": "ECR",
        "d": "Container image registry",
        "c": "Containers"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Service load balancing",
        "c": "Networking"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Container monitoring",
        "c": "Management"
      },
      {
        "id": "awsfargate",
        "n": "Fargate",
        "d": "Serverless containers",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Container CI/CD",
        "desc": "Build → Push → Deploy",
        "steps": [
          {
            "n": "CodeBuild",
            "r": "Build Image",
            "c": "blue"
          },
          {
            "n": "ECR",
            "r": "Push",
            "c": "orange"
          },
          {
            "n": "Amazon EKS Distro",
            "r": "Deploy",
            "c": "green"
          },
          {
            "n": "ALB",
            "r": "Route Traffic",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Microservices",
        "desc": "Service mesh architecture",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Ingress",
            "c": "blue"
          },
          {
            "n": "Amazon EKS Distro",
            "r": "Services",
            "c": "green"
          },
          {
            "n": "DynamoDB",
            "r": "Data",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "amazonelasticcontainerregistry": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Elastic Container Registry in AWS Console",
        "l": "Console → Amazon Elastic Container Registry"
      },
      {
        "s": 2,
        "a": "Create a cluster or registry",
        "l": "Amazon Elastic Container Registry → Create Cluster"
      },
      {
        "s": 3,
        "a": "Define task definition or deployment config",
        "l": "Task Definitions → Create"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnets, SG)",
        "l": "VPC → Configure"
      },
      {
        "s": 5,
        "a": "Set up IAM roles for task execution",
        "l": "IAM → Task Execution Role"
      },
      {
        "s": 6,
        "a": "Deploy service and verify running tasks",
        "l": "Amazon Elastic Container Registry → Services → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Container networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Task execution roles",
        "c": "Security"
      },
      {
        "id": "amazonelasticcontainerregistry",
        "n": "ECR",
        "d": "Container image registry",
        "c": "Containers"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Service load balancing",
        "c": "Networking"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Container monitoring",
        "c": "Management"
      },
      {
        "id": "awsfargate",
        "n": "Fargate",
        "d": "Serverless containers",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Container CI/CD",
        "desc": "Build → Push → Deploy",
        "steps": [
          {
            "n": "CodeBuild",
            "r": "Build Image",
            "c": "blue"
          },
          {
            "n": "ECR",
            "r": "Push",
            "c": "orange"
          },
          {
            "n": "Amazon Elastic Container Registry",
            "r": "Deploy",
            "c": "green"
          },
          {
            "n": "ALB",
            "r": "Route Traffic",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Microservices",
        "desc": "Service mesh architecture",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Ingress",
            "c": "blue"
          },
          {
            "n": "Amazon Elastic Container Registry",
            "r": "Services",
            "c": "green"
          },
          {
            "n": "DynamoDB",
            "r": "Data",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "amazonelastickubernetesservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Elastic Kubernetes Service in AWS Console",
        "l": "Console → Amazon Elastic Kubernetes Service"
      },
      {
        "s": 2,
        "a": "Create a cluster or registry",
        "l": "Amazon Elastic Kubernetes Service → Create Cluster"
      },
      {
        "s": 3,
        "a": "Define task definition or deployment config",
        "l": "Task Definitions → Create"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnets, SG)",
        "l": "VPC → Configure"
      },
      {
        "s": 5,
        "a": "Set up IAM roles for task execution",
        "l": "IAM → Task Execution Role"
      },
      {
        "s": 6,
        "a": "Deploy service and verify running tasks",
        "l": "Amazon Elastic Kubernetes Service → Services → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Container networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Task execution roles",
        "c": "Security"
      },
      {
        "id": "amazonelasticcontainerregistry",
        "n": "ECR",
        "d": "Container image registry",
        "c": "Containers"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Service load balancing",
        "c": "Networking"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Container monitoring",
        "c": "Management"
      },
      {
        "id": "awsfargate",
        "n": "Fargate",
        "d": "Serverless containers",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Container CI/CD",
        "desc": "Build → Push → Deploy",
        "steps": [
          {
            "n": "CodeBuild",
            "r": "Build Image",
            "c": "blue"
          },
          {
            "n": "ECR",
            "r": "Push",
            "c": "orange"
          },
          {
            "n": "Amazon Elastic Kubernetes Service",
            "r": "Deploy",
            "c": "green"
          },
          {
            "n": "ALB",
            "r": "Route Traffic",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Microservices",
        "desc": "Service mesh architecture",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Ingress",
            "c": "blue"
          },
          {
            "n": "Amazon Elastic Kubernetes Service",
            "r": "Services",
            "c": "green"
          },
          {
            "n": "DynamoDB",
            "r": "Data",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "redhatopenshiftserviceonaws": {
    "setup": [
      {
        "s": 1,
        "a": "Open Red Hat OpenShift Service on AWS in AWS Console",
        "l": "Console → Red Hat OpenShift Service on AWS"
      },
      {
        "s": 2,
        "a": "Create a cluster or registry",
        "l": "Red Hat OpenShift Service on AWS → Create Cluster"
      },
      {
        "s": 3,
        "a": "Define task definition or deployment config",
        "l": "Task Definitions → Create"
      },
      {
        "s": 4,
        "a": "Configure networking (VPC, subnets, SG)",
        "l": "VPC → Configure"
      },
      {
        "s": 5,
        "a": "Set up IAM roles for task execution",
        "l": "IAM → Task Execution Role"
      },
      {
        "s": 6,
        "a": "Deploy service and verify running tasks",
        "l": "Red Hat OpenShift Service on AWS → Services → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Container networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Task execution roles",
        "c": "Security"
      },
      {
        "id": "amazonelasticcontainerregistry",
        "n": "ECR",
        "d": "Container image registry",
        "c": "Containers"
      },
      {
        "id": "elasticloadbalancing",
        "n": "ALB",
        "d": "Service load balancing",
        "c": "Networking"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Container monitoring",
        "c": "Management"
      },
      {
        "id": "awsfargate",
        "n": "Fargate",
        "d": "Serverless containers",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Container CI/CD",
        "desc": "Build → Push → Deploy",
        "steps": [
          {
            "n": "CodeBuild",
            "r": "Build Image",
            "c": "blue"
          },
          {
            "n": "ECR",
            "r": "Push",
            "c": "orange"
          },
          {
            "n": "Red Hat OpenShift Service on AWS",
            "r": "Deploy",
            "c": "green"
          },
          {
            "n": "ALB",
            "r": "Route Traffic",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Microservices",
        "desc": "Service mesh architecture",
        "steps": [
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          },
          {
            "n": "ALB",
            "r": "Ingress",
            "c": "blue"
          },
          {
            "n": "Red Hat OpenShift Service on AWS",
            "r": "Services",
            "c": "green"
          },
          {
            "n": "DynamoDB",
            "r": "Data",
            "c": "blue"
          }
        ]
      }
    ]
  },
  "awsactivate": {
    "setup": [
      {
        "s": 1,
        "a": "Navigate to AWS Activate",
        "l": "Console → AWS Activate"
      },
      {
        "s": 2,
        "a": "Sign up or enable the service",
        "l": "AWS Activate → Get Started"
      },
      {
        "s": 3,
        "a": "Configure your account or team settings",
        "l": "Settings → Configure"
      },
      {
        "s": 4,
        "a": "Explore available resources and documentation",
        "l": "AWS Activate → Resources"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Account access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage",
        "c": "Management"
      }
    ],
    "pipelines": []
  },
  "awsiq": {
    "setup": [
      {
        "s": 1,
        "a": "Navigate to AWS IQ",
        "l": "Console → AWS IQ"
      },
      {
        "s": 2,
        "a": "Sign up or enable the service",
        "l": "AWS IQ → Get Started"
      },
      {
        "s": 3,
        "a": "Configure your account or team settings",
        "l": "Settings → Configure"
      },
      {
        "s": 4,
        "a": "Explore available resources and documentation",
        "l": "AWS IQ → Resources"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Account access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage",
        "c": "Management"
      }
    ],
    "pipelines": []
  },
  "awsmanagedservices": {
    "setup": [
      {
        "s": 1,
        "a": "Navigate to AWS Managed Services",
        "l": "Console → AWS Managed Services"
      },
      {
        "s": 2,
        "a": "Sign up or enable the service",
        "l": "AWS Managed Services → Get Started"
      },
      {
        "s": 3,
        "a": "Configure your account or team settings",
        "l": "Settings → Configure"
      },
      {
        "s": 4,
        "a": "Explore available resources and documentation",
        "l": "AWS Managed Services → Resources"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Account access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage",
        "c": "Management"
      }
    ],
    "pipelines": []
  },
  "awsprofessionalservices": {
    "setup": [
      {
        "s": 1,
        "a": "Navigate to AWS Professional Services",
        "l": "Console → AWS Professional Services"
      },
      {
        "s": 2,
        "a": "Sign up or enable the service",
        "l": "AWS Professional Services → Get Started"
      },
      {
        "s": 3,
        "a": "Configure your account or team settings",
        "l": "Settings → Configure"
      },
      {
        "s": 4,
        "a": "Explore available resources and documentation",
        "l": "AWS Professional Services → Resources"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Account access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage",
        "c": "Management"
      }
    ],
    "pipelines": []
  },
  "awsrepostprivate": {
    "setup": [
      {
        "s": 1,
        "a": "Navigate to AWS rePost Private",
        "l": "Console → AWS rePost Private"
      },
      {
        "s": 2,
        "a": "Sign up or enable the service",
        "l": "AWS rePost Private → Get Started"
      },
      {
        "s": 3,
        "a": "Configure your account or team settings",
        "l": "Settings → Configure"
      },
      {
        "s": 4,
        "a": "Explore available resources and documentation",
        "l": "AWS rePost Private → Resources"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Account access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage",
        "c": "Management"
      }
    ],
    "pipelines": []
  },
  "awsrepost": {
    "setup": [
      {
        "s": 1,
        "a": "Navigate to AWS rePost",
        "l": "Console → AWS rePost"
      },
      {
        "s": 2,
        "a": "Sign up or enable the service",
        "l": "AWS rePost → Get Started"
      },
      {
        "s": 3,
        "a": "Configure your account or team settings",
        "l": "Settings → Configure"
      },
      {
        "s": 4,
        "a": "Explore available resources and documentation",
        "l": "AWS rePost → Resources"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Account access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage",
        "c": "Management"
      }
    ],
    "pipelines": []
  },
  "awssupport": {
    "setup": [
      {
        "s": 1,
        "a": "Navigate to AWS Support",
        "l": "Console → AWS Support"
      },
      {
        "s": 2,
        "a": "Sign up or enable the service",
        "l": "AWS Support → Get Started"
      },
      {
        "s": 3,
        "a": "Configure your account or team settings",
        "l": "Settings → Configure"
      },
      {
        "s": 4,
        "a": "Explore available resources and documentation",
        "l": "AWS Support → Resources"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Account access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage",
        "c": "Management"
      }
    ],
    "pipelines": []
  },
  "awstrainingcertification": {
    "setup": [
      {
        "s": 1,
        "a": "Navigate to AWS Training Certification",
        "l": "Console → AWS Training Certification"
      },
      {
        "s": 2,
        "a": "Sign up or enable the service",
        "l": "AWS Training Certification → Get Started"
      },
      {
        "s": 3,
        "a": "Configure your account or team settings",
        "l": "Settings → Configure"
      },
      {
        "s": 4,
        "a": "Explore available resources and documentation",
        "l": "AWS Training Certification → Resources"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Account access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage",
        "c": "Management"
      }
    ],
    "pipelines": []
  },
  "amazonaurora": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Aurora in AWS Console",
        "l": "Console → Amazon Aurora"
      },
      {
        "s": 2,
        "a": "Create a new database or cluster",
        "l": "Amazon Aurora → Create Database"
      },
      {
        "s": 3,
        "a": "Choose engine version and instance class",
        "l": "Engine → Configuration"
      },
      {
        "s": 4,
        "a": "Configure VPC, subnet group, and security group",
        "l": "VPC → Subnet Group → SG"
      },
      {
        "s": 5,
        "a": "Set up master credentials (or use Secrets Manager)",
        "l": "Credentials → Secrets Manager"
      },
      {
        "s": 6,
        "a": "Create database and note the endpoint",
        "l": "Amazon Aurora → Endpoint"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Database networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Database authentication",
        "c": "Security"
      },
      {
        "id": "awssecretsmanager",
        "n": "Secrets Manager",
        "d": "Rotate credentials securely",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, connections, IOPS",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless database access",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Define as infrastructure code",
        "c": "Management"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "App server connects to DB",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Classic Web + Database",
        "desc": "EC2 + RDS pattern",
        "steps": [
          {
            "n": "Amazon Aurora",
            "r": "Create Database",
            "c": "blue"
          },
          {
            "n": "Secrets Manager",
            "r": "Store Creds",
            "c": "purple"
          },
          {
            "n": "EC2",
            "r": "Connect App",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "Serverless Database Access",
        "desc": "Lambda with database",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Query DB",
            "c": "yellow"
          },
          {
            "n": "Amazon Aurora",
            "r": "Data Store",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Logs",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazondocumentdb": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon DocumentDB in AWS Console",
        "l": "Console → Amazon DocumentDB"
      },
      {
        "s": 2,
        "a": "Create a new database or cluster",
        "l": "Amazon DocumentDB → Create Database"
      },
      {
        "s": 3,
        "a": "Choose engine version and instance class",
        "l": "Engine → Configuration"
      },
      {
        "s": 4,
        "a": "Configure VPC, subnet group, and security group",
        "l": "VPC → Subnet Group → SG"
      },
      {
        "s": 5,
        "a": "Set up master credentials (or use Secrets Manager)",
        "l": "Credentials → Secrets Manager"
      },
      {
        "s": 6,
        "a": "Create database and note the endpoint",
        "l": "Amazon DocumentDB → Endpoint"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Database networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Database authentication",
        "c": "Security"
      },
      {
        "id": "awssecretsmanager",
        "n": "Secrets Manager",
        "d": "Rotate credentials securely",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, connections, IOPS",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless database access",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Define as infrastructure code",
        "c": "Management"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "App server connects to DB",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Classic Web + Database",
        "desc": "EC2 + RDS pattern",
        "steps": [
          {
            "n": "Amazon DocumentDB",
            "r": "Create Database",
            "c": "blue"
          },
          {
            "n": "Secrets Manager",
            "r": "Store Creds",
            "c": "purple"
          },
          {
            "n": "EC2",
            "r": "Connect App",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "Serverless Database Access",
        "desc": "Lambda with database",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Query DB",
            "c": "yellow"
          },
          {
            "n": "Amazon DocumentDB",
            "r": "Data Store",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Logs",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonelasticache": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon ElastiCache in AWS Console",
        "l": "Console → Amazon ElastiCache"
      },
      {
        "s": 2,
        "a": "Create a new database or cluster",
        "l": "Amazon ElastiCache → Create Database"
      },
      {
        "s": 3,
        "a": "Choose engine version and instance class",
        "l": "Engine → Configuration"
      },
      {
        "s": 4,
        "a": "Configure VPC, subnet group, and security group",
        "l": "VPC → Subnet Group → SG"
      },
      {
        "s": 5,
        "a": "Set up master credentials (or use Secrets Manager)",
        "l": "Credentials → Secrets Manager"
      },
      {
        "s": 6,
        "a": "Create database and note the endpoint",
        "l": "Amazon ElastiCache → Endpoint"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Database networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Database authentication",
        "c": "Security"
      },
      {
        "id": "awssecretsmanager",
        "n": "Secrets Manager",
        "d": "Rotate credentials securely",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, connections, IOPS",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless database access",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Define as infrastructure code",
        "c": "Management"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "App server connects to DB",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Classic Web + Database",
        "desc": "EC2 + RDS pattern",
        "steps": [
          {
            "n": "Amazon ElastiCache",
            "r": "Create Database",
            "c": "blue"
          },
          {
            "n": "Secrets Manager",
            "r": "Store Creds",
            "c": "purple"
          },
          {
            "n": "EC2",
            "r": "Connect App",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "Serverless Database Access",
        "desc": "Lambda with database",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Query DB",
            "c": "yellow"
          },
          {
            "n": "Amazon ElastiCache",
            "r": "Data Store",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Logs",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonkeyspaces": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Keyspaces in AWS Console",
        "l": "Console → Amazon Keyspaces"
      },
      {
        "s": 2,
        "a": "Create a new database or cluster",
        "l": "Amazon Keyspaces → Create Database"
      },
      {
        "s": 3,
        "a": "Choose engine version and instance class",
        "l": "Engine → Configuration"
      },
      {
        "s": 4,
        "a": "Configure VPC, subnet group, and security group",
        "l": "VPC → Subnet Group → SG"
      },
      {
        "s": 5,
        "a": "Set up master credentials (or use Secrets Manager)",
        "l": "Credentials → Secrets Manager"
      },
      {
        "s": 6,
        "a": "Create database and note the endpoint",
        "l": "Amazon Keyspaces → Endpoint"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Database networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Database authentication",
        "c": "Security"
      },
      {
        "id": "awssecretsmanager",
        "n": "Secrets Manager",
        "d": "Rotate credentials securely",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, connections, IOPS",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless database access",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Define as infrastructure code",
        "c": "Management"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "App server connects to DB",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Classic Web + Database",
        "desc": "EC2 + RDS pattern",
        "steps": [
          {
            "n": "Amazon Keyspaces",
            "r": "Create Database",
            "c": "blue"
          },
          {
            "n": "Secrets Manager",
            "r": "Store Creds",
            "c": "purple"
          },
          {
            "n": "EC2",
            "r": "Connect App",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "Serverless Database Access",
        "desc": "Lambda with database",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Query DB",
            "c": "yellow"
          },
          {
            "n": "Amazon Keyspaces",
            "r": "Data Store",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Logs",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonmemorydb": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon MemoryDB in AWS Console",
        "l": "Console → Amazon MemoryDB"
      },
      {
        "s": 2,
        "a": "Create a new database or cluster",
        "l": "Amazon MemoryDB → Create Database"
      },
      {
        "s": 3,
        "a": "Choose engine version and instance class",
        "l": "Engine → Configuration"
      },
      {
        "s": 4,
        "a": "Configure VPC, subnet group, and security group",
        "l": "VPC → Subnet Group → SG"
      },
      {
        "s": 5,
        "a": "Set up master credentials (or use Secrets Manager)",
        "l": "Credentials → Secrets Manager"
      },
      {
        "s": 6,
        "a": "Create database and note the endpoint",
        "l": "Amazon MemoryDB → Endpoint"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Database networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Database authentication",
        "c": "Security"
      },
      {
        "id": "awssecretsmanager",
        "n": "Secrets Manager",
        "d": "Rotate credentials securely",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, connections, IOPS",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless database access",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Define as infrastructure code",
        "c": "Management"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "App server connects to DB",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Classic Web + Database",
        "desc": "EC2 + RDS pattern",
        "steps": [
          {
            "n": "Amazon MemoryDB",
            "r": "Create Database",
            "c": "blue"
          },
          {
            "n": "Secrets Manager",
            "r": "Store Creds",
            "c": "purple"
          },
          {
            "n": "EC2",
            "r": "Connect App",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "Serverless Database Access",
        "desc": "Lambda with database",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Query DB",
            "c": "yellow"
          },
          {
            "n": "Amazon MemoryDB",
            "r": "Data Store",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Logs",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonneptune": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Neptune in AWS Console",
        "l": "Console → Amazon Neptune"
      },
      {
        "s": 2,
        "a": "Create a new database or cluster",
        "l": "Amazon Neptune → Create Database"
      },
      {
        "s": 3,
        "a": "Choose engine version and instance class",
        "l": "Engine → Configuration"
      },
      {
        "s": 4,
        "a": "Configure VPC, subnet group, and security group",
        "l": "VPC → Subnet Group → SG"
      },
      {
        "s": 5,
        "a": "Set up master credentials (or use Secrets Manager)",
        "l": "Credentials → Secrets Manager"
      },
      {
        "s": 6,
        "a": "Create database and note the endpoint",
        "l": "Amazon Neptune → Endpoint"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Database networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Database authentication",
        "c": "Security"
      },
      {
        "id": "awssecretsmanager",
        "n": "Secrets Manager",
        "d": "Rotate credentials securely",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, connections, IOPS",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless database access",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Define as infrastructure code",
        "c": "Management"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "App server connects to DB",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Classic Web + Database",
        "desc": "EC2 + RDS pattern",
        "steps": [
          {
            "n": "Amazon Neptune",
            "r": "Create Database",
            "c": "blue"
          },
          {
            "n": "Secrets Manager",
            "r": "Store Creds",
            "c": "purple"
          },
          {
            "n": "EC2",
            "r": "Connect App",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "Serverless Database Access",
        "desc": "Lambda with database",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Query DB",
            "c": "yellow"
          },
          {
            "n": "Amazon Neptune",
            "r": "Data Store",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Logs",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazontimestream": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Timestream in AWS Console",
        "l": "Console → Amazon Timestream"
      },
      {
        "s": 2,
        "a": "Create a new database or cluster",
        "l": "Amazon Timestream → Create Database"
      },
      {
        "s": 3,
        "a": "Choose engine version and instance class",
        "l": "Engine → Configuration"
      },
      {
        "s": 4,
        "a": "Configure VPC, subnet group, and security group",
        "l": "VPC → Subnet Group → SG"
      },
      {
        "s": 5,
        "a": "Set up master credentials (or use Secrets Manager)",
        "l": "Credentials → Secrets Manager"
      },
      {
        "s": 6,
        "a": "Create database and note the endpoint",
        "l": "Amazon Timestream → Endpoint"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Database networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Database authentication",
        "c": "Security"
      },
      {
        "id": "awssecretsmanager",
        "n": "Secrets Manager",
        "d": "Rotate credentials securely",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, connections, IOPS",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless database access",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Define as infrastructure code",
        "c": "Management"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "App server connects to DB",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Classic Web + Database",
        "desc": "EC2 + RDS pattern",
        "steps": [
          {
            "n": "Amazon Timestream",
            "r": "Create Database",
            "c": "blue"
          },
          {
            "n": "Secrets Manager",
            "r": "Store Creds",
            "c": "purple"
          },
          {
            "n": "EC2",
            "r": "Connect App",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "Serverless Database Access",
        "desc": "Lambda with database",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Query DB",
            "c": "yellow"
          },
          {
            "n": "Amazon Timestream",
            "r": "Data Store",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Logs",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsdatabasemigrationservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Database Migration Service in AWS Console",
        "l": "Console → AWS Database Migration Service"
      },
      {
        "s": 2,
        "a": "Create a new database or cluster",
        "l": "AWS Database Migration Service → Create Database"
      },
      {
        "s": 3,
        "a": "Choose engine version and instance class",
        "l": "Engine → Configuration"
      },
      {
        "s": 4,
        "a": "Configure VPC, subnet group, and security group",
        "l": "VPC → Subnet Group → SG"
      },
      {
        "s": 5,
        "a": "Set up master credentials (or use Secrets Manager)",
        "l": "Credentials → Secrets Manager"
      },
      {
        "s": 6,
        "a": "Create database and note the endpoint",
        "l": "AWS Database Migration Service → Endpoint"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Database networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Database authentication",
        "c": "Security"
      },
      {
        "id": "awssecretsmanager",
        "n": "Secrets Manager",
        "d": "Rotate credentials securely",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, connections, IOPS",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless database access",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Define as infrastructure code",
        "c": "Management"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "App server connects to DB",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Classic Web + Database",
        "desc": "EC2 + RDS pattern",
        "steps": [
          {
            "n": "AWS Database Migration Service",
            "r": "Create Database",
            "c": "blue"
          },
          {
            "n": "Secrets Manager",
            "r": "Store Creds",
            "c": "purple"
          },
          {
            "n": "EC2",
            "r": "Connect App",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "Serverless Database Access",
        "desc": "Lambda with database",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Query DB",
            "c": "yellow"
          },
          {
            "n": "AWS Database Migration Service",
            "r": "Data Store",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Logs",
            "c": "red"
          }
        ]
      }
    ]
  },
  "oracledatabaseataws": {
    "setup": [
      {
        "s": 1,
        "a": "Open Oracle Database at AWS in AWS Console",
        "l": "Console → Oracle Database at AWS"
      },
      {
        "s": 2,
        "a": "Create a new database or cluster",
        "l": "Oracle Database at AWS → Create Database"
      },
      {
        "s": 3,
        "a": "Choose engine version and instance class",
        "l": "Engine → Configuration"
      },
      {
        "s": 4,
        "a": "Configure VPC, subnet group, and security group",
        "l": "VPC → Subnet Group → SG"
      },
      {
        "s": 5,
        "a": "Set up master credentials (or use Secrets Manager)",
        "l": "Credentials → Secrets Manager"
      },
      {
        "s": 6,
        "a": "Create database and note the endpoint",
        "l": "Oracle Database at AWS → Endpoint"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Database networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Database authentication",
        "c": "Security"
      },
      {
        "id": "awssecretsmanager",
        "n": "Secrets Manager",
        "d": "Rotate credentials securely",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor CPU, connections, IOPS",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless database access",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Define as infrastructure code",
        "c": "Management"
      },
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "App server connects to DB",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Classic Web + Database",
        "desc": "EC2 + RDS pattern",
        "steps": [
          {
            "n": "Oracle Database at AWS",
            "r": "Create Database",
            "c": "blue"
          },
          {
            "n": "Secrets Manager",
            "r": "Store Creds",
            "c": "purple"
          },
          {
            "n": "EC2",
            "r": "Connect App",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "Serverless Database Access",
        "desc": "Lambda with database",
        "steps": [
          {
            "n": "API Gateway",
            "r": "Request",
            "c": "red"
          },
          {
            "n": "Lambda",
            "r": "Query DB",
            "c": "yellow"
          },
          {
            "n": "Oracle Database at AWS",
            "r": "Data Store",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Logs",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazoncodecatalyst": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon CodeCatalyst in AWS Console",
        "l": "Console → Amazon CodeCatalyst"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "Amazon CodeCatalyst → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "Amazon CodeCatalyst → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "Amazon CodeCatalyst",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "Amazon CodeCatalyst",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "amazoncorretto": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Corretto in AWS Console",
        "l": "Console → Amazon Corretto"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "Amazon Corretto → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "Amazon Corretto → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "Amazon Corretto",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "Amazon Corretto",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awscloudcontrolapi": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Cloud Control API in AWS Console",
        "l": "Console → AWS Cloud Control API"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS Cloud Control API → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS Cloud Control API → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS Cloud Control API",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS Cloud Control API",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awsclouddevelopmentkit": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Cloud Development Kit in AWS Console",
        "l": "Console → AWS Cloud Development Kit"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS Cloud Development Kit → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS Cloud Development Kit → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS Cloud Development Kit",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS Cloud Development Kit",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awscloud9": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Cloud9 in AWS Console",
        "l": "Console → AWS Cloud9"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS Cloud9 → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS Cloud9 → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS Cloud9",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS Cloud9",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awscloudshell": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS CloudShell in AWS Console",
        "l": "Console → AWS CloudShell"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS CloudShell → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS CloudShell → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS CloudShell",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS CloudShell",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awscodeartifact": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS CodeArtifact in AWS Console",
        "l": "Console → AWS CodeArtifact"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS CodeArtifact → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS CodeArtifact → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS CodeArtifact",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS CodeArtifact",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awscodebuild": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS CodeBuild in AWS Console",
        "l": "Console → AWS CodeBuild"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS CodeBuild → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS CodeBuild → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS CodeBuild",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS CodeBuild",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awscodecommit": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS CodeCommit in AWS Console",
        "l": "Console → AWS CodeCommit"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS CodeCommit → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS CodeCommit → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS CodeCommit",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS CodeCommit",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awscodedeploy": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS CodeDeploy in AWS Console",
        "l": "Console → AWS CodeDeploy"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS CodeDeploy → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS CodeDeploy → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS CodeDeploy",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS CodeDeploy",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awscodepipeline": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS CodePipeline in AWS Console",
        "l": "Console → AWS CodePipeline"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS CodePipeline → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS CodePipeline → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS CodePipeline",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS CodePipeline",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awscommandlineinterface": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Command Line Interface in AWS Console",
        "l": "Console → AWS Command Line Interface"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS Command Line Interface → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS Command Line Interface → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS Command Line Interface",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS Command Line Interface",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awsfaultinjectionservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Fault Injection Service in AWS Console",
        "l": "Console → AWS Fault Injection Service"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS Fault Injection Service → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS Fault Injection Service → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS Fault Injection Service",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS Fault Injection Service",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awsinfrastructurecomposer": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Infrastructure Composer in AWS Console",
        "l": "Console → AWS Infrastructure Composer"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS Infrastructure Composer → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS Infrastructure Composer → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS Infrastructure Composer",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS Infrastructure Composer",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awstoolsandsdks": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Tools and SDKs in AWS Console",
        "l": "Console → AWS Tools and SDKs"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS Tools and SDKs → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS Tools and SDKs → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS Tools and SDKs",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS Tools and SDKs",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "awsxray": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS X Ray in AWS Console",
        "l": "Console → AWS X Ray"
      },
      {
        "s": 2,
        "a": "Create a new project or environment",
        "l": "AWS X Ray → Create"
      },
      {
        "s": 3,
        "a": "Connect source code repository",
        "l": "Source → Connect repo"
      },
      {
        "s": 4,
        "a": "Configure build or deployment settings",
        "l": "Settings → Build spec"
      },
      {
        "s": 5,
        "a": "Set up IAM service role",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Run first build/deploy and verify",
        "l": "AWS X Ray → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store build artifacts",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Service permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Build and deploy logs",
        "c": "Management"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Custom build actions",
        "c": "Compute"
      },
      {
        "id": "awscloudformation",
        "n": "CloudFormation",
        "d": "Deploy infrastructure",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "CI/CD Pipeline",
        "desc": "Source → Build → Deploy",
        "steps": [
          {
            "n": "CodeCommit",
            "r": "Source",
            "c": "blue"
          },
          {
            "n": "CodeBuild",
            "r": "Build",
            "c": "green"
          },
          {
            "n": "AWS X Ray",
            "r": "Pipeline",
            "c": "purple"
          },
          {
            "n": "CodeDeploy",
            "r": "Deploy",
            "c": "orange"
          }
        ]
      },
      {
        "name": "Infrastructure Pipeline",
        "desc": "IaC deployment",
        "steps": [
          {
            "n": "AWS X Ray",
            "r": "Trigger",
            "c": "blue"
          },
          {
            "n": "CloudFormation",
            "r": "Deploy Stack",
            "c": "orange"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Notify",
            "c": "pink"
          }
        ]
      }
    ]
  },
  "amazonworkspaces": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon WorkSpaces in AWS Console",
        "l": "Console → Amazon WorkSpaces"
      },
      {
        "s": 2,
        "a": "Create a directory or workspace",
        "l": "Amazon WorkSpaces → Create"
      },
      {
        "s": 3,
        "a": "Choose bundle type (compute + storage)",
        "l": "Bundle → Select"
      },
      {
        "s": 4,
        "a": "Configure VPC and directory service",
        "l": "VPC → Directory"
      },
      {
        "s": 5,
        "a": "Add users and assign workspaces",
        "l": "Users → Add"
      },
      {
        "s": 6,
        "a": "Launch and distribute client URLs",
        "l": "Amazon WorkSpaces → Launch"
      }
    ],
    "connections": [
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Workspace networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Persistent storage",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor workspace health",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Virtual Desktop Infrastructure",
        "desc": "Managed desktop delivery",
        "steps": [
          {
            "n": "IAM",
            "r": "Auth User",
            "c": "yellow"
          },
          {
            "n": "Amazon WorkSpaces",
            "r": "Virtual Desktop",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "User Files",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazonlocationservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Location Service in AWS Console",
        "l": "Console → Amazon Location Service"
      },
      {
        "s": 2,
        "a": "Create a new app or resource",
        "l": "Amazon Location Service → Create"
      },
      {
        "s": 3,
        "a": "Configure SDK and integration settings",
        "l": "Settings → SDK"
      },
      {
        "s": 4,
        "a": "Set up authentication with Cognito",
        "l": "Cognito → User Pool"
      },
      {
        "s": 5,
        "a": "Deploy and test on device",
        "l": "Amazon Location Service → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User sign-in and sign-up",
        "c": "Security"
      },
      {
        "id": "awsamplify",
        "n": "Amplify",
        "d": "Frontend hosting and CI/CD",
        "c": "Frontend"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Backend API access",
        "c": "Networking"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Asset and file storage",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless backend",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Full-Stack Serverless",
        "desc": "Frontend + Backend",
        "steps": [
          {
            "n": "Amplify",
            "r": "Host Frontend",
            "c": "orange"
          },
          {
            "n": "Cognito",
            "r": "Auth",
            "c": "red"
          },
          {
            "n": "API Gateway",
            "r": "API",
            "c": "blue"
          },
          {
            "n": "Lambda",
            "r": "Backend",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsdevicefarm": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Device Farm in AWS Console",
        "l": "Console → AWS Device Farm"
      },
      {
        "s": 2,
        "a": "Create a new app or resource",
        "l": "AWS Device Farm → Create"
      },
      {
        "s": 3,
        "a": "Configure SDK and integration settings",
        "l": "Settings → SDK"
      },
      {
        "s": 4,
        "a": "Set up authentication with Cognito",
        "l": "Cognito → User Pool"
      },
      {
        "s": 5,
        "a": "Deploy and test on device",
        "l": "AWS Device Farm → Deploy"
      }
    ],
    "connections": [
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User sign-in and sign-up",
        "c": "Security"
      },
      {
        "id": "awsamplify",
        "n": "Amplify",
        "d": "Frontend hosting and CI/CD",
        "c": "Frontend"
      },
      {
        "id": "amazonapigateway",
        "n": "API Gateway",
        "d": "Backend API access",
        "c": "Networking"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Asset and file storage",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Serverless backend",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Full-Stack Serverless",
        "desc": "Frontend + Backend",
        "steps": [
          {
            "n": "Amplify",
            "r": "Host Frontend",
            "c": "orange"
          },
          {
            "n": "Cognito",
            "r": "Auth",
            "c": "red"
          },
          {
            "n": "API Gateway",
            "r": "API",
            "c": "blue"
          },
          {
            "n": "Lambda",
            "r": "Backend",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazongameliftservers": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon GameLift Servers in AWS Console",
        "l": "Console → Amazon GameLift Servers"
      },
      {
        "s": 2,
        "a": "Create a new game server fleet or stream",
        "l": "Amazon GameLift Servers → Create"
      },
      {
        "s": 3,
        "a": "Upload game build or configure streaming",
        "l": "Builds → Upload"
      },
      {
        "s": 4,
        "a": "Configure fleet scaling and regions",
        "l": "Fleet → Auto Scaling"
      },
      {
        "s": 5,
        "a": "Set up matchmaking or session management",
        "l": "Matchmaking → Configure"
      },
      {
        "s": 6,
        "a": "Launch and test player connections",
        "l": "Amazon GameLift Servers → Launch"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Game server instances",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Player data and leaderboards",
        "c": "Database"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "Player authentication",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor server performance",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Multiplayer Game Backend",
        "desc": "Session-based game server",
        "steps": [
          {
            "n": "Cognito",
            "r": "Player Auth",
            "c": "red"
          },
          {
            "n": "Amazon GameLift Servers",
            "r": "Game Server",
            "c": "blue"
          },
          {
            "n": "DynamoDB",
            "r": "Player Data",
            "c": "purple"
          },
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          }
        ]
      }
    ]
  },
  "amazongameliftstreams": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon GameLift Streams in AWS Console",
        "l": "Console → Amazon GameLift Streams"
      },
      {
        "s": 2,
        "a": "Create a new game server fleet or stream",
        "l": "Amazon GameLift Streams → Create"
      },
      {
        "s": 3,
        "a": "Upload game build or configure streaming",
        "l": "Builds → Upload"
      },
      {
        "s": 4,
        "a": "Configure fleet scaling and regions",
        "l": "Fleet → Auto Scaling"
      },
      {
        "s": 5,
        "a": "Set up matchmaking or session management",
        "l": "Matchmaking → Configure"
      },
      {
        "s": 6,
        "a": "Launch and test player connections",
        "l": "Amazon GameLift Streams → Launch"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Game server instances",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Player data and leaderboards",
        "c": "Database"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "Player authentication",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor server performance",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Multiplayer Game Backend",
        "desc": "Session-based game server",
        "steps": [
          {
            "n": "Cognito",
            "r": "Player Auth",
            "c": "red"
          },
          {
            "n": "Amazon GameLift Streams",
            "r": "Game Server",
            "c": "blue"
          },
          {
            "n": "DynamoDB",
            "r": "Player Data",
            "c": "purple"
          },
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          }
        ]
      }
    ]
  },
  "open3dengine": {
    "setup": [
      {
        "s": 1,
        "a": "Open Open 3D Engine in AWS Console",
        "l": "Console → Open 3D Engine"
      },
      {
        "s": 2,
        "a": "Create a new game server fleet or stream",
        "l": "Open 3D Engine → Create"
      },
      {
        "s": 3,
        "a": "Upload game build or configure streaming",
        "l": "Builds → Upload"
      },
      {
        "s": 4,
        "a": "Configure fleet scaling and regions",
        "l": "Fleet → Auto Scaling"
      },
      {
        "s": 5,
        "a": "Set up matchmaking or session management",
        "l": "Matchmaking → Configure"
      },
      {
        "s": 6,
        "a": "Launch and test player connections",
        "l": "Open 3D Engine → Launch"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Game server instances",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Player data and leaderboards",
        "c": "Database"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "Player authentication",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor server performance",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Multiplayer Game Backend",
        "desc": "Session-based game server",
        "steps": [
          {
            "n": "Cognito",
            "r": "Player Auth",
            "c": "red"
          },
          {
            "n": "Open 3D Engine",
            "r": "Game Server",
            "c": "blue"
          },
          {
            "n": "DynamoDB",
            "r": "Player Data",
            "c": "purple"
          },
          {
            "n": "CloudWatch",
            "r": "Metrics",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsmarketplacedark": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Marketplace_Dark in AWS Console",
        "l": "Console → AWS Marketplace_Dark"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "AWS Marketplace_Dark → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "AWS Marketplace_Dark → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "AWS Marketplace_Dark",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsmarketplacelight": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Marketplace_Light in AWS Console",
        "l": "Console → AWS Marketplace_Light"
      },
      {
        "s": 2,
        "a": "Create a new instance or workspace",
        "l": "AWS Marketplace_Light → Create"
      },
      {
        "s": 3,
        "a": "Configure user access and permissions",
        "l": "Users → Add users"
      },
      {
        "s": 4,
        "a": "Set up email domain or communication channels",
        "l": "Settings → Domain"
      },
      {
        "s": 5,
        "a": "Integrate with existing directory (AD or SSO)",
        "l": "Directory → Connect"
      },
      {
        "s": 6,
        "a": "Test and roll out to team",
        "l": "AWS Marketplace_Light → Launch"
      }
    ],
    "connections": [
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "User access management",
        "c": "Security"
      },
      {
        "id": "amazoncognito",
        "n": "Cognito",
        "d": "User authentication",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store files and attachments",
        "c": "Storage"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor usage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Send notifications",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "Business Notification Flow",
        "desc": "Automated team communication",
        "steps": [
          {
            "n": "EventBridge",
            "r": "Trigger",
            "c": "pink"
          },
          {
            "n": "Lambda",
            "r": "Format",
            "c": "yellow"
          },
          {
            "n": "AWS Marketplace_Light",
            "r": "Notify",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Log",
            "c": "red"
          }
        ]
      }
    ]
  },
  "awsiotcore": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS IoT Core in AWS Console",
        "l": "Console → IoT → AWS IoT Core"
      },
      {
        "s": 2,
        "a": "Register a new thing or device",
        "l": "AWS IoT Core → Register"
      },
      {
        "s": 3,
        "a": "Create and download device certificates",
        "l": "Security → Certificates"
      },
      {
        "s": 4,
        "a": "Attach IoT policy to certificate",
        "l": "Policies → Attach"
      },
      {
        "s": 5,
        "a": "Configure MQTT topic and rules",
        "l": "Message Routing → Rules"
      },
      {
        "s": 6,
        "a": "Test with MQTT test client",
        "l": "IoT → MQTT Test Client"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Process IoT messages",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store device data",
        "c": "Database"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store device logs",
        "c": "Storage"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Stream device telemetry",
        "c": "Analytics"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor IoT metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert on device events",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "IoT Data Pipeline",
        "desc": "Device → Cloud → Analytics",
        "steps": [
          {
            "n": "AWS IoT Core",
            "r": "Device Data",
            "c": "teal"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          },
          {
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "purple"
          }
        ]
      },
      {
        "name": "IoT Alert System",
        "desc": "Monitor and notify",
        "steps": [
          {
            "n": "AWS IoT Core",
            "r": "Telemetry",
            "c": "teal"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Remediate",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsiotdevicedefender": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS IoT Device Defender in AWS Console",
        "l": "Console → IoT → AWS IoT Device Defender"
      },
      {
        "s": 2,
        "a": "Register a new thing or device",
        "l": "AWS IoT Device Defender → Register"
      },
      {
        "s": 3,
        "a": "Create and download device certificates",
        "l": "Security → Certificates"
      },
      {
        "s": 4,
        "a": "Attach IoT policy to certificate",
        "l": "Policies → Attach"
      },
      {
        "s": 5,
        "a": "Configure MQTT topic and rules",
        "l": "Message Routing → Rules"
      },
      {
        "s": 6,
        "a": "Test with MQTT test client",
        "l": "IoT → MQTT Test Client"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Process IoT messages",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store device data",
        "c": "Database"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store device logs",
        "c": "Storage"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Stream device telemetry",
        "c": "Analytics"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor IoT metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert on device events",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "IoT Data Pipeline",
        "desc": "Device → Cloud → Analytics",
        "steps": [
          {
            "n": "AWS IoT Device Defender",
            "r": "Device Data",
            "c": "teal"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          },
          {
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "purple"
          }
        ]
      },
      {
        "name": "IoT Alert System",
        "desc": "Monitor and notify",
        "steps": [
          {
            "n": "AWS IoT Device Defender",
            "r": "Telemetry",
            "c": "teal"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Remediate",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsiotdevicemanagement": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS IoT Device Management in AWS Console",
        "l": "Console → IoT → AWS IoT Device Management"
      },
      {
        "s": 2,
        "a": "Register a new thing or device",
        "l": "AWS IoT Device Management → Register"
      },
      {
        "s": 3,
        "a": "Create and download device certificates",
        "l": "Security → Certificates"
      },
      {
        "s": 4,
        "a": "Attach IoT policy to certificate",
        "l": "Policies → Attach"
      },
      {
        "s": 5,
        "a": "Configure MQTT topic and rules",
        "l": "Message Routing → Rules"
      },
      {
        "s": 6,
        "a": "Test with MQTT test client",
        "l": "IoT → MQTT Test Client"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Process IoT messages",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store device data",
        "c": "Database"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store device logs",
        "c": "Storage"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Stream device telemetry",
        "c": "Analytics"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor IoT metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert on device events",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "IoT Data Pipeline",
        "desc": "Device → Cloud → Analytics",
        "steps": [
          {
            "n": "AWS IoT Device Management",
            "r": "Device Data",
            "c": "teal"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          },
          {
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "purple"
          }
        ]
      },
      {
        "name": "IoT Alert System",
        "desc": "Monitor and notify",
        "steps": [
          {
            "n": "AWS IoT Device Management",
            "r": "Telemetry",
            "c": "teal"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Remediate",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsiotevents": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS IoT Events in AWS Console",
        "l": "Console → IoT → AWS IoT Events"
      },
      {
        "s": 2,
        "a": "Register a new thing or device",
        "l": "AWS IoT Events → Register"
      },
      {
        "s": 3,
        "a": "Create and download device certificates",
        "l": "Security → Certificates"
      },
      {
        "s": 4,
        "a": "Attach IoT policy to certificate",
        "l": "Policies → Attach"
      },
      {
        "s": 5,
        "a": "Configure MQTT topic and rules",
        "l": "Message Routing → Rules"
      },
      {
        "s": 6,
        "a": "Test with MQTT test client",
        "l": "IoT → MQTT Test Client"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Process IoT messages",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store device data",
        "c": "Database"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store device logs",
        "c": "Storage"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Stream device telemetry",
        "c": "Analytics"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor IoT metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert on device events",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "IoT Data Pipeline",
        "desc": "Device → Cloud → Analytics",
        "steps": [
          {
            "n": "AWS IoT Events",
            "r": "Device Data",
            "c": "teal"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          },
          {
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "purple"
          }
        ]
      },
      {
        "name": "IoT Alert System",
        "desc": "Monitor and notify",
        "steps": [
          {
            "n": "AWS IoT Events",
            "r": "Telemetry",
            "c": "teal"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Remediate",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsiotexpresslink": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS IoT ExpressLink in AWS Console",
        "l": "Console → IoT → AWS IoT ExpressLink"
      },
      {
        "s": 2,
        "a": "Register a new thing or device",
        "l": "AWS IoT ExpressLink → Register"
      },
      {
        "s": 3,
        "a": "Create and download device certificates",
        "l": "Security → Certificates"
      },
      {
        "s": 4,
        "a": "Attach IoT policy to certificate",
        "l": "Policies → Attach"
      },
      {
        "s": 5,
        "a": "Configure MQTT topic and rules",
        "l": "Message Routing → Rules"
      },
      {
        "s": 6,
        "a": "Test with MQTT test client",
        "l": "IoT → MQTT Test Client"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Process IoT messages",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store device data",
        "c": "Database"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store device logs",
        "c": "Storage"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Stream device telemetry",
        "c": "Analytics"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor IoT metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert on device events",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "IoT Data Pipeline",
        "desc": "Device → Cloud → Analytics",
        "steps": [
          {
            "n": "AWS IoT ExpressLink",
            "r": "Device Data",
            "c": "teal"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          },
          {
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "purple"
          }
        ]
      },
      {
        "name": "IoT Alert System",
        "desc": "Monitor and notify",
        "steps": [
          {
            "n": "AWS IoT ExpressLink",
            "r": "Telemetry",
            "c": "teal"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Remediate",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsiotfleetwise": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS IoT FleetWise in AWS Console",
        "l": "Console → IoT → AWS IoT FleetWise"
      },
      {
        "s": 2,
        "a": "Register a new thing or device",
        "l": "AWS IoT FleetWise → Register"
      },
      {
        "s": 3,
        "a": "Create and download device certificates",
        "l": "Security → Certificates"
      },
      {
        "s": 4,
        "a": "Attach IoT policy to certificate",
        "l": "Policies → Attach"
      },
      {
        "s": 5,
        "a": "Configure MQTT topic and rules",
        "l": "Message Routing → Rules"
      },
      {
        "s": 6,
        "a": "Test with MQTT test client",
        "l": "IoT → MQTT Test Client"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Process IoT messages",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store device data",
        "c": "Database"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store device logs",
        "c": "Storage"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Stream device telemetry",
        "c": "Analytics"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor IoT metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert on device events",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "IoT Data Pipeline",
        "desc": "Device → Cloud → Analytics",
        "steps": [
          {
            "n": "AWS IoT FleetWise",
            "r": "Device Data",
            "c": "teal"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          },
          {
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "purple"
          }
        ]
      },
      {
        "name": "IoT Alert System",
        "desc": "Monitor and notify",
        "steps": [
          {
            "n": "AWS IoT FleetWise",
            "r": "Telemetry",
            "c": "teal"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Remediate",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsiotgreengrass": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS IoT Greengrass in AWS Console",
        "l": "Console → IoT → AWS IoT Greengrass"
      },
      {
        "s": 2,
        "a": "Register a new thing or device",
        "l": "AWS IoT Greengrass → Register"
      },
      {
        "s": 3,
        "a": "Create and download device certificates",
        "l": "Security → Certificates"
      },
      {
        "s": 4,
        "a": "Attach IoT policy to certificate",
        "l": "Policies → Attach"
      },
      {
        "s": 5,
        "a": "Configure MQTT topic and rules",
        "l": "Message Routing → Rules"
      },
      {
        "s": 6,
        "a": "Test with MQTT test client",
        "l": "IoT → MQTT Test Client"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Process IoT messages",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store device data",
        "c": "Database"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store device logs",
        "c": "Storage"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Stream device telemetry",
        "c": "Analytics"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor IoT metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert on device events",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "IoT Data Pipeline",
        "desc": "Device → Cloud → Analytics",
        "steps": [
          {
            "n": "AWS IoT Greengrass",
            "r": "Device Data",
            "c": "teal"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          },
          {
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "purple"
          }
        ]
      },
      {
        "name": "IoT Alert System",
        "desc": "Monitor and notify",
        "steps": [
          {
            "n": "AWS IoT Greengrass",
            "r": "Telemetry",
            "c": "teal"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Remediate",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsiotsitewise": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS IoT SiteWise in AWS Console",
        "l": "Console → IoT → AWS IoT SiteWise"
      },
      {
        "s": 2,
        "a": "Register a new thing or device",
        "l": "AWS IoT SiteWise → Register"
      },
      {
        "s": 3,
        "a": "Create and download device certificates",
        "l": "Security → Certificates"
      },
      {
        "s": 4,
        "a": "Attach IoT policy to certificate",
        "l": "Policies → Attach"
      },
      {
        "s": 5,
        "a": "Configure MQTT topic and rules",
        "l": "Message Routing → Rules"
      },
      {
        "s": 6,
        "a": "Test with MQTT test client",
        "l": "IoT → MQTT Test Client"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Process IoT messages",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store device data",
        "c": "Database"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store device logs",
        "c": "Storage"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Stream device telemetry",
        "c": "Analytics"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor IoT metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert on device events",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "IoT Data Pipeline",
        "desc": "Device → Cloud → Analytics",
        "steps": [
          {
            "n": "AWS IoT SiteWise",
            "r": "Device Data",
            "c": "teal"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          },
          {
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "purple"
          }
        ]
      },
      {
        "name": "IoT Alert System",
        "desc": "Monitor and notify",
        "steps": [
          {
            "n": "AWS IoT SiteWise",
            "r": "Telemetry",
            "c": "teal"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Remediate",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsiottwinmaker": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS IoT TwinMaker in AWS Console",
        "l": "Console → IoT → AWS IoT TwinMaker"
      },
      {
        "s": 2,
        "a": "Register a new thing or device",
        "l": "AWS IoT TwinMaker → Register"
      },
      {
        "s": 3,
        "a": "Create and download device certificates",
        "l": "Security → Certificates"
      },
      {
        "s": 4,
        "a": "Attach IoT policy to certificate",
        "l": "Policies → Attach"
      },
      {
        "s": 5,
        "a": "Configure MQTT topic and rules",
        "l": "Message Routing → Rules"
      },
      {
        "s": 6,
        "a": "Test with MQTT test client",
        "l": "IoT → MQTT Test Client"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Process IoT messages",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store device data",
        "c": "Database"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store device logs",
        "c": "Storage"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Stream device telemetry",
        "c": "Analytics"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor IoT metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert on device events",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "IoT Data Pipeline",
        "desc": "Device → Cloud → Analytics",
        "steps": [
          {
            "n": "AWS IoT TwinMaker",
            "r": "Device Data",
            "c": "teal"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          },
          {
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "purple"
          }
        ]
      },
      {
        "name": "IoT Alert System",
        "desc": "Monitor and notify",
        "steps": [
          {
            "n": "AWS IoT TwinMaker",
            "r": "Telemetry",
            "c": "teal"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Remediate",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "freertos": {
    "setup": [
      {
        "s": 1,
        "a": "Open FreeRTOS in AWS Console",
        "l": "Console → IoT → FreeRTOS"
      },
      {
        "s": 2,
        "a": "Register a new thing or device",
        "l": "FreeRTOS → Register"
      },
      {
        "s": 3,
        "a": "Create and download device certificates",
        "l": "Security → Certificates"
      },
      {
        "s": 4,
        "a": "Attach IoT policy to certificate",
        "l": "Policies → Attach"
      },
      {
        "s": 5,
        "a": "Configure MQTT topic and rules",
        "l": "Message Routing → Rules"
      },
      {
        "s": 6,
        "a": "Test with MQTT test client",
        "l": "IoT → MQTT Test Client"
      }
    ],
    "connections": [
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Process IoT messages",
        "c": "Compute"
      },
      {
        "id": "amazondynamodb",
        "n": "DynamoDB",
        "d": "Store device data",
        "c": "Database"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store device logs",
        "c": "Storage"
      },
      {
        "id": "amazonkinesis",
        "n": "Kinesis",
        "d": "Stream device telemetry",
        "c": "Analytics"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor IoT metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert on device events",
        "c": "Integration"
      }
    ],
    "pipelines": [
      {
        "name": "IoT Data Pipeline",
        "desc": "Device → Cloud → Analytics",
        "steps": [
          {
            "n": "FreeRTOS",
            "r": "Device Data",
            "c": "teal"
          },
          {
            "n": "Lambda",
            "r": "Process",
            "c": "yellow"
          },
          {
            "n": "DynamoDB",
            "r": "Store",
            "c": "blue"
          },
          {
            "n": "QuickSight",
            "r": "Dashboard",
            "c": "purple"
          }
        ]
      },
      {
        "name": "IoT Alert System",
        "desc": "Monitor and notify",
        "steps": [
          {
            "n": "FreeRTOS",
            "r": "Telemetry",
            "c": "teal"
          },
          {
            "n": "CloudWatch",
            "r": "Alarm",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Remediate",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonmanagedgrafana": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Managed Grafana in AWS Console",
        "l": "Console → Amazon Managed Grafana"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "Amazon Managed Grafana → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "Amazon Managed Grafana → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "Amazon Managed Grafana",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonmanagedserviceforprometheus": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Managed Service for Prometheus in AWS Console",
        "l": "Console → Amazon Managed Service for Prometheus"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "Amazon Managed Service for Prometheus → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "Amazon Managed Service for Prometheus → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "Amazon Managed Service for Prometheus",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsappconfig": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS AppConfig in AWS Console",
        "l": "Console → AWS AppConfig"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS AppConfig → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS AppConfig → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS AppConfig",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsapplicationautoscaling": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Application Auto Scaling in AWS Console",
        "l": "Console → AWS Application Auto Scaling"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Application Auto Scaling → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Application Auto Scaling → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Application Auto Scaling",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsautoscaling": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Auto Scaling in AWS Console",
        "l": "Console → AWS Auto Scaling"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Auto Scaling → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Auto Scaling → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Auto Scaling",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsbackintagent": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Backint Agent in AWS Console",
        "l": "Console → AWS Backint Agent"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Backint Agent → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Backint Agent → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Backint Agent",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awschatbot": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Chatbot in AWS Console",
        "l": "Console → AWS Chatbot"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Chatbot → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Chatbot → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Chatbot",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awscloudtrail": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS CloudTrail in AWS Console",
        "l": "Console → AWS CloudTrail"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS CloudTrail → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS CloudTrail → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS CloudTrail",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsconfig": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Config in AWS Console",
        "l": "Console → AWS Config"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Config → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Config → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Config",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsconsolemobileapplication": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Console Mobile Application in AWS Console",
        "l": "Console → AWS Console Mobile Application"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Console Mobile Application → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Console Mobile Application → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Console Mobile Application",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awscontroltower": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Control Tower in AWS Console",
        "l": "Console → AWS Control Tower"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Control Tower → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Control Tower → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Control Tower",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsdevopsagent": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS DevOps Agent in AWS Console",
        "l": "Console → AWS DevOps Agent"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS DevOps Agent → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS DevOps Agent → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS DevOps Agent",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsdistroforopentelemetry": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Distro for OpenTelemetry in AWS Console",
        "l": "Console → AWS Distro for OpenTelemetry"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Distro for OpenTelemetry → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Distro for OpenTelemetry → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Distro for OpenTelemetry",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awshealthdashboard": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Health Dashboard in AWS Console",
        "l": "Console → AWS Health Dashboard"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Health Dashboard → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Health Dashboard → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Health Dashboard",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awslaunchwizard": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Launch Wizard in AWS Console",
        "l": "Console → AWS Launch Wizard"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Launch Wizard → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Launch Wizard → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Launch Wizard",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awslicensemanager": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS License Manager in AWS Console",
        "l": "Console → AWS License Manager"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS License Manager → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS License Manager → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS License Manager",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsmanagementconsole": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Management Console in AWS Console",
        "l": "Console → AWS Management Console"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Management Console → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Management Console → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Management Console",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsorganizations": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Organizations in AWS Console",
        "l": "Console → AWS Organizations"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Organizations → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Organizations → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Organizations",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awspartnercentral": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Partner Central in AWS Console",
        "l": "Console → AWS Partner Central"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Partner Central → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Partner Central → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Partner Central",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsproton": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Proton in AWS Console",
        "l": "Console → AWS Proton"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Proton → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Proton → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Proton",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsresiliencehub": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Resilience Hub in AWS Console",
        "l": "Console → AWS Resilience Hub"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Resilience Hub → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Resilience Hub → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Resilience Hub",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsresourceexplorer": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Resource Explorer in AWS Console",
        "l": "Console → AWS Resource Explorer"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Resource Explorer → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Resource Explorer → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Resource Explorer",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsservicecatalog": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Service Catalog in AWS Console",
        "l": "Console → AWS Service Catalog"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Service Catalog → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Service Catalog → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Service Catalog",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsservicemanagementconnector": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Service Management Connector in AWS Console",
        "l": "Console → AWS Service Management Connector"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Service Management Connector → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Service Management Connector → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Service Management Connector",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awssystemsmanager": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Systems Manager in AWS Console",
        "l": "Console → AWS Systems Manager"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Systems Manager → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Systems Manager → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Systems Manager",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awstelconetworkbuilder": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Telco Network Builder in AWS Console",
        "l": "Console → AWS Telco Network Builder"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Telco Network Builder → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Telco Network Builder → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Telco Network Builder",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awstrustedadvisor": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Trusted Advisor in AWS Console",
        "l": "Console → AWS Trusted Advisor"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Trusted Advisor → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Trusted Advisor → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Trusted Advisor",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsusernotifications": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS User Notifications in AWS Console",
        "l": "Console → AWS User Notifications"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS User Notifications → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS User Notifications → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS User Notifications",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awswellarchitectedtool": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Well Architected Tool in AWS Console",
        "l": "Console → AWS Well Architected Tool"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Well Architected Tool → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Well Architected Tool → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Well Architected Tool",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazoninteractivevideoservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Interactive Video Service in AWS Console",
        "l": "Console → Media → Amazon Interactive Video Service"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "Amazon Interactive Video Service → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "Amazon Interactive Video Service → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "Amazon Interactive Video Service",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsdeadlinecloud": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Deadline Cloud in AWS Console",
        "l": "Console → Media → AWS Deadline Cloud"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Deadline Cloud → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Deadline Cloud → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Deadline Cloud",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementalappliancessoftware": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental Appliances & Software in AWS Console",
        "l": "Console → Media → AWS Elemental Appliances & Software"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental Appliances & Software → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental Appliances & Software → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental Appliances & Software",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementalconductor": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental Conductor in AWS Console",
        "l": "Console → Media → AWS Elemental Conductor"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental Conductor → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental Conductor → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental Conductor",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementaldelta": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental Delta in AWS Console",
        "l": "Console → Media → AWS Elemental Delta"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental Delta → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental Delta → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental Delta",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementallink": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental Link in AWS Console",
        "l": "Console → Media → AWS Elemental Link"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental Link → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental Link → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental Link",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementallive": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental Live in AWS Console",
        "l": "Console → Media → AWS Elemental Live"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental Live → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental Live → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental Live",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementalmediaconnect": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental MediaConnect in AWS Console",
        "l": "Console → Media → AWS Elemental MediaConnect"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental MediaConnect → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental MediaConnect → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental MediaConnect",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementalmediaconvert": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental MediaConvert in AWS Console",
        "l": "Console → Media → AWS Elemental MediaConvert"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental MediaConvert → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental MediaConvert → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental MediaConvert",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementalmedialive": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental MediaLive in AWS Console",
        "l": "Console → Media → AWS Elemental MediaLive"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental MediaLive → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental MediaLive → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental MediaLive",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementalmediapackage": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental MediaPackage in AWS Console",
        "l": "Console → Media → AWS Elemental MediaPackage"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental MediaPackage → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental MediaPackage → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental MediaPackage",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementalmediastore": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental MediaStore in AWS Console",
        "l": "Console → Media → AWS Elemental MediaStore"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental MediaStore → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental MediaStore → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental MediaStore",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementalmediatailor": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental MediaTailor in AWS Console",
        "l": "Console → Media → AWS Elemental MediaTailor"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental MediaTailor → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental MediaTailor → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental MediaTailor",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awselementalserver": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elemental Server in AWS Console",
        "l": "Console → Media → AWS Elemental Server"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Elemental Server → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Elemental Server → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Elemental Server",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsthinkboxdeadline": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Thinkbox Deadline in AWS Console",
        "l": "Console → Media → AWS Thinkbox Deadline"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Thinkbox Deadline → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Thinkbox Deadline → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Thinkbox Deadline",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsthinkboxfrost": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Thinkbox Frost in AWS Console",
        "l": "Console → Media → AWS Thinkbox Frost"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Thinkbox Frost → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Thinkbox Frost → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Thinkbox Frost",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsthinkboxkrakatoa": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Thinkbox Krakatoa in AWS Console",
        "l": "Console → Media → AWS Thinkbox Krakatoa"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Thinkbox Krakatoa → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Thinkbox Krakatoa → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Thinkbox Krakatoa",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsthinkboxstoke": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Thinkbox Stoke in AWS Console",
        "l": "Console → Media → AWS Thinkbox Stoke"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Thinkbox Stoke → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Thinkbox Stoke → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Thinkbox Stoke",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsthinkboxxmesh": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Thinkbox XMesh in AWS Console",
        "l": "Console → Media → AWS Thinkbox XMesh"
      },
      {
        "s": 2,
        "a": "Create a new channel, pipeline, or job",
        "l": "AWS Thinkbox XMesh → Create"
      },
      {
        "s": 3,
        "a": "Configure input source (S3 or live stream)",
        "l": "Input → Configure"
      },
      {
        "s": 4,
        "a": "Set output format and destination",
        "l": "Output → S3 / CloudFront"
      },
      {
        "s": 5,
        "a": "Set up IAM role for media processing",
        "l": "IAM → Service Role"
      },
      {
        "s": 6,
        "a": "Start processing and monitor",
        "l": "AWS Thinkbox XMesh → Start"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store media files",
        "c": "Storage"
      },
      {
        "id": "amazoncloudfront",
        "n": "CloudFront",
        "d": "CDN for media delivery",
        "c": "Networking"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Media processing triggers",
        "c": "Compute"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access control",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor transcoding jobs",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Video Processing",
        "desc": "Upload → Transcode → Deliver",
        "steps": [
          {
            "n": "S3",
            "r": "Upload",
            "c": "green"
          },
          {
            "n": "AWS Thinkbox XMesh",
            "r": "Process",
            "c": "blue"
          },
          {
            "n": "S3",
            "r": "Output",
            "c": "green"
          },
          {
            "n": "CloudFront",
            "r": "Stream",
            "c": "purple"
          }
        ]
      }
    ]
  },
  "awsapplicationdiscoveryservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Application Discovery Service in AWS Console",
        "l": "Console → AWS Application Discovery Service"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Application Discovery Service → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Application Discovery Service → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Application Discovery Service",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsapplicationmigrationservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Application Migration Service in AWS Console",
        "l": "Console → AWS Application Migration Service"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Application Migration Service → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Application Migration Service → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Application Migration Service",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsdatatransferterminal": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Data Transfer Terminal in AWS Console",
        "l": "Console → AWS Data Transfer Terminal"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Data Transfer Terminal → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Data Transfer Terminal → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Data Transfer Terminal",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsdatasync": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS DataSync in AWS Console",
        "l": "Console → AWS DataSync"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS DataSync → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS DataSync → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS DataSync",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsmainframemodernization": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Mainframe Modernization in AWS Console",
        "l": "Console → AWS Mainframe Modernization"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Mainframe Modernization → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Mainframe Modernization → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Mainframe Modernization",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsmigrationevaluator": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Migration Evaluator in AWS Console",
        "l": "Console → AWS Migration Evaluator"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Migration Evaluator → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Migration Evaluator → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Migration Evaluator",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsmigrationhub": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Migration Hub in AWS Console",
        "l": "Console → AWS Migration Hub"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Migration Hub → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Migration Hub → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Migration Hub",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awstransferfamily": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Transfer Family in AWS Console",
        "l": "Console → AWS Transfer Family"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Transfer Family → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Transfer Family → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Transfer Family",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awstransform": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Transform in AWS Console",
        "l": "Console → AWS Transform"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Transform → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Transform → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Transform",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonapplicationrecoverycontroller": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Application Recovery Controller in AWS Console",
        "l": "Console → Amazon Application Recovery Controller"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "Amazon Application Recovery Controller → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "Amazon Application Recovery Controller → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "Amazon Application Recovery Controller",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "Amazon Application Recovery Controller",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "amazonvpclattice": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon VPC Lattice in AWS Console",
        "l": "Console → Amazon VPC Lattice"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "Amazon VPC Lattice → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "Amazon VPC Lattice → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "Amazon VPC Lattice",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "Amazon VPC Lattice",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awsappmesh": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS App Mesh in AWS Console",
        "l": "Console → AWS App Mesh"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS App Mesh → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS App Mesh → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS App Mesh",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS App Mesh",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awsclientvpn": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Client VPN in AWS Console",
        "l": "Console → AWS Client VPN"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS Client VPN → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS Client VPN → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS Client VPN",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS Client VPN",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awscloudmap": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Cloud Map in AWS Console",
        "l": "Console → AWS Cloud Map"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS Cloud Map → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS Cloud Map → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS Cloud Map",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS Cloud Map",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awscloudwan": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Cloud WAN in AWS Console",
        "l": "Console → AWS Cloud WAN"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS Cloud WAN → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS Cloud WAN → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS Cloud WAN",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS Cloud WAN",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awsdirectconnect": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Direct Connect in AWS Console",
        "l": "Console → AWS Direct Connect"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS Direct Connect → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS Direct Connect → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS Direct Connect",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS Direct Connect",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awsglobalaccelerator": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Global Accelerator in AWS Console",
        "l": "Console → AWS Global Accelerator"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS Global Accelerator → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS Global Accelerator → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS Global Accelerator",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS Global Accelerator",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awsprivatelink": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS PrivateLink in AWS Console",
        "l": "Console → AWS PrivateLink"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS PrivateLink → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS PrivateLink → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS PrivateLink",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS PrivateLink",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awsrtbfabric": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS RTB Fabric in AWS Console",
        "l": "Console → AWS RTB Fabric"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS RTB Fabric → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS RTB Fabric → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS RTB Fabric",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS RTB Fabric",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awssitetositevpn": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Site to Site VPN in AWS Console",
        "l": "Console → AWS Site to Site VPN"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS Site to Site VPN → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS Site to Site VPN → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS Site to Site VPN",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS Site to Site VPN",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awstransitgateway": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Transit Gateway in AWS Console",
        "l": "Console → AWS Transit Gateway"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS Transit Gateway → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS Transit Gateway → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS Transit Gateway",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS Transit Gateway",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "awsverifiedaccess": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Verified Access in AWS Console",
        "l": "Console → AWS Verified Access"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "AWS Verified Access → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "AWS Verified Access → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "AWS Verified Access",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "AWS Verified Access",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "elasticloadbalancing": {
    "setup": [
      {
        "s": 1,
        "a": "Open Elastic Load Balancing in AWS Console",
        "l": "Console → Elastic Load Balancing"
      },
      {
        "s": 2,
        "a": "Create a new resource (VPC, distribution, etc.)",
        "l": "Elastic Load Balancing → Create"
      },
      {
        "s": 3,
        "a": "Configure routing, subnets, or origins",
        "l": "Configuration → Routes"
      },
      {
        "s": 4,
        "a": "Set up security groups or WAF rules",
        "l": "Security → Configure"
      },
      {
        "s": 5,
        "a": "Attach to compute resources (EC2, Lambda, etc.)",
        "l": "Targets → Attach"
      },
      {
        "s": 6,
        "a": "Test connectivity and DNS resolution",
        "l": "Elastic Load Balancing → Test"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Backend compute targets",
        "c": "Compute"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Edge functions",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Static content origin",
        "c": "Storage"
      },
      {
        "id": "amazonroute53",
        "n": "Route 53",
        "d": "DNS resolution",
        "c": "Networking"
      },
      {
        "id": "awswaf",
        "n": "WAF",
        "d": "Web application firewall",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Traffic monitoring",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Global Content Delivery",
        "desc": "Origin → Edge → User",
        "steps": [
          {
            "n": "S3",
            "r": "Origin",
            "c": "green"
          },
          {
            "n": "Elastic Load Balancing",
            "r": "Network",
            "c": "blue"
          },
          {
            "n": "CloudFront",
            "r": "Edge Cache",
            "c": "purple"
          },
          {
            "n": "Route 53",
            "r": "DNS",
            "c": "purple"
          }
        ]
      },
      {
        "name": "Secure API Network",
        "desc": "Firewall + Load Balancing",
        "steps": [
          {
            "n": "WAF",
            "r": "Filter",
            "c": "red"
          },
          {
            "n": "Elastic Load Balancing",
            "r": "Route",
            "c": "blue"
          },
          {
            "n": "ALB",
            "r": "Load Balance",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Backend",
            "c": "orange"
          }
        ]
      }
    ]
  },
  "amazonbraket": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Braket in AWS Console",
        "l": "Console → Amazon Braket"
      },
      {
        "s": 2,
        "a": "Create a notebook instance",
        "l": "Amazon Braket → Notebooks → Create"
      },
      {
        "s": 3,
        "a": "Choose quantum hardware provider",
        "l": "Devices → Select"
      },
      {
        "s": 4,
        "a": "Write and submit quantum circuit",
        "l": "Notebook → Code → Submit"
      },
      {
        "s": 5,
        "a": "Retrieve results from S3",
        "l": "S3 → Results bucket"
      }
    ],
    "connections": [
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store quantum task results",
        "c": "Storage"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access quantum resources",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor task execution",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Quantum Computing",
        "desc": "Submit → Execute → Analyze",
        "steps": [
          {
            "n": "Amazon Braket",
            "r": "Submit Circuit",
            "c": "purple"
          },
          {
            "n": "S3",
            "r": "Results",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Analyze",
            "c": "yellow"
          },
          {
            "n": "QuickSight",
            "r": "Visualize",
            "c": "teal"
          }
        ]
      }
    ]
  },
  "awsgroundstation": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Ground Station in AWS Console",
        "l": "Console → AWS Ground Station"
      },
      {
        "s": 2,
        "a": "Reserve satellite contact time",
        "l": "AWS Ground Station → Schedule Contact"
      },
      {
        "s": 3,
        "a": "Configure ground station antenna and dataflow",
        "l": "Config → Dataflow"
      },
      {
        "s": 4,
        "a": "Set up EC2 instance to receive data",
        "l": "EC2 → Launch"
      },
      {
        "s": 5,
        "a": "Process downlinked data",
        "l": "AWS Ground Station → Data → S3"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Process satellite data",
        "c": "Compute"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store downlink data",
        "c": "Storage"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Secure data delivery",
        "c": "Networking"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor contacts",
        "c": "Management"
      }
    ],
    "pipelines": [
      {
        "name": "Satellite Data Pipeline",
        "desc": "Downlink → Process → Store",
        "steps": [
          {
            "n": "AWS Ground Station",
            "r": "Downlink",
            "c": "blue"
          },
          {
            "n": "EC2",
            "r": "Process",
            "c": "orange"
          },
          {
            "n": "S3",
            "r": "Store",
            "c": "green"
          },
          {
            "n": "Lambda",
            "r": "Analyze",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonclouddirectory": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Cloud Directory in AWS Console",
        "l": "Console → Amazon Cloud Directory"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "Amazon Cloud Directory → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "Amazon Cloud Directory → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "Amazon Cloud Directory",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazondetective": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Detective in AWS Console",
        "l": "Console → Amazon Detective"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "Amazon Detective → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "Amazon Detective → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "Amazon Detective",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonguardduty": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon GuardDuty in AWS Console",
        "l": "Console → Amazon GuardDuty"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "Amazon GuardDuty → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "Amazon GuardDuty → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "Amazon GuardDuty",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazoninspector": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Inspector in AWS Console",
        "l": "Console → Amazon Inspector"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "Amazon Inspector → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "Amazon Inspector → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "Amazon Inspector",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonmacie": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Macie in AWS Console",
        "l": "Console → Amazon Macie"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "Amazon Macie → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "Amazon Macie → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "Amazon Macie",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonsecuritylake": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Security Lake in AWS Console",
        "l": "Console → Amazon Security Lake"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "Amazon Security Lake → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "Amazon Security Lake → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "Amazon Security Lake",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonverifiedpermissions": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Verified Permissions in AWS Console",
        "l": "Console → Amazon Verified Permissions"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "Amazon Verified Permissions → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "Amazon Verified Permissions → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "Amazon Verified Permissions",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsartifact": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Artifact in AWS Console",
        "l": "Console → AWS Artifact"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Artifact → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Artifact → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Artifact",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsauditmanager": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Audit Manager in AWS Console",
        "l": "Console → AWS Audit Manager"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Audit Manager → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Audit Manager → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Audit Manager",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awscertificatemanager": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Certificate Manager in AWS Console",
        "l": "Console → AWS Certificate Manager"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Certificate Manager → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Certificate Manager → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Certificate Manager",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awscloudhsm": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS CloudHSM in AWS Console",
        "l": "Console → AWS CloudHSM"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS CloudHSM → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS CloudHSM → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS CloudHSM",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsdirectoryservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Directory Service in AWS Console",
        "l": "Console → AWS Directory Service"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Directory Service → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Directory Service → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Directory Service",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsfirewallmanager": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Firewall Manager in AWS Console",
        "l": "Console → AWS Firewall Manager"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Firewall Manager → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Firewall Manager → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Firewall Manager",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsiamidentitycenter": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS IAM Identity Center in AWS Console",
        "l": "Console → AWS IAM Identity Center"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS IAM Identity Center → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS IAM Identity Center → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS IAM Identity Center",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awskeymanagementservice": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Key Management Service in AWS Console",
        "l": "Console → AWS Key Management Service"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Key Management Service → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Key Management Service → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Key Management Service",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsnetworkfirewall": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Network Firewall in AWS Console",
        "l": "Console → AWS Network Firewall"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Network Firewall → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Network Firewall → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Network Firewall",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awspaymentcryptography": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Payment Cryptography in AWS Console",
        "l": "Console → AWS Payment Cryptography"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Payment Cryptography → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Payment Cryptography → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Payment Cryptography",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsprivatecertificateauthority": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Private Certificate Authority in AWS Console",
        "l": "Console → AWS Private Certificate Authority"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Private Certificate Authority → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Private Certificate Authority → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Private Certificate Authority",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsresourceaccessmanager": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Resource Access Manager in AWS Console",
        "l": "Console → AWS Resource Access Manager"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Resource Access Manager → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Resource Access Manager → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Resource Access Manager",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awssecretsmanager": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Secrets Manager in AWS Console",
        "l": "Console → AWS Secrets Manager"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Secrets Manager → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Secrets Manager → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Secrets Manager",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awssecurityagent": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Security Agent in AWS Console",
        "l": "Console → AWS Security Agent"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Security Agent → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Security Agent → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Security Agent",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awssecurityhub": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Security Hub in AWS Console",
        "l": "Console → AWS Security Hub"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Security Hub → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Security Hub → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Security Hub",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awssecurityincidentresponse": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Security Incident Response in AWS Console",
        "l": "Console → AWS Security Incident Response"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Security Incident Response → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Security Incident Response → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Security Incident Response",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsshield": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Shield in AWS Console",
        "l": "Console → AWS Shield"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Shield → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Shield → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Shield",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awssigner": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Signer in AWS Console",
        "l": "Console → AWS Signer"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS Signer → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS Signer → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS Signer",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awswaf": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS WAF in AWS Console",
        "l": "Console → AWS WAF"
      },
      {
        "s": 2,
        "a": "Enable or configure the service",
        "l": "AWS WAF → Settings"
      },
      {
        "s": 3,
        "a": "Set up dashboards or monitoring rules",
        "l": "Dashboards → Create"
      },
      {
        "s": 4,
        "a": "Configure alerts and notification channels",
        "l": "Alerts → SNS Topic"
      },
      {
        "s": 5,
        "a": "Review compliance and operational data",
        "l": "AWS WAF → Reports"
      }
    ],
    "connections": [
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Centralized monitoring",
        "c": "Management"
      },
      {
        "id": "amazonsimplenotificationservice",
        "n": "SNS",
        "d": "Alert notifications",
        "c": "Integration"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Admin access control",
        "c": "Security"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Store logs and reports",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Automated remediation",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Operations Dashboard",
        "desc": "Monitor → Alert → Fix",
        "steps": [
          {
            "n": "AWS WAF",
            "r": "Collect Data",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Dashboard",
            "c": "red"
          },
          {
            "n": "SNS",
            "r": "Alert",
            "c": "orange"
          },
          {
            "n": "Lambda",
            "r": "Auto-Fix",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonefs": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon EFS in AWS Console",
        "l": "Console → Amazon EFS"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "Amazon EFS → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "Amazon EFS → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "Amazon EFS",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "Amazon EFS",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonelasticblockstore": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Elastic Block Store in AWS Console",
        "l": "Console → Amazon Elastic Block Store"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "Amazon Elastic Block Store → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "Amazon Elastic Block Store → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "Amazon Elastic Block Store",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "Amazon Elastic Block Store",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonfilecache": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon File Cache in AWS Console",
        "l": "Console → Amazon File Cache"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "Amazon File Cache → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "Amazon File Cache → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "Amazon File Cache",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "Amazon File Cache",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonfsxforlustre": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon FSx for Lustre in AWS Console",
        "l": "Console → Amazon FSx for Lustre"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "Amazon FSx for Lustre → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "Amazon FSx for Lustre → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "Amazon FSx for Lustre",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "Amazon FSx for Lustre",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonfsxfornetappontap": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon FSx for NetApp ONTAP in AWS Console",
        "l": "Console → Amazon FSx for NetApp ONTAP"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "Amazon FSx for NetApp ONTAP → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "Amazon FSx for NetApp ONTAP → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "Amazon FSx for NetApp ONTAP",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "Amazon FSx for NetApp ONTAP",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonfsxforopenzfs": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon FSx for OpenZFS in AWS Console",
        "l": "Console → Amazon FSx for OpenZFS"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "Amazon FSx for OpenZFS → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "Amazon FSx for OpenZFS → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "Amazon FSx for OpenZFS",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "Amazon FSx for OpenZFS",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonfsxforwfs": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon FSx for WFS in AWS Console",
        "l": "Console → Amazon FSx for WFS"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "Amazon FSx for WFS → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "Amazon FSx for WFS → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "Amazon FSx for WFS",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "Amazon FSx for WFS",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonfsx": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon FSx in AWS Console",
        "l": "Console → Amazon FSx"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "Amazon FSx → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "Amazon FSx → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "Amazon FSx",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "Amazon FSx",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazons3onoutposts": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon S3 on Outposts in AWS Console",
        "l": "Console → Amazon S3 on Outposts"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "Amazon S3 on Outposts → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "Amazon S3 on Outposts → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "Amazon S3 on Outposts",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "Amazon S3 on Outposts",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "amazonsimplestorageserviceglacier": {
    "setup": [
      {
        "s": 1,
        "a": "Open Amazon Simple Storage Service Glacier in AWS Console",
        "l": "Console → Amazon Simple Storage Service Glacier"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "Amazon Simple Storage Service Glacier → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "Amazon Simple Storage Service Glacier → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "Amazon Simple Storage Service Glacier",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "Amazon Simple Storage Service Glacier",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsbackup": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Backup in AWS Console",
        "l": "Console → AWS Backup"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "AWS Backup → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "AWS Backup → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "AWS Backup",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "AWS Backup",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awselasticdisasterrecovery": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Elastic Disaster Recovery in AWS Console",
        "l": "Console → AWS Elastic Disaster Recovery"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "AWS Elastic Disaster Recovery → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "AWS Elastic Disaster Recovery → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "AWS Elastic Disaster Recovery",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "AWS Elastic Disaster Recovery",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awssnowballedge": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Snowball Edge in AWS Console",
        "l": "Console → AWS Snowball Edge"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "AWS Snowball Edge → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "AWS Snowball Edge → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "AWS Snowball Edge",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "AWS Snowball Edge",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awssnowball": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Snowball in AWS Console",
        "l": "Console → AWS Snowball"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "AWS Snowball → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "AWS Snowball → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "AWS Snowball",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "AWS Snowball",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  },
  "awsstoragegateway": {
    "setup": [
      {
        "s": 1,
        "a": "Open AWS Storage Gateway in AWS Console",
        "l": "Console → AWS Storage Gateway"
      },
      {
        "s": 2,
        "a": "Create a new volume, filesystem, or gateway",
        "l": "AWS Storage Gateway → Create"
      },
      {
        "s": 3,
        "a": "Configure storage class and performance",
        "l": "Configuration → Storage class"
      },
      {
        "s": 4,
        "a": "Set up VPC and mount targets",
        "l": "VPC → Mount targets"
      },
      {
        "s": 5,
        "a": "Attach to EC2 or configure client access",
        "l": "EC2 → Attach / Mount"
      },
      {
        "s": 6,
        "a": "Set up backup and lifecycle policies",
        "l": "AWS Storage Gateway → Lifecycle"
      }
    ],
    "connections": [
      {
        "id": "amazonelasticcomputecloud",
        "n": "EC2",
        "d": "Attach storage to instances",
        "c": "Compute"
      },
      {
        "id": "amazonvirtualprivatecloud",
        "n": "VPC",
        "d": "Storage networking",
        "c": "Networking"
      },
      {
        "id": "awsidentityandaccessmanagement",
        "n": "IAM",
        "d": "Access permissions",
        "c": "Security"
      },
      {
        "id": "amazoncloudwatch",
        "n": "CloudWatch",
        "d": "Monitor storage metrics",
        "c": "Management"
      },
      {
        "id": "amazonsimplestorageservice",
        "n": "S3",
        "d": "Backup and archival",
        "c": "Storage"
      },
      {
        "id": "awslambda",
        "n": "Lambda",
        "d": "Event-driven processing",
        "c": "Compute"
      }
    ],
    "pipelines": [
      {
        "name": "Backup Architecture",
        "desc": "Automated data protection",
        "steps": [
          {
            "n": "AWS Storage Gateway",
            "r": "Primary Storage",
            "c": "green"
          },
          {
            "n": "S3",
            "r": "Backup",
            "c": "green"
          },
          {
            "n": "S3 Glacier",
            "r": "Archive",
            "c": "blue"
          },
          {
            "n": "CloudWatch",
            "r": "Monitor",
            "c": "red"
          }
        ]
      },
      {
        "name": "High-Performance Storage",
        "desc": "Compute + Fast Storage",
        "steps": [
          {
            "n": "EC2",
            "r": "Compute",
            "c": "orange"
          },
          {
            "n": "AWS Storage Gateway",
            "r": "Fast Storage",
            "c": "green"
          },
          {
            "n": "CloudWatch",
            "r": "IOPS Monitor",
            "c": "red"
          },
          {
            "n": "IAM",
            "r": "Access Control",
            "c": "yellow"
          }
        ]
      }
    ]
  }
};
