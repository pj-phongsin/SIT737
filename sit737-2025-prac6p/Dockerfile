# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3040

# Define environment variable
ENV NODE_ENV production

# Run the app when the container starts
CMD ["npm", "start"]