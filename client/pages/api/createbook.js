import fs from "fs";
import axios from "axios";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const cookies = req.cookies;
  const sessionId = cookies.sessionId;
  const userUuid = cookies.userUuid;
  const { name, author, publisher, coverImg, book } = body;

  const pdfData = fs.readFileSync(book);

  // Create a new FormData object
  const formData = new FormData();
  formData.append("pdf", pdfData, "file.pdf");

  console.log({
    img: coverImg,
    pdfPath: book,
    name: name,
    author: author,
    publisher: publisher,
    token: sessionId,
    owner: userUuid,
  });

  let response = await fetch("http://localhost:8000/api/v1/books/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionId}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify({
      name: name,
      author: author,
      publisher: publisher,
      img: coverImg,
      pdfPath: book,
      token: sessionId,
      owner: userUuid,
    }),
  });
  response = await response.json();
  if (response.status === "success") {
    res.status(200).json({ result: response });
  } else {
    console.log(
      "sessionId",
      sessionId,
      "userUuid",
      userUuid,
      "response",
      response
    );
    res.status(400).json({ result: response });
  }
}
