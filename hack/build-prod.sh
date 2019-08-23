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

echo Building react-social static files production */build* folder

docker container run -it -v $(pwd):/react-social qolzam/react-social-build:$TAG build