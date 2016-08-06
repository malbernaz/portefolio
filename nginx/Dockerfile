FROM nginx

RUN useradd --user-group --create-home --shell /bin/false api && \
    echo "America/Sao_Paulo" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata && \
    rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf
