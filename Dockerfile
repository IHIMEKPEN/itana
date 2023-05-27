FROM node:16-alpine as build
WORKDIR /server
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Production Image
FROM node:lts-alpine as production
ENV NODE_ENV=production
WORKDIR /server
COPY package.json .
COPY .env .
RUN npm install --production --silent && mv node_modules ../
COPY --from=build /server/prisma ./dist
COPY --from=build /server/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main.js"]