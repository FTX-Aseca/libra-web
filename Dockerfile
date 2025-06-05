# Use a lightweight Node.js image as the base
FROM node:20-alpine

# Update OS packages to patch known vulnerabilities
RUN apk update && apk upgrade --no-cache

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's caching mechanism
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application's source code into the container
COPY . .

# Build the application for production
RUN npm run build

# Expose the port that the Vite preview server will run on
EXPOSE 3000

# Command to run the application using Vite's preview server.
# The '--host' flag makes the server accessible from outside the container.
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"] 