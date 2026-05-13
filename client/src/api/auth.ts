export type ApiUser = {
  id: string;
  email: string;
  name: string;
  registeredAt: string;
};

const prefix = "/api/auth";

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? res.statusText;
  } catch {
    return res.statusText;
  }
}

export async function authMe(): Promise<ApiUser | null> {
  const res = await fetch(`${prefix}/me`, { credentials: "include" });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(await readErrorMessage(res));
  const body = (await res.json()) as { user: ApiUser };
  return body.user;
}

export async function authRegister(body: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiUser> {
  const res = await fetch(`${prefix}/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as { user?: ApiUser; error?: string };
  if (!res.ok) throw new Error(data.error ?? "Registration failed");
  if (!data.user) throw new Error("Registration failed");
  return data.user;
}

export async function authLogin(body: { email: string; password: string }): Promise<ApiUser> {
  const res = await fetch(`${prefix}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as { user?: ApiUser; error?: string };
  if (!res.ok) throw new Error(data.error ?? "Login failed");
  if (!data.user) throw new Error("Login failed");
  return data.user;
}

export async function authLogout(): Promise<void> {
  await fetch(`${prefix}/logout`, { method: "POST", credentials: "include" });
}
