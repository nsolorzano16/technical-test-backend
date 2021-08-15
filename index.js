const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//create server

const app = express();

//database
dbConnection();

//CORS
app.use(cors());

//public
app.use(express.static('public'));

//body parser
app.use(express.json());

//Routes
app.use('/api/students', require('./routes/studentRoutes'));

//listen
app.listen(process.env.PORT, () => {
  console.log(`Server running port  ${process.env.PORT}`);
});
