export default async function handler(req, res) {
    let response = await fetch('http://localhost:8000/api/v1/books', {
        method: "GET",
    })

    response = await response.json()
    if (response) {
        res.status(200).json({ result: response })
    }
}