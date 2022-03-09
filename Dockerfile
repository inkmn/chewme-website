FROM node:12-alpine as build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install

COPY . .
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_PREFIX=/pub
ENV NEXT_PUBLIC_ENV_API_HOST=http://dev-dc-app.goodtech.mn

RUN npm run build

FROM node:12-alpine
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_PREFIX=/pub
ENV NEXT_PUBLIC_ENV_API_HOST=http://dev-dc-app.goodtech.mn

COPY --from=build /usr/src/app/package.json ./

RUN npm install --production

COPY --from=build /usr/src/app/.next /usr/src/app/.next

CMD npm start