FROM mysql:5.7.42

ENV MYSQL_DATABASE=nodedb

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306