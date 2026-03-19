// Update all vibes in generated_db.js to compare AWS services to vibe-coding tools
const fs = require('fs');
const path = require('path');
const db = require('../data/generated_db.js');

// ============================================================
// AWS SERVICE → VIBE-CODING TOOL COMPARISON MAP
// Format: serviceId → "Like [tool] but [AWS advantage]"
// ============================================================
const vibeMap = {
// === COMPUTE ===
"amazonelasticcomputecloud": "Like a DigitalOcean Droplet — but with infinite instance types, GPUs, and auto scaling built in.",
"awslambda": "Like Vercel Serverless Functions — but runs any language up to 15 min and connects to everything in AWS.",
"awsfargate": "Like Railway — deploy containers without touching servers. Just push and run.",
"amazonlightsail": "Like DigitalOcean or Vultr — simple VPS with fixed pricing for small projects.",
"amazonelasticcontainerservice": "Like Railway or Render for containers — managed Docker orchestration at scale.",
"awselasticbeanstalk": "Like Heroku — push your code, it handles servers, scaling, and deploys automatically.",
"awsapprunner": "Like Render — give it a container or source code, it handles everything else.",
"awsbatch": "Like Modal — run thousands of batch compute jobs in parallel without managing infrastructure.",
"awscomputeoptimizer": "Like a cost advisor for your servers — tells you which instance type saves the most money.",
"amazonec2autoscaling": "Like auto-scaling on Railway — automatically adds or removes instances based on traffic.",
"amazonec2imagebuilder": "Like building a golden Docker image — automates creating patched, hardened AMIs for EC2.",
"amazondcv": "Like Parsec or Shadow — high-performance remote desktop streaming for GPU workloads.",
"amazonelasticvmwareservice": "Like VMware Cloud — run your existing VMware workloads natively on AWS.",
"amazonlightsailforresearch": "Like Google Colab but as a VPS — pre-configured compute environments for researchers.",
"awslocalzones": "Like Cloudflare edge — AWS infrastructure placed in metro areas for ultra-low latency.",
"awsnitroenclaves": "Like a tamper-proof vault inside your EC2 — process sensitive data in isolated enclaves.",
"awsoutpostsfamily": "Like running a mini AWS data center in your own office — same APIs, local hardware.",
"awsoutpostsrack": "Like a full AWS rack in your server room — 42U of cloud services on-premises.",
"awsoutpostsservers": "Like a single AWS server under your desk — for edge computing and local processing.",
"awsparallelcluster": "Like a supercomputer-as-a-service — HPC clusters that spin up and down on demand.",
"awsparallelcomputingservice": "Like a managed Slurm cluster — submit HPC jobs without managing schedulers.",
"awsserverlessapplicationrepository": "Like npm for serverless — find and deploy pre-built Lambda apps instantly.",
"awssimspaceweaver": "Like Unity for spatial simulations — run massive real-time simulations across multiple EC2s.",
"awswavelength": "Like Cloudflare Workers but for 5G — run compute at telecom edge for ultra-low latency.",
"bottlerocket": "Like Alpine Linux for containers — a minimal, secure OS built specifically for running containers.",
"elasticfabricadapter": "Like InfiniBand for the cloud — high-performance networking for HPC and ML training.",
// === CONTAINERS ===
"amazonelasticcontainerregistry": "Like Docker Hub or GitHub Container Registry — but private, fast, and integrated with AWS.",
"amazonelastickubernetesservice": "Like managed Kubernetes — same as GKE or AKS but on AWS.",
"amazonecsanywhere": "Like running Railway on your own servers — manage on-prem containers from AWS console.",
"amazoneksanywhere": "Like Rancher — run Kubernetes on your own hardware, managed from AWS.",
"amazoneksdistro": "Like vanilla K8s but AWS-tested — the same Kubernetes distro that powers EKS.",
"redhatopenshiftserviceonaws": "Like OpenShift Cloud — enterprise Kubernetes with Red Hat support on AWS.",
// === STORAGE ===
"amazonsimplestorageservice": "Like Cloudflare R2 or Firebase Storage — but unlimited, with versioning and lifecycle rules.",
"amazonelasticfilesystem": "Like a shared Google Drive for your servers — NFS storage that grows automatically.",
"amazonfsxforlustre": "Like a turbo NAS for HPC — high-performance file system for compute-intensive workloads.",
"amazonfsxfornetappontap": "Like NetApp in the cloud — enterprise NAS features without managing hardware.",
"amazonfsxforopenzfs": "Like ZFS in the cloud — snapshots, clones, and compression without managing disks.",
"amazonfsxforwindowsfileserver": "Like a Windows shared drive in the cloud — SMB file shares managed by AWS.",
"amazons3glacier": "Like cold storage Backblaze B2 — ultra-cheap archival storage for data you rarely access.",
"amazons3glacierdeeparchive": "Like tape storage but in the cloud — cheapest storage on AWS for long-term archives.",
"awsbackup": "Like Time Machine for your entire AWS — automated backups across all services.",
"awselasticdisasterrecovery": "Like a disaster recovery site on standby — replicate servers and failover in minutes.",
"awssnowballedge": "Like a portable hard drive that's also a server — compute + storage for remote locations.",
"awsstoragegateway": "Like a bridge between your office NAS and S3 — hybrid cloud storage made simple.",
// === DATABASES ===
"amazonrds": "Like PlanetScale or Supabase — managed relational databases but with MySQL, Postgres, Oracle, SQL Server.",
"amazondynamodb": "Like Firebase Firestore or Supabase Realtime — serverless NoSQL with single-digit ms latency.",
"amazonaurora": "Like PlanetScale on steroids — MySQL/Postgres compatible but 5x faster and auto-scaling.",
"amazondocumentdb": "Like MongoDB Atlas — document database with MongoDB compatibility, managed by AWS.",
"amazonelasticache": "Like Upstash Redis — managed in-memory caching for blazing-fast data access.",
"amazonkeyspaces": "Like DataStax Astra — serverless Cassandra-compatible database for wide-column workloads.",
"amazonmemorydb": "Like Upstash Redis but durable — in-memory database with full data persistence.",
"amazonneptune": "Like Neo4j Aura — managed graph database for relationship-heavy data.",
"amazontimestream": "Like InfluxDB Cloud — purpose-built time-series database for IoT and DevOps metrics.",
"awsdatabasemigrationservice": "Like a moving truck for your database — migrate from on-prem or other clouds to AWS.",
"oracledatabaseataws": "Like Oracle Cloud but on AWS — run Oracle databases on dedicated AWS infrastructure.",
// === NETWORKING ===
"amazonvirtualprivatecloud": "Like your own private network in the cloud — subnets, firewalls, and routing, all configurable.",
"amazoncloudfront": "Like Cloudflare CDN or Vercel Edge — cache and deliver content globally from edge locations.",
"amazonroute53": "Like Cloudflare DNS — global DNS with health checks and traffic routing built in.",
"amazonapigateway": "Like tRPC or Express endpoints — create, manage, and secure APIs at any scale.",
"elasticloadbalancing": "Like Nginx load balancer as a service — distribute traffic across your servers automatically.",
"awsdirectconnect": "Like a private ethernet cable from your office to AWS — dedicated, fast, and secure.",
"awsglobalaccelerator": "Like Cloudflare Argo — route traffic through AWS's backbone for faster global performance.",
"awsprivatelink": "Like a private tunnel between services — access AWS services without going over the internet.",
"awstransitgateway": "Like a network hub — connect hundreds of VPCs and on-prem networks through one gateway.",
"awsverifiedaccess": "Like Cloudflare Access or Tailscale — zero-trust access to your apps without a VPN.",
"awsvpn": "Like Tailscale or WireGuard — encrypted VPN tunnel between your network and AWS.",
"awscloudmap": "Like Consul service discovery — your services automatically find each other by name.",
"awscloudwan": "Like a software-defined WAN — manage your global network from one dashboard.",
"awsappmeshtbd": "Like Istio or Linkerd — service mesh for monitoring and controlling microservice communication.",
// === SECURITY ===
"awsidentityandaccessmanagement": "Like Auth0 permissions — control who can access what across your entire AWS account.",
"amazoncognito": "Like Clerk or Supabase Auth — add user sign-up, sign-in, and access control to your app.",
"awswaf": "Like Cloudflare WAF — block SQL injection, XSS, and bot attacks before they reach your app.",
"awscertificatemanager": "Like Let's Encrypt — free SSL/TLS certificates that auto-renew, managed by AWS.",
"awssecretsmanager": "Like Doppler or HashiCorp Vault — store API keys, passwords, and tokens securely.",
"awscloudtrail": "Like an audit log for everything — records every API call made in your AWS account.",
"amazonguardduty": "Like Snyk for infrastructure — AI-powered threat detection that watches your AWS 24/7.",
"awssecurityhub": "Like a SIEM dashboard — aggregate security findings from all AWS services in one place.",
"amazonmacie": "Like a data privacy scanner — automatically finds and protects sensitive data in S3.",
"amazoninspector": "Like Snyk for EC2 and containers — automatic vulnerability scanning for your workloads.",
"awsshield": "Like Cloudflare DDoS protection — shields your apps from DDoS attacks, always on.",
"awsfirewallanager": "Like centralized firewall management — apply security rules across all accounts at once.",
"awskeymanagementservice": "Like a master key vault — create and control encryption keys for your data.",
"awsresourceaccessmanager": "Like sharing a Google Doc — securely share AWS resources across accounts.",
"amazonsecuritylake": "Like a data lake for security logs — aggregate and analyze security data at scale.",
"amazonverifiedpermissions": "Like Cedar or OPA — fine-grained authorization engine for your apps.",
"awsartifact": "Like a compliance library — download AWS compliance reports and agreements on demand.",
"awsauditmanager": "Like compliance-as-code — continuously audit your AWS usage against security standards.",
"awscloudhsm": "Like a hardware security module in the cloud — dedicated encryption hardware for compliance.",
"awsdirectoryservice": "Like Azure AD on AWS — managed Active Directory for enterprise identity.",
"awsiamaccessanalyzer": "Like a permissions auditor — finds resources shared externally and overly permissive policies.",
"awsiamidentitycenter": "Like Okta SSO — single sign-on for all your AWS accounts and business apps.",
"awsnetworkfirewall": "Like pfSense in the cloud — stateful network firewall for your VPCs.",
"awsprivatecertificateauthority": "Like your own CA — issue private certificates for internal services and devices.",
"awssignerfortbd": "Like code signing — cryptographically sign your code to ensure it hasn't been tampered with.",
// === MANAGEMENT & GOVERNANCE ===
"amazoncloudwatch": "Like Datadog or LogRocket — monitor metrics, collect logs, set alarms across all your AWS.",
"awscloudformation": "Like Terraform or Pulumi — define your infrastructure as code and deploy stacks.",
"awssystemsmanager": "Like Ansible — manage, patch, and configure your EC2 fleet from one console.",
"awsconfig": "Like a config compliance checker — tracks every resource change and checks against rules.",
"awsorganizations": "Like a company org chart for AWS — manage multiple accounts with centralized policies.",
"awstrustedadvisor": "Like a cloud consultant — recommends cost savings, security fixes, and performance boosts.",
"amazonmanagedgrafana": "Like Grafana Cloud — managed Grafana dashboards connected to your AWS data.",
"amazonmanagedserviceforprometheus": "Like Grafana Cloud Prometheus — managed monitoring at scale without managing servers.",
"awsappconfig": "Like LaunchDarkly — deploy feature flags and dynamic config changes without redeploying.",
"awsautomate": "Like Zapier for AWS operations — automate runbook tasks across your infrastructure.",
"awschatbot": "Like PagerDuty Slack integration — get AWS alerts and run commands directly in Slack/Teams.",
"awscontrolltower": "Like a landing zone builder — set up and govern multi-account AWS environments safely.",
"awshealthdashboard": "Like a status page for your AWS — shows service health and events affecting your account.",
"awslicensemanager": "Like a software license tracker — manage and track software licenses across AWS.",
"awsopsworks": "Like Chef/Puppet managed — configuration management for your EC2 instances.",
"awsproton": "Like Backstage — platform teams define templates, developers self-service deploy.",
"awsresiliencehub": "Like chaos engineering — test and improve your app's resilience against failures.",
"awsservicecatalog": "Like an internal app store — IT defines approved products, teams deploy self-service.",
"awsteleandoptics": "Like network monitoring — collect and analyze network telemetry data.",
"awsusernotifications": "Like PagerDuty — centralized notification management for all AWS events.",
"awswellandarchitectedtool": "Like a cloud health checkup — review your architecture against AWS best practices.",
// === DEVELOPER TOOLS ===
"awscodepipeline": "Like GitHub Actions — automate your build, test, and deploy pipeline end to end.",
"awscodebuild": "Like GitHub Actions build step — compile code, run tests, produce artifacts in the cloud.",
"awscodecommit": "Like GitHub or GitLab — private Git repositories hosted on AWS.",
"awscodedeploy": "Like Render auto-deploy — automatically deploy code to EC2, Lambda, or ECS.",
"awsxray": "Like Sentry APM — trace requests through your distributed app and find bottlenecks.",
"awscloud9": "Like GitHub Codespaces — cloud-based IDE you can access from any browser.",
"awscloudshell": "Like a terminal in the cloud — pre-authenticated AWS CLI ready in your browser.",
"awscodeartifact": "Like npm registry or Artifactory — private package repository for your org.",
"awscommandlineinterface": "Like the AWS version of Vercel CLI — manage everything from your terminal.",
"awsinfrastructurecomposer": "Like a visual Terraform editor — design CloudFormation templates by dragging and dropping.",
"awsfaultinjectionservice": "Like Gremlin or Chaos Monkey — inject failures to test your app's resilience.",
"awsclouddevelopmentkit": "Like Pulumi — write infrastructure in TypeScript, Python, or Go instead of YAML.",
"awscloudcontrolapi": "Like a universal CRUD API for AWS resources — create/read/update/delete any resource uniformly.",
"awstoolsandsdks": "Like the AWS version of npm packages — SDKs for every language to talk to AWS.",
"amazoncodecatalyst": "Like GitHub + Actions + Codespaces — unified dev environment with CI/CD built in.",
"amazoncorretto": "Like Adoptium OpenJDK — Amazon's free, production-ready Java distribution.",
// === APPLICATION INTEGRATION ===
"amazoneventbridge": "Like Trigger.dev or Inngest — event-driven architecture where services react to events automatically.",
"amazonsimplequeueservice": "Like BullMQ or RabbitMQ — reliable message queues for decoupling your microservices.",
"amazonsimplenotificationservice": "Like OneSignal or Pusher — fan out notifications to email, SMS, Lambda, or HTTP endpoints.",
"awsstepfunctions": "Like Inngest or Temporal — orchestrate multi-step workflows with visual state machines.",
"amazonappflow": "Like Zapier — connect SaaS apps (Salesforce, Slack) to AWS with no code.",
"amazonmanagedworkflowsforapacheairflow": "Like Astronomer — managed Apache Airflow for scheduling and monitoring data pipelines.",
"awsappsync": "Like Hasura — managed GraphQL API with real-time subscriptions and offline support.",
"awsb2bdatainterchange": "Like a B2B file exchange — automate EDI document transfers between trading partners.",
"awsexpressworkflows": "Like serverless cron jobs at scale — high-throughput, short-duration Step Functions workflows.",
"amazonmq": "Like CloudAMQP — managed RabbitMQ and ActiveMQ for traditional message broker patterns.",
// === ANALYTICS ===
"amazonathena": "Like BigQuery — query your S3 data with SQL, pay per query, zero infrastructure.",
"amazonredshift": "Like Snowflake — petabyte-scale data warehouse for serious analytics workloads.",
"amazonkinesis": "Like Confluent Cloud — real-time data streaming at massive scale.",
"amazondatafirehose": "Like a firehose to S3 — stream data automatically to storage with zero code.",
"awsglue": "Like dbt + Fivetran — serverless ETL that crawls, transforms, and catalogs your data.",
"amazonfinspace": "Like Bloomberg Terminal + data warehouse — purpose-built analytics for financial services.",
"amazonkinesisdatastreams": "Like Kafka topics — capture millions of records per second in real-time streams.",
"amazonkinesisvideostreams": "Like Mux for raw video — stream live video from devices to AWS for ML analysis.",
"amazonmanagedserviceforapacheflink": "Like Confluent ksqlDB — process streaming data in real time without managing clusters.",
"amazonmanagedstreamingforapachekafka": "Like Confluent Cloud on AWS — fully managed Apache Kafka without the ops.",
"amazonopensearchservice": "Like Algolia or Elastic Cloud — full-text search and log analytics at scale.",
"awscleanrooms": "Like Snowflake Clean Rooms — collaborate on data analytics without sharing raw data.",
"awsdataexchange": "Like the Snowflake Marketplace — subscribe to third-party datasets and use them instantly.",
"awsentityresolution": "Like a fuzzy matching engine — link records across messy datasets automatically.",
"awsgluedatabrew": "Like Trifacta — visual data cleaning and transformation without writing code.",
"awslakeformation": "Like Databricks Unity Catalog — build and govern a secure data lake on S3.",
"amazoncloudsearch": "Like Algolia — add fast, scalable search to your app without building a search engine.",
"amazondatazone": "Like Atlan or Alation — data catalog and governance for the whole organization.",
"amazonquicksuite": "Like Metabase or Tableau — create interactive BI dashboards with ML-powered insights.",
"amazonemr": "Like Databricks — run Spark, Hive, and Hadoop clusters for big data processing.",
// === AI / ML ===
"amazonsagemaker": "Like Hugging Face + Replicate — build, train, and deploy ML models all in one platform.",
"amazonbedrock": "Like the OpenAI API — access foundation models (Claude, Llama, Titan) via a single API.",
"amazonbedrockagentcore": "Like LangChain on AWS — build autonomous AI agents that reason and take actions.",
"amazonq": "Like GitHub Copilot + ChatGPT — AI assistant that knows your code AND your AWS resources.",
"amazonlex": "Like Dialogflow — build voice and text chatbots powered by the same tech as Alexa.",
"amazonrekognition": "Like Clarifai or Google Vision — add face detection, object recognition to any app.",
"amazontextract": "Like OCR.space on steroids — extract text, tables, and forms from scanned documents.",
"amazontranscribe": "Like Deepgram or AssemblyAI — convert speech to text with speaker detection.",
"amazontranslate": "Like DeepL API — neural machine translation for 75+ languages at scale.",
"amazonpolly": "Like ElevenLabs — turn text into lifelike speech in dozens of voices and languages.",
"amazoncomprehend": "Like MonkeyLearn — NLP service for sentiment analysis, entity extraction, and topic modeling.",
"amazoncomprehendmedical": "Like a medical NLP engine — extract conditions, medications, and dosages from clinical text.",
"amazonkendra": "Like Algolia for enterprise — ML-powered search that understands natural language questions.",
"amazonpersonalize": "Like Algolia Recommend — add Amazon.com-style personalization to your app.",
"amazonfrauddetector": "Like Sift — ML-powered fraud detection without needing ML expertise.",
"amazonforecast": "Like Prophet — time-series forecasting using Amazon's own ML technology.",
"amazondevopsguru": "Like Datadog anomaly detection — ML spots operational issues before they become outages.",
"amazoncodewhisperer": "Like GitHub Copilot — AI code suggestions in real time as you type.",
"amazoncodeguru": "Like Codacy + Datadog Profiler — AI reviews your code and profiles runtime performance.",
"amazonaugmentedaia2i": "Like Scale AI — add human review loops to your ML predictions for quality control.",
"amazonnova": "Like OpenAI GPT but Amazon-built — fast, cheap foundation models for text, image, and video.",
"amazonelasticinference": "Like renting a partial GPU — add inference acceleration to any instance at low cost.",
"amazonlookoutforequipment": "Like predictive maintenance AI — sensor data in, failure predictions out.",
"amazonlookoutforvision": "Like Fritz AI for manufacturing — detect product defects with computer vision.",
"amazonmonitron": "Like a Fitbit for machines — physical sensors + ML to monitor industrial equipment health.",
"amazonsagemakerai": "Like Hugging Face Spaces + SageMaker — next-gen ML platform with generative AI built in.",
"amazonsagemakergroundtruth": "Like Scale AI or Labelbox — label training data with humans + ML assistance.",
"amazonsagemakerstudiolab": "Like Google Colab — free Jupyter notebooks for learning ML, no AWS account needed.",
"apachemxnetonaws": "Like TensorFlow but MXNet — deep learning framework optimized for AWS.",
"awsappstudio": "Like v0.dev by Vercel — describe an enterprise app in natural language, AI builds it.",
"awsdeeplearningamis": "Like a pre-built ML dev box — EC2 images with PyTorch, TensorFlow pre-installed.",
"awsdeeplearningcontainers": "Like ML Docker images — pre-built containers optimized for training and inference.",
"awsdeepracer": "Like a racing game for ML — learn reinforcement learning by training a 1/18 scale car.",
"awshealthimaging": "Like a DICOM PACS in the cloud — store and access medical images at scale.",
"awshealthlake": "Like a FHIR data warehouse — store and analyze health records in standard format.",
"awshealthomics": "Like Illumina BaseSpace — store and process genomic data with built-in workflows.",
"awshealthscribe": "Like Nuance DAX — AI listens to doctor-patient conversations and writes clinical notes.",
"awsneuron": "Like CUDA but for AWS chips — SDK for running ML on Inferentia and Trainium hardware.",
"awspanorama": "Like Frigate NVR + ML — gives your existing cameras computer vision at the edge.",
"pytorchonaws": "Like PyTorch with turbo mode — optimized for AWS GPUs and Inferentia chips.",
"tensorflowonaws": "Like TensorFlow but tuned for AWS — distributed training across GPU and custom silicon.",
// === BLOCKCHAIN ===
"amazonmanagedblockchain": "Like Alchemy or Infura — managed blockchain nodes without running your own infrastructure.",
// === BUSINESS APPS ===
"amazonchime": "Like Zoom — video meetings, chat, and phone calls managed by AWS.",
"amazonchimesdk": "Like Twilio Video — embed real-time video, voice, and messaging in your own app.",
"amazonconnect": "Like Twilio Flex — cloud contact center that sets up in minutes, not months.",
"amazonpinpoint": "Like Customer.io or Braze — targeted marketing messages across email, SMS, and push.",
"amazonpinpointapis": "Like SendGrid API — programmatic access to multi-channel messaging at scale.",
"amazonsimpleemailservice": "Like Resend or SendGrid — send transactional and marketing emails at massive scale.",
"amazonworkdocs": "Like Google Drive — secure document storage and collaboration in your AWS account.",
"amazonworkdocssdk": "Like the Google Drive API — build document management features into your app.",
"amazonworkmail": "Like Google Workspace email — managed business email and calendar on AWS.",
"awsappfabric": "Like Tines for SaaS — connect and secure all your SaaS apps from one place.",
"awsendusermessaging": "Like Twilio SMS — reach users globally via SMS, MMS, and push notifications.",
"awssupplychain": "Like Flexport API — AI-powered supply chain visibility, planning, and forecasting.",
"awswickr": "Like Signal for enterprise — end-to-end encrypted messaging with admin controls.",
// === FINANCIAL MANAGEMENT ===
"awsbillingconductor": "Like custom invoicing — rearrange your AWS bill to match your org structure.",
"awsbudgets": "Like Mint for AWS — set spending budgets, get alerts before you overspend.",
"awscostandusagereport": "Like a detailed bank statement — every cent of your AWS spending broken down.",
"awscostexplorer": "Like a financial dashboard — visualize costs, spot trends, and forecast next month's bill.",
"reservedinstancereporting": "Like a savings plan tracker — see if you're using the capacity you pre-paid for.",
"savingsplans": "Like an annual gym membership — commit for 1-3 years and save up to 72% on compute.",
// === IOT ===
"awsiotcore": "Like Particle or Arduino Cloud — connect IoT devices to the cloud via MQTT.",
"awsiotdevicedefender": "Like antivirus for IoT — audit and monitor your device fleet for security threats.",
"awsiotdevicemanagement": "Like an MDM for IoT — register, organize, and remotely manage your device fleet.",
"awsiotevents": "Like IFTTT for IoT — detect events from sensors and trigger automated responses.",
"awsiotexpresslink": "Like a plug-and-play IoT module — connect devices to AWS with a single AT command.",
"awsiotfleetwise": "Like a connected car platform — collect and transform vehicle data at scale.",
"awsiotgreengrass": "Like edge computing for IoT — run Lambda functions and ML models on your devices.",
"awsiotsitewise": "Like an industrial IoT dashboard — collect, organize, and visualize factory sensor data.",
"awsiottwinmaker": "Like a digital twin platform — create 3D replicas of physical systems tied to real data.",
"freertos": "Like an RTOS for microcontrollers — real-time OS for resource-constrained IoT devices.",
// === MEDIA ===
"amazonelastictranscoder": "Like Mux — transcode media files into formats for any device.",
"amazoninteractivevideoservice": "Like Mux Live — add live streaming to your app in minutes.",
"awselementalmedialive": "Like OBS Studio in the cloud — live video encoding for broadcast and streaming.",
"awselementalmediapackage": "Like a video packaging service — prepare live video for delivery to any device.",
"awselementalmediastore": "Like a live video CDN origin — low-latency storage optimized for live media.",
"awselementalmediaconvert": "Like FFmpeg as a service — transcode video files at broadcast quality and scale.",
"awselementalmediatailoranddeltdbt": "Like a personalized ad inserter — insert targeted ads into live video streams.",
"awselementalappliancesandsoftware": "Like on-prem broadcast hardware — AWS media processing on your own infrastructure.",
"amazonnimblestudio": "Like a virtual animation studio — creative teams collaborate from anywhere.",
// === MIGRATION ===
"awsapplicationdiscoveryservice": "Like a network scanner — discover and inventory your on-prem servers before migrating.",
"awsapplicationmigrationservice": "Like lift-and-shift automation — rehost servers to AWS with minimal changes.",
"awsmainframemodernization": "Like a mainframe-to-cloud bridge — modernize legacy COBOL apps for AWS.",
"awsmigrationhub": "Like a migration project tracker — monitor all your migrations from one dashboard.",
"awstransferfamily": "Like a managed SFTP server — securely transfer files to S3 using SFTP, FTPS, or FTP.",
"awsdatasync": "Like rsync for the cloud — fast, automated data transfer between on-prem and AWS.",
"awssnowball": "Like a physical USB drive to AWS — ship terabytes of data when the network is too slow.",
"awssnowcone": "Like a rugged portable AWS edge device — 8TB storage + compute you can carry anywhere.",
// === CUSTOMER ENABLEMENT ===
"awsactivate": "Like Y Combinator credits — free AWS credits and support for startups.",
"awsiq": "Like Upwork for AWS — find and hire certified AWS experts for your projects.",
"awsmanagedservices": "Like outsourced IT ops — AWS runs your infrastructure following best practices.",
"awsprofessionalservices": "Like AWS consultants — expert guidance for complex cloud projects.",
"awsrepost": "Like Stack Overflow for AWS — community Q&A for AWS technical questions.",
"awsrepostprivate": "Like a private Stack Overflow — internal knowledge base for your organization's AWS questions.",
"awssupport": "Like premium tech support — 24/7 access to AWS engineers for technical help.",
"awstrainingcertification": "Like Udemy for AWS — official courses and certifications to prove your cloud skills.",
// === END USER COMPUTING ===
"amazonworkspaces": "Like Shadow or Citrix — managed virtual desktops you can access from any device.",
"amazonworkspacesthincclient": "Like a Chromebook for VDI — low-cost device for accessing WorkSpaces desktops.",
"amazonappstream20": "Like a virtual app streaming service — stream desktop applications to any browser.",
// === FRONT END / MOBILE ===
"awsamplify": "Like Vercel + Firebase combined — host frontend, auth, storage, and APIs in one platform.",
"amazonlocationservice": "Like Mapbox — add maps, geocoding, and tracking to your app without Google Maps.",
"awsdevicefarm": "Like BrowserStack — test your app on real phones and browsers in the cloud.",
// === GAMES ===
"amazongameliftservers": "Like PlayFab — managed game server hosting with auto-scaling and matchmaking.",
"amazongameliftstreams": "Like cloud gaming infrastructure — stream games to players without local hardware.",
"open3dengine": "Like Godot or Unreal — open-source 3D game engine supported by AWS.",
// === GENERAL ===
"awsmarketplacedark": "Like an app store for cloud software — find, buy, and deploy third-party tools on AWS.",
"awsmarketplacelight": "Like an app store for cloud software — discover and deploy SaaS tools directly on AWS.",
// === QUANTUM ===
"amazonbraket": "Like IBM Quantum Experience — access real quantum computers and simulators from AWS.",
// === ROBOTICS ===
"awsrobomaker": "Like Gazebo in the cloud — develop, simulate, and deploy robot applications at scale.",
// === SATELLITE ===
"awsgroundstation": "Like a satellite download service — downlink data from orbiting satellites to AWS.",
};

// ============================================================
// Apply vibes to generated_db
// ============================================================
const keys = Object.keys(db);
let updated = 0;

keys.forEach(id => {
  if (vibeMap[id]) {
    db[id].vibe = vibeMap[id];
    updated++;
  }
});

console.log(`Updated ${updated} vibes out of ${keys.length} services.`);
console.log(`Mapped: ${Object.keys(vibeMap).length}, DB keys: ${keys.length}`);

// Find services in DB that don't have a vibeMap entry
const unmapped = keys.filter(k => !vibeMap[k]);
if (unmapped.length > 0) {
  console.log(`\n${unmapped.length} services without vibe mapping (will keep existing):`);
  unmapped.forEach(k => console.log(`  "${k}"`));
}

// Write updated DB
const output = `// Auto-generated Service DB — ${keys.length} services with unique vibes
// Last updated: ${new Date().toISOString().split('T')[0]}
module.exports = ${JSON.stringify(db, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../data/generated_db.js'), output);
console.log(`\n✅ Wrote ${keys.length} services with updated vibes → data/generated_db.js`);

// Verify uniqueness
const vibes = new Set(Object.values(db).map(v => v.vibe));
console.log(`Unique vibes: ${vibes.size} / ${keys.length}`);
