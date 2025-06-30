// plugins/fun/weather.js
const axios = require('axios');

module.exports = {
  name: 'Weather',
  description: 'Get weather. Usage: !weather [city]',
  command: 'weather',
  async run(sock, msg, args) {
    const city = args.join(' ');
    if (!city) return await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Enter a city name!' });

    try {
      // Step 1: Get coordinates (using Nominatim API - free)
      const geoResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
      );
      const { lat, lon } = geoResponse.data[0];

      // Step 2: Get weather (using Open-Meteo - free)
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const temp = weatherResponse.data.current_weather.temperature;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🌤️ Weather in ${city}: ${temp}°C` 
      });
    } catch {
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ City not found.' });
    }
  },
};