export default async function handler(req, res) {
  console.log('req', req.body);
  const cookies = req.cookies;
  const sessionId = cookies.sessionId;
  const userUuid = cookies.userUuid;
  const body = JSON.parse(req.body);

  // const { name, author, publisher } = body;
  const owner = req.cookies.userUuid;
  console.log('testsss');
  let response = await fetch('http://localhost:8000/api/v1/books/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sessionId}`,
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify({
      name: req.body.name,
      author: req.body.author,
      publisher: req.body.publisher,
      owner: owner,
    }),
  });
  response = await response.json();
  if (response.status === 'success') {
    res.status(200).json({ result: response });
  } else {
    console.log(response);
    res.status(400).json({ result: response });
  }
}
