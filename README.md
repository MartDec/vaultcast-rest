# Vaultcast REST

Vaultcast is an audio streaming app, where users can upload their own files, to make it listenable by every one.
Users may be able to download any files they want, until they buy it, using Bandcamp or Amazon music.

This repository is the back-end part of the application. It is a REST API that use [Fastify](https://fastify.dev/) as a web server, with a [PostgreSQL](https://www.postgresql.org/) database to store user's data and a [Minio Storage](https://www.min.io/product/aistor) to store every music files. To serve those files, we're using [HLS protocol](https://fr.wikipedia.org/wiki/HTTP_Live_Streaming) with [HLS.js](https://hlsjs.video-dev.org/api-docs/hls.js.hls)

## ⚒️ Required tools to start the project

* [Docker compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/fr)
* [Minio AIStor instance](https://www.min.io/download)

## 🚀 Start the project

First, you need to start the database

```bash
# from the root of the repository
docker compose up -d
```

Then, you can start the server

```bash
# from the root of the repository
npm run dev
```

Go to [http://localhost:3000/health](http://localhost:3000/health) to make sure it works well.

## 📁 Project structure

```
.
└── rest/
    ├── node_modules
    ├── src/
    │   ├── config/
    │   │   └── database.ts
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── schemas/
    │   ├── services/
    │   └── app.ts
    ├── .env
    ├── .gitignore
    ├── docker-compose.yml
    ├── package.json
    ├── README.md
    └── tsconfig.json
```
