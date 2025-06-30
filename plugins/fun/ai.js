// plugins/fun/ai.js
const axios = require('axios');

module.exports = {
  name: 'AI Chat',
  description: 'Talk to SimSimi. Usage: !ai [text]',
  command: 'ai',
  async run(sock, msg, args) {
    const text = args.join(' ');
    if (!text) return await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Ask me something!' });

    try {
      const response = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lang=en`);
      await sock.sendMessage(msg.key.remoteJid, { text: `🤖 ${response.data.success}` });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ AI service error. Try again later.' });
    }
  },
}
