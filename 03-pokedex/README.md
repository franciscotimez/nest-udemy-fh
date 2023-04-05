<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo

1. Clonar el repositorio
2. Ejecutar

```sh
yarn install
```

3. Instalar Nest CLI

```sh
npm i -g @nestjs/cli
```

4. Levantar la base de datos local

```sh
docker-compose up -d
```

5. Clonar el archivo **.env.template** y renombrarlo a **.env**
6. Completar las variables de entorno que falten
7. Ejecutar la aplicacion en desarrollo

```sh
yarn start:dev
```

8. Reconstruir Base de datos

```
http://localhost:3000/api/v2/seed
```

# Stack Tecnologico

- MongoDB
- Nest

## Build

docker-compose -f docker-compose.prod.yaml --env-file .env.dev up --build

## Run

docker-compose -f docker-compose.prod.yaml --env-file .env.dev up

## Nota

Por defecto, **docker-compose** usa el archivo `.env`, por lo que si tienen el archivo .env y lo configuran con sus variables de entorno de producción, bastaría con

```
docker-compose -f docker-compose.prod.yaml up --build
```
