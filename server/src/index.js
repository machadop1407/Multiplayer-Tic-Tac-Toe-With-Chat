import express from "express";
import { router as AuthRouter } from "./routes/auth.js";
import { router as GameRouter } from "./routes/game.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/game", GameRouter);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
