import { user_database } from "../../database/index.js";

function UserFinder(req, _, next) {
  const email = req.validated?.email || "";

  const user = user_database.find((user) => user.email === email);

  if (user) req.user = {...req.user, ...user};

  return next();
}

export default UserFinder;
