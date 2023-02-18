const { Client } = require("pg");

const client = new Client({
  user: "admin",
  password: "admin",
  host: "localhost",
  port: 5433,
  database: "modulo_api",
});

client.connect();

module.exports = {
  client
}
