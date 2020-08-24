aws application-autoscaling describe-scalable-targets --service-namespace sagemaker

aws application-autoscaling describe-scaling-policies --service-namespace sagemaker

aws application-autoscaling delete-scaling-policy \
   --service-namespace sagemaker \
   --resource-id endpoint/object-detection-2020-07-13-19-26-21-768/variant/AllTraffic \
   --scalable-dimension sagemaker:variant:DesiredInstanceCount \
   --policy-name SageMakerDemoScalingPolicy

aws sagemaker describe-endpoint --endpoint-name object-detection-2020-07-13-19-26-21-768
aws sagemaker describe-endpoint-config --endpoint-config-name object-detection-2020-07-13-19-26-21-768

aws application-autoscaling deregister-scalable-target \
  --service-namespace sagemaker \
  --resource-id endpoint/object-detection-2020-07-13-19-26-21-768/variant/AllTraffic \
  --scalable-dimension sagemaker:variant:DesiredInstanceCount