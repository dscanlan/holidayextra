import Server from "./server";
import app from "./app";
import DB from "./db";
import User from "./user";
Server.start();
DB.connect();
User.addRoutes();

app.use((req, res, next) => {
  res.status(404).send("Sorry this has not been implemented");
});
