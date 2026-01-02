# 🏗️ Project Architecture
## Overview

This project implements a secure healthcare infrastructure on AWS using Infrastructure as Code (IaC) with AWS CDK (TypeScript). The architecture enforces strong network segmentation, least-privilege access, and full traceability, ensuring sensitive patient data is protected at all times.

## Architecture Components

## VPC Network Layer

* Multi-AZ Virtual Private Cloud

* Public subnets for application access

* Private isolated subnets for sensitive data

* No direct internet access to database resources

* Controlled routing and traffic flow

## EC2 Application Layer

* Hosts the patient portal application

* Deployed in public subnets

* Receives HTTPS traffic from users

* Communicates securely with the database

* Uses IAM roles instead of static credentials

## RDS Database Layer

* MySQL database deployed in private isolated subnets

* Not publicly accessible

* Accepts connections only from EC2 security group

* Credentials managed via AWS Secrets Manager

* Ensures data durability and consistency

## Security Groups

** EC2 Security Group:

* Allows HTTPS (443) from the internet

* Allows administrative access via SSH or SSM

**  RDS Security Group:

* Allows MySQL (3306) only from EC2

* Blocks all public access

## IAM Authorization

* Role-based access control

* Least privilege permissions

* Secure service-to-service communication

* Infrastructure permissions managed via code

## Data Flow

1. Patient accesses the portal via HTTPS.

1. Request reaches EC2 instance in the public subnet.

1. Security groups validate and allow traffic.

1. Application processes the request.

1. EC2 connects to RDS through private networking.

1. RDS returns authorized patient data.

1. Response is securely returned to the patient.

## Infrastructure Management

* Infrastructure defined using AWS CDK

* Version-controlled via Git

* Changes reviewed through pull requests

* CDK synthesizes CloudFormation templates

* Deployments are repeatable and auditable

## Key Benefits

* Strong network segmentation

* Secure handling of patient data

* Reduced attack surface

* High maintainability and traceability

* Consistent environments across deployments