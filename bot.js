const { makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { color } = require('./libs/logger');
const { handleCommand } = require('./plugins/core/help');

// Load session (replace with your session ID)
const { state, saveState } = useSingleFileAuthState('./config/session.json');

const startBot = async () => {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false, // Disable QR (session exists)
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || '';
    const sender = msg.key.remoteJid;

    if (text.startsWith('!')) {
      const [cmd, ...args] = text.slice(1).split(' ');
      await handleCommand(sock, msg, cmd, args);
    }
  });

  console.log(color.green(`⚡ Spark X Bot is online! | Author: Amon`));
};

startBot().catch(err => console.error(color.red('Bot crashed:'), err));