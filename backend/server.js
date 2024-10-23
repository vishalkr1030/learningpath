const express = require('express');
const cors = require('cors');
const RoutesSurvey = require('./routes/routesSurvey');

const app = express();
const mongoose = require('mongoose');
const port = 5000;
app.use(express.json()); 

app.use(cors());
const mongoURI = 'mongodb://localhost:27017/courses';

mongoose.connect(mongoURI, {})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(RoutesSurvey);

try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error(`Error starting server: ${error.message}`);
  process.exit(1); 
}
