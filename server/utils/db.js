const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

async function readDb() {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

async function writeDb(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDb, writeDb };