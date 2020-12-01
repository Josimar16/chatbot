// import dependencies
// const ibm_watson = require('ibm-watson');
const express = require('express');
const cors = require('cors');
const app = express();

require("dotenv").config();
app.use(cors());

// allow parsing on request bodies
app.use(express.json());

// import routes for api
const routes = require('./routes/route');
app.use('/api', routes);

// start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server listening on port ", port);
});