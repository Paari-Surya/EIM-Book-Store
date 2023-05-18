import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  console.log(body);
  const username = body.username;
  const password = body.password;
  const expdays = 7;
  const getDate = new Date();
  getDate.setTime(getDate.getTime() + expdays * 24 * 60 * 60 * 1000);

  const expires = 'expires=' + getDate.toUTCString();
  let response = await fetch('http://localhost:8000/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify({
      userName: username,
      password: password,
    }),
  });
  response = await response.json();
  if (response.status === 'success') {
    const cookies = [
      { name: 'token', value: response.token, options: { path: '/' } },
      {
        name: 'role',
        value: response.data.user.role,
        options: { path: '/', httpOnly: true },
      },
    ];
    const serializedCookies = cookies.map(({ name, value, options }) =>
      cookie.serialize(name, value, options)
    );
    res.setHeader('Set-Cookie', serializedCookies);

    res.status(200).json({ result: response });
  } else {
    console.log(response);
    res.status(400).json({ result: response });
  }
}
