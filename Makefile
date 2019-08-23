# Build image and run hot reload
run-live: build live

# Build image for build production static files and then push
.PHONY: build-push
build-push: build-image push

# Build image localy for build production static files and then create static file
.PHONY: build-local
build-local: build-image build-prod

# Build docker file
.PHONY: build
build:
	./hack/build.sh

# Start project with hot reloading
.PHONY: live
live:
	./hack/live.sh

# Push image to docker hub
.PHONY: push
push:
	./hack/push.sh

# Build docker image for production static file
.PHONY: build-image
build-image:
	./hack/build-image.sh

# Build production static file
.PHONY: build-prod
build-prod:
	./hack/build-prod.sh
