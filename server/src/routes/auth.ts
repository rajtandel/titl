import bcrypt from "bcryptjs";
import { Router } from "express";
import mongoose from "mongoose";
import type { Response } from "express";
import { AUTH_COOKIE, getJwtSecret, signUserToken, verifyUserToken } from "../auth/tokens.js";
import { User } from "../models/user.js";

const router = Router();
const SALT_ROUNDS = 10;

function mongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

function authUnavailable(res: Response) {
  res.status(503).json({
    error: "Sign-in is temporarily unavailable. Please try again later.",
  });
}

function missingJwtSecret(res: Response) {
  res.status(500).json({
    error: "Sign-in is not available right now. Please try again later.",
  });
}

function setTokenCookie(res: Response, token: string) {
  res.cookie(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  });
}

function clearTokenCookie(res: Response) {
  res.clearCookie(AUTH_COOKIE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
}

function publicUser(doc: { _id: unknown; email: string; name: string; createdAt?: Date }) {
  return {
    id: String(doc._id),
    email: doc.email,
    name: doc.name,
    registeredAt: (doc.createdAt ?? new Date()).toISOString(),
  };
}

router.get("/me", async (req, res) => {
  if (!getJwtSecret()) return missingJwtSecret(res);
  if (!mongoConnected()) return authUnavailable(res);

  const token = req.cookies?.[AUTH_COOKIE];
  if (!token || typeof token !== "string") {
    return res.status(401).json({ error: "Not signed in" });
  }

  try {
    const payload = verifyUserToken(token);
    const user = await User.findById(payload.sub).lean();
    if (!user) {
      clearTokenCookie(res);
      return res.status(401).json({ error: "Not signed in" });
    }
    return res.json({ user: publicUser(user) });
  } catch {
    clearTokenCookie(res);
    return res.status(401).json({ error: "Not signed in" });
  }
});

router.post("/register", async (req, res) => {
  if (!getJwtSecret()) return missingJwtSecret(res);
  if (!mongoConnected()) return authUnavailable(res);

  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!name || name.length > 120) {
    return res.status(400).json({ error: "Please enter your name (up to 120 characters)." });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (password.length < 6 || password.length > 256) {
    return res.status(400).json({ error: "Password must be between 6 and 256 characters." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const created = await User.create({ name, email, passwordHash });
    const token = signUserToken(String(created._id), created.email, created.name);
    setTokenCookie(res, token);
    return res.status(201).json({ user: publicUser(created) });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: unknown }).code === 11000
    ) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }
    console.error("[auth/register]", err);
    return res.status(500).json({ error: "Could not create account. Please try again." });
  }
});

router.post("/login", async (req, res) => {
  if (!getJwtSecret()) return missingJwtSecret(res);
  if (!mongoConnected()) return authUnavailable(res);

  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await User.findOne({ email }).lean();
  const fail = () =>
    res.status(401).json({ error: "Invalid email or password." });

  if (!user?.passwordHash) return fail();

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return fail();

  const token = signUserToken(String(user._id), user.email, user.name);
  setTokenCookie(res, token);
  return res.json({ user: publicUser(user) });
});

router.post("/logout", (_req, res) => {
  clearTokenCookie(res);
  return res.json({ ok: true });
});

export const authRouter = router;
