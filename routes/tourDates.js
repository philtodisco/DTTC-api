const express = require('express')
const router = express.Router()
const TourDate = require('../models/tourDate')

router.get('/', async (req, res) => {
    try {
        const tourDates = await TourDate.find()
        res.json(tourDates)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

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