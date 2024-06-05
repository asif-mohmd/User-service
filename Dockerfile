FROM node:22.1.0-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .


EXPOSE 8084

ENV MONGO_URI="mongodb+srv://asifasifpsps:y2Z6wxE2JRuPLymk@cluster0.h8joegs.mongodb.net/UserService?retryWrites=true&w=majority&appName=Cluster0"
ENV USER_GRPC_PORT=8084
ENV JWT_SECRET=GeniusGrid123


CMD ["npm", "start"]
