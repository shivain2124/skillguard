import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as UserJwtPayload;

      return {
        user: decoded,
      };
    } else return null;
  } catch (err) {
    return null;
  }
}

interface UserJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  name: string;
}
