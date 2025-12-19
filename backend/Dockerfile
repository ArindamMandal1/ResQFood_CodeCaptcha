# Use Node LTS
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the code
COPY . .

# Expose port (Fly injects PORT env)
EXPOSE 5000

# Start server
CMD ["npm", "start"]