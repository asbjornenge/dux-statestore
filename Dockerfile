FROM node:0.11-slim
RUN npm install -g firebase
ENV NODE_PATH /usr/local/lib/node_modules
ADD index.js /usr/local/bin/statestore
ENTRYPOINT ["statestore"]
