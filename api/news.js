export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const apiUrl = `https://gnews.io/api/v4/search?q=${q}&lang=en&apikey=${apiKey}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`GNews API responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from GNews API:', error);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
}
