const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv/config');
const verifyAuth = require('./controllers/verifyAuthController');

// Get .env Variables
const hostURL = process.env.URL;
const hostPort = process.env.PORT || 8000;
const dbConnection = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gettingstarted.35frc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Import Routes
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const usersRoutes = require('./routes/usersRoutes');

// Set Template Engine
app.set('view engine', 'ejs');

// Set Public Directory as a Static Directory
app.use(express.static('public'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to Database
mongoose.connect(
	dbConnection,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	() => {
		console.log('Succesfully Connected to Database!');
	}
);

// Get Projects Page
app.get('/', verifyAuth, (req, res) => {
	res.render('pages/projects', { title: 'Projects' });
});

// Route Middlewares
app.use(authRoutes);
app.use(settingsRoutes);
app.use(usersRoutes);

// Show 404 Page if Page Doesn't Exists
app.use((req, res, next) => {
	res.status(404).end();
});

// Start Server at Given Host and Port
app.listen(hostPort, () => {
	console.log(`App Listening at ${hostURL}:${hostPort}`);
});
