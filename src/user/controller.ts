import v4 from "uuid/v4";
import * as Joi from "@hapi/joi";
import userModel from "./model";
import {
  newUserRequest,
  findUserRequest,
  updateUserRequest,
  userResponse
} from "./interfaces";

const userJoi = Joi.object({
  givenName: Joi.string()
    .min(3)
    .required(),
  familyName: Joi.string()
    .min(3)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
});

class Controller {
  private Model = userModel;

  public async createUser({
    givenName,
    familyName,
    email
  }: newUserRequest): Promise<userResponse> {
    try {
      const validate = await userJoi.validate({
        givenName,
        familyName,
        email
      });

      const check = await this.Model.findOne({ email });

      if (check) throw new Error("User Already Exists");

      const newUser = new this.Model({
        givenName,
        familyName,
        email,
        id: v4(),
        created: Date.now()
      });

      const user = await newUser.save();

      return { user: this.readDocument(user) };
    } catch (e) {
      return {
        error: e.message
      };
    }
  }

  private readDocument = ({ id, created, givenName, familyName, email }) => ({
    id,
    created,
    givenName,
    familyName,
    email
  });

  public async findUser({ id }: findUserRequest): Promise<userResponse> {
    try {
      const found = await this.Model.findOne({ id });

      if (found) {
        const user = this.readDocument(found);
        return { user };
      }

      throw new Error("User not found");
    } catch (e) {
      return {
        error: e.message
      };
    }
  }

  public async updateUser({
    givenName,
    familyName,
    email,
    id
  }: updateUserRequest): Promise<userResponse> {
    try {
      const validate = await userJoi.validate({
        givenName,
        familyName,
        email
      });

      const user = await this.Model.findOne({ id });
      if (!user) throw new Error("User Not Found");

      user.givenName = givenName;
      user.familyName = familyName;
      user.email = email;

      const update = await user.save();

      return { user: this.readDocument(update) };
    } catch (e) {
      return {
        error: e.message
      };
    }
  }

  public async deleteUser({ id }: findUserRequest): Promise<userResponse> {
    try {
      await this.Model.deleteOne({ id });

      return {
        success: true
      };
    } catch (e) {
      return {
        success: false,
        error: e.message
      };
    }
  }
}

export default new Controller();
