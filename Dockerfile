# Use the official MongoDB base image
FROM mongo:latest

# Create a directory for MongoDB data
RUN mkdir -p /data/db

# Expose the MongoDB port
EXPOSE 27017

# Command to run MongoDB
CMD ["mongod"]
