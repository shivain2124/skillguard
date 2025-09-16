import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const domain = process.env.AUTH0_ISSUER_BASE_URL;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const redirectUri = `${process.env.AUTH0_BASE_URL}/api/auth/callback`;
  const scope = process.env.AUTH0_SCOPE || "openid profile email";
  const audience = process.env.AUTH0_AUDIENCE || "";

  let url =
    `${domain}/authorize?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}`;
  if (audience) url += `&audience=${encodeURIComponent(audience)}`;

  return NextResponse.redirect(url, 302);
}
