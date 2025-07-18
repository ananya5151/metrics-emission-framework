import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'; // We need this to use S3 features

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 🥉 Define the Bronze Layer S3 Bucket
    const bronzeBucket = new s3.Bucket(this, 'BronzeBucket', {
      // This policy is for development. It deletes the bucket when the stack is destroyed.
      // For production, you would use cdk.RemovalPolicy.RETAIN.
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true, // Also not for production, but useful for our demo.

      // It's good practice to enable versioning on data lake buckets
      // to protect against accidental deletions or overwrites.
      versioned: true,

      // This rule helps save money by moving older data to a cheaper storage class.
      lifecycleRules: [
        {
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