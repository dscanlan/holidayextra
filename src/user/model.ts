import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
  id: String,
  created: Date,
  email: String,
  givenName: String,
  familyName: String
});

const user = model("user", userSchema);

export default user;
