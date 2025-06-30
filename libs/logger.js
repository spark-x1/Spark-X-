const color = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
};

// ASCII Art for Spark X Bot
console.log(`
  █▀▀ █▀█ ▄▀█ █▀▀ ▀█▀ █ █▄░█ █▀▀
  █▄▄ █▀▄ █▀█ █▄▄ ░█░ █ █░▀█ █▄█
  By: Amon | Prefix: !
`);

module.exports = { color }
