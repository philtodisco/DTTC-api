const express = require('express')
const router = express.Router()
const axios = require('axios')
const TourDate = require('../models/tourDate')
const apiKey = process.env.API_KEY

// Define a route for the API endpoint
router.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://dttc-api.herokuapp.com/tourDates', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(error.response.status).send(error.response.data);
    }
  });
  
// router.use((req, res, next) => {
//     req.headers['x-api-key'] = apiKey;
//     next();
//   });

// function checkApiKey(req, res, next) {
//     const apiKeyHeader = req.headers['x-api-key'];
//     if (apiKeyHeader === apiKey) {
//       next();
//     } else {
//       res.status(401).send('Unauthorized');
//     }
//   }
  
// router.get('/', checkApiKey, async (req, res) => {
//     try {
//         const tourDates = await TourDate.find()
//         res.json(tourDates)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

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