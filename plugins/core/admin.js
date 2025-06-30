module.exports = {
  name: 'Admin Tools',
  description: 'Group management. Usage: !kick [@user] / !promote [@user]',
  commands: ['kick', 'promote'],
  async run(sock, msg, args) {
    const command = args[0];
    const userJid = msg.mentionedJid[0] || args[1];

    if (!msg.key.remoteJid.endsWith('@g.us')) {
      return await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ This command works only in groups!' });
    }

    if (!userJid) {
      return await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Mention a user (e.g., @user)!' });
    }

    try {
      if (command === 'kick') {
        await sock.groupParticipantsUpdate(msg.key.remoteJid, [userJid], 'remove');
        await sock.sendMessage(msg.key.remoteJid, { text: `🚪 Kicked @${userJid.split('@')[0]}` });
      } else if (command === 'promote') {
        await sock.groupParticipantsUpdate(msg.key.remoteJid, [userJid], 'promote');
        await sock.sendMessage(msg.key.remoteJid, { text: `👑 Promoted @${userJid.split('@')[0]} to admin` });
      }
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Missing permissions!' });
    }
  },
};