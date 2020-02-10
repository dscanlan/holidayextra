import mongoose from "mongoose";

class DB {
  public status;

  public connect(): void {
    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS
    };

    mongoose.connect("mongodb://mongo:27017/holiday", options, err => {
      if (err) {
        this.status = "Unconnected";
        console.log(err.message);
        console.log(err);
      } else {
        this.status = "Connected";
        console.log("Connected to MongoDb");
      }
    });
  }
}
export default new DB();
