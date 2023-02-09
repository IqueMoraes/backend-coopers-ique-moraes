import { json } from "express";

import { ErrorHandler } from '../middlewares/index.js';
import usersRoutes from "./users.routes.js";

const routes = [usersRoutes];

function StartRoutes(app) {
  app.use(json());
  app.use(routes);
  app.use(ErrorHandler);
}

export default StartRoutes;
