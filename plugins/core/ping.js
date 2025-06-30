module.exports = {
  name: 'Ping',
  description: 'Check bot latency. Usage: !ping',
  command: 'ping',
  async run(sock, msg) {
    const start = Date.now();
    await sock.sendMessage(msg.key.remoteJid, { text: 'Pong!' });
    const latency = Date.now() - start;
    await sock.sendMessage(msg.key.remoteJid, { 
      text: `🏓 Latency: ${latency}ms` 
    });
  },
};
