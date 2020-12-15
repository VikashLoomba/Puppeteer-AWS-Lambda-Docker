## AWS Lambda running Puppeteer in Docker

This page will contain some basic information on how to set up Puppeteer in Lambda with its new support for Docker Containers.

### Setup

In order to set up the Lambda, we have to do a couple things:

1. Create a repository in ECR named puppeteer-image.
2. Pull the repository, and in the root directory build the container with `docker build -t puppeteer-image .`.
3. Tag the image as latest `docker tag puppeteer-image:latest XXXXXXXXX.dkr.ecr.us-west-2.amazonaws.com/puppeteer-image:latest`. Replace the ECR Url with your own.
4. Push the image to ECR `docker push XXXXXXXXX.dkr.ecr.us-west-2.amazonaws.com/puppeteer-image`. Replace the ECR Url with your own.
5. In AWS Lambda, create a new function, using the ECR container as the function. Set up an HTTP API Gateway.
6. Wait for deployment, and try out the lambda once you're given the URL!



For more details see the [Github Repository](https://github.com/VikashLoomba/AWS-Lambda-Docker-Puppeteer).

### Support or Contact

Having trouble? Check out our discussions and we'll get back to you [discussions](https://github.com/VikashLoomba/AWS-Lambda-Docker-Puppeteer/discussions).
