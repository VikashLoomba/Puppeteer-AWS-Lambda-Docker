This repo contains the code needed to run Puppeteer on Lambda with a Docker Container. Just build and tag the image, upload to ECR, create a new lambda function with the image with an API Gateway (HTTP), and in the lambda console choose the latest image for deployment.

For more setup instructions, please see [Setup Instructions](https://vikashloomba.github.io/AWS-Lambda-Docker-Puppeteer/)

Example: https://0o78rqqd27.execute-api.us-west-2.amazonaws.com/default/get-image?url=https://example.com (You can change the URL query param)
(Please use the discussions page for questions/comments/etc.)
