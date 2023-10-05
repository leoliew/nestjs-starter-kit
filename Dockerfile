FROM node:18.17.1-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .
RUN npm run build \
    && npm prune --production

# ---

FROM node:18.17.1-alpine

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
COPY --from=builder --chown=node:node /home/node/config/ ./config/

ENV TZ=Australia/Perth

EXPOSE 3000

CMD ["node", "dist/main.js"]
