import { Router } from "express";

import { UserCreateController, UserLoginController } from "../controllers/index.js";
import { UserFinder, UserValidateData } from "../middlewares/index.js";

const usersRoutes = Router();

usersRoutes.post("/users", UserValidateData, UserFinder, UserCreateController);

usersRoutes.post("/login", UserValidateData, UserFinder, UserLoginController);

export default usersRoutes;
