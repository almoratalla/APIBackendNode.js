# [API Backend Node](htts://github.com/almoratalla/APIBackendNode.js)

> A simple starting code for node.js api backend with code structure using express and prisma

## Table of Contents

-   [API Backend Node.js](#api-backend-node)
    -   [Table of contents](#table-of-contents)
    -   [Overview](#overview)
    -   [Features](#features)
    -   [API Endpoints](#api-endpoints)
    -   [Demo](#demo)
    -   [Screenshots](#screenshots)
    -   [Tech Stack](#tech-stack)
        -   [Built with](#built-with)
    -   [Initial Requirements](#initial-requirements)
    -   [Environment Variables](#environment-variables)
    -   [Run Locally and Setup](#run-locally-and-setup)
    -   [API Documentation](#api-documentation)
        -   [Via Postman](#via-postman)
    -   [Roadmap](#roadmap)
    -   [Author](#author)
    -   [Acknowledgments](#acknowledgments)
        -   [Useful resources](#useful-resources)
    -   [License](#license)

## Overview

This project is made as a basic user management system API implementing authentication and CRUD functions; wherein an `admin` can:

1.  Add a new user
2.  Edit a user
3.  Delete a user
4.  View list of all users in the system
5.  Allow multiple users to be removed
6.  User must have fields
    -   First name
    -   Last name
    -   Address
    -   Postcode
    -   Contact Phone Number
    -   Email
    -   Username
    -   Password

The setup for this project is a code-first migration approach for tables with seeders for database population.

## Features

-   Node.js API Clean Architecture made with Express
-   Prisma as an ORM, MySQL as its provider. (ORM and provider can be easily swapped with preference)
-   Test driven API
-   Swagger documentation

## API Endpoints

| Action                               | HTTP method | URI                      |
| ------------------------------------ | ----------- | ------------------------ |
| Add a new user                       | POST        | /api/users               |
| Edit a user                          | PUT         | /api/users/id            |
| Delete a user                        | DELETE      | /api/users/id            |
| View list of all users in the system | GET         | /api/users               |
| Allow multiple users to be removed   | DELETE      | /api/users/ids?id=1&id=2 |

## Demo

Swagger:  
![Swagger Demo](./resources/demo/webapi-swagger-demo.gif)

## Tech Stack

**API:** Node, Express, Prisma

### Built With

-   Node.js, Express
-   Typescript
-   Prisma
-   MySQL
-   Swagger

## Initial Requirements

1. Node.js (version 16, 18 or higher) & Npm (version 8 or higher)  
   -- refer here for installation: [nodejs.org](https://nodejs.org/en/download/)
2. MySQL or switch with db provider of your choice  
   -- refer here for installation [dev.mysql.com](https://dev.mysql.com/downloads/installer/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Use `.sample.env` file for your reference.

---

`NODE_ENV` = production

`JWT_KEY` = XXXXX

`DATABASE_URL` = "mysql://`user`:`password`@`host`:`port`/`schema`"

-   where:
    -   `user` = Your username credentials in mysql
    -   `password` = Your password credentials in mysql
    -   `host` = host provider of the mysql service - _default_: localhost
    -   `port` = mysql service port - _default_: 3306
    -   `schema` = mysql database name - _suggested_: webapi
    -   `service|dialect` = mysql is the default for this project but can be switched with other providers
-   sample "**DATABASE_URL**" connection string:
    -   `DATABASE_URL` = "mysql://root:p@sSw0rd123@localhost:3306/webapi"

---

## Run Locally and Setup

1. Clone the project

```bash
  git clone git@github.com:almoratalla/APIBackendNode.js.git
```

2. Go to the project directory

```bash
  cd APIBackendNode.js
```

3. Install dependencies

```bash
  npm install
```

4. Create an `.env` file in the root of the project using the format from `.sample.env`.  
   Please refer to: [Set up environment variables](#environment-variables).

5. Initialize migration for the table structure and seeders for database population

```bash
  npm run migrate
```

6. Deployment instructions

-   For Development :

```bash
  npm run dev
```

-   For Production

```bash
  npm run build && npm start
```

7. API Testing

```bash
  npm test
```

## API Documentation

See [API section](./src/api/README.md).

## Via Postman

Attached in this repository a postman collection file, import it in your collection to access the routes.

Trigger the `POST` /auth/login route from the collection and it will automatically save the token as an environment variable. Consequent API calls will include the auth header.

## Author

-   [Alain Moratalla](https://www.github.com/almoratalla)

## Acknowledgements

This project is structured from an diagnostic exam on API Backend Node.js. All the concepts for this project is heavily inspired by the said requirement and from the following resources.

### Useful Resources

-   [Node.js Architecture and 12 Best Practices for Node.js Development](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development) - Good read for separation of concerns and coding practices.

-   [Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - Another perspective to a good architecture.

-   [Prisma docs](https://www.prisma.io/docs) - A really good ORM

## License

API Backend Node.js is [MIT licensed](./LICENSE)
