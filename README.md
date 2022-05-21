## SoccesStats

A site for soccer stats.

Frontend created in React, backend created in Laravel.

Live Demo: https://soccerstats.kaiospitz.com.br/


## Build Setup

```bash
# install backend dependencies
composer install

# create .env file
cp .env.example .env

# generate secret key
php artisan key:generate

# install frontend dependencies
npm install

# build react frontend
npm run watch

# run the server
php artisan serve

# the project can be accessed via: http://localhost:8000/
```
