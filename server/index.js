const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql-schema/schema");
const cors = require("cors");
const conn = require('./db/db.js');
const upload = require('./uploadMiddleware.js')


const app = express();

// allow cross-origin requests
app.use(cors());

app.use(express.static('./public'))

// middleware
app.use("/graphql", graphqlHTTP({
  schema, //graphql schema
  graphiql: true 
}));

// upload middleware
app.post('/image', upload.single('image'), async (req, res) => {
  try {
    conn.connect();

    conn.resume()

    // insert the img route
    const photoURL = `/imgs/${req.query.id}.${req.ext}`
    conn.execute('update menuItems set photoURL=? where id=? ;', [
      photoURL,
      req.query.id
    ])

    res.sendStatus(200)
  } catch (e) {
      const error = errorHandler(e)
      res.status(error.status).send({ Error: error.errMsg })
  }

})

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});

