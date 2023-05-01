const express = require('express')
const router = express.Router()
const axios = require('axios')
const TourDate = require('../models/tourDate')

const API_KEY = process.env.API_KEY;
const HEROKU_APP_URL = 'https://dttc-api.herokuapp.com';

// Authentication middleware
function authMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
}

// Proxy route
router.get('/', authMiddleware, async (req, res) => {
  try {
    const response = await axios.get(`${HEROKU_APP_URL}/api/tourDates`);
    const tourDates = response.data;
    res.json(tourDates);
  } catch (err) {
    console.error('Error in tour dates request:', err);
    res.status(500).send('Server error');
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