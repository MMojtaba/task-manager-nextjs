### Disable javascript server side execution

When creating docker image, use the —noscripting:

- docker run -d --name test-noscript -p 27017:27017 mongo:latest --noscripting

To access volumes of a broken docker container using a fresh one (to modify its files)

- docker run --rm --volumes-from mongodb7 mongo:latest

Link mongodb volume host to guest

- docker run --name newContainer -v /hostDir:/data/db -d mongo:7.0.9

- docker run -d —name newName -v /hostDir/db:/data/db -v /hostDir/tmp:/tmp mongo:7.0.9
