import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { MyShopStack } from "../lib/myshop-stack";

const app = new cdk.App();
new MyShopStack(app, "MyShopStack", {
  // Если необходимо, можно указать параметры окружения
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stackName: "MyShopStack",
});
