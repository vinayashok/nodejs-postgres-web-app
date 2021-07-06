# Step 1: choose a smaller base image
FROM node:15 as build

# Step 2: only copy in what you need
ENV APP_HOME /app/
RUN mkdir -pv $APP_HOME
WORKDIR $APP_HOME

# Step 3: Copy npm dependencies & install
ENV NODE_ENV staging
COPY package.json yarn.lock $APP_HOME
RUN yarn install

# Bundle app source
COPY . .

# start
EXPOSE 8080
CMD [ "yarn", "run", "server" ]
