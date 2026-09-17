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

dbConnect()
  .then(() => {
    console.log("Successfully connected to mongo")
  })
  .catch((error) => {
    console.error("Error connecting to mongo:", error);
    process.exit(1);
  })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
