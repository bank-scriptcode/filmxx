# FROM node:18.18.2
# WORKDIR /

# COPY . .


# COPY package.json  package.json
# COPY yarn.lock yarn.lock

# RUN yarn

# # COPY . .

# RUN yarn build

# CMD ["npm", "run", "start"]

FROM node:18.18.2 AS build
WORKDIR /base

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:18.18.2 AS app
WORKDIR /base
COPY --from=build /base/package.json .
COPY --from=build /base/yarn.lock .
COPY --from=build /base/next.config.js ./
COPY --from=build /base/public ./public
COPY --from=build /base/node_modules ./node_modules
COPY --from=build /base/.next ./.next

EXPOSE 3002
CMD ["yarn", "start"]