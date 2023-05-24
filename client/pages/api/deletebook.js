export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const { userUuid, sessionId } = req.cookies;
  const { bookId } = body;

  let response = await fetch(
    `http://localhost:8000/api/v1/users/${bookId}/removeBook`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${sessionId}`,
      },
    }
  );
  response = await response.json();
  if (response.status === 'success') {
    res.status(200).json({ result: response });
  } else {
    res.status(400).json({ result: response });
  }
}
