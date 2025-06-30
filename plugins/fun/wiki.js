// plugins/fun/wiki.js
const axios = require('axios');

module.exports = {
  name: 'Wikipedia',
  description: 'Search Wikipedia. Usage: !wiki [query]',
  command: 'wiki',
  async run(sock, msg, args) {
    const query = args.join(' ');
    if (!query) return await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Enter a search term!' });

    try {
      const response = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      );
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `📚 *${response.data.title}*\n\n${response.data.extract}` 
      });
    } catch {
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Article not found.' });
    }
  },
};