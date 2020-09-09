#############################################################
# Dockerfile para configurar aplicación factuweb
############################################################

FROM node:10-alpine

RUN mkdir -p /app/factuweb-frontend
USER root

RUN npm install sails -g

WORKDIR /app/factuweb-frontend
# COPY . .

# RUN npm install nodemon -g --quiet
# CMD nodemon -w api -w config

CMD npm run dev
