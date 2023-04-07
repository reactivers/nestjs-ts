# Installation

```
npx @reactivers/nestjs-ts your-app-name
```

# Getting Started

## Run Development

- Before running the dev server:
  - Make sure the port "3000" is available on your end!
  - Edit `.env.` files before you start
  - Edit `container_name` fields in `docker-compose.yml` file

`yarn start:dev`

# Running Tests

```
yarn test
yarn test:e2e
```

# Running Dev

```
yarn start:dev
```

# Docker

## BUILD

```
docker-compose up -d --build
```

## Address

The app will be running at

```
http://localhost:4012
```

# Clean

```
docker-compose down --remove-orphans --rmi "local" --volumes
```
