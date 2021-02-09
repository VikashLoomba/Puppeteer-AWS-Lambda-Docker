This repo contains the code needed to run Puppeteer on Lambda with a Docker Container. Just build and tag the image, upload to ECR, create a new lambda function with the image with an API Gateway (HTTP), and in the lambda console choose the latest image for deployment.

For more setup instructions, please see [Setup Instructions](https://vikashloomba.github.io/AWS-Lambda-Docker/) and [here](https://link.medium.com/1iB5MeXJfcb)

The /app directory contains the puppeteer code, which you can edit as needed. The Dockerfile installs and updates dependencies for the node lambda runtime, npm dependencies, as well as chromium.
