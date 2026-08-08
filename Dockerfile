FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Set environment variables
ENV PORT=25125
ENV BASE_PATH=/

# Build the project
RUN pnpm run build

# The built files will be in artifacts/yolo-menu/dist/public/