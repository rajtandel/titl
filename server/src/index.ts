import cookieParser from "cookie-parser";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectMongo, getMongoHealth } from "./db/mongo.js";
import { loadEnv } from "./loadEnv.js";
import { authRouter } from "./routes/auth.js";

import "./models/user.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cookieParser());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  const mongo = getMongoHealth();
  res.json({
    ok: true,
    name: "TiTL community server",
    mongo,
  });
});

app.use("/api/auth", authRouter);

const clientDist = path.join(__dirname, "../../client/dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

async function main() {
  await connectMongo();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
