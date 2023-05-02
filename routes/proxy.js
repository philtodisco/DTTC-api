const express = require('express')
const router = express.Router()
const apiKey = process.env.API_KEY
const apiUrl = 'https://dttc-api.herokuapp.com';

router.get('/proxy/tourDates', async (req, res) => {
  try {
    const { data } = await axios.get(`${apiUrl}/tourDates`, {
      headers: {
        'x-api-key': apiKey
      }
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


module.exports = router