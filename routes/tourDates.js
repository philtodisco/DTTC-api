const express = require('express')
const router = express.Router()
const tourDate = require('../models/tourDate')

router.get('/', async (req, res) => {
    try {
        const tourDates = await tourDate.find()
        res.json(tourDates)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

router.post('/', (req, res) => {
    
})

router.patch('/:id', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})

module.exports = router