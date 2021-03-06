#!/usr/bin/env node

import * as cdk from "@aws-cdk/core";
import { RdsStack, AppInfo } from "@rylabs/ry-cdk-tools/lib/rds";
import { InstanceType, InstanceSize, InstanceClass } from "@aws-cdk/aws-ec2";
import { AppStack } from "../lib/app_stack";

const env = {
  account: "ENTER_ACCOUNT_ID",
  region: "us-west-2"
};

const appInfo: AppInfo = {
  name: "starterapp",
  environment: "prod",
  orgName: "rylabs",
  author: "Calvin Yu"
};

const vpc = { vpcId: "ENTER_VPC_ID" };

const app = new cdk.App();

const rds = new RdsStack(app, "rdsProd", {
  env,
  vpc,
  appInfo,
  instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MEDIUM)
});

new AppStack(app, "appProd", {
  env,
  vpc,
  appInfo,
  databaseInstance: rds.dbInstance,
  imageName: "starterapp"
});
