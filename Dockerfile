# Base Environment
FROM node:16.0.0-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code files
COPY . .

# ENV variables
ENV NODE_ENV production
ENV DB_NAME gamescore_prod
ENV DB_HOST gamescore-prod-do-user-15499390-0.c.db.ondigitalocean.com
ENV DB_PORT 25060
ENV DB_USER doadmin
ENV DB_PASSWORD AVNS_5lfbI8eAeQJPGqzTI4a
ENV PORT 8080
ENV SECRET_KEY 74944dca-1521-4229-8b83-3d4c5283df19

# Expose port
EXPOSE 8080

CMD ["npm", "run", "start"]