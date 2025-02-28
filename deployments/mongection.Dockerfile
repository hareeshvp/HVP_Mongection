FROM node
WORKDIR /usr/share/mongection
ADD ./ /usr/share/mongection

RUN apt-get update && \
    npm install && \
    npm install dd-trace

CMD node src/app.js
