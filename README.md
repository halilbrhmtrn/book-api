# book-api

you should have postgresql installed on your machine locally or you can use docker to run it.

then run following to initialize the database:

```bash
$ psql -U postgres -d postgres -a -f ddl.sql
```

then run the following to install the dependencies:

```bash
$ npm install
```

then run the following to start the server:

```bash
$ npm start
```

then you can access the api on http://localhost:3000 just use the postman collection to test the api.
