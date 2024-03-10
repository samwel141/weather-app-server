// server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001; 

app.use(cors());

app.get('/', async (req, res) => {
    return res.status(200).json({
        title: "Server Testing",
        message: "The app is working properly!, Use /weather?place='Region' to get data",
      });
})

app.get('/weather', async (req, res) => {
    const { place } = req.query;
    const REACT_APP_WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY || '9ca141454f272c5b8faec74388872af7';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${REACT_APP_WEATHER_API_KEY}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
