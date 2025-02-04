const mongoose = require("mongoose");
const { mongoUri } = require("../config");


function makeNewConnection(uri) {
  const db = mongoose.createConnection(uri, {});

  db.on("error", function (error) {
    console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() =>
      console.log(`MongoDB :: failed to close connection ${this.name}`)
    );
  });

  db.on("connected", function () {
    mongoose.set("debug", function (col, method, query, doc) {});
    console.log(`MongoDB :: connected ${this.name}`);
  });

  db.on("disconnected", function () {
    console.log(`MongoDB :: disconnected ${this.name}`);
  });

  return db;
}

const conn = makeNewConnection(mongoUri);

module.exports = { conn };
