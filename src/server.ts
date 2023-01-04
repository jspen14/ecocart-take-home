import "module-alias/register"; // Used for '@' imports

import express from "express";
import http from "http";

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const port = "8080";

  await require("./loaders").default(app);

  server
    .listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });
}

startServer();
