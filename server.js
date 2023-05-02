require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
let port = process.env.PORT || 3000
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})
app.use(express.json());
const tourDatesRouter = require('./routes/tourDates')
app.use('/tourDates', tourDatesRouter)

const emailRouter = require('./routes/email')
app.use('/email', emailRouter)

const proxyRouter = require('./routes/proxy')
app.use('/proxy/tourDates', proxyRouter)

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))