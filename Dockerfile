# 1. Base Image: Lightweight Alpine Linux with Node 20
FROM node:20-alpine

# 2. Working Directory: Where the app lives inside the container
WORKDIR /app

# 3. Dependency Caching: Copy only package files first
COPY package*.json ./

# 4. Install only production packages (skips Jest and Supertest)
RUN npm install --omit=dev

# 5. Copy the remaining application code
COPY . .

# 6. Expose the port
EXPOSE 5000

# 7. Start the server
CMD ["node", "server.js"]