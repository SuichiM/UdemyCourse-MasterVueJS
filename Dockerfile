FROM nginx
# VOLUME /usr/share/nginx/html
COPY container-resources/nginx.conf               /etc/nginx/nginx.conf
COPY container-resources/esteban-martini.com.conf /etc/nginx/sites-available/esteban-martini.com.conf
COPY container-resources/security.conf           /etc/nginx/nginxconfig.io/security.conf

RUN service nginx restart
EXPOSE 80
