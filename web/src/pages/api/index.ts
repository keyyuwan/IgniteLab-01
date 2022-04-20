import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@auth0/nextjs-auth0";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Proxy que recebe as reqs, add o token, e repassa
// Tudo isso acontece pelo Server-side
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);

  return httpProxyMiddleware(req, res, {
    target: "http://localhost:3332/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
