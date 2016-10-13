FROM mongo

RUN useradd --user-group --create-home --shell /bin/false api && \
    echo "America/Sao_Paulo" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

VOLUME ["/data/db"]
WORKDIR /data

CMD ["mongod"]
