
Once you clone and unzip code 

To start our server using following comments

npm install
npm run start

<!-- NestJS — Create a CRUD API using TypeORM and PostgreSQL -->

<!-- Prerequisites: -->

Node.js (lts version)
PostgreSQL
npm install -g @nestjs/cli

<!-- please make sure that installed on your machine -->

 <!-- Let’s create a new project by run the following command: -->

<!-- <!-- open terminal and install the following commend > -->

nest new studnent-management

cd student-management

<!-- Environment Variables
There is a crucial thing to running our application is to set up environment variables. By using them to keep configuration data (database credentials, etc.), we can make configuration easily. It’s easier to keep sensitive data from being committed to repository.

In NestJS, we have a ConfigModule that we can use for read the configuration data. It uses dotenv behind the scene. To use ConfigModule, we need to install @nestjs/config. Use the following command to install: -->

npm install @nestjs/config

<!-- After that, we need to create a .env file at the root of our application, so we can inject them into ourConfigService. -->

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=myuser (postgress userName)
POSTGRES_PASSWORD=mypassword (postgress password)
POSTGRES_DB=databaseName (your db name)

<!-- And then, we need to add ConfigModule.forRoot() at app.module.ts. -->

<!-- example -->

import { ConfigModule } from '@nestjs/config';

@Module({
imports: [ConfigModule.forRoot()],
controllers: [AppController],
providers: [AppService],
})

<!-- To prevent any error when our application run, we need to validating our environment variables. We gonna use Joi to define a validation schema. -->

$ npm install joi @types/joi

% Let’s modification app.module.ts for adding validation schema.

import \* as Joi from 'joi';

@Module({
imports: [
ConfigModule.forRoot({
envFilePath: '.env',
validationSchema: Joi.object({
POSTGRES_HOST: Joi.string().required(),
POSTGRES_PORT: Joi.number().required(),
POSTGRES_USER: Joi.string().required(),
POSTGRES_PASSWORD: Joi.string().required(),
POSTGRES_DB: Joi.string().required(),
PORT: Joi.number(),
}),
}),
],
controllers: [AppController],
providers: [AppService],
})

% Connecting application with PostgreSQL using TypeORM

% To connecting the application with our database, we need to define a connection between application and database. To do that, we need to install TypeORM and PostgreSQL dependencies. Use the following command to install:

npm install @nestjs/typeorm typeorm pg

% next you to create a database.module.ts, so it would be easier to make config for database. It will look like this:

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
imports: [
TypeOrmModule.forRootAsync({
imports: [ConfigModule],
inject: [ConfigService],
useFactory: (configService: ConfigService) => ({
type: 'postgres',
host: configService.get('POSTGRES_HOST'),
port: configService.get('POSTGRES_PORT'),
username: configService.get('POSTGRES_USER'),
password: configService.get('POSTGRES_PASSWORD'),
database: configService.get('POSTGRES_DB'),
entities: [join(__dirname, '**', '*.entity.{ts,js}')],
ssl: {
rejectUnauthorized: false,
},
synchronize: true, //should be false at production!
}),
}),
],
})
export class DatabaseModule {}

% After that, we need to import our DatabaseModule at app.module.ts.

import { DatabaseModule } from './database.module';

@Module({
imports: [
ConfigModule.forRoot({
envFilePath: '.env',
validationSchema: Joi.object({
POSTGRES_HOST: Joi.string().required(),
POSTGRES_PORT: Joi.number().required(),
POSTGRES_USER: Joi.string().required(),
POSTGRES_PASSWORD: Joi.string().required(),
POSTGRES_DB: Joi.string().required(),
PORT: Joi.number(),
}),
}),
DatabaseModule,
],
controllers: [AppController],
providers: [AppService],
})

% Entity

% we need to create a student studententity file. Entity is a class maps to database table. To create it, we use the @Entity() decorator.

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class studentMangement {
@PrimaryGeneratedColumn()
firstName: number;

@Column()
lastName: string;

@Column()
age: string;

@Column()
gender: boolean;
}

export default studentMangement;

% @PrimaryGeneratedColumn() is a decorator from TypeORM that will create an integer primary key for id column and generate the value automatically as a sequence.

% @Column() decorator marks property as a column.

% We need to create DTO (Data Transfer Object) for help us have an easy access to request body. DTO defines the format of data that sent in a request. We gonna create DTO class for create and update our student Management entity.

% createDTO
export class Create {
firstName: string;
lastname: string;
gender: boolean;
age:string
}

export default Create;

% updateDTO
export class update {
firstName: string;
lastname: string;
gender: boolean;
age:string
}

export default update;

% Next step we need to create studentSerice , studentControler both files are will be there in our porject

% next step we need create a studentModule.ts file and import our services and controler to the StudentModule. Let’s create and it will look like this

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import studentEntity from './entity/studententity';
import { studentService } from './service';
import { studentControl } from './controller';

@Module({
imports: [TypeOrmModule.forFeature([studentEntity])],
controllers: [studentControl],
providers: [studentService],
})
export class studentModule {}

% And for the last step, we import our studentModule to app.module.ts just like we import our DatabaseModule before.

% Let’s running the application with command npm run start.

% After that can check our api at postman tool

% here we have put it the student management postman collection url. you can import it

% postman collection link : https://www.getpostman.com/collections/876b297d3008288ae6e5
