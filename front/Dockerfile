FROM node:16-alpine

WORKDIR /app
# RUN chown -R node:node /app

# USER node
# COPY --chown=node:node . .

COPY package*.json ./
RUN npm install

WORKDIR /app/client
ONBUILD COPY . .


# RUN mkdir node_modules
# RUN chown -R node:node /app/node_modules
# RUN chmod 755 /app

# COPY package*.json ./
# RUN npm install
# RUN npm ci --only=production

# RUN node_modules/.bin/ng build --prod
# RUN npm run build --prod

# CMD ["npm","install","&&","npm","run","build"]
CMD sh -l -c "npm run build --prod"