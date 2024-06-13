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

### Config
1. Clone the `.example.env` file and name the new file `.env`.
```sh
cp .example.env .env
```
2. Adapt the constants to fit your setup.

### Connect with other services
#### Requirements
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

#### Start other services
1. Clone the [product-microservice](https://github.com/Purrfectly-Pawsh/product-service), [api-gateway](https://github.com/Purrfectly-Pawsh/api-gateway) and [basket-microservice](https://github.com/Purrfectly-Pawsh/basket-service).
2. Set them up as described in their documentation.
3. Run the services. Make sure to start the product service first.
4. Lastly, visit the webshop again and start shopping :)

