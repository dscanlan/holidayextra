import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import SwaggerUi from "swagger-ui-express";
import request from "request";
import SwaggerDoc from "./swagger.json";

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
      app.use(cors());
      app.get("/", (req, res) => res.send("hello"));

      app.use("/swagger", SwaggerUi.serve, SwaggerUi.setup(SwaggerDoc));
      app.get("/flickr", (req, res) => {
        try {
          const { search } = req.query;
          const tag = search ? search : "kittens";
          request(
            `https://api.flickr.com/services/feeds/photos_public.gne?tags=${tag}&format=json&nojsoncallback=true`,
            async (error, response, body) => {
              res.send(response.body);
            }
          );
        } catch (e) {
          return res.status(500).send(e);
        }
      });

      this._instance = app;
    }
    return this._instance;
  }
}

export default App.Instance();
