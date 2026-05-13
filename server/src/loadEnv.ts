import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));

/** Load `.env` from the monorepo root (two levels above `server/src` or `server/dist`). */
export function loadEnv(): void {
  dotenv.config({ path: path.join(here, "../../.env") });
}
