import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as iam from 'aws-cdk-lib/aws-iam';

export class TechhealthMigrationStack extends cdk.Stack {
  constructor(scope: cdk.App,id:string,props?: StackProps) {
    super(scope, id, props);

    // Create a VPC with 2 AZs, 1 public and 1 private subnet per AZ
    const vpc = new ec2.Vpc(this, 'MigratedVPC',{
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask:24,
          name: 'PublicSubnet',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask:24,
          name: 'PrivateSubnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // Security Group for EC2(Allows SSH & App Traffic)
    const ec2SecurityGroup = new ec2.SecurityGroup(this,'EC2SecurityGroup',{
      vpc,
      allowAllOutbound: true,
      description: 'Security group for EC2 instance'
    });
    ec2SecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH');
    ec2SecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP');

    // Security Group for RDS (Allows traffic from EC2)
    const rdsSecurityGroup = new ec2.SecurityGroup(this,'RDSSecurityGroup',{
      vpc,
      allowAllOutbound: true,
      description: 'Security group for RDS instance'
    })
    rdsSecurityGroup.addIngressRule(ec2SecurityGroup,ec2.Port.tcp(3306),'Allow MySQL from EC2')

    
  }
}
