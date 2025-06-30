// plugins/fun/youtube.js
const ytdl = require('ytdl-core');

module.exports = {
  name: 'YouTube Downloader',
  description: 'Download videos. Usage: !yt [URL]',
  command: 'yt',
  async run(sock, msg, args) {
    const url = args[0];
    if (!ytdl.validateURL(url)) {
      return await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Invalid YouTube URL!' });
    }

    try {
      const video = ytdl(url, { quality: 'lowest' }); // No API key needed
      await sock.sendMessage(msg.key.remoteJid, { 
        video: { stream: video }, 
        caption: '⬇️ Downloaded via Spark X (no API)' 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed to download. Video may be too long.' });
    }
  },
};