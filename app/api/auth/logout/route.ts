import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const domain = process.env.AUTH0_ISSUER_BASE_URL;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const returnTo = process.env.AUTH0_BASE_URL ?? "http://localhost:3000";

  const url =
    `${domain}/v2/logout?` +
    `client_id=${clientId}&` +
    `returnTo=${encodeURIComponent(returnTo)}`;

  return NextResponse.redirect(url, 302);
}
