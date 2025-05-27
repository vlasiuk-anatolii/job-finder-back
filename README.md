# 🧠 Job Finder Backend

This is the backend part of a full-stack Job Finder application built using **NestJS**, **MongoDB**, **Mongoose**, and **TypeScript**. It provides a REST API for user authentication using JWT.

## 📽️ Demo

[Watch demo video]()

## 🚀 Features

* 🔐 JWT-based authentication
* 📁 MongoDB integration via Mongoose
* 🛡️ Input validation with class-validator
* 🧩 Modular structure

## 🧰 Tech Stack

* **NestJS**
* **TypeScript**
* **MongoDB**
* **Mongoose**
* **Passport (Local & JWT)**
* **bcrypt**
* **Joi** for schema validation

## 📦 Installation

```bash
git clone https://github.com/vlasiuk-anatolii/job-finder-back
cd job-finder-back
npm install
npm run start:dev
```

The server will run at [http://localhost:3001](http://localhost:3001)

## ⚙️ Configuration

Create a `.env` file in the current directory with the following content:

```env
PORT=3001

MONGODB_URI=mongodb://localhost:27017
MONGODB_NAME=job

JWT_SECRET=uWoYsHgYqqsCH4O11PgpuMQAWSRObk5T
JWT_EXPIRATION=10h
```

## 📁 Project Structure

```
back/
├── src/
│   ├── auth/            // Authentication module (JWT, local)
│   ├── interfaces/ 
│   ├── repositories/      
│   ├── users/           // Users module
│   ├── app.module.ts    // Main module
│   ├── health.controller    
│   └── main.ts          // App entry point
├── .env                 // Environment variables
└── package.json         // Project metadata and scripts
```

## ✅ Implemented

* [x] Authentication (login, singup)
* [x] Input validation
* [x] MongoSQL DB setup

## 📝 Notes

* The frontend should be configured to send requests to `http://localhost:3001`

## 📄 License

MIT © 2025 [Anatolii Vlasiuk](https://github.com/vlasiuk-anatolii)
