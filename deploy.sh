aws cloudformation deploy \
  --stack-name SageMakerAutoScalingDemo \
  --template-file cloudformation.yaml \
  --s3-bucket werberm-sandbox-us-west-2 \
  --s3-prefix cloudformation

