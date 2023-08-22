.PHONY: build
.PHONY: buildBranch

LOCATION=asia-southeast1
PROJECT-ID=demo
REPOSITORY=demo
IMAGE=demo

BRANCH_NAME=$(shell git rev-parse --abbrev-ref HEAD)
TAG=$(shell git rev-parse --short HEAD)

build:
	echo building ${NAME}:${TAG}
	docker build -t ${LOCATION}-docker.pkg.dev/${PROJECT-ID}/${REPOSITORY}/${IMAGE}:${TAG} .
#	according to your docker registry , modify the command below
#	docker push "${LOCATION}-docker.pkg.dev/${PROJECT-ID}/${REPOSITORY}/${IMAGE}:${TAG}"