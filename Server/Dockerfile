# Install node image in container
   
FROM node:14


# Install nodemon for hot reloading
RUN npm install -g nodemon
RUN apt-get update && apt-get install -y openjdk-8-jdk


# Create and set the working directory
RUN mkdir -p /app/server
WORKDIR /app/server

# Copy the dependency files over
COPY package*.json /app/server/
COPY --from=library/docker:latest /usr/local/bin/docker /usr/bin/docker
COPY --from=docker/compose:1.23.2 /usr/local/bin/docker-compose /usr/bin/docker-compose
# Install dependencies
RUN npm install
# Copy the server files over
COPY . .

# Command to run them
CMD ["nodemon", "app.js"]