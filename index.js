// app.js
const express = require('express');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/app');

const app = express();

mongoose.connect('mongodb+srv://senura2008:47802@cluster0.5u4anza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
