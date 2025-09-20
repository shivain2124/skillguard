import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  // Exchange code for tokens
  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
      }),
    }
  );
  const data = await response.json();

  if (!data.id_token) {
    return NextResponse.json(
      { error: "No id_token received", details: data },
      { status: 401 }
    );
  }

  // Set session cookie (simple example)
  const res = NextResponse.redirect(process.env.AUTH0_BASE_URL || "/");
  res.cookies.set("id_token", data.id_token, { httpOnly: true, path: "/" });
  return res;
}
