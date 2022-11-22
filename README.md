Prerequisites:

Node.js (lts version)
PostgreSQL
npm install -g @nestjs/cli

Database config:

To connect database you need to create a .env file inside your root application and paste the below cmt:

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=myuser (postgress userName)
POSTGRES_PASSWORD=mypassword (postgress password)
POSTGRES_DB=databaseName (your db name)

To start our server using following comments

npm install
npm run start

you can check the api's below link
postman collection link : https://www.getpostman.com/collections/876b297d3008288ae6e5
