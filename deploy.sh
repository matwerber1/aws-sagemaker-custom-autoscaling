#!/bin/bash

SAGEMAKER_ENDPOINT_NAME=object-detection-2020-07-13-19-26-21-768
SAGEMAKER_VARIANT_NAME=AllTraffic

aws cloudformation deploy \
  --stack-name SageMakerAutoScalingDemo \
  --template-file cloudformation.yaml \
  --s3-bucket werberm-sandbox-us-west-2 \
  --s3-prefix cloudformation \
  --parameter-overrides \
    MySageMakerEndpointName=$SAGEMAKER_ENDPOINT_NAME  \
    MySageMakerVariantName=$SAGEMAKER_VARIANT_NAME