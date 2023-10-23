# Table API

RESTful API for Table app.

Technologies used:

- Express.js
- jsonwebtoken
- bcrypt
- PostgreSQL
- Sequelize

## Routes

```
GET /api/people
GET /api/people?page=2&rowsPerPage=10&sortBy=firstName&sortOrder=desc
POST /login
POST /signup
```

## Local Development

Create a `.env` file in the root directory and add the following environment variables. You will need a Postgres client set up on your machine.

```bash
# <connector>://<username>:<password>@<host>:<port>/<database_name>
DATABASE_URL='connectionStringHere'
JWT_SECRET='secretHere'
```

Install project dependencies and start the server.

```bash
npm install
npm run dev
```

The server will be running at `http://localhost:5000/`. Project configuration variables can be viewed and changed in `src/utils/config.js`.

## Deployment

The project is deployed to [Fly.io](https://fly.io/).
