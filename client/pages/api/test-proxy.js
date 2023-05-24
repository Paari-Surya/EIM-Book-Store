import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      'http://localhost:8000/uploads/img/coverImg1684837306575.jpg'
    );
    const data = response.data;

    res.status(200).json({ status: 'success', data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
