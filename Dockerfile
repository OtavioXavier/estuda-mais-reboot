# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.12.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# Build application
RUN --mount=type=secret,id=NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_SUPABASE_ANON_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_SUPABASE_URL \
    NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY="$(cat /run/secrets/NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY)" \
    NEXT_PUBLIC_SUPABASE_ANON_KEY="$(cat /run/secrets/NEXT_PUBLIC_SUPABASE_ANON_KEY)" \
    NEXT_PUBLIC_SUPABASE_URL="$(cat /run/secrets/NEXT_PUBLIC_SUPABASE_URL)" \
    npx next build --experimental-build-mode compile

# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Adjust entrypoint to be executable on Linux
RUN chmod +x ./docker-entrypoint.js

# Entrypoint sets up the container.
ENTRYPOINT [ "/app/docker-entrypoint.js" ]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
