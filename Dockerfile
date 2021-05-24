# Define function directory
ARG FUNCTION_DIR="/function"

# Build Stage 1: Install aws-lambda-ric dependencies, npm install package.json dependencies
FROM node:12-buster as build-image
# Include global arg in this stage of the build
ARG FUNCTION_DIR
# AWS Lambda runtime dependencies
RUN apt-get update && \
    apt-get install -y \
        g++ \
        make \
        unzip \
        libcurl4-openssl-dev \
        autoconf \
        libtool \
        cmake
# Copy function code
RUN mkdir -p ${FUNCTION_DIR}/
COPY app/ ${FUNCTION_DIR}
RUN ls ${FUNCTION_DIR}
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
WORKDIR ${FUNCTION_DIR}
RUN npm install

# Build Stage 2: Copy Build Stage 1 files in to Stage 2. Install chromium dependencies and chromium.
FROM node:12-buster-slim
# Include global arg in this stage of the build
ARG FUNCTION_DIR
# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}
# Copy in the build image dependencies
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}
RUN ls ${FUNCTION_DIR}
# Install chromium and dependencies
RUN apt-get update \
    && apt-get install -y wget gnupg chromium \
    && apt-get update \
    && apt-get install -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 mesa-utils mesa-utils-extra \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
ADD aws-lambda-rie /usr/local/bin/aws-lambda-rie
ADD entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod u+x /usr/local/bin/entrypoint.sh
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
ENV HOME="/tmp"
CMD [ "/function/app.lambdaHandler" ]
