// pages/api/clear-cookies.js
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function handler(req, res) {
  const cookies = [
    { name: "sessionId", value: "", options: { path: "/" } },
    {
      name: "role",
      value: "",
      options: { path: "/", httpOnly: true },
    },
    {
      name: "userUuid",
      value: "",
      options: { path: "/", httpOnly: true },
    },
  ];
  const serializedCookies = cookies.map(({ name, value, options }) =>
    cookie.serialize(name, value, options)
  );
  res.setHeader("Set-Cookie", serializedCookies);

  res.status(200).end();
}
