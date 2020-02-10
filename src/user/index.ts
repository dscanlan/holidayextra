import Routes from "./routes";

class User {
  private router: Routes = new Routes();

  constructor() {}

  public addRoutes() {
    console.log("add the routes");
    this.router.routes();
  }
}

export default new User();
