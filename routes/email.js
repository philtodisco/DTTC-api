const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()
const usr = process.env.USR
const pswrd = process.env.PSWRD

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', async (req, res) => {
    console.log('Email route hit', usr); 
    const { name, email, subject, message } = req.body

  // create a Nodemailer transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: usr,
      pass: pswrd
    }
  })

  const senderEmail = email;

  // send email
  try {
    const info = await transporter.sendMail({
      from: senderEmail,
      to: usr,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    })

    console.log('Message sent: %s', info.messageId)

    res.send('Message sent successfully.')
  } catch (error) {
    console.error(error)

    res.status(500).send('An error occurred while sending the message.')
  }
})

module.exports = router

