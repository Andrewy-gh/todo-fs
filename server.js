const dotenv = require('dotenv');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const todosRoutes = require('./routes/todos');
const connectDB = require('./config/database');

// Load config
dotenv.config({ path: './config/config.env' });

connectDB();

app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', todosRoutes);
app.use('/items', todosRoutes);
app.use('/projects', todosRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
