#!/bin/sh

# Check if docker is running
docker_state=$(docker info >/dev/null 2>&1)
if [[ $? -ne 0 ]]; then
    echo "Docker does not seem to be running, run it first and retry"
    exit 1
fi

# Set tag for docker image
export TAG="latest"
echo $1
if [ $1 ] ; then
  TAG=$1
fi

echo Building qolzam/react-social-build:$TAG

docker build -t qolzam/react-social-build:$TAG . && \
 docker create --name react-social-build qolzam/react-social-build:$TAG && \
 docker cp react-social-build:/react-social . && \
 docker rm -f react-social-build