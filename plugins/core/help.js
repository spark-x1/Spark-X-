const plugins = require('../../plugins/loader');

module.exports = {
  name: 'Help',
  description: 'Show all commands',
  command: 'help',
  async run(sock, msg) {
    let helpText = '⚡ *Spark X Bot Commands*\n\n';
    Object.values(plugins).forEach(p => {
      if (Array.isArray(p.commands)) {
        p.commands.forEach(cmd => helpText += `• *!${cmd}*: ${p.description}\n`);
      } else {
        helpText += `• *!${p.command}*: ${p.description}\n`;
      }
    });
    await sock.sendMessage(msg.key.remoteJid, { 
      text: `${helpText}\n🎴 *Author:* Amon` 
    });
  },
};