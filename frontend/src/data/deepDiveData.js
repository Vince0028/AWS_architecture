// Deep-dive setup guides for essential AWS services
// Each key matches the service ID from tools.json

export const DEEP_DIVE_GUIDES = {

  // ═══════════════════════════════════════════════════
  // AMAZON EC2
  // ═══════════════════════════════════════════════════
  amazonec2: {
    prereqs: [
      "AWS Account created and logged in as IAM user (not root)",
      "IAM user has EC2FullAccess or AdministratorAccess policy",
      "You know which AWS Region you want to launch in (e.g., ap-southeast-1 for Singapore)"
    ],
    steps: [
      {
        title: "Navigate to EC2 Dashboard",
        summary: "Find and open the EC2 service in the AWS Console",
        consolePath: "Console Home → Services → Compute → EC2",
        detail: "From the AWS Management Console home page, click on the search bar at the top, type 'EC2', and click 'EC2' from the dropdown. You'll land on the EC2 Dashboard.",
        substeps: [
          "Check the Region selector in the top-right corner - make sure it says your target region (e.g., 'Asia Pacific (Singapore) ap-southeast-1')",
          "If you see '0 Instances running' on the dashboard, you're in the right place"
        ],
        tip: "Bookmark the EC2 Dashboard URL - you'll visit it a lot."
      },
      {
        title: "Click 'Launch Instance'",
        summary: "Start the instance creation wizard",
        consolePath: "EC2 Dashboard → Launch Instance (orange button)",
        detail: "On the EC2 Dashboard, find the orange 'Launch Instance' button. Click it. You'll enter the launch wizard where you configure everything.",
        substeps: [
          "You should now see a form with sections: Name and tags, Application and OS Images, Instance type, Key pair, Network settings, etc."
        ]
      },
      {
        title: "Name Your Instance & Choose an AMI",
        summary: "Give it a name and pick the operating system",
        consolePath: "Launch Instance → Name and tags / Application and OS Images",
        detail: "First, give your instance a descriptive name. Then choose the Amazon Machine Image (AMI) - this is the operating system your server will run.",
        inputs: [
          { field: "Name", value: "my-web-server", note: "Use lowercase with hyphens, descriptive" },
          { field: "AMI", value: "Amazon Linux 2023 AMI", note: "Free tier eligible, click 'Free tier only' checkbox" },
          { field: "Architecture", value: "64-bit (x86)", note: "Default, don't change unless you need ARM" }
        ],
        tip: "Amazon Linux 2023 is best for learning - it comes with AWS CLI pre-installed and is free tier eligible."
      },
      {
        title: "Choose Instance Type",
        summary: "Select the hardware specs (CPU, RAM) for your server",
        consolePath: "Launch Instance → Instance type",
        detail: "The instance type determines how powerful your server is. For learning and testing, always use t2.micro or t3.micro - these are free tier eligible.",
        inputs: [
          { field: "Instance type", value: "t2.micro", note: "1 vCPU, 1 GB RAM - FREE TIER for 750 hrs/month" }
        ],
        warning: "If you pick anything other than t2.micro or t3.micro, you WILL be charged. Always check the 'Free tier eligible' label.",
        tip: "t2.micro gives you 1 vCPU and 1 GB RAM. It's enough for basic web servers, learning, and small apps."
      },
      {
        title: "Create or Select a Key Pair",
        summary: "This is your SSH login key - CRITICAL, don't skip",
        consolePath: "Launch Instance → Key pair (login)",
        detail: "A key pair lets you SSH into your instance. If you don't have one, you must create one NOW. You cannot add it later.",
        substeps: [
          "Click 'Create new key pair'",
          "Enter a name like 'my-aws-key'",
          "Key pair type: select 'RSA'",
          "Private key file format: select '.pem' (for Mac/Linux) or '.ppk' (for Windows PuTTY)",
          "Click 'Create key pair' - the .pem file will download automatically",
          "SAVE THIS FILE somewhere safe - you CANNOT download it again"
        ],
        inputs: [
          { field: "Key pair name", value: "my-aws-key", note: "Descriptive name" },
          { field: "Type", value: "RSA", note: "Default" },
          { field: "Format", value: ".pem", note: "Use .ppk if using PuTTY on Windows" }
        ],
        warning: "If you lose your .pem key file, you will be LOCKED OUT of your instance. Store it in a safe folder and never share it."
      },
      {
        title: "Configure Network Settings (Security Group)",
        summary: "Set up firewall rules - who can access your instance",
        consolePath: "Launch Instance → Network settings → Edit",
        detail: "Click 'Edit' on the Network settings section. The Security Group acts as a firewall. You need to allow SSH (port 22) to connect, and HTTP (port 80) if hosting a website.",
        substeps: [
          "VPC: Leave as default VPC (it's auto-created for you)",
          "Subnet: Select 'No preference' or pick any availability zone",
          "Auto-assign public IP: Make sure this is 'Enable' - you need a public IP to connect",
          "Under 'Firewall (Security Groups)', select 'Create security group'",
          "Check 'Allow SSH traffic from' → select 'My IP' (more secure) or 'Anywhere' (for testing)",
          "Check 'Allow HTTP traffic from the internet' if you're hosting a website",
          "Check 'Allow HTTPS traffic from the internet' if using SSL"
        ],
        inputs: [
          { field: "Security group name", value: "my-ec2-sg", note: "Descriptive name for your rules" },
          { field: "SSH Source", value: "My IP", note: "Restricts SSH to your current IP only" }
        ],
        tip: "Always use 'My IP' for SSH in production. 'Anywhere (0.0.0.0/0)' means anyone in the world can attempt to connect."
      },
      {
        title: "Configure Storage",
        summary: "Set the disk size for your instance",
        consolePath: "Launch Instance → Configure storage",
        detail: "This is the hard drive for your instance. The default is 8 GB gp3, which is fine for learning. Free tier gives you up to 30 GB.",
        inputs: [
          { field: "Size (GiB)", value: "8", note: "Default, up to 30 GB is free tier" },
          { field: "Volume type", value: "gp3", note: "General purpose SSD, best default" }
        ],
        tip: "You can always increase storage later, but you cannot decrease it. Start small."
      },
      {
        title: "Launch the Instance",
        summary: "Review everything and click Launch",
        consolePath: "Launch Instance → Summary panel → Launch Instance",
        detail: "Review the summary on the right side. Make sure your instance type says t2.micro and your key pair is selected. Then click the orange 'Launch Instance' button.",
        substeps: [
          "You'll see a green 'Success' banner with the instance ID (starts with 'i-')",
          "Click 'View all instances' to go to the Instances list",
          "Wait 1-2 minutes for the Instance State to change from 'Pending' to 'Running' (green circle)",
          "Once running, you'll see a Public IPv4 address appear in the details"
        ]
      },
      {
        title: "Connect to Your Instance via SSH",
        summary: "Actually log into your server from your terminal",
        consolePath: "EC2 → Instances → Select Instance → Connect",
        detail: "Select your instance by clicking the checkbox, then click 'Connect' at the top. You'll see connection instructions. You can use EC2 Instance Connect (browser SSH) or your terminal.",
        substeps: [
          "OPTION A - EC2 Instance Connect (easiest): Just click the 'Connect' button on the EC2 Instance Connect tab",
          "OPTION B - SSH from Terminal: Open your terminal/PowerShell and run the ssh command shown",
          "For SSH: First, navigate to where your .pem file is saved",
          "Run: chmod 400 my-aws-key.pem (Mac/Linux only, sets permissions)",
          "Run: ssh -i 'my-aws-key.pem' ec2-user@<your-public-ip>",
          "Type 'yes' when asked about fingerprint",
          "You should see the Amazon Linux welcome banner - you're in!"
        ],
        tip: "EC2 Instance Connect is the easiest way - no need to worry about .pem files. Just click Connect in the console."
      }
    ],
    pitfalls: [
      { problem: "Instance stuck in 'Pending' state for more than 5 minutes", solution: "Check your Region - some regions have capacity issues. Try launching in a different AZ or Region." },
      { problem: "'Permission denied (publickey)' when SSH-ing", solution: "You're using the wrong key file or wrong username. For Amazon Linux, use 'ec2-user'. For Ubuntu, use 'ubuntu'. Make sure you ran 'chmod 400' on the .pem file." },
      { problem: "Connection timed out when trying to SSH", solution: "Your Security Group doesn't allow SSH on port 22, or 'Auto-assign public IP' was disabled. Check both." },
      { problem: "'You have exceeded your vCPU limit'", solution: "New accounts have limits. Go to Service Quotas → EC2 → Running On-Demand Standard instances → Request increase." },
      { problem: "Can't find the .pem key file after download", solution: "Check your Downloads folder. The file is only downloadable ONCE during key pair creation. If lost, create a new key pair and launch a new instance." }
    ],
    verify: [
      "Instance State shows 'Running' with a green circle ",
      "Public IPv4 address is assigned (not blank)",
      "You can SSH or Instance Connect into the instance successfully",
      "Running 'curl http://169.254.169.254/latest/meta-data/' inside SSH returns metadata",
      "Security Group shows your SSH rule (port 22) in the Inbound rules"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON S3
  // ═══════════════════════════════════════════════════
  amazonsimplestorageservice: {
    prereqs: [
      "AWS Account created and logged in",
      "IAM user has S3FullAccess or AdministratorAccess policy"
    ],
    steps: [
      {
        title: "Navigate to S3 Console",
        summary: "Open the S3 service from AWS Console",
        consolePath: "Console Home → Services → Storage → S3",
        detail: "Search for 'S3' in the top search bar and click on 'S3'. You'll see the S3 Buckets list page.",
        substeps: [
          "S3 is a GLOBAL service - you don't need to select a region, but your bucket will be stored in the region you choose during creation"
        ]
      },
      {
        title: "Click 'Create bucket'",
        summary: "Start creating your storage bucket",
        consolePath: "S3 → Buckets → Create bucket (orange button)",
        detail: "Click the orange 'Create bucket' button on the top right of the Buckets page.",
        tip: "S3 bucket names must be globally unique across ALL AWS accounts worldwide. Use something like 'yourname-project-bucket'."
      },
      {
        title: "Configure Bucket Settings",
        summary: "Name, region, and ownership settings",
        consolePath: "Create bucket → General configuration",
        detail: "Fill in the basic settings for your bucket.",
        inputs: [
          { field: "Bucket name", value: "apc-cloudclub-demo-2026", note: "Must be globally unique, lowercase, no spaces" },
          { field: "AWS Region", value: "Asia Pacific (Singapore) ap-southeast-1", note: "Pick closest to your users" },
          { field: "Object Ownership", value: "ACLs disabled (recommended)", note: "Default, keep it" }
        ],
        warning: "Bucket names cannot be changed after creation. Choose carefully! No uppercase letters, no underscores, no spaces."
      },
      {
        title: "Block Public Access Settings",
        summary: "CRITICAL security setting - keep blocked unless hosting a website",
        consolePath: "Create bucket → Block Public Access settings",
        detail: "By default, all public access is BLOCKED. This is the safe default. Only uncheck these if you're hosting a static website.",
        inputs: [
          { field: "Block all public access", value: "Checked (ON)", note: "Keep this ON for private buckets" }
        ],
        warning: "If you uncheck 'Block all public access', anyone on the internet can potentially access your files. Only do this for static website hosting.",
        tip: "For learning, keep public access BLOCKED. You can pre-sign URLs or use CloudFront to share files securely."
      },
      {
        title: "Versioning and Encryption",
        summary: "Enable version history and encryption",
        consolePath: "Create bucket → Bucket Versioning / Encryption",
        detail: "Versioning keeps old versions of files (like Git for files). Encryption protects your data at rest.",
        inputs: [
          { field: "Bucket Versioning", value: "Disable", note: "Enable if you want to keep old versions of files" },
          { field: "Server-side encryption", value: "SSE-S3 (Amazon S3 managed keys)", note: "Default, free encryption" },
          { field: "Bucket Key", value: "Enable", note: "Reduces encryption costs" }
        ]
      },
      {
        title: "Create the Bucket",
        summary: "Review and create",
        consolePath: "Create bucket → Create bucket (bottom orange button)",
        detail: "Scroll to the bottom and click 'Create bucket'. You'll be redirected to the buckets list and see your new bucket.",
        substeps: [
          "Your bucket should now appear in the list with 0 objects",
          "Click on the bucket name to open it"
        ]
      },
      {
        title: "Upload Your First File",
        summary: "Test the bucket by uploading a file",
        consolePath: "S3 → your-bucket → Upload",
        detail: "Click on your bucket name, then click the orange 'Upload' button. You can drag and drop files or click 'Add files'.",
        substeps: [
          "Click 'Add files' and select any file from your computer (an image or text file works)",
          "Leave all other settings as default",
          "Click 'Upload' at the bottom",
          "You should see a green 'Upload succeeded' banner",
          "Click the file name to view its details - you'll see the S3 URI and Object URL"
        ],
        tip: "The Object URL won't work in a browser unless you've made the bucket public or created a presigned URL."
      }
    ],
    pitfalls: [
      { problem: "'Bucket name already exists' error", solution: "S3 names are globally unique. Someone else already has that name. Try adding your name, date, or random numbers: 'vince-demo-bucket-2026'." },
      { problem: "'Access Denied' when trying to view uploaded file URL", solution: "Your bucket has public access blocked (which is correct!). Use presigned URLs or CloudFront to share files. Or for a static website, configure bucket policy." },
      { problem: "Accidentally deleted a file", solution: "If you enabled versioning, the file isn't gone - it has a 'Delete marker'. Show versions toggle and restore. If versioning was off, the file is permanently deleted." },
      { problem: "Unexpected S3 charges", solution: "Check for large files, versioned old copies, or incomplete multipart uploads. Go to bucket → Management → Lifecycle rules to auto-delete old versions." }
    ],
    verify: [
      "Bucket appears in the S3 Buckets list ",
      "You can upload a file and see it listed in the bucket",
      "Bucket region matches what you selected",
      "Block Public Access shows 'On' (bucket is private)",
      "Clicking on an uploaded file shows its S3 URI (s3://bucket-name/file-name)"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON VPC
  // ═══════════════════════════════════════════════════
  amazonvirtualprivatecloud: {
    prereqs: [
      "AWS Account created and logged in",
      "IAM user has VPCFullAccess or AdministratorAccess policy",
      "Basic understanding of IP addressing (CIDR notation like 10.0.0.0/16)"
    ],
    steps: [
      {
        title: "Navigate to VPC Console",
        summary: "Open the VPC service",
        consolePath: "Console Home → Services → Networking → VPC",
        detail: "Search 'VPC' in the top search bar and click 'VPC'. You'll see the VPC Dashboard showing your existing VPCs.",
        substeps: [
          "Every AWS account comes with a DEFAULT VPC - you'll see it listed already",
          "We'll create a NEW custom VPC for this guide"
        ],
        tip: "Never delete your default VPC - some AWS services need it. Always create custom VPCs for your projects."
      },
      {
        title: "Click 'Create VPC'",
        summary: "Start the VPC creation wizard",
        consolePath: "VPC Dashboard → Your VPCs → Create VPC",
        detail: "Click 'Create VPC' button. You'll now choose between 'VPC only' or 'VPC and more'. Choose 'VPC and more' - it auto-creates subnets, route tables, and internet gateway for you.",
        inputs: [
          { field: "Resources to create", value: "VPC and more", note: "This auto-creates subnets, route tables, NAT gateway - saves a LOT of manual steps" }
        ],
        tip: "'VPC and more' is the recommended option. It creates everything you need in one click instead of 10+ manual steps."
      },
      {
        title: "Configure VPC Settings",
        summary: "Set the name, CIDR block, and subnet layout",
        consolePath: "Create VPC → VPC settings",
        detail: "Configure the basic VPC networking. The CIDR block defines your private IP range.",
        inputs: [
          { field: "Name tag auto-generation", value: "my-project", note: "All resources get prefixed with this name" },
          { field: "IPv4 CIDR block", value: "10.0.0.0/16", note: "Gives you 65,536 private IPs - plenty for any project" },
          { field: "Number of Availability Zones", value: "2", note: "For high availability" },
          { field: "Number of public subnets", value: "2", note: "For internet-facing resources like ALBs" },
          { field: "Number of private subnets", value: "2", note: "For databases, internal services" },
          { field: "NAT gateways", value: "In 1 AZ", note: "Lets private subnet resources access internet. Costs ~$32/month!" },
          { field: "VPC endpoints", value: "S3 Gateway", note: "Free, lets private resources access S3 without NAT" }
        ],
        warning: "NAT Gateway costs ~$0.045/hour (~$32/month) even when idle. For learning, select 'None' to save money. Private subnet instances won't have internet access without it."
      },
      {
        title: "Review the Preview and Create",
        summary: "Check the auto-generated architecture diagram and create",
        consolePath: "Create VPC → Preview panel → Create VPC",
        detail: "On the right side, you'll see a preview diagram showing your VPC, subnets, route tables, and gateways. Review it, then click 'Create VPC'.",
        substeps: [
          "The wizard will create all resources - this takes about 30 seconds",
          "You'll see a progress page with green checkmarks for each resource created",
          "Click 'View VPC' to see your new VPC"
        ]
      },
      {
        title: "Verify Your Subnets",
        summary: "Check that public and private subnets were created correctly",
        consolePath: "VPC → Subnets (left sidebar)",
        detail: "Click 'Subnets' in the left sidebar. Filter by your VPC. You should see your public and private subnets.",
        substeps: [
          "Public subnets should have 'Auto-assign public IPv4 address' enabled",
          "Private subnets should NOT auto-assign public IPs",
          "Each subnet should be in a different Availability Zone for high availability"
        ],
        tip: "Public subnets route through an Internet Gateway. Private subnets route through a NAT Gateway (or have no internet if you chose 'None')."
      },
      {
        title: "Verify Route Tables",
        summary: "Make sure routing is configured correctly",
        consolePath: "VPC → Route Tables (left sidebar)",
        detail: "Route tables control where network traffic goes. You should see separate route tables for public and private subnets.",
        substeps: [
          "Public subnet route table should have: 0.0.0.0/0 → Internet Gateway (igw-xxx)",
          "Private subnet route table should have: 0.0.0.0/0 → NAT Gateway (nat-xxx) OR no internet route",
          "Both should have: 10.0.0.0/16 → local (traffic within your VPC stays local)"
        ]
      }
    ],
    pitfalls: [
      { problem: "EC2 instance in public subnet has no internet access", solution: "Check: (1) Auto-assign public IP is enabled on the subnet, (2) Route table has 0.0.0.0/0 → igw-xxx, (3) Security group allows outbound traffic, (4) Network ACL allows traffic." },
      { problem: "Private subnet resources can't reach the internet", solution: "You need a NAT Gateway in a public subnet, and the private subnet's route table must point 0.0.0.0/0 to the NAT Gateway." },
      { problem: "Accidentally deleted the default VPC", solution: "Go to VPC Console → Actions → Create Default VPC. AWS can recreate it for you." },
      { problem: "Resources in different subnets can't communicate", solution: "They should be able to if they're in the same VPC. Check Security Groups - both must allow traffic from each other's SG or CIDR." }
    ],
    verify: [
      "VPC appears in VPC list with correct CIDR (10.0.0.0/16) ",
      "2 public subnets in different AZs with auto-assign public IP enabled",
      "2 private subnets in different AZs",
      "Internet Gateway is attached to the VPC (State: 'Attached')",
      "Public route table has 0.0.0.0/0 → IGW route"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AWS IAM
  // ═══════════════════════════════════════════════════
  awsidentityandaccessmanagement: {
    prereqs: [
      "AWS Account created",
      "Currently logged in as root user OR an IAM user with IAMFullAccess"
    ],
    steps: [
      {
        title: "Navigate to IAM Console",
        summary: "Open the IAM service",
        consolePath: "Console Home → Services → Security, Identity → IAM",
        detail: "Search 'IAM' in the top search bar. IAM is a GLOBAL service - it doesn't matter which region you're in.",
        substeps: [
          "You'll see the IAM Dashboard showing a security recommendations summary",
          "Check if MFA is enabled for root - if not, this is your FIRST priority"
        ],
        warning: "If you're logged in as root user, your first task should be creating an IAM admin user. Never use root for daily work."
      },
      {
        title: "Enable MFA on Root Account",
        summary: "Secure the root account with multi-factor authentication",
        consolePath: "IAM → Dashboard → Security recommendations → Root user MFA",
        detail: "Click 'Add MFA' next to the root user MFA warning. This protects your entire AWS account.",
        substeps: [
          "Click 'Activate MFA' or 'Assign MFA device'",
          "Select 'Authenticator app'",
          "Open your authenticator app (Google Authenticator, Authy, etc.)",
          "Scan the QR code shown on screen",
          "Enter two consecutive MFA codes from your app",
          "Click 'Assign MFA'"
        ],
        inputs: [
          { field: "MFA device name", value: "root-mfa", note: "Descriptive name" },
          { field: "MFA device type", value: "Authenticator app", note: "Most common, use Google Authenticator or Authy" }
        ],
        warning: "If you lose access to your MFA device, you could be locked out of your AWS account. Save backup codes if offered."
      },
      {
        title: "Create an IAM User Group",
        summary: "Create a group to organize permissions",
        consolePath: "IAM → User groups → Create group",
        detail: "Groups let you manage permissions for multiple users at once. Create an 'Admins' group first.",
        inputs: [
          { field: "Group name", value: "Admins", note: "For users who need full access" }
        ],
        substeps: [
          "In 'Attach permission policies', search for 'AdministratorAccess'",
          "Check the box next to 'AdministratorAccess'",
          "Click 'Create user group'"
        ],
        tip: "Always assign permissions to GROUPS, not directly to users. This makes managing access much easier."
      },
      {
        title: "Create an IAM User",
        summary: "Create a user for daily AWS console and CLI access",
        consolePath: "IAM → Users → Create user",
        detail: "Create your personal IAM user that you'll use instead of the root account.",
        inputs: [
          { field: "User name", value: "vince-admin", note: "Your personal admin user" },
          { field: "Console access", value: "Enable", note: "So you can log into the web console" },
          { field: "Console password", value: "Custom password", note: "Set a strong password" },
          { field: "Require password reset", value: "Unchecked", note: "Since it's your own user" }
        ],
        substeps: [
          "On the 'Set permissions' page, select 'Add user to group'",
          "Check the 'Admins' group you just created",
          "Click 'Next', then 'Create user'",
          "IMPORTANT: Copy the Console sign-in URL - this is your IAM login link"
        ]
      },
      {
        title: "Create Access Keys (for CLI)",
        summary: "Generate keys for AWS CLI and SDK access",
        consolePath: "IAM → Users → your-user → Security credentials → Create access key",
        detail: "If you need to use the AWS CLI or SDKs, create access keys.",
        substeps: [
          "Click on your user name → Security credentials tab",
          "Scroll to 'Access keys' → Click 'Create access key'",
          "Use case: Select 'Command Line Interface (CLI)'",
          "Acknowledge the warning and click Next",
          "SAVE the Access Key ID and Secret Access Key - the secret is shown ONLY ONCE"
        ],
        warning: "NEVER commit access keys to Git or share them publicly. If leaked, someone can use your AWS account and rack up charges.",
        tip: "Store keys in ~/.aws/credentials file using 'aws configure' command."
      },
      {
        title: "Create a Custom Policy (Optional)",
        summary: "Create fine-grained permission policies",
        consolePath: "IAM → Policies → Create policy",
        detail: "For production, you'll want custom policies that follow least-privilege principle.",
        substeps: [
          "Click 'Create policy' → Choose 'JSON' tab for full control",
          "Or use the Visual editor to select Service → Actions → Resources",
          "Example: Allow read-only access to a specific S3 bucket",
          "After creating, attach the policy to a group or user"
        ],
        tip: "AWS has hundreds of pre-built policies. Search for 'ReadOnlyAccess', 'PowerUserAccess', etc. before writing custom ones."
      }
    ],
    pitfalls: [
      { problem: "'You are not authorized to perform this operation'", solution: "Your IAM user/role doesn't have the required permission. Check which policy is needed and attach it to your user's group." },
      { problem: "Forgot the IAM console sign-in URL", solution: "It's your account ID + '.signin.aws.amazon.com/console'. Find your account ID in the top-right dropdown." },
      { problem: "Access key compromised / leaked on GitHub", solution: "IMMEDIATELY: (1) Go to IAM → Users → Security credentials → Deactivate the key, (2) Rotate to new keys, (3) Check CloudTrail for unauthorized activity." },
      { problem: "Root user has no MFA and you're locked out", solution: "Contact AWS Support immediately. Use the 'Forgot password' flow with the root email." }
    ],
    verify: [
      "Root account has MFA enabled (green check on IAM Dashboard) ",
      "IAM user can log in via the IAM console sign-in URL",
      "User is in the correct group with proper policies",
      "Access keys work (run 'aws sts get-caller-identity' in terminal)",
      "IAM Dashboard shows no critical security alerts"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AWS LAMBDA
  // ═══════════════════════════════════════════════════
  awslambda: {
    prereqs: [
      "AWS Account created and logged in as IAM user",
      "IAM user has LambdaFullAccess or AdministratorAccess",
      "Basic programming knowledge (Python, Node.js, or Java)"
    ],
    steps: [
      {
        title: "Navigate to Lambda Console",
        summary: "Open the Lambda service",
        consolePath: "Console Home → Services → Compute → Lambda",
        detail: "Search 'Lambda' in the top search bar and click on 'Lambda'. Check your region in the top-right corner.",
      },
      {
        title: "Click 'Create function'",
        summary: "Start building your first Lambda function",
        consolePath: "Lambda → Functions → Create function (orange button)",
        detail: "Click the orange 'Create function' button. You'll see three options.",
        inputs: [
          { field: "Creation method", value: "Author from scratch", note: "Best for learning - you write the code yourself" }
        ]
      },
      {
        title: "Configure Function Settings",
        summary: "Name, runtime, and permissions",
        consolePath: "Create function → Basic information",
        detail: "Set up the basic configuration for your function.",
        inputs: [
          { field: "Function name", value: "my-first-lambda", note: "Lowercase with hyphens" },
          { field: "Runtime", value: "Python 3.12", note: "Or Node.js 20.x - pick what you know" },
          { field: "Architecture", value: "x86_64", note: "Default, ARM (arm64) is cheaper but x86 is more compatible" },
          { field: "Execution role", value: "Create a new role with basic Lambda permissions", note: "Auto-creates a role with CloudWatch Logs access" }
        ],
        substeps: [
          "Click 'Create function' - you'll be taken to the function editor"
        ],
        tip: "The auto-created role only has CloudWatch Logs permissions. If your Lambda needs to access S3, DynamoDB, etc., you'll need to add policies to this role later."
      },
      {
        title: "Write Your Code",
        summary: "Edit the function code in the inline editor",
        consolePath: "Lambda → your-function → Code tab → Code source editor",
        detail: "You'll see an inline code editor with a starter template. For Python, the file is lambda_function.py with a handler function.",
        substeps: [
          "The function receives an 'event' parameter (input data) and 'context' (runtime info)",
          "Replace the default code with your logic",
          "Example: Return a JSON response with a greeting",
          "Click 'Deploy' (above the editor) to save your changes - you MUST deploy before testing"
        ],
        warning: "Code changes are NOT saved automatically. You must click 'Deploy' every time you edit the code.",
        tip: "Keep your handler function lightweight. If you need packages, create a Lambda Layer or use a deployment package."
      },
      {
        title: "Test Your Function",
        summary: "Create a test event and invoke the function",
        consolePath: "Lambda → your-function → Test tab",
        detail: "Click the 'Test' tab (or orange 'Test' button). Create a test event to simulate input.",
        inputs: [
          { field: "Test event action", value: "Create new event", note: "" },
          { field: "Event name", value: "test-event-1", note: "Descriptive name" },
          { field: "Template", value: "hello-world", note: "Produces a simple JSON body" }
        ],
        substeps: [
          "Click 'Test' to invoke your function",
          "You'll see 'Execution result: succeeded' (green) or 'failed' (red)",
          "Expand the result to see your function's return value",
          "Check 'Log output' to see any print/console.log statements",
          "Duration and memory used shown at the bottom"
        ]
      },
      {
        title: "Configure Memory and Timeout",
        summary: "Adjust resources and max execution time",
        consolePath: "Lambda → your-function → Configuration tab → General configuration → Edit",
        detail: "Default is 128 MB RAM and 3 second timeout. Adjust based on your function's needs.",
        inputs: [
          { field: "Memory", value: "128 MB", note: "128-256 MB is fine for most simple functions" },
          { field: "Timeout", value: "30 seconds", note: "Default 3s is too short for API calls. Set to 30s for safety." },
          { field: "Ephemeral storage", value: "512 MB", note: "Default /tmp storage, increase if processing files" }
        ],
        tip: "More memory = faster CPU. Lambda allocates CPU proportionally to memory. 1769 MB = 1 full vCPU."
      },
      {
        title: "Add Environment Variables (Optional)",
        summary: "Store configuration like API keys securely",
        consolePath: "Lambda → your-function → Configuration tab → Environment variables → Edit",
        detail: "Environment variables let you pass configuration (DB host, API keys) without hardcoding them.",
        substeps: [
          "Click 'Edit' under Environment variables",
          "Click 'Add environment variable'",
          "Enter Key-Value pairs (e.g., DB_HOST = mydb.amazonaws.com)",
          "Access in code: Python = os.environ['DB_HOST'], Node.js = process.env.DB_HOST"
        ],
        tip: "For sensitive values like passwords, use AWS Secrets Manager instead of environment variables."
      }
    ],
    pitfalls: [
      { problem: "Function times out after 3 seconds", solution: "Increase the timeout in Configuration → General configuration. Max is 15 minutes." },
      { problem: "'Module not found' error", solution: "You're importing a package not available in the Lambda runtime. Create a Lambda Layer with your dependencies or use a deployment package (ZIP)." },
      { problem: "'Task timed out' but function logic is fast", solution: "Check if you're connecting to a resource in a VPC. Lambda in a VPC needs a NAT Gateway for internet access, or VPC endpoints for AWS services." },
      { problem: "AccessDeniedException when accessing S3 or DynamoDB", solution: "Your Lambda's execution role needs the right permissions. Go to Configuration → Permissions → click the role → Attach the needed policy (e.g., AmazonS3ReadOnlyAccess)." }
    ],
    verify: [
      "Function shows 'Last modified' timestamp after deploying ",
      "Test event returns a successful execution result",
      "CloudWatch Logs show your function's log output (under Monitor tab)",
      "Memory and timeout are configured appropriately",
      "Execution role has the permissions your function needs"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON RDS
  // ═══════════════════════════════════════════════════
  amazonrds: {
    prereqs: [
      "AWS Account with RDS access",
      "VPC with at least 2 subnets in different AZs (RDS requires this)",
      "A Security Group that allows inbound on your database port (3306 for MySQL, 5432 for PostgreSQL)"
    ],
    steps: [
      {
        title: "Navigate to RDS Console",
        summary: "Open the RDS service",
        consolePath: "Console Home → Services → Database → RDS",
        detail: "Search 'RDS' in the top search bar. Make sure you're in your desired region.",
      },
      {
        title: "Click 'Create database'",
        summary: "Start the database creation wizard",
        consolePath: "RDS → Databases → Create database",
        detail: "Click the orange 'Create database' button.",
        inputs: [
          { field: "Creation method", value: "Standard create", note: "Gives you full control over settings" }
        ]
      },
      {
        title: "Choose Engine and Version",
        summary: "Select your database engine",
        consolePath: "Create database → Engine options",
        detail: "Pick the database engine you want. MySQL and PostgreSQL are the most common and both have free tier options.",
        inputs: [
          { field: "Engine type", value: "MySQL", note: "Most popular, or pick PostgreSQL if you prefer" },
          { field: "Engine version", value: "MySQL 8.0.35", note: "Latest stable version" },
          { field: "Templates", value: "Free tier", note: "IMPORTANT - select this to avoid charges!" }
        ],
        warning: "Make sure you select the 'Free tier' template! If you pick 'Production' or 'Dev/Test', you'll be charged."
      },
      {
        title: "Configure Instance Settings",
        summary: "Set DB name, credentials, and instance size",
        consolePath: "Create database → Settings / Instance configuration",
        detail: "Set up your database identifier and login credentials.",
        inputs: [
          { field: "DB instance identifier", value: "my-app-database", note: "This is the instance name, not the DB name" },
          { field: "Master username", value: "admin", note: "Your database root username" },
          { field: "Master password", value: "(your strong password)", note: "SAVE THIS - you'll need it to connect" },
          { field: "DB instance class", value: "db.t3.micro", note: "Free tier eligible - 1 vCPU, 1 GB RAM" }
        ],
        warning: "Write down your master password! You cannot retrieve it later. If lost, you'll need to modify the instance to reset it."
      },
      {
        title: "Configure Storage",
        summary: "Set disk type, size, and autoscaling",
        consolePath: "Create database → Storage",
        inputs: [
          { field: "Storage type", value: "gp3", note: "General Purpose SSD" },
          { field: "Allocated storage", value: "20 GiB", note: "Free tier allows up to 20 GB" },
          { field: "Storage autoscaling", value: "Uncheck", note: "Disable for learning to avoid unexpected charges" }
        ]
      },
      {
        title: "Configure Connectivity",
        summary: "CRITICAL - Set VPC, subnet, and public access",
        consolePath: "Create database → Connectivity",
        detail: "This determines how you connect to your database. If you want to connect from your local machine, you need public access.",
        inputs: [
          { field: "VPC", value: "Default VPC", note: "Or your custom VPC" },
          { field: "Public access", value: "Yes", note: "For learning - allows connection from your laptop. In production, use 'No'!" },
          { field: "VPC security group", value: "Create new", note: "Or choose existing SG that allows your DB port" },
          { field: "New SG name", value: "my-rds-sg", note: "" },
          { field: "Availability Zone", value: "No preference", note: "" },
          { field: "Database port", value: "3306", note: "Default for MySQL. PostgreSQL is 5432" }
        ],
        warning: "In production, NEVER set Public access to 'Yes'. Only do this for learning so you can connect from your local machine."
      },
      {
        title: "Additional Configuration & Create",
        summary: "Set initial database name and create",
        consolePath: "Create database → Additional configuration",
        detail: "Expand 'Additional configuration' to set an initial database name.",
        inputs: [
          { field: "Initial database name", value: "myappdb", note: "This creates a database inside the instance you can use immediately" },
          { field: "Automated backups", value: "Uncheck", note: "Disable for free tier to save storage costs" }
        ],
        substeps: [
          "Click 'Create database' at the bottom",
          "The instance will take 5-10 minutes to create - Status shows 'Creating'",
          "Wait until Status changes to 'Available' (green)"
        ],
        tip: "While waiting, go to the Security Group and make sure port 3306 (MySQL) allows inbound traffic from your IP."
      },
      {
        title: "Connect to Your Database",
        summary: "Use the endpoint to connect from your app or tool",
        consolePath: "RDS → Databases → your-db → Connectivity & security",
        detail: "Once the status is 'Available', click on your database instance. Copy the Endpoint on the 'Connectivity & security' tab.",
        substeps: [
          "Copy the Endpoint (looks like: my-app-database.abc123.ap-southeast-1.rds.amazonaws.com)",
          "Use MySQL Workbench, DBeaver, or command line to connect:",
          "mysql -h your-endpoint -P 3306 -u admin -p",
          "Enter your master password when prompted",
          "Run: SHOW DATABASES; - you should see 'myappdb' listed"
        ]
      }
    ],
    pitfalls: [
      { problem: "Can't connect to RDS from local machine", solution: "Check: (1) Public access is 'Yes', (2) Security Group allows inbound on port 3306 from your IP, (3) Endpoint is correct, (4) DB is in 'Available' status." },
      { problem: "RDS instance is very expensive", solution: "You might have selected the wrong template. Check instance class - it should be db.t3.micro for free tier. Also check Multi-AZ - disable it for learning." },
      { problem: "'Too many connections' error", solution: "db.t3.micro has a limited connection pool (~66 for MySQL). Close idle connections or upgrade instance size." },
      { problem: "Forgot the master password", solution: "Go to RDS → Modify → Set a new master password → Apply immediately. Existing connections won't be affected." }
    ],
    verify: [
      "RDS instance status shows 'Available' (green) ",
      "Endpoint is visible in Connectivity & security tab",
      "You can connect using MySQL Workbench, DBeaver, or CLI",
      "SHOW DATABASES returns your initial database name",
      "Security Group allows inbound on the correct port"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON API GATEWAY
  // ═══════════════════════════════════════════════════
  amazonapigateway: {
    prereqs: [
      "AWS Account with API Gateway access",
      "AWS Lambda function already created (API Gateway usually triggers Lambda)",
      "Basic understanding of REST APIs (GET, POST, etc.)"
    ],
    steps: [
      {
        title: "Navigate to API Gateway Console",
        summary: "Open the API Gateway service",
        consolePath: "Console Home → Services → Networking → API Gateway",
        detail: "Search 'API Gateway' in the top search bar and click on it.",
      },
      {
        title: "Choose API Type",
        summary: "Select HTTP API or REST API",
        consolePath: "API Gateway → Create API",
        detail: "You'll see four options. For most projects, choose HTTP API (simpler, cheaper) or REST API (more features).",
        inputs: [
          { field: "API type", value: "HTTP API", note: "Simpler, cheaper, auto-deploys. Use REST API only if you need API keys, caching, or request validation" }
        ],
        substeps: [
          "Click 'Build' next to HTTP API"
        ],
        tip: "HTTP API is 71% cheaper than REST API and much easier to set up. Use REST API only when you need advanced features."
      },
      {
        title: "Configure Integrations",
        summary: "Connect your API to a Lambda function or HTTP endpoint",
        consolePath: "Create API → Integrations",
        detail: "This connects your API routes to backend services (usually Lambda).",
        inputs: [
          { field: "Integration type", value: "Lambda", note: "Most common backend" },
          { field: "Lambda function", value: "my-first-lambda", note: "Select your existing Lambda function" },
          { field: "API name", value: "my-app-api", note: "Descriptive name for your API" }
        ],
        substeps: [
          "Click 'Add integration' if you need multiple backends",
          "Click 'Next'"
        ]
      },
      {
        title: "Configure Routes",
        summary: "Define your API endpoints (paths and methods)",
        consolePath: "Create API → Configure routes",
        detail: "Routes define the URL paths your API responds to. Example: GET /users, POST /users, GET /users/{id}",
        inputs: [
          { field: "Method", value: "GET", note: "HTTP method" },
          { field: "Resource path", value: "/hello", note: "The URL path after your API base URL" },
          { field: "Integration target", value: "my-first-lambda", note: "Which Lambda handles this route" }
        ],
        substeps: [
          "Click 'Add route' to add more endpoints",
          "You can add: POST /items, GET /items/{id}, DELETE /items/{id}, etc.",
          "Click 'Next'"
        ]
      },
      {
        title: "Configure Stage and Deploy",
        summary: "Set the deployment stage name",
        consolePath: "Create API → Stages",
        inputs: [
          { field: "Stage name", value: "$default", note: "Or use 'prod', 'dev', 'staging'" }
        ],
        substeps: [
          "Click 'Next' then 'Create'",
          "Your API is now deployed and live!",
          "Copy the 'Invoke URL' - this is your API's base URL"
        ]
      },
      {
        title: "Test Your API",
        summary: "Call your API endpoint to verify it works",
        consolePath: "Browser or Terminal",
        detail: "Use the Invoke URL to test your API. Open it in a browser for GET requests or use curl/Postman.",
        substeps: [
          "In your browser, go to: https://your-api-id.execute-api.region.amazonaws.com/hello",
          "You should see your Lambda function's response",
          "Or use curl: curl https://your-api-id.execute-api.region.amazonaws.com/hello",
          "For POST requests, use Postman or: curl -X POST -d '{\"name\":\"test\"}' https://your-api-url/items"
        ]
      }
    ],
    pitfalls: [
      { problem: "'Internal Server Error' (500) when calling API", solution: "Check CloudWatch Logs for your Lambda function. The Lambda is probably crashing. Common cause: missing permissions or code errors." },
      { problem: "CORS errors in the browser", solution: "Go to API Gateway → your API → CORS → Configure. Add your frontend domain (or '*' for testing) to Access-Control-Allow-Origin." },
      { problem: "'Missing Authentication Token' error", solution: "You're calling a route that doesn't exist. Check your route path is correct (case-sensitive). Also check you're using the right HTTP method." },
      { problem: "API returns old Lambda code after updating", solution: "HTTP APIs auto-deploy. For REST APIs, you need to redeploy manually: Actions → Deploy API → Select stage." }
    ],
    verify: [
      "Invoke URL is shown after deployment ",
      "GET request to your endpoint returns Lambda response",
      "Route configuration shows correct method + path + integration",
      "CloudWatch Logs show Lambda was triggered by API Gateway",
      "CORS is configured if calling from a web browser"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON DYNAMODB
  // ═══════════════════════════════════════════════════
  amazondynamodb: {
    prereqs: [
      "AWS Account with DynamoDB access",
      "IAM user has DynamoDBFullAccess policy"
    ],
    steps: [
      {
        title: "Navigate to DynamoDB Console",
        summary: "Open the DynamoDB service",
        consolePath: "Console Home → Services → Database → DynamoDB",
        detail: "Search 'DynamoDB' in the top search bar. Make sure you're in your desired region.",
      },
      {
        title: "Click 'Create table'",
        summary: "Start creating your NoSQL table",
        consolePath: "DynamoDB → Tables → Create table",
        detail: "Click the orange 'Create table' button.",
      },
      {
        title: "Configure Table Settings",
        summary: "Set table name and primary key",
        consolePath: "Create table → Table details",
        detail: "The primary key uniquely identifies each item. It can be a simple key (partition key only) or composite (partition + sort key).",
        inputs: [
          { field: "Table name", value: "Users", note: "Descriptive, PascalCase is common" },
          { field: "Partition key", value: "userId", note: "The main lookup key - usually an ID. Type: String" },
          { field: "Sort key (optional)", value: "createdAt", note: "Add if you need to query by range. Type: Number (timestamp)" }
        ],
        tip: "Choose your partition key carefully - it cannot be changed later. Use something with high cardinality (unique values) like userId, orderId."
      },
      {
        title: "Choose Table Settings",
        summary: "Capacity mode and pricing",
        consolePath: "Create table → Table settings",
        inputs: [
          { field: "Table settings", value: "Customize settings", note: "So we can select On-demand" },
          { field: "Read/write capacity mode", value: "On-demand", note: "Pay per request - best for learning, no capacity planning needed. Free tier: 25 GB storage + 25 read/write units" }
        ],
        substeps: [
          "Leave encryption as 'Amazon DynamoDB owned key' (default, free)",
          "Click 'Create table'",
          "Table creation takes about 10-30 seconds"
        ]
      },
      {
        title: "Add Items to Your Table",
        summary: "Insert your first data",
        consolePath: "DynamoDB → Tables → your-table → Explore table items → Create item",
        detail: "Click on your table name, then 'Explore table items', then 'Create item'.",
        substeps: [
          "Switch to 'JSON view' for easier editing (toggle at top-right of the form)",
          "Enter your item data as JSON",
          "Click 'Create item' to save"
        ],
        tip: "DynamoDB is schemaless - each item can have different attributes. Only the partition key (and sort key) are required."
      },
      {
        title: "Query Your Table",
        summary: "Read data back from DynamoDB",
        consolePath: "DynamoDB → Tables → your-table → Explore table items",
        detail: "You can Scan (read all items) or Query (find specific items by partition key).",
        substeps: [
          "Change from 'Scan' to 'Query' in the dropdown",
          "Enter your partition key value (e.g., userId = 'user-001')",
          "Click 'Run' to execute the query",
          "Your matching items will appear in the results table"
        ]
      }
    ],
    pitfalls: [
      { problem: "'The level of configured provisioned throughput for the table was exceeded'", solution: "You're in Provisioned mode with too-low capacity. Switch to On-demand mode: Table → Additional settings → Read/write capacity → Change to On-demand." },
      { problem: "Can't find an item you just inserted", solution: "Make sure you're querying with the exact partition key value. DynamoDB is case-sensitive. Also check you're in the right region." },
      { problem: "Query returns nothing but Scan shows items", solution: "Query requires the exact partition key. If you used a different value, use Scan with a filter instead." },
      { problem: "Unexpected DynamoDB charges", solution: "Check On-demand pricing: $1.25 per million write units. For high traffic, Provisioned capacity with auto-scaling is cheaper." }
    ],
    verify: [
      "Table status shows 'Active' ",
      "You can create items and see them in the items explorer",
      "Query by partition key returns the correct item",
      "Table info shows correct partition key and sort key names",
      "Capacity mode shows 'On-demand' (pay per request)"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON COGNITO
  // ═══════════════════════════════════════════════════
  amazoncognito: {
    prereqs: [
      "AWS Account with Cognito access",
      "A web or mobile app that needs user authentication"
    ],
    steps: [
      {
        title: "Navigate to Cognito Console",
        summary: "Open the Amazon Cognito service",
        consolePath: "Console Home → Services → Security → Cognito",
        detail: "Search 'Cognito' in the top search bar. You'll see options for User pools and Identity pools.",
      },
      {
        title: "Create a User Pool",
        summary: "User pools handle sign-up, sign-in, and user management",
        consolePath: "Cognito → User pools → Create user pool",
        detail: "A User Pool is your user directory. It handles registration, login, password recovery, and MFA.",
        inputs: [
          { field: "Authentication providers", value: "Cognito user pool", note: "For email/password login" },
          { field: "Cognito user pool sign-in options", value: "Email", note: "Users sign in with their email address" }
        ]
      },
      {
        title: "Configure Security Requirements",
        summary: "Set password policy and MFA options",
        consolePath: "Create user pool → Security requirements",
        inputs: [
          { field: "Password policy mode", value: "Cognito defaults", note: "Min 8 chars, uppercase, lowercase, number, special char" },
          { field: "Multi-factor authentication", value: "Optional MFA", note: "Let users choose. 'Required' forces all users to set up MFA" },
          { field: "MFA methods", value: "Authenticator apps", note: "TOTP-based MFA" },
          { field: "Account recovery", value: "Email only", note: "Users can reset password via email" }
        ]
      },
      {
        title: "Configure Sign-up Experience",
        summary: "What info users provide during registration",
        consolePath: "Create user pool → Sign-up experience",
        inputs: [
          { field: "Self-service sign-up", value: "Enable", note: "Users can register themselves" },
          { field: "Required attributes", value: "email", note: "Minimum required. Add name, phone as needed." },
          { field: "Attribute verification", value: "Send email message, verify email address", note: "Sends verification code to email" }
        ]
      },
      {
        title: "Configure App Client",
        summary: "Create the app integration for your frontend",
        consolePath: "Create user pool → Integrate your app",
        inputs: [
          { field: "User pool name", value: "my-app-users", note: "" },
          { field: "App type", value: "Public client", note: "For web/mobile apps" },
          { field: "App client name", value: "my-web-app", note: "" }
        ],
        substeps: [
          "Click 'Next' then 'Create user pool'",
          "Note down the User Pool ID and App Client ID - your frontend needs these"
        ]
      },
      {
        title: "Create a Test User",
        summary: "Manually add a user to verify the pool works",
        consolePath: "Cognito → User pools → your-pool → Users → Create user",
        inputs: [
          { field: "User name", value: "testuser@email.com", note: "" },
          { field: "Email address", value: "testuser@email.com", note: "" },
          { field: "Temporary password", value: "(set a temporary password)", note: "User must change on first login" }
        ]
      }
    ],
    pitfalls: [
      { problem: "'User pool does not exist' error in your app", solution: "Check the User Pool ID and Region in your app config. The format is: region_poolId (e.g., ap-southeast-1_ABC123)." },
      { problem: "User can't sign up - 'Invalid parameter' error", solution: "Your app isn't sending all required attributes. Check which attributes you set as required in the user pool config." },
      { problem: "Verification email not arriving", solution: "Check spam folder. For development, Cognito uses a shared email sender with daily limits. For production, configure SES for custom email." },
      { problem: "'NotAuthorizedException' on login", solution: "Wrong password, or the user hasn't verified their email yet. Check user status in the Cognito console." }
    ],
    verify: [
      "User Pool shows 'Active' status ",
      "User Pool ID and App Client ID are visible",
      "Test user appears in the Users list",
      "Test user can sign in (status changes from FORCE_CHANGE_PASSWORD to CONFIRMED)",
      "App client is configured with correct callback URLs"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON CLOUDFRONT
  // ═══════════════════════════════════════════════════
  amazoncloudfront: {
    prereqs: [
      "AWS Account with CloudFront access",
      "An origin source - either an S3 bucket or a web server (EC2, ALB, or any HTTP endpoint)",
    ],
    steps: [
      {
        title: "Navigate to CloudFront Console",
        summary: "Open the CloudFront service",
        consolePath: "Console Home → Services → Networking → CloudFront",
        detail: "Search 'CloudFront' in the top search bar. CloudFront is a GLOBAL service.",
      },
      {
        title: "Click 'Create Distribution'",
        summary: "Start creating your CDN distribution",
        consolePath: "CloudFront → Distributions → Create distribution",
        detail: "Click 'Create distribution'. You'll configure the origin, cache behavior, and settings.",
      },
      {
        title: "Configure Origin Settings",
        summary: "Point CloudFront to your content source",
        consolePath: "Create distribution → Origin",
        detail: "The origin is where CloudFront fetches your content from.",
        inputs: [
          { field: "Origin domain", value: "my-bucket.s3.ap-southeast-1.amazonaws.com", note: "Select your S3 bucket from the dropdown, or enter any URL" },
          { field: "Origin access", value: "Origin access control settings (recommended)", note: "For S3 origins - keeps your bucket private while CloudFront serves it" },
          { field: "Origin access control", value: "Create new OAC", note: "Click 'Create control setting' and use defaults" }
        ],
        tip: "OAC (Origin Access Control) is the modern way to secure S3 origins. It keeps your bucket completely private - only CloudFront can read from it."
      },
      {
        title: "Configure Default Cache Behavior",
        summary: "Set how CloudFront handles requests",
        consolePath: "Create distribution → Default cache behavior",
        inputs: [
          { field: "Viewer protocol policy", value: "Redirect HTTP to HTTPS", note: "Forces secure connections" },
          { field: "Allowed HTTP methods", value: "GET, HEAD", note: "For static sites. Add POST, PUT, etc. for APIs" },
          { field: "Cache policy", value: "CachingOptimized", note: "Best for static content like images, CSS, JS" }
        ]
      },
      {
        title: "Configure Distribution Settings",
        summary: "Set price class, SSL, and default root object",
        consolePath: "Create distribution → Settings",
        inputs: [
          { field: "Price class", value: "Use only North America and Europe", note: "Cheapest option. Use 'All edge locations' for global users" },
          { field: "Default root object", value: "index.html", note: "What to serve when someone visits your root URL" },
          { field: "SSL certificate", value: "Default CloudFront certificate", note: "For custom domains, you'll need an ACM certificate" }
        ],
        substeps: [
          "Click 'Create distribution'",
          "It takes 5-15 minutes to deploy globally",
          "Copy the Distribution domain name (e.g., d1234abcd.cloudfront.net)"
        ],
        tip: "After creating, CloudFront will show a yellow banner asking you to update your S3 bucket policy. Click 'Copy policy' and paste it into your S3 bucket's bucket policy."
      },
      {
        title: "Update S3 Bucket Policy (if using S3 origin)",
        summary: "Allow CloudFront to read from your private S3 bucket",
        consolePath: "S3 → your-bucket → Permissions → Bucket policy → Edit",
        detail: "CloudFront will show the exact policy to copy. Paste it into your S3 bucket policy.",
        substeps: [
          "Go back to your CloudFront distribution → click the yellow banner → Copy policy",
          "Go to S3 → your bucket → Permissions tab → Bucket policy → Edit",
          "Paste the policy and click 'Save changes'",
          "Your S3 bucket remains private but CloudFront can serve its content"
        ]
      }
    ],
    pitfalls: [
      { problem: "'Access Denied' when visiting CloudFront URL", solution: "Your S3 bucket policy doesn't allow CloudFront. Copy the policy from CloudFront's distribution page and paste it into your S3 bucket policy." },
      { problem: "CloudFront serves old/cached content after updating S3", solution: "Create an invalidation: CloudFront → Distribution → Invalidations → Create → Enter '/*' to invalidate everything. Note: First 1000 invalidations/month are free." },
      { problem: "Custom domain not working", solution: "You need: (1) ACM certificate in us-east-1 (must be us-east-1!), (2) Alternate domain name added to distribution, (3) DNS CNAME or Route 53 alias pointing to CloudFront." },
      { problem: "Distribution stuck in 'Deploying' state", solution: "This is normal - global CDN deployment takes 5-15 minutes. Wait it out." }
    ],
    verify: [
      "Distribution status shows 'Enabled' and 'Deployed' ",
      "Visiting d1234abcd.cloudfront.net shows your content",
      "Content loads over HTTPS (lock icon in browser)",
      "CloudFront serves cached content (check x-cache header = 'Hit from cloudfront')",
      "S3 bucket remains private (direct S3 URL returns Access Denied)"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON ROUTE 53
  // ═══════════════════════════════════════════════════
  amazonroute53: {
    prereqs: [
      "AWS Account with Route 53 access",
      "A domain name (you can buy one through Route 53 or use an existing domain)",
      "A target resource (EC2, ALB, CloudFront, S3 website, etc.) to point your domain to"
    ],
    steps: [
      {
        title: "Navigate to Route 53 Console",
        summary: "Open the Route 53 service",
        consolePath: "Console Home → Services → Networking → Route 53",
        detail: "Search 'Route 53' in the top search bar. Route 53 is a GLOBAL service.",
      },
      {
        title: "Register or Transfer a Domain (Optional)",
        summary: "Buy a domain directly from AWS",
        consolePath: "Route 53 → Registered domains → Register domain",
        detail: "If you don't have a domain, you can buy one here. Prices vary (.com ~$12/year, .click ~$3/year).",
        inputs: [
          { field: "Domain name", value: "myawsproject.com", note: "Check availability first" }
        ],
        substeps: [
          "Search for your desired domain name",
          "Click 'Select' on an available domain",
          "Fill in contact details (required by ICANN)",
          "Complete purchase - domain activation takes 5-30 minutes"
        ],
        tip: "If you already own a domain elsewhere (GoDaddy, Namecheap), you can just create a Hosted Zone and update nameservers instead of transferring."
      },
      {
        title: "Create a Hosted Zone",
        summary: "Create the DNS zone for your domain",
        consolePath: "Route 53 → Hosted zones → Create hosted zone",
        detail: "A Hosted Zone contains all DNS records for your domain. If you registered with Route 53, this is auto-created.",
        inputs: [
          { field: "Domain name", value: "myawsproject.com", note: "Your domain (without www)" },
          { field: "Type", value: "Public hosted zone", note: "For internet-facing domains" }
        ],
        substeps: [
          "Click 'Create hosted zone'",
          "You'll see NS (nameserver) and SOA records auto-created",
          "If your domain is NOT registered with Route 53, update your registrar's nameservers to the 4 NS values shown"
        ]
      },
      {
        title: "Create DNS Records",
        summary: "Point your domain to your AWS resources",
        consolePath: "Route 53 → Hosted zones → your-domain → Create record",
        detail: "Create A records (for IPv4) or CNAME records (for aliases) to point to your resources.",
        inputs: [
          { field: "Record name", value: "(leave blank for root, or www)", note: "Blank = myawsproject.com, 'www' = www.myawsproject.com" },
          { field: "Record type", value: "A", note: "IPv4 address or AWS alias" },
          { field: "Alias", value: "Yes (toggle ON)", note: "For AWS resources, always use Alias - it's free!" },
          { field: "Route traffic to", value: "Alias to CloudFront / ALB / S3", note: "Select the AWS service, then choose your resource" }
        ],
        tip: "Always use Alias records for AWS resources (ALB, CloudFront, S3, API Gateway). They're free and faster than CNAME."
      },
      {
        title: "Verify DNS Propagation",
        summary: "Check that your domain resolves correctly",
        consolePath: "Terminal / Browser",
        detail: "DNS changes can take a few minutes to propagate.",
        substeps: [
          "Open terminal and run: nslookup myawsproject.com",
          "Or use: dig myawsproject.com (Mac/Linux)",
          "Or visit https://dnschecker.org to check globally",
          "Once resolved, visit your domain in a browser to confirm"
        ]
      }
    ],
    pitfalls: [
      { problem: "Domain not resolving after creating records", solution: "DNS propagation takes 5-60 minutes. If you changed nameservers at your registrar, it can take up to 48 hours." },
      { problem: "'No Hosted Zone found' when trying to create a record", solution: "Create a Hosted Zone first. The domain name must match exactly (no www prefix)." },
      { problem: "Alias record option is grayed out", solution: "Not all record types support Alias. Use A record (not CNAME) for Alias to CloudFront or ALB." },
      { problem: "Charged $0.50/month for Hosted Zone", solution: "Each Hosted Zone costs $0.50/month. Delete unused Hosted Zones in Route 53 → Hosted zones." }
    ],
    verify: [
      "Hosted Zone shows correct NS records ",
      "DNS records (A, CNAME) point to correct targets",
      "nslookup/dig returns the expected IP or alias",
      "Domain loads in browser with correct content",
      "Both root domain and www subdomain work (if configured)"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON CLOUDWATCH
  // ═══════════════════════════════════════════════════
  amazoncloudwatch: {
    prereqs: [
      "AWS Account with CloudWatch access",
      "At least one running AWS resource (EC2, Lambda, RDS, etc.) generating metrics"
    ],
    steps: [
      {
        title: "Navigate to CloudWatch Console",
        summary: "Open the CloudWatch service",
        consolePath: "Console Home → Services → Management → CloudWatch",
        detail: "Search 'CloudWatch' in the search bar. Make sure you're in the region where your resources are running.",
      },
      {
        title: "View Default Metrics",
        summary: "See metrics from your running resources",
        consolePath: "CloudWatch → Metrics → All metrics",
        detail: "CloudWatch automatically collects metrics from AWS services. Click 'All metrics' to browse.",
        substeps: [
          "Click on a namespace (e.g., 'EC2' to see EC2 metrics)",
          "Click 'Per-Instance Metrics' to see metrics by instance",
          "Check the boxes next to metrics like CPUUtilization, NetworkIn, etc.",
          "A graph will appear at the top showing the selected metrics"
        ],
        tip: "EC2 sends basic metrics every 5 minutes (free). Enable 'Detailed Monitoring' on EC2 for 1-minute intervals ($2.10/instance/month)."
      },
      {
        title: "Create a Dashboard",
        summary: "Build a custom monitoring dashboard",
        consolePath: "CloudWatch → Dashboards → Create dashboard",
        inputs: [
          { field: "Dashboard name", value: "my-app-dashboard", note: "Descriptive name" }
        ],
        substeps: [
          "Click 'Create dashboard'",
          "Choose widget type: 'Line' for time series, 'Number' for current value",
          "Select metrics to display (e.g., EC2 CPUUtilization)",
          "Click 'Create widget' then 'Save dashboard'",
          "Add more widgets for different services (RDS connections, Lambda invocations, etc.)"
        ],
        tip: "Dashboards with up to 3 widgets are free. Each additional dashboard costs $3/month."
      },
      {
        title: "Create a CloudWatch Alarm",
        summary: "Get notified when metrics cross a threshold",
        consolePath: "CloudWatch → Alarms → All alarms → Create alarm",
        detail: "Alarms monitor a metric and notify you (via SNS email/SMS) when something goes wrong.",
        inputs: [
          { field: "Select metric", value: "EC2 → Per-Instance → CPUUtilization", note: "Choose the metric to monitor" },
          { field: "Statistic", value: "Average", note: "" },
          { field: "Period", value: "5 minutes", note: "How often to evaluate" },
          { field: "Threshold type", value: "Static", note: "" },
          { field: "Condition", value: "Greater than 80", note: "Alert when CPU > 80%" }
        ],
        substeps: [
          "Click 'Next' → Configure notification",
          "Create a new SNS topic or select existing",
          "Enter your email address for notifications",
          "Name your alarm (e.g., 'High-CPU-Alert')",
          "Click 'Create alarm'",
          "IMPORTANT: Confirm the SNS subscription via the email you receive"
        ],
        warning: "You must confirm the SNS email subscription, otherwise you won't receive alerts. Check your inbox and spam folder."
      },
      {
        title: "View Log Groups",
        summary: "Access application logs from Lambda, EC2, etc.",
        consolePath: "CloudWatch → Logs → Log groups",
        detail: "Lambda functions and other services automatically send logs here.",
        substeps: [
          "Click on a log group (e.g., '/aws/lambda/my-function')",
          "Click on a log stream to see individual log entries",
          "Use the search bar to filter logs by keyword",
          "Use 'Log Insights' for advanced queries across multiple log groups"
        ]
      }
    ],
    pitfalls: [
      { problem: "No metrics appearing for my EC2 instance", solution: "EC2 sends metrics only when running. Wait 5-10 minutes after launch. Check you're in the correct region." },
      { problem: "Alarm stuck in 'Insufficient data'", solution: "The metric hasn't been reported yet. Wait for the evaluation period (5 minutes). Ensure the monitored resource is running." },
      { problem: "SNS email notification not received", solution: "Check: (1) You confirmed the SNS subscription, (2) Check spam folder, (3) Verify the email in the SNS topic subscription." },
      { problem: "Lambda logs not appearing", solution: "Check your Lambda function's execution role has CloudWatchLogsFullAccess or the AWSLambdaBasicExecutionRole policy." }
    ],
    verify: [
      "Metrics graph shows data for your resources ",
      "Dashboard displays widgets correctly",
      "Alarm shows 'OK' state (green) when metrics are normal",
      "SNS subscription confirmed (email received)",
      "Lambda/application logs visible in Log groups"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON SQS
  // ═══════════════════════════════════════════════════
  amazonsimplequeueservice: {
    prereqs: [
      "AWS Account with SQS access",
      "A producer (something to send messages) and consumer (something to process them)"
    ],
    steps: [
      {
        title: "Navigate to SQS Console",
        summary: "Open the SQS service",
        consolePath: "Console Home → Services → Application Integration → SQS",
        detail: "Search 'SQS' in the top search bar.",
      },
      {
        title: "Create a Queue",
        summary: "Create your message queue",
        consolePath: "SQS → Create queue",
        inputs: [
          { field: "Type", value: "Standard", note: "Best throughput. Use FIFO only if you need strict ordering (more expensive)" },
          { field: "Name", value: "my-app-queue", note: "For FIFO, name must end in .fifo" }
        ]
      },
      {
        title: "Configure Queue Settings",
        summary: "Set visibility timeout, retention, and message size",
        consolePath: "Create queue → Configuration",
        inputs: [
          { field: "Visibility timeout", value: "30 seconds", note: "How long a message is hidden after being read. Should be longer than your processing time." },
          { field: "Message retention period", value: "4 days", note: "How long unprocessed messages are kept (1 min to 14 days)" },
          { field: "Maximum message size", value: "256 KB", note: "Max per message. For larger payloads, store in S3 and send the S3 key" },
          { field: "Delivery delay", value: "0 seconds", note: "Delay before message becomes visible" },
          { field: "Receive message wait time", value: "20 seconds", note: "Enable long polling - reduces costs by waiting for messages instead of checking constantly" }
        ],
        substeps: [
          "Click 'Create queue'",
          "Copy the Queue URL - you'll need this to send/receive messages"
        ],
        tip: "Always set 'Receive message wait time' to 20 seconds (long polling). Short polling (0 seconds) makes many unnecessary API calls that cost money."
      },
      {
        title: "Send a Test Message",
        summary: "Send a message to verify the queue works",
        consolePath: "SQS → your-queue → Send and receive messages",
        detail: "Click 'Send and receive messages' at the top of your queue page.",
        inputs: [
          { field: "Message body", value: "{\"action\": \"test\", \"data\": \"hello from SQS\"}", note: "Can be any text, usually JSON" }
        ],
        substeps: [
          "Paste your message body",
          "Click 'Send message'",
          "You should see a 'Message sent successfully' confirmation with a Message ID"
        ]
      },
      {
        title: "Receive and Delete Messages",
        summary: "Read messages from the queue",
        consolePath: "SQS → your-queue → Send and receive messages → Poll for messages",
        detail: "Scroll down to 'Receive messages' and click 'Poll for messages'.",
        substeps: [
          "Your test message should appear in the list",
          "Click on the message to see its body and attributes",
          "After processing, select the message and click 'Delete' - this removes it from the queue",
          "In production, your consumer app calls ReceiveMessage and DeleteMessage via the SDK"
        ]
      }
    ],
    pitfalls: [
      { problem: "Messages being processed twice", solution: "Standard queues can deliver messages more than once. Make your consumer idempotent (processing the same message twice should have the same result). Or use FIFO queues." },
      { problem: "Messages reappearing after being read", solution: "You're not deleting them after processing. Call DeleteMessage after successful processing. Also check your visibility timeout isn't too short." },
      { problem: "Queue has messages but consumer gets nothing", solution: "Check: (1) Consumer is polling the right queue URL, (2) Messages aren't in-flight (being processed by another consumer), (3) Check the 'Messages available' counter." },
      { problem: "DLQ (Dead Letter Queue) filling up", solution: "Messages exceeded MaxReceiveCount (keep failing to process). Fix the consumer bug, then redrive messages from DLQ back to the main queue." }
    ],
    verify: [
      "Queue is created and shows Queue URL ",
      "Sending a message returns a Message ID",
      "Polling shows the message in the queue",
      "After deleting, message count drops to 0",
      "Queue metrics show in CloudWatch (approximate messages count)"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON SNS
  // ═══════════════════════════════════════════════════
  amazonsimplenotificationservice: {
    prereqs: [
      "AWS Account with SNS access",
      "An email address or phone number for testing notifications"
    ],
    steps: [
      {
        title: "Navigate to SNS Console",
        summary: "Open the SNS service",
        consolePath: "Console Home → Services → Application Integration → SNS",
        detail: "Search 'SNS' in the top search bar.",
      },
      {
        title: "Create a Topic",
        summary: "Create a notification topic (channel)",
        consolePath: "SNS → Topics → Create topic",
        detail: "A Topic is a communication channel. Publishers send messages to topics, and subscribers receive them.",
        inputs: [
          { field: "Type", value: "Standard", note: "Best throughput. FIFO for strict ordering" },
          { field: "Name", value: "my-app-notifications", note: "" }
        ],
        substeps: [
          "Leave all other settings as default",
          "Click 'Create topic'",
          "Copy the Topic ARN - you'll need this to publish messages"
        ]
      },
      {
        title: "Create a Subscription",
        summary: "Subscribe an endpoint (email, SMS, Lambda, SQS) to receive messages",
        consolePath: "SNS → Topics → your-topic → Create subscription",
        inputs: [
          { field: "Protocol", value: "Email", note: "Or SMS, Lambda, SQS, HTTP/S" },
          { field: "Endpoint", value: "your-email@example.com", note: "The email that receives notifications" }
        ],
        substeps: [
          "Click 'Create subscription'",
          "Status will show 'Pending confirmation'",
          "Check your email inbox (and spam) for the confirmation email",
          "Click 'Confirm subscription' in the email",
          "Status changes to 'Confirmed'"
        ],
        warning: "You MUST confirm the subscription via email. Unconfirmed subscriptions will never receive messages."
      },
      {
        title: "Publish a Test Message",
        summary: "Send a message to all subscribers",
        consolePath: "SNS → Topics → your-topic → Publish message",
        inputs: [
          { field: "Subject", value: "Test Alert", note: "Email subject line" },
          { field: "Message body", value: "This is a test notification from AWS SNS!", note: "" }
        ],
        substeps: [
          "Click 'Publish message'",
          "Check your email - you should receive the notification within seconds"
        ]
      }
    ],
    pitfalls: [
      { problem: "Not receiving emails from SNS", solution: "Check: (1) Subscription is confirmed (not 'Pending'), (2) Check spam/junk folder, (3) Verify the endpoint email is correct." },
      { problem: "SMS messages not being delivered", solution: "SMS has region restrictions and spending limits. Go to SNS → Mobile → Text messaging → Check your spending limit and opt-out list." },
      { problem: "Too many notifications overwhelming subscribers", solution: "Use SNS message filtering. Subscribers can set filter policies to only receive messages matching specific attributes." }
    ],
    verify: [
      "Topic created with ARN visible ",
      "Subscription status shows 'Confirmed'",
      "Publishing a test message sends email within seconds",
      "Multiple subscribers can be added to same topic",
      "CloudWatch shows SNS delivery metrics"
    ]
  },

  // ═══════════════════════════════════════════════════
  // ELASTIC LOAD BALANCING
  // ═══════════════════════════════════════════════════
  elasticloadbalancing: {
    prereqs: [
      "AWS Account with EC2/ELB access",
      "VPC with at least 2 public subnets in different AZs",
      "At least one EC2 instance or target to load balance to"
    ],
    steps: [
      {
        title: "Navigate to EC2 Console → Load Balancers",
        summary: "Open the Load Balancer section",
        consolePath: "EC2 → Load Balancers (left sidebar) → Create load balancer",
        detail: "Load Balancers are managed under the EC2 service console.",
      },
      {
        title: "Choose Load Balancer Type",
        summary: "Select ALB, NLB, or GLB",
        consolePath: "Create load balancer → Type selection",
        inputs: [
          { field: "Type", value: "Application Load Balancer (ALB)", note: "Best for web apps (HTTP/HTTPS). Use NLB for TCP/UDP, GLB for third-party appliances" }
        ],
        tip: "ALB is the most common choice. It works at Layer 7 (HTTP) and supports path-based routing, host-based routing, and WebSockets."
      },
      {
        title: "Configure Basic Settings",
        summary: "Name, scheme, and network mapping",
        consolePath: "Create ALB → Basic configuration",
        inputs: [
          { field: "Name", value: "my-app-alb", note: "Cannot be changed after creation" },
          { field: "Scheme", value: "Internet-facing", note: "For public access. Use 'Internal' for private APIs" },
          { field: "IP address type", value: "IPv4", note: "Default" }
        ],
        substeps: [
          "Under 'Network mapping', select your VPC",
          "Select at least 2 Availability Zones and their public subnets",
          "ALB REQUIRES at least 2 AZs for high availability"
        ]
      },
      {
        title: "Configure Security Group",
        summary: "Set firewall rules for the load balancer",
        consolePath: "Create ALB → Security groups",
        detail: "Create or select a Security Group that allows HTTP (80) and HTTPS (443) traffic.",
        inputs: [
          { field: "Security group", value: "Create new SG", note: "" },
          { field: "Inbound Rule 1", value: "HTTP (80) from 0.0.0.0/0", note: "Allow web traffic from anywhere" },
          { field: "Inbound Rule 2", value: "HTTPS (443) from 0.0.0.0/0", note: "Allow secure traffic" }
        ]
      },
      {
        title: "Create Target Group",
        summary: "Define where the ALB sends traffic",
        consolePath: "Create ALB → Listeners and routing → Create target group",
        detail: "A Target Group is a set of EC2 instances (or IPs, or Lambda functions) that receive traffic.",
        inputs: [
          { field: "Target type", value: "Instances", note: "EC2 instances. Or 'IP' for containers, 'Lambda' for serverless" },
          { field: "Target group name", value: "my-app-targets", note: "" },
          { field: "Protocol", value: "HTTP", note: "" },
          { field: "Port", value: "80", note: "Port your app is running on" },
          { field: "Health check path", value: "/", note: "Or /health - ALB pings this to check if instance is alive" }
        ],
        substeps: [
          "Click 'Next' → Register targets",
          "Select your EC2 instances from the list",
          "Click 'Include as pending below'",
          "Click 'Create target group'"
        ]
      },
      {
        title: "Configure Listener and Create",
        summary: "Set the listening port and link to target group",
        consolePath: "Create ALB → Listeners",
        inputs: [
          { field: "Listener protocol", value: "HTTP", note: "Port 80" },
          { field: "Default action", value: "Forward to: my-app-targets", note: "Your target group" }
        ],
        substeps: [
          "Click 'Create load balancer'",
          "Wait 2-3 minutes for status to change from 'Provisioning' to 'Active'",
          "Copy the DNS name (e.g., my-app-alb-123456.ap-southeast-1.elb.amazonaws.com)"
        ]
      },
      {
        title: "Verify Health Checks",
        summary: "Make sure ALB can reach your instances",
        consolePath: "EC2 → Target Groups → your-target-group → Targets tab",
        detail: "Check that registered targets show 'healthy' status. If 'unhealthy', the ALB won't send traffic to them.",
        substeps: [
          "Click on your target group",
          "Go to the 'Targets' tab",
          "Status should show 'healthy' (green)",
          "If 'unhealthy', check: Security Group on EC2 allows traffic from ALB SG, and your app is running on the correct port"
        ]
      }
    ],
    pitfalls: [
      { problem: "All targets showing 'unhealthy'", solution: "Check: (1) EC2 Security Group allows inbound from the ALB Security Group on the app port, (2) Your app is actually running on the health check port, (3) Health check path returns HTTP 200." },
      { problem: "ALB DNS name returns '503 Service Unavailable'", solution: "No healthy targets available. Fix the health check issue first." },
      { problem: "ALB can't be created - 'At least 2 AZs required'", solution: "Select public subnets in at least 2 different Availability Zones in the network mapping section." },
      { problem: "HTTPS not working", solution: "You need an SSL certificate from ACM. Go to ACM → Request a certificate → Validate via DNS → Then add an HTTPS listener on the ALB." }
    ],
    verify: [
      "ALB status shows 'Active' ",
      "Targets show 'healthy' in the target group",
      "ALB DNS name loads your app in the browser",
      "Traffic is distributed across multiple instances (check EC2 access logs)",
      "Health checks pass consistently"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON ELASTICACHE
  // ═══════════════════════════════════════════════════
  amazonelasticache: {
    prereqs: [
      "AWS Account with ElastiCache access",
      "VPC with private subnets (ElastiCache should not be public)",
      "Security Group allowing inbound on port 6379 (Redis) or 11211 (Memcached)"
    ],
    steps: [
      {
        title: "Navigate to ElastiCache Console",
        summary: "Open the ElastiCache service",
        consolePath: "Console Home → Services → Database → ElastiCache",
        detail: "Search 'ElastiCache' in the top search bar.",
      },
      {
        title: "Choose Engine",
        summary: "Select Redis or Memcached",
        consolePath: "ElastiCache → Get started → Create cluster",
        inputs: [
          { field: "Cluster engine", value: "Redis", note: "More features (persistence, pub/sub, data structures). Memcached is simpler but Redis is better for most use cases" },
          { field: "Deployment option", value: "Design your own cache", note: "" },
          { field: "Creation method", value: "Easy create", note: "Simplest way to get started" }
        ]
      },
      {
        title: "Configure Cluster Settings",
        summary: "Name, node type, and number of replicas",
        consolePath: "Create cluster → Cluster settings",
        inputs: [
          { field: "Name", value: "my-app-cache", note: "" },
          { field: "Configuration", value: "Demo", note: "Free tier: cache.t3.micro or cache.t2.micro" },
          { field: "Port", value: "6379", note: "Default Redis port" }
        ],
        substeps: [
          "For the subnet group, select your VPC's private subnets",
          "Select a Security Group that allows port 6379 from your application",
          "Click 'Create' - takes 5-10 minutes"
        ],
        warning: "ElastiCache is NOT free tier eligible in all configurations. Use cache.t3.micro and single-node to minimize costs."
      },
      {
        title: "Connect from Your Application",
        summary: "Use the endpoint to connect from EC2 or Lambda",
        consolePath: "ElastiCache → Redis clusters → your-cluster",
        detail: "Copy the 'Primary endpoint' from the cluster details. You can only connect from within the same VPC.",
        substeps: [
          "Copy the Primary endpoint (e.g., my-app-cache.abc123.0001.apse1.cache.amazonaws.com:6379)",
          "From an EC2 instance in the same VPC, install redis-cli: sudo yum install redis -y",
          "Connect: redis-cli -h your-endpoint -p 6379",
          "Test: SET test 'hello' → GET test → should return 'hello'"
        ],
        warning: "You CANNOT connect to ElastiCache from your local machine (it's VPC-only). You must connect from an EC2 instance, Lambda, or ECS task in the same VPC."
      }
    ],
    pitfalls: [
      { problem: "Cannot connect to Redis from EC2", solution: "Check: (1) EC2 and ElastiCache are in the same VPC, (2) Security Group on ElastiCache allows inbound on port 6379 from EC2's Security Group, (3) EC2 is in a subnet that can reach ElastiCache." },
      { problem: "Trying to connect from local machine", solution: "ElastiCache is VPC-only. Use SSH tunneling through an EC2 instance: ssh -i key.pem -L 6379:cache-endpoint:6379 ec2-user@ec2-ip, then connect to localhost:6379." },
      { problem: "High memory usage causing evictions", solution: "Your cache is full and evicting old keys. Either increase node size or implement a proper TTL (time-to-live) strategy for your cached data." }
    ],
    verify: [
      "Cluster status shows 'Available' ",
      "Primary endpoint is visible in cluster details",
      "redis-cli connects from an EC2 instance in the same VPC",
      "SET and GET commands work correctly",
      "CloudWatch shows ElastiCache metrics (CacheMisses, CacheHits)"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON ECS
  // ═══════════════════════════════════════════════════
  amazonelasticcontainerservice: {
    prereqs: [
      "AWS Account with ECS and ECR access",
      "Docker image pushed to ECR or Docker Hub",
      "VPC with subnets and an ALB (for web services)"
    ],
    steps: [
      {
        title: "Navigate to ECS Console",
        summary: "Open the Elastic Container Service",
        consolePath: "Console Home → Services → Containers → ECS",
        detail: "Search 'ECS' in the top search bar.",
      },
      {
        title: "Create a Cluster",
        summary: "Create the compute environment for your containers",
        consolePath: "ECS → Clusters → Create cluster",
        inputs: [
          { field: "Cluster name", value: "my-app-cluster", note: "" },
          { field: "Infrastructure", value: "AWS Fargate (serverless)", note: "No EC2 instances to manage. Or choose 'EC2' for more control" }
        ],
        substeps: [
          "Click 'Create' - cluster is created in seconds"
        ],
        tip: "Fargate is the easiest option - no servers to manage. Use EC2 launch type only if you need GPU or specific instance types."
      },
      {
        title: "Create a Task Definition",
        summary: "Define your container specs (image, CPU, memory, ports)",
        consolePath: "ECS → Task definitions → Create new task definition",
        inputs: [
          { field: "Task definition family", value: "my-web-app", note: "Name for your task" },
          { field: "Launch type", value: "AWS Fargate", note: "" },
          { field: "OS/Architecture", value: "Linux/X86_64", note: "" },
          { field: "CPU", value: ".25 vCPU", note: "Smallest Fargate option" },
          { field: "Memory", value: ".5 GB", note: "Smallest option" }
        ],
        substeps: [
          "Under 'Container - 1', set:",
          "Container name: my-app-container",
          "Image URI: your-ecr-uri or docker-hub-image:tag",
          "Container port: 80 (or whatever port your app listens on)",
          "Protocol: TCP",
          "Click 'Create'"
        ]
      },
      {
        title: "Create a Service",
        summary: "Run and maintain your desired number of containers",
        consolePath: "ECS → Clusters → your-cluster → Create service",
        inputs: [
          { field: "Launch type", value: "FARGATE", note: "" },
          { field: "Task definition", value: "my-web-app", note: "Select the task def you created" },
          { field: "Service name", value: "my-web-service", note: "" },
          { field: "Desired tasks", value: "2", note: "Number of container copies to run" }
        ],
        substeps: [
          "Under Networking: select your VPC and subnets",
          "Under Load balancing: select your ALB and target group",
          "Click 'Create service'",
          "ECS will pull your image and start the containers"
        ]
      },
      {
        title: "Verify Tasks Are Running",
        summary: "Check that containers started successfully",
        consolePath: "ECS → Clusters → your-cluster → Services → your-service → Tasks",
        substeps: [
          "Click on your service, then go to the 'Tasks' tab",
          "Tasks should show 'RUNNING' status",
          "If 'STOPPED', click the task to see the stopped reason",
          "Check the 'Logs' tab to see container output"
        ]
      }
    ],
    pitfalls: [
      { problem: "Task keeps stopping with 'Essential container exited'", solution: "Your container is crashing. Check the task logs (ECS → Tasks → Stopped task → Logs). Common issues: wrong CMD/ENTRYPOINT, missing env vars, or the app crashing on startup." },
      { problem: "'CannotPullContainerError'", solution: "ECS can't download your Docker image. Check: (1) Image URI is correct, (2) ECR permissions allow ECS to pull, (3) If in private subnet, you need NAT Gateway or VPC endpoints for ECR." },
      { problem: "Task running but ALB returns 503", solution: "Health check failing. Check: (1) Container is listening on the port defined in task def, (2) ALB health check path returns 200, (3) Security Group allows traffic from ALB to ECS tasks." }
    ],
    verify: [
      "Cluster shows active services and running tasks ",
      "Tasks tab shows 'RUNNING' status",
      "Container logs show your app's startup output",
      "ALB DNS name returns your app's response",
      "Desired count matches running count in the service"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON KINESIS
  // ═══════════════════════════════════════════════════
  amazonkinesis: {
    prereqs: [
      "AWS Account with Kinesis access",
      "A data producer (app or service that generates streaming data)"
    ],
    steps: [
      {
        title: "Navigate to Kinesis Console",
        summary: "Open the Kinesis service",
        consolePath: "Console Home → Services → Analytics → Kinesis",
        detail: "Search 'Kinesis' in the top search bar.",
      },
      {
        title: "Create a Data Stream",
        summary: "Create a stream to receive real-time data",
        consolePath: "Kinesis → Data streams → Create data stream",
        inputs: [
          { field: "Data stream name", value: "my-event-stream", note: "" },
          { field: "Capacity mode", value: "On-demand", note: "Auto-scales. Use Provisioned only if you know your exact throughput." }
        ],
        substeps: [
          "Click 'Create data stream'",
          "Stream becomes 'Active' in about 1 minute"
        ],
        tip: "On-demand mode auto-scales and is best for learning. Provisioned mode charges per shard ($0.015/hour per shard)."
      },
      {
        title: "Put Test Records",
        summary: "Send data into your stream using AWS CLI or SDK",
        consolePath: "Terminal / AWS CLI",
        detail: "Use the AWS CLI to send test records:",
        substeps: [
          "Open your terminal",
          "Run: aws kinesis put-record --stream-name my-event-stream --data 'hello world' --partition-key 'user-1'",
          "You should get back a ShardId and SequenceNumber",
          "Partition key determines which shard the record goes to"
        ]
      },
      {
        title: "Configure a Consumer",
        summary: "Set up Lambda or application to read from the stream",
        consolePath: "Lambda → your-function → Add trigger → Kinesis",
        detail: "The easiest consumer is a Lambda function with a Kinesis trigger.",
        substeps: [
          "Create a Lambda function (or use existing)",
          "Go to the Lambda function → Add trigger",
          "Select 'Kinesis' → Choose your stream",
          "Batch size: 100, Starting position: LATEST",
          "Click 'Add'",
          "Lambda will automatically be invoked when records arrive"
        ],
        tip: "Lambda processes Kinesis records in batches. Set batch size based on your processing needs (1-10000)."
      }
    ],
    pitfalls: [
      { problem: "High iterator age - consumers falling behind", solution: "Your consumers are slower than producers. Increase parallelism: add more shards (Provisioned) or the stream auto-scales (On-demand)." },
      { problem: "'ProvisionedThroughputExceededException'", solution: "You're exceeding the shard's write limit (1 MB/sec or 1000 records/sec per shard). Add more shards or switch to On-demand mode." },
      { problem: "Lambda not receiving records", solution: "Check: (1) Lambda trigger shows 'Enabled', (2) Lambda execution role has kinesis:GetRecords, kinesis:GetShardIterator permissions, (3) 'Starting position' is set correctly." }
    ],
    verify: [
      "Data stream status shows 'Active' ",
      "put-record command returns ShardId and SequenceNumber",
      "Lambda consumer processes records (check CloudWatch Logs)",
      "Monitoring tab shows incoming records graph",
      "Iterator age stays near zero"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AWS ELASTIC BEANSTALK
  // ═══════════════════════════════════════════════════
  awselasticbeanstalk: {
    prereqs: [
      "AWS Account with Elastic Beanstalk access",
      "Application code (Node.js, Python, Java, .NET, PHP, Ruby, Go, or Docker)"
    ],
    steps: [
      {
        title: "Navigate to Elastic Beanstalk Console",
        summary: "Open Elastic Beanstalk",
        consolePath: "Console Home → Services → Compute → Elastic Beanstalk",
        detail: "Search 'Elastic Beanstalk' in the top search bar.",
      },
      {
        title: "Create Application",
        summary: "Create your first Beanstalk application",
        consolePath: "Elastic Beanstalk → Create application",
        inputs: [
          { field: "Application name", value: "my-web-app", note: "" },
          { field: "Platform", value: "Node.js", note: "Select your runtime (Python, Java, etc.)" },
          { field: "Platform branch", value: "Node.js 20", note: "Latest LTS version" },
          { field: "Application code", value: "Sample application", note: "Start with sample code to verify deployment works, then deploy your own code" }
        ],
        substeps: [
          "Choose 'Single instance (free tier eligible)' for the preset",
          "Click 'Next' through configuration steps",
          "Review and click 'Submit'"
        ],
        tip: "Start with 'Sample application' first to confirm everything works. Then upload your code via 'Upload and deploy'."
      },
      {
        title: "Wait for Environment Creation",
        summary: "Beanstalk provisions EC2, ALB, security groups, etc.",
        consolePath: "Elastic Beanstalk → Environments → your-env",
        detail: "Elastic Beanstalk will create everything for you: EC2 instances, security groups, load balancer, auto-scaling, and more.",
        substeps: [
          "This takes 5-10 minutes",
          "Watch the Events tab for progress",
          "Health should turn 'Green' when the app is running",
          "Click the URL at the top to view your deployed app"
        ]
      },
      {
        title: "Deploy Your Own Code",
        summary: "Upload your app code as a ZIP file",
        consolePath: "Elastic Beanstalk → your-environment → Upload and deploy",
        detail: "Click 'Upload and deploy' button. Upload a ZIP file containing your application code.",
        substeps: [
          "ZIP your project folder (don't include node_modules)",
          "Click 'Choose file' and select your ZIP",
          "Enter a version label (e.g., 'v1.0.0')",
          "Click 'Deploy'",
          "Beanstalk will install dependencies and restart the app"
        ],
        tip: "Your ZIP should have the entry point (package.json, app.py, etc.) at the root level, NOT inside a subfolder."
      }
    ],
    pitfalls: [
      { problem: "Environment health is 'Red' or 'Degraded'", solution: "Click on the health status for details. Common causes: app crashes on startup, wrong port (Beanstalk expects port 8080 by default for Node.js, or use PORT env var), or missing dependencies." },
      { problem: "Application works locally but crashes on Beanstalk", solution: "Check: (1) Your start script in package.json is correct, (2) App listens on process.env.PORT (not hardcoded), (3) All required env vars are set in Configuration → Software." },
      { problem: "'Insufficient permissions' errors", solution: "Beanstalk creates a service role. If it fails, manually create the role: aws-elasticbeanstalk-service-role with AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy." }
    ],
    verify: [
      "Environment health shows 'OK' (green) ",
      "App URL loads your application correctly",
      "Events tab shows 'Environment update completed successfully'",
      "Logs are accessible via Request Logs → Last 100 Lines",
      "EC2 instances are running under the Beanstalk environment"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AWS FARGATE
  // ═══════════════════════════════════════════════════
  awsfargate: {
    prereqs: [
      "AWS Account with ECS access",
      "Docker image in ECR or Docker Hub",
      "VPC with subnets"
    ],
    steps: [
      {
        title: "Navigate to ECS Console",
        summary: "Fargate is accessed through the ECS console",
        consolePath: "Console Home → Services → Containers → ECS",
        detail: "Fargate is not a separate console - it's a launch type within ECS. Search 'ECS' and use Fargate as the compute option.",
        tip: "Fargate = Serverless containers. You don't manage any EC2 instances. AWS handles the infrastructure."
      },
      {
        title: "Create Cluster with Fargate",
        summary: "Set up a Fargate-powered cluster",
        consolePath: "ECS → Clusters → Create cluster",
        inputs: [
          { field: "Cluster name", value: "my-fargate-cluster", note: "" },
          { field: "Infrastructure", value: "AWS Fargate (serverless)", note: "Checked by default" }
        ],
        substeps: [
          "Click 'Create' - instant, no servers to provision"
        ]
      },
      {
        title: "Create Task Definition for Fargate",
        summary: "Define container specs using Fargate compute",
        consolePath: "ECS → Task definitions → Create new task definition",
        inputs: [
          { field: "Family", value: "my-fargate-task", note: "" },
          { field: "Launch type", value: "AWS Fargate", note: "" },
          { field: "CPU", value: ".25 vCPU", note: "0.25, 0.5, 1, 2, or 4 vCPU" },
          { field: "Memory", value: ".5 GB", note: "Options depend on CPU chosen" },
          { field: "Container name", value: "app", note: "" },
          { field: "Image URI", value: "your-account.dkr.ecr.region.amazonaws.com/my-app:latest", note: "Your ECR image" },
          { field: "Container port", value: "3000", note: "Port your app listens on" }
        ],
        substeps: [
          "Click 'Create'"
        ]
      },
      {
        title: "Run a Standalone Task or Create a Service",
        summary: "Launch your container as a task or long-running service",
        consolePath: "ECS → Clusters → your-cluster → Run new task / Create service",
        detail: "Use 'Run task' for one-off jobs, 'Create service' for web servers that need to stay running.",
        substeps: [
          "For a web service: Create service → select your task definition",
          "Set desired tasks: 2 (for high availability)",
          "Select VPC subnets and security group",
          "Optionally attach to an ALB for load balancing"
        ]
      }
    ],
    pitfalls: [
      { problem: "'ResourceNotFoundException' or image pull errors", solution: "Check: (1) ECR image URI is correct, (2) Task execution role has ecr:GetAuthorizationToken and ecr:BatchGetImage permissions, (3) Private subnets need NAT gateway or VPC endpoints for ECR." },
      { problem: "Fargate tasks keep restarting", solution: "Your container is exiting. Check logs in CloudWatch. Common cause: app crashes, wrong CMD, or health check failing." },
      { problem: "High Fargate costs", solution: "Fargate charges per vCPU-hour and GB-hour. Use Fargate Spot for non-critical workloads (up to 70% savings). Also right-size your CPU/memory." }
    ],
    verify: [
      "Tasks show 'RUNNING' status in ECS ",
      "Container logs visible in CloudWatch",
      "If using ALB, endpoint returns your app's response",
      "Task CPU/memory utilization visible in CloudWatch metrics",
      "Service maintains desired task count"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AWS SECRETS MANAGER
  // ═══════════════════════════════════════════════════
  awssecretsmanager: {
    prereqs: [
      "AWS Account with Secrets Manager access",
      "A secret to store (database password, API key, etc.)"
    ],
    steps: [
      {
        title: "Navigate to Secrets Manager Console",
        summary: "Open Secrets Manager",
        consolePath: "Console Home → Services → Security → Secrets Manager",
        detail: "Search 'Secrets Manager' in the top search bar.",
      },
      {
        title: "Store a New Secret",
        summary: "Create your first secret",
        consolePath: "Secrets Manager → Store a new secret",
        inputs: [
          { field: "Secret type", value: "Other type of secret", note: "For custom key-value pairs. Or 'Credentials for RDS database' for auto-rotation" }
        ],
        substeps: [
          "Add key-value pairs (e.g., DB_PASSWORD = mysecurepassword123)",
          "Or paste a JSON blob with all your secrets",
          "Encryption key: use the default AWS managed key",
          "Click 'Next'"
        ],
        tip: "For RDS databases, select 'Credentials for Amazon RDS database' - this enables automatic password rotation."
      },
      {
        title: "Name and Configure the Secret",
        summary: "Set a name and optional rotation",
        consolePath: "Store secret → Secret name and description",
        inputs: [
          { field: "Secret name", value: "prod/my-app/database", note: "Use path-style naming for organization (env/app/type)" },
          { field: "Description", value: "Production database credentials", note: "" }
        ],
        substeps: [
          "Automatic rotation: Enable if using RDS credentials",
          "Click 'Next', review, and 'Store'"
        ]
      },
      {
        title: "Retrieve the Secret in Your Application",
        summary: "Use AWS SDK to fetch secrets at runtime",
        consolePath: "Your application code",
        detail: "Never hardcode secrets. Use the AWS SDK to retrieve them at runtime.",
        substeps: [
          "Python: boto3.client('secretsmanager').get_secret_value(SecretId='prod/my-app/database')",
          "Node.js: SecretsManagerClient.send(new GetSecretValueCommand({ SecretId: '...' }))",
          "The response contains the SecretString - parse it as JSON",
          "Your Lambda/EC2 needs secretsmanager:GetSecretValue permission in its IAM role"
        ]
      }
    ],
    pitfalls: [
      { problem: "'AccessDeniedException' when retrieving secret", solution: "Your Lambda/EC2 role needs secretsmanager:GetSecretValue permission. Also check resource-based policy on the secret itself." },
      { problem: "Secrets Manager costs money for each secret", solution: "Each secret costs $0.40/month + $0.05 per 10,000 API calls. For simple cases, consider SSM Parameter Store (free for standard parameters)." },
      { problem: "Secret rotation failed", solution: "Check the rotation Lambda function's CloudWatch Logs. Common issues: wrong VPC config, Lambda can't reach the database, or new password policy violation." }
    ],
    verify: [
      "Secret appears in Secrets Manager list ",
      "Secret value is retrievable via the console (click 'Retrieve secret value')",
      "Application can fetch the secret via SDK",
      "Secret is encrypted (shows KMS key info)",
      "Rotation schedule is configured (if using RDS)"
    ]
  },

  // ═══════════════════════════════════════════════════
  // AWS WAF
  // ═══════════════════════════════════════════════════
  awswaf: {
    prereqs: [
      "AWS Account with WAF access",
      "A resource to protect (ALB, CloudFront, API Gateway)  - WAF attaches to these"
    ],
    steps: [
      {
        title: "Navigate to WAF Console",
        summary: "Open the WAF & Shield service",
        consolePath: "Console Home → Services → Security → WAF & Shield",
        detail: "Search 'WAF' in the top search bar. Choose your region (or Global for CloudFront).",
      },
      {
        title: "Create a Web ACL",
        summary: "Create the main firewall rule set",
        consolePath: "WAF → Web ACLs → Create web ACL",
        inputs: [
          { field: "Resource type", value: "Regional resources (ALB, API GW)", note: "Or 'CloudFront distributions' for global" },
          { field: "Region", value: "Asia Pacific (Singapore)", note: "Must match your ALB/API GW region" },
          { field: "Name", value: "my-app-waf", note: "" }
        ],
        substeps: [
          "Under 'Associated AWS resources', click 'Add AWS resources'",
          "Select your ALB, API Gateway, or CloudFront distribution",
          "Click 'Next'"
        ]
      },
      {
        title: "Add Managed Rule Groups",
        summary: "Use AWS pre-built security rules",
        consolePath: "Create Web ACL → Add rules → Add managed rule groups",
        detail: "AWS provides free managed rule groups that protect against common attacks.",
        substeps: [
          "Expand 'AWS managed rule groups'",
          "Toggle ON 'Core rule set' (CRS) - blocks common web attacks (XSS, SQLi)",
          "Toggle ON 'Amazon IP reputation list' - blocks known bad IPs",
          "Toggle ON 'Known bad inputs' - blocks malicious request patterns",
          "Click 'Add rules', then 'Next'"
        ],
        tip: "These three managed rule groups cover 90% of common web attacks and are completely FREE."
      },
      {
        title: "Set Default Action and Create",
        summary: "Choose what happens to requests that don't match any rule",
        consolePath: "Create Web ACL → Default action",
        inputs: [
          { field: "Default action", value: "Allow", note: "Allow all traffic that doesn't match a block rule. This is the standard setup." }
        ],
        substeps: [
          "Click through remaining steps (logging optional but recommended)",
          "Review and click 'Create web ACL'",
          "WAF is now protecting your resource"
        ]
      }
    ],
    pitfalls: [
      { problem: "WAF is blocking legitimate requests", solution: "Check WAF → Web ACLs → Sampled requests to see what's being blocked. You can set specific rules to 'Count' mode instead of 'Block' to test without blocking." },
      { problem: "WAF not blocking attacks", solution: "Check: (1) Web ACL is associated with the correct resource, (2) Rules are in 'Block' mode not 'Count', (3) CloudWatch metrics show WAF is receiving requests." },
      { problem: "High WAF costs", solution: "WAF charges $5/month per Web ACL + $1/month per rule + $0.60 per million requests. Use the minimum rules needed. Consolidate into fewer Web ACLs." }
    ],
    verify: [
      "Web ACL status shows active ",
      "Associated resource (ALB/CloudFront) is listed",
      "Managed rules are enabled (Core rule set, IP reputation)",
      "Sampled requests tab shows traffic being inspected",
      "CloudWatch metrics show AllowedRequests and BlockedRequests"
    ]
  }
};

