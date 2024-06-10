import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as iam from "@aws-cdk/aws-iam";

export class MyShopStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    console.log(scope, id, props);

    const bucket = new s3.Bucket(this, "MyShopBucket", {
      bucketName: "myshope-rs-app",
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [`${bucket.bucketArn}/*`],
        principals: [new iam.AnyPrincipal()],
      })
    );

    const distribution = new cloudfront.Distribution(
      this,
      "MyShopDistribution",
      {
        defaultBehavior: { origin: new origins.S3Origin(bucket) },
      }
    );

    new s3deploy.BucketDeployment(this, "DeployMyShop", {
      sources: [s3deploy.Source.asset("../dist")],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
