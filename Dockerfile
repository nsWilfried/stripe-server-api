FROM apline

RUN apk add --save node

COPY . /app/server

CMD [ "node", "/app/server/app.js" ]