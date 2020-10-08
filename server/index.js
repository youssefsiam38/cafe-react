const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql-schema/schema");
const cors = require("cors");


const app = express();

// allow cross-origin requests
app.use(cors());

app.use(express.static('./public'))

// middleware
app.use("/graphql", graphqlHTTP({
  schema, //graphql schema
  graphiql: true 
}));

app.get('/', (req, res) => {
  res.render('index.html');
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});

