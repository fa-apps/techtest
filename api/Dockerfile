FROM php:8.0.2-apache

RUN apt-get update && apt-get upgrade -y

RUN docker-php-ext-install mysqli pdo pdo_mysql && a2enmod rewrite 

EXPOSE 80
