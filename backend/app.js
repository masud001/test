const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
var cors = require('cors');

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/upload', express.static('upload'));
// import routes
const memberRoute = require('./routes/members');

// ROUTES
app.use('/members', memberRoute);

// app.get('/', (req, res) => {
// 	res.send('we are on home');
// });

// connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
	console.log('Connected to DB Successfully!');
});

// How we start listening the server
app.listen(3000);
