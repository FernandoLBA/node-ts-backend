import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import dbConnect from "./config/mongo";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

dbConnect().then(() => {
  console.log("Conexón correcta a mongo")
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
