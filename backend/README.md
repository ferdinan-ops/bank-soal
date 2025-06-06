# Backend-Starter

Simple server/backend app with JWT authentication that uses Prisma, Node.js, Express, Multer, Node Mailer and Typescript

## Requirements

- git
- Node js
- A browser (e.g., Firefox or Chrome)
- bash shell
- xampp or laragon

## How to start

1. Run `xampp` or `laragon` and save the username and password information from dbms

2. Rename the `.env.example` file to `.env`
   ```bash
    cp .env.example .env
   ```
3. Paste your cluster connection string to `DATABASE_URL` in `.env` as below
   ```bash
    <dbms>://<username>:<password>@<host>/<database_name>
   ```
   Example:
   ```bash
    DATABASE_URL="mysql://root:@localhost:3306/db_blog"
   ```
4. Generate `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` for JWT using crypto on terminal
   ```bash
    require('crypto').randomBytes(64).toString('hex')
   ```
5. Add your email informations for `node-mailer`, you can create custom email account, and generate App Password using this steps:
   ```bash
    https://stackoverflow.com/a/45479968
   ```
   Example:
   ```bash
    EMAIL_USERNAME="ask.ust.id@gmail.com"
    EMAIL_PASSWORD="qjqkqscrpqkixhcv"
   ```
6. Add `PUBLIC_URL` that you can get from your client url for cors
   ```bash
    PUBLIC_URL="http://localhost:5173"
   ```
7. Create folder `uploads` and `storage` for files on root
   ```bash
    mkdir uploads
    mkdir storage
   ```
8. Install all dependencies
   ```bash
    npm install
   ```
9. Generate database and prisma config using prisma
   ```bash
    npx prisma migrate dev
   ```
10. Run the server locally
    ```bash
     npm run dev
    ```

## Features

- Authentication
- Send Email
- Upload Files
- OAuth
- JWT
- Prisma
- Validation
- Compress Files
- Formatter Code
- Eslint
- Logger

## Test requests with Postman

- Install [Postman](https://www.postman.com/downloads/)
- Additional details in following sections
- POST http://localhost:3000/auth/register
- POST http://localhost:3000/auth/login
- POST http://localhost:3000/auth/verify-email
- POST http://localhost:3000/auth/google
- POST http://localhost:3000/auth/reset-password
- POST http://localhost:3000/auth/refresh
- DELETE http://localhost:3000/auth/logout
