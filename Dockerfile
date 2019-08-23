FROM tarampampam/node:11-alpine

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
ENV SOCIAL_ENV=docker
RUN yarn install --registry https://registry.npmjs.org

WORKDIR /react-social
ADD . /react-social

EXPOSE 3000
EXPOSE 35729

ENTRYPOINT ["/bin/bash", "/react-social/hack/run.sh"]

