FROM nginx

RUN rm usr/share/nginx/html/*
COPY ./src/client/dist/ /usr/share/nginx/html/

RUN rm -rf /etc/nginx/conf.d/
COPY ./test.conf /etc/nginx/conf.d/
EXPOSE 80 443
