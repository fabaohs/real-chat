import { startServer } from "./rest";
import { startWS } from "./ws";

(() => {
  startServer();
  startWS();
})();
