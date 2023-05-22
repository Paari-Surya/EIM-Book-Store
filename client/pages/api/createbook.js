export default async function handler(req, res) {
  console.log('REQ>BODY', req.body.data);
  const cookies = req.cookies;
  const sessionId = cookies.sessionId;
  const userUuid = cookies.userUuid;
  // const { name, author, publisher, coverImg, book } = body;

  // const jsonData = JSON.stringify({ name, author, publisher });
  // const jsonData = JSON.stringify(body);

  // const formData = new FormData();
  const formData = req.body;
  // formData.append('name', name);
  // formData.append('author', author);
  // formData.append('publisher', publisher);
  // formData.append('data', jsonData);
  // formData.append('coverImg', coverImg);
  // formData.append('book', book);

  // console.log(body);
  // console.log({
  //   coverImg,
  //   book,
  //   name: name,
  //   author: author,
  //   publisher: publisher,
  //   token: sessionId,
  //   owner: userUuid,
  // });

  let response = await fetch('http://localhost:8000/api/v1/books/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sessionId}`,
      'Content-Type': `multipart/form-data;boundary=${formData._boundary}`,
      Accept: '*/*',
    },
    body: formData,
  });
  response = await response.json();
  if (response.status === 'success') {
    res.status(200).json({ result: response });
  } else {
    console.log(
      // 'sessionId',
      // sessionId,
      // 'userUuid',
      // userUuid,
      'RES FROM SERVER : '.bgBrightRed,
      response
    );
    res.status(400).json({ result: response });
  }
}
