import mongoose from "mongoose";

let lastError: string | null = null;

export type MongoHealth =
  | { state: "not_configured" }
  | { state: "connected" }
  | { state: "error"; message: string };

export function getMongoHealth(): MongoHealth {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) return { state: "not_configured" };
  if (lastError) return { state: "error", message: lastError };
  if (mongoose.connection.readyState === 1) return { state: "connected" };
  return { state: "error", message: "Not connected" };
}

/**
 * Connects to MongoDB when `MONGODB_URI` is set. If unset, the app runs without a database.
 * If set but connection fails, the error is recorded and the server still starts.
 */
export async function connectMongo(): Promise<void> {
  lastError = null;
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    console.warn("[mongo] MONGODB_URI not set — API will run without MongoDB.");
    return;
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("[mongo] Disconnected");
  });
  mongoose.connection.on("error", (err) => {
    console.error("[mongo] Connection error:", err.message);
  });

  try {
    await mongoose.connect(uri);
    console.log("[mongo] Connected");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    lastError = message;
    console.error("[mongo] Failed to connect:", message);
  }
}

export async function disconnectMongo(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
