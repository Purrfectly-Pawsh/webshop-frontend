# Perrfectly Pawsh Frontend
This repository contains our frontend code for pet product web shop.

## Stack
* React (+ ReactRouter, tailwindcss and DaisyUI)
* Vite
* Typescript

## Installation and Running
1. Clone the repository as usal.
2. `cd` into the project directory and execute `npm install`.
3. Use `npm run dev` to start the app.
4. Open `http://localhost:5173` in your browser. You should see the app now :)

*Optionally, you can also run `npm run dev -- --open` to start the dev server. This will automatically open the url in a new browser tab.*

### Connect to Product Service
The frontend for itself isn't that thrilling, so let's connect it to the [product-microservice](https://github.com/Purrfectly-Pawsh/product-service).

#### Requirements
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

#### Setup
1. Clone the product microservice repository
2. Run `docker compose up -d` to start the service with docker
3. Go into the directory of the webshop-frontend repository. You'll see that there is a .example.env file in the root directory. Clone the file and name it `.env` for example with this command:
```sh
cp .example.env .env
```
4. Reload your browser tab and you should see the products page with all our current products.

*You can stop the service with `docker compose down`*

