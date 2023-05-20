export default async function handler(req, res) {
  const sessionId = req.cookies.sessionId;
  const userUuid = req.cookies.userUuid;
  let response = await fetch(`http://localhost:8000/api/v1/users/${userUuid}`, {
    method: "GET",
  });
  response = await response.json();
  if (response.status === "success") {
    res.status(200).json({ result: response });
  } else {
    console.log("UserUuid", userUuid, "sessionId", sessionId);
    res.status(400).json({ result: response });
  }
}
