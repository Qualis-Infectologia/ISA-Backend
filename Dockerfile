FROM mongo:4.2.7 AS mongodb
ENV SCHEDULE_PASS="qualis"
ENV SCHEDULE_USER="qualis"
ENV MONGO_INIT_ROOT_USERNAME="admin"
ENV MONGO_INIT_ROOT_PASS="admin"
COPY infra/mongodb/initdb /initdb
COPY infra/mongodb/initdb.sh /docker-entrypoint-initdb.d/
COPY infra/mongodb/custom-mongo.conf /etc/custom-mongo.conf
EXPOSE 27017
CMD ["mongod","--auth", "-f", "/etc/custom-mongo.conf"]

FROM postgres:13-alpine AS postgres
ENV DB_DATABASE="vigilancia"
ENV DB_USERNAME="qualis"
ENV DB_PASS="postgres"
ENV POSTGRES_PASSWORD="postgres"
ENV POSTGRES_USER="postgres"
COPY infra/postgresql/initdb /docker-entrypoint-initdb.d

FROM node:12.18 AS api
COPY build/. src/
WORKDIR /src
ENV MEMORY 1024
ENV API_PORT 8080
CMD node --max-old-space-size=$MEMORY --optimize-for-size --inspect shared/infra/http/server.js

FROM jboss/keycloak:10.0.2 AS keycloak
ENV DB_VENDOR="postgres"
ENV DB_ADDR="postgres"
ENV DB_PORT="5432"
ENV DB_USER="keycloak"
ENV DB_PASSWORD="keycloak"
ENV KEYCLOAK_USER="admin"
ENV KEYCLOAK_PASSWORD="admin"