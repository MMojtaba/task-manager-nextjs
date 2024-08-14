## About

This guide outlines how to setup HTTPS with a self-signed certificate using NGINX. The paths assume you have install NGINX using brew install nginx.

## 0. Useful commands

- Check config file syntax
  - sudo nginx -t
- Start
  - sudo nginx
- Restart
  - sudo nginx -s reload
- Stop
  - sudo nginx -s stop (or quit)

## 1. Setup Certificates

- 1.1 Create the keys - sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
  sudo openssl dhparam -out /etc/nginx/dhparam.pem 4096
- 1.2 Add the keys and certificate to nginx

  - Create the following file:
    - /opt/homebrew/etc/nginx/snippets/self-signed.conf
  - Add the following content to it:
    - ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    - ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;

- 1.3 Add encryption settings
  - Create the following file:
    - /opt/homebrew/etc/nginx/snippets/ssl-params.conf
  - Add the following content to it:
    - ssl_protocols TLSv1.3;
      ssl_prefer_server_ciphers on;
      ssl_dhparam /etc/nginx/dhparam.pem;
      ssl_ciphers EECDH+AESGCM:EDH+AESGCM;
      ssl_ecdh_curve secp384r1;
      ssl_session_timeout 10m;
      ssl_session_cache shared:SSL:10m;
      ssl_session_tickets off;
      ssl_stapling on;
      ssl_stapling_verify on;
      resolver 8.8.8.8 8.8.4.4 valid=300s;
      resolver_timeout 5s;
      add_header X-Frame-Options DENY;
      add_header X-Content-Type-Options nosniff;
      add_header X-XSS-Protection "1; mode=block";
- 1.4 NGINX config settings
  - Create the following file:
    - /opt/homebrew/etc/nginx/servers/mySite.conf
  - Add the following content to it:
    - [./nginxConfExample.conf]

### NGINX useful install output

- To start nginx now and restart at login:
  brew services start nginx
  Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/nginx/bin/nginx -g daemon\ off\;
