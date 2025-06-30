const { Sticker } = require('wa-sticker-formatter');

module.exports = {
  name: 'Sticker Maker',
  description: 'Convert images to stickers. Usage: !sticker',
  command: 'sticker',
  async run(sock, msg) {
    if (msg.message.imageMessage) {
      const buffer = await sock.downloadMediaMessage(msg);
      const sticker = new Sticker(buffer, { 
        pack: 'Spark X', 
        author: 'Amon', 
      });
      await sock.sendMessage(msg.key.remoteJid, await sticker.toMessage());
    } else {
      await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Send an image!' });
    }
  },
};