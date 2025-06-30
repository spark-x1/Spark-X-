const fs = require('fs');
const path = require('path');

const DB_PATH = './config/db.json';

// Initialize DB
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ users: {}, groups: {} }));
}

const db = JSON.parse(fs.readFileSync(DB_PATH));

const saveDB = () => {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
};

module.exports = { db, saveDB };