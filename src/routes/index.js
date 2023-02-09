import { json, Router } from "express";

import { ErrorHandler } from "../middlewares/index.js";
import usersRoutes from "./users.routes.js";
import tasksRoutes from "./tasks.routes.js";

const routes = [Router().get("/", (req, res) => res.status(200).send("<p>API da aplicação Coopers por Ique Moraes</p> <p>Processo seletivo em 2023.</p>")),usersRoutes, tasksRoutes];

function StartRoutes(app) {
  app.use(json());
  app.use(routes);
  app.use(ErrorHandler);
}

export default StartRoutes;
