import express from "express";

import StartRoutes from "./routes/index.js";

const app = express();

StartRoutes(app);

app.listen(3000, () =>
  console.log("Cooper's Back end running.")
);
