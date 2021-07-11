const express = require("express");
const mongoose = require("mongoose");
// const helmet = require("helmet");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
// Graphql Client
const { graphqlHTTP } = require('express-graphql');
// Graphql Schema
const graphqlSchema = require("./graphql/schema");
// Graphql Resolver
const graphqlResolver = require("./graphql/resolvers");
// defining the Express app
const app = express();
// defining port
const PORT = process.env.PORT || 4000;
// MongoDB Connection URL
const connectionURL = "mongodb://local.dev.com:27017/tododb";

// adding Helmet to enhance your API"s security
// app.use(helmet()); // causing graphql csp error

// replacing bodyParser with express.json()
app.use(express.json());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// using cors to handle cross domain requests
app.use(cors());

// Graphql setup
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

mongoose.connect(connectionURL, {})
  .then(() => {
    // starting the server
    app.listen(PORT, () => {
      console.log(
        `\n ${colors.green("API Server endpoints listening on port 4000")} \n`
      );
    });
  })
  .catch((e) => console.log(e));
