import * as http from "http";
import app from "./app";

class Server {
  public start() {
    http.createServer(app).listen(process.env.PORT || 8086, () => {
      console.log(`server listening on port ${process.env.PORT || 8086}`);
    });
  }
}
export default new Server();
