FROM node:18-alpine
WORKDIR /app

# Install dependencies first before copying other stuffs
COPY package.json package-lock.json ./
RUN npm i

# Copy the rest of the files needed
COPY . .

# Run npm run dev to spin up the development server
CMD ["npm", "run", "dev"]