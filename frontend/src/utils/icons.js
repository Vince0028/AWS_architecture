import ALL_TOOLS from '../data/tools.json';
import ICON_MAP from '../data/icons.json';

export const getIcon = (name) => {
    if (!name) return "";
    let n = name.toLowerCase().trim();
    if (ICON_MAP[n]) return ICON_MAP[n];
    if (n.includes("/")) { 
        const p = n.split("/")[0].trim(); 
        if (ICON_MAP[p]) return ICON_MAP[p]; 
    }
    const aliases = {
        "rds proxy":"rds","internet gateway":"vpc","igw":"vpc","nat gw":"vpc","nat gateway":"vpc","subnets":"vpc",
        "subnet":"vpc","routes":"vpc","route tables":"vpc","route table":"vpc","security groups":"vpc","nacl":"vpc",
        "alb":"ec2","nlb":"ec2","ebs":"ec2","auto scaling":"ec2","target group":"ec2","elastic ip":"ec2",
        "launch template":"ec2","user data":"ec2","role":"iam","policy":"iam","create role":"iam","attach role":"iam",
        "iam role":"iam","bucket":"s3","bucket policy":"s3","object":"s3","attach policy":"iam","function":"lambda",
        "trigger":"lambda","layer":"lambda","table":"dynamodb","create table":"dynamodb","database":"rds",
        "create database":"rds","instance":"ec2","cluster":"ecs","task def":"ecs","task definition":"ecs",
        "distribution":"cloudfront","origin":"cloudfront","hosted zone":"route 53","record":"route 53",
        "queue":"sqs","topic":"sns","alarm":"cloudwatch","log group":"cloudwatch","logs":"cloudwatch",
        "metrics":"cloudwatch","stack":"cloudformation","template":"cloudformation","pipeline":"glue",
        "crawler":"glue","stream":"kinesis","firehose stream":"firehose","notebook":"sagemaker",
        "endpoint":"sagemaker","user pool":"cognito","identity pool":"cognito","state machine":"step functions",
        "rule":"eventbridge","event bus":"eventbridge","secret":"secrets manager","certificate":"acm",
        "web acl":"waf","trail":"cloudtrail","query":"athena","workgroup":"redshift","app":"amplify",
        "service":"fargate","repository":"ecr","lambda/ec2":"lambda","creds":"secrets manager","store creds":"secrets manager"
    };
    if (aliases[n] && ICON_MAP[aliases[n]]) return ICON_MAP[aliases[n]];
    for (const [key, val] of Object.entries(aliases)) { 
        if (n.includes(key)) { 
            if (ICON_MAP[val]) return ICON_MAP[val]; 
        } 
    }
    for (let i = 0; i < ALL_TOOLS.length; i++) {
        const tid = ALL_TOOLS[i].id;
        const tname = ALL_TOOLS[i].name.toLowerCase();
        if (tname.includes(n) || n.includes(tname) || tid.includes(n.replace(/\s+/g, ""))) return ALL_TOOLS[i].icon;
    }
    return "";
};

export const PILL_COLORS = {
    yellow: { bg: "#fef9e7", border: "#f5d56b", text: "#8a6d3b" },
    purple: { bg: "#f3eef8", border: "#c5afe0", text: "#6b3fa0" },
    green:  { bg: "#e9f7ef", border: "#82ccab", text: "#1e7e34" },
    red:    { bg: "#fde9e9", border: "#e8a0a0", text: "#a71d2a" },
    blue:   { bg: "#e7f3fe", border: "#8ec4e8", text: "#0073bb" },
    violet: { bg: "#f0e7fe", border: "#b89ce8", text: "#6b3fa0" },
    teal:   { bg: "#e6f7f5", border: "#7ecdc4", text: "#117a65" },
    pink:   { bg: "#fde7f0", border: "#e8a0be", text: "#a71d5d" },
    lime:   { bg: "#f0f7e6", border: "#b2d88a", text: "#3d6b1e" },
    amber:  { bg: "#fef3e2", border: "#e8c77a", text: "#8a6d1e" },
    cyan:   { bg: "#e6f7fa", border: "#7ecdd8", text: "#117a8a" },
    orange: { bg: "#fef0e6", border: "#e8b07a", text: "#8a4b1e" },
};
