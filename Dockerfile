FROM node:21-alpine3.18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 8080

ENV MONGO_URI=""
ENV MONGODB_NAME="GeniusGrid-Users?retryWrites=true&w=majority"
ENV USER_GRPC_PORT=8080
ENV JWT_SECRET='>sShIOu-q9£Ntq199N8)HX3ge52wa"P[gEi&/$Cd,B:BJkn+B'
ENV ACCESS_TOKEN='D[jHTur9],/;C£JPI?[1pf70oUdlUv:?touogbjT+\SFoOs;'
ENV REFRESH_TOKEN="pI|T>We<1Gvc]d3rp|u=5[Tk@84\grWZ)na3aW<pZ]!,Qb_K+Z"
ENV ACCESS_TOKEN_EXPIRE=5
ENV REFRESH_TOKEN_EXPIRE=59
ENV RabbitMQ_Link=

CMD ["npm", "start"]
