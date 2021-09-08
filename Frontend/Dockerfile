FROM node:slim as build
RUN mkdir /home/app && chown node:node /home/app
WORKDIR /home/app
RUN npm install -g @angular/cli
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /home/app/node_modules/.bin:$PATH
COPY --chown=node:node . .
USER node
CMD ng serve --host 0.0.0.0