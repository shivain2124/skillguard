import {
  Auth0Client,
  filterDefaultIdTokenClaims,
} from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: process.env.AUTH0_SCOPE,
    audience: process.env.AUTH0_AUDIENCE,
  },
  async beforeSessionSaved(session) {
    return {
      ...session,
      user: {
        ...filterDefaultIdTokenClaims(session.user),
      },
    };
  },
});
