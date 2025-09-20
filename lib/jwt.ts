import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function createToken(userId: string, email: string, name: string) {
  return jwt.sign({ userId, email, name }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}
