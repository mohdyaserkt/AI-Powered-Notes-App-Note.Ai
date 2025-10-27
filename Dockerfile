# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies Stage ----
FROM base AS deps
RUN npm install --legacy-peer-deps

# ---- Build Stage ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .




RUN npm install typescript --save-dev

# Explicitly set ENV vars for build-time
ARG MONGODB_URI
ARG GEMINI_API_KEY
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ENV MONGODB_URI=${MONGODB_URI}
ENV GEMINI_API_KEY=${GEMINI_API_KEY}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}

RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production
COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "start"]
