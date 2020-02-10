import express from "express";
import * as bodyParser from "body-parser";

class App {
  private static _instance: express.Application;

  public static Instance() {
    if (!this._instance) {
      console.log("Create the App Instance");
      const app = express();
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.set("trust proxy", 1); // trust first proxy

      const router = express.Router();
      app.use("/", router);
      app.get("/", (req, res) => res.send("hello"));

      this._instance = app;
    }
    return this._instance;
  }
}

export default App.Instance();
