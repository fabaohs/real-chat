import dotenv from "dotenv";
dotenv.config();

import { initConnection } from "./db-config";
import { startServer } from "./rest";
import { startWS } from "./ws";

(() => {
  try {
    initConnection();
    startServer();
    startWS();
  } catch (error) {
    throw new Error("An error occurred while starting the server " + error);
  }
})();
