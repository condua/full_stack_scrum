FROM node:18-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "run", "serve"]
