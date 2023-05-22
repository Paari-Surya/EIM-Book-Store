export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const bookId = body.bookId;
  const { userUuid, sessionId } = req.cookies;

  let response = await fetch(
    `http://localhost:8000/api/v1/users/${userUuid}/addBook`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${sessionId}`,
      },
      body: JSON.stringify({
        bookId: bookId,
        token: sessionId,
      }),
    }
  );
  console.log("response", sessionId, userUuid);
  response = await response.json();
  console.log("response", response);

  if (response.status === "success") {
    res.status(200).json({ result: response });
  } else {
    console.log(response);
    res.status(400).json({ result: response });
  }
}
