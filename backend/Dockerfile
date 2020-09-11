# use latest node image
FROM node:latest

# make /app directory and set that as the work directory
WORKDIR /app

# copy entire /backend directory into docker /app directory
COPY . .

# install all relevant node dependacies specified in package-lock.json if they were not present in /backend dir
RUN npm install

CMD [ "node", "server.js" ]