const http = require("http");

const handler = require("./routes/handler.routes");

require("dotenv").config();
require("./infra/postgres/database");

const port = 4444;

const server = http.createServer(handler);

server.listen(port, () => console.log("Server is running!!"));

process.on("uncaughtException", (error) => console.log("Error: ", error));
