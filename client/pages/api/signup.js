import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const { name, userName, email, role, password, confirmPassword } = body;

  let response = await fetch("http://localhost:8000/api/v1/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify({
      name: name,
      userName: userName,
      password: password,
      passwordConfirm: confirmPassword,
      email: email,
      role: role,
    }),
  });
  response = await response.json();
  if (response.status === "success") {
    const cookies = [
      { name: "sessionId", value: response.token, options: { path: "/" } },
      {
        name: "role",
        value: response.data.user.role,
        options: { path: "/", httpOnly: true },
      },
      {
        name: "userUuid",
        value: response.data.user.id,
        options: { path: "/", httpOnly: true },
      },
    ];
    const serializedCookies = cookies.map(({ name, value, options }) =>
      cookie.serialize(name, value, options)
    );
    res.setHeader("Set-Cookie", serializedCookies);
    res.status(200).json({ result: response });
  } else {
    console.log(response);
    res.status(400).json({ result: response });
  }
}
