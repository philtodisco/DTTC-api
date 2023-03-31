const mongoose = require('mongoose')

const tourDateSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    rsvp: {
        type: String,
        required: false
    },
    ticket: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Tourdate', tourDateSchema)
