FROM nginx:stable
COPY default.conf /etc/nginx/conf.d/defult.conf
COPY build /usr/share/nginx/html/