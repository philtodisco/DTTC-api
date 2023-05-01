require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors')
const axios = require('axios')
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
let port = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:3000'
}));

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());

// Routes
app.get('/api/tourDates', async (req, res) => {
  try {
    const response = await axios.get('https://dttc-api.herokuapp.com/api/tourDates');
    const tourDates = response.data;
    res.json(tourDates);
  } catch (err) {
    console.error('Error in tour dates request:', err);
    res.status(500).send('Server error');
  }
});

const emailRouter = require('./routes/email')
app.use('/email', emailRouter)

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))