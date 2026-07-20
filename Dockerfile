FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy the static files from the builder stage
# For Next.js with output: 'export', static files are generated in 'out' folder
COPY --from=builder /app/out /usr/share/nginx/html/user_pathways

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# Expose the port that Nginx will listen on
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
