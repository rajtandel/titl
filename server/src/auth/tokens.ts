import jwt from "jsonwebtoken";

export const AUTH_COOKIE = "titl_token";

const JWT_EXPIRES = "7d";

export type JwtUserPayload = {
  sub: string;
  email: string;
  name: string;
};

export function getJwtSecret(): string | null {
  const s = process.env.JWT_SECRET?.trim();
  if (!s || s.length < 16) return null;
  return s;
}

export function signUserToken(userId: string, email: string, name: string): string {
  const secret = getJwtSecret();
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return jwt.sign({ sub: userId, email, name } satisfies JwtUserPayload, secret, {
    expiresIn: JWT_EXPIRES,
  });
}

export function verifyUserToken(token: string): JwtUserPayload {
  const secret = getJwtSecret();
  if (!secret) throw new Error("JWT_SECRET is not configured");
  const decoded = jwt.verify(token, secret);
  if (typeof decoded !== "object" || decoded === null) throw new Error("Invalid token");
  const { sub, email, name } = decoded as Record<string, unknown>;
  if (typeof sub !== "string" || typeof email !== "string" || typeof name !== "string") {
    throw new Error("Invalid token payload");
  }
  return { sub, email, name };
}
