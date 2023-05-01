// Importing required modules
const express = require('express'); // Express framework for building server
const router = express.Router(); // Creating router instance
const request = require('request'); // Module to make HTTP requests
const TourDate = require('../models/tourDate'); // TourDate model for MongoDB schema
const apiEndpoint = 'https://dttc-api.herokuapp.com'; // API endpoint

// Route for getting all tour dates
router.get('/', (req, res) => {
  // Set options for request
  const options = {
    url: `${apiEndpoint}/tour-dates`, // URL of API endpoint
    headers: {
      'Authorization': `Bearer ${process.env.API_KEY}` // Authorization token for API
    }
  };

  // Make API request with the specified options
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) { // Check if response is successful
      const tourDates = JSON.parse(body); // Parse JSON response body
      res.json(tourDates); // Send JSON response of tour dates
    } else {
      res.status(response.statusCode).send(error); // Send error status and message
    }
  });
});

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

router.post('/', async (req, res) => {
    const tourDate = new TourDate({
        date: req.body.date,
        venue: req.body.venue,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        rsvp: req.body.rsvp,
        ticket: req.body.ticket
    })
    try {
        const newTourDate = await tourDate.save()
        res.status(201).json(newTourDate)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

router.patch('/:id', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})

module.exports = router