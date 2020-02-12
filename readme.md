# Web Development API Task

## Tech stack in this app

- typescript
- mongoose
- jest
- yarn

## Installation

`yarn`

## To Run Tests

`yarn test`

##### this makes use of jest-mongoDb which enables tests to be ran against a in memory mongodb instance.

## To start the app

`yarn dev`

to access swagger use `localhost/swagger` end point.

##### Please note that this application assumes that there is a mongodb connection available at `mongodb://mongo:27017/holiday`

## Check list of solution requirements

[x] user Model with the following properties

- **`id`** - _a unique user id_
- **`email`** - _a user's email address_
- **`givenName`** - _in the UK this is the user's first name_
- **`familyName`** - _in the UK this is the user's last name_
- **`created`** - _the date and time the user was added_

[x] Have the ability to persist user information for at least the lifetime of the test.

[x] Expose functionality to create, read, update and delete (CRUD) users.

[x] Be easily consumable by a plain HTTP client (e.g. cURL or Postman) or, if using a transport other than HTTP, be trivial to write a client application to consume it.

[x] Swagger UI for testing.

[x] test coverage of user section of app.

[x] validation inputs done with `Joi`.
