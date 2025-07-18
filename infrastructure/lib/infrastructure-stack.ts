import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

     // 🥉 Define the Bronze Layer S3 Bucket
    const bronzeBucket = new s3.Bucket(this, 'BronzeBucket', {
      // This policy is for development. It deletes the bucket when the stack is destroyed.
      // For production, you would use RETAIN.
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true, // NOT recommended for production
      versioned: true, // Good practice for data lakes to prevent accidental overwrites
      lifecycleRules: [
        {
          // Transition older data to cheaper storage after 90 days
          transitions: [
            {
              storageClass: s3.StorageClass.INFREQUENT_ACCESS,
              transitionAfter: cdk.Duration.days(90),
            },
          ],
        },
      ],
    });
  }
}