import { initConnection } from "./db-config";
import { startServer } from "./rest";
import { startWS } from "./ws";

(() => {
  initConnection();
  startServer();
  startWS();
})();
