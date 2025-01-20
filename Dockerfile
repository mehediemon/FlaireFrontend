# Stage 1: Build React app
FROM node:16 as build

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the built app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
