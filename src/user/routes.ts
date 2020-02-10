import { Request, Response } from "express";
import controller from "./controller";
import app from "../app";

class Routes {
  public routes(): void {
    app.post(
      "/user",
      async (req: Request, res: Response): Promise<any> => {
        try {
          const {
            body: { email, familyName, givenName }
          } = req;
          const { user, error } = await controller.createUser({
            email,
            familyName,
            givenName
          });
          if (error) {
            return res.status(500).send(error);
          }
          return res.send({ user });
        } catch (e) {
          console.log(e);
          return res.status(500).send(e);
        }
      }
    );
    app.get(
      "/user/:userId",
      async (req: Request, res: Response): Promise<any> => {
        try {
          const {
            params: { userId }
          } = req;
          const { user, error } = await controller.findUser({
            id: userId
          });
          if (error) {
            return res.status(500).send(error);
          }
          return res.send({ user });
        } catch (e) {
          return res.status(500).send(e);
        }
      }
    );
    app.put(
      "/user/:userId",
      async (req: Request, res: Response): Promise<any> => {
        try {
          const {
            params: { userId },
            body: { email, familyName, givenName }
          } = req;

          const { user, error } = await controller.updateUser({
            email,
            familyName,
            givenName,
            id: userId
          });

          if (error) {
            return res.status(500).send(error);
          }
          return res.send({ user });
        } catch (e) {
          return res.status(500).send(e);
        }
      }
    );

    app.delete(
      "/user/:userId",
      async (req: Request, res: Response): Promise<any> => {
        try {
          const { userId } = req.params;
          const { success, error } = await controller.deleteUser({
            id: userId
          });

          if (!success) {
            return res.status(500).send(error);
          }
          return res.send(success);
        } catch (e) {
          return res.status(500).send(e);
        }
      }
    );
  }
}

export default Routes;
