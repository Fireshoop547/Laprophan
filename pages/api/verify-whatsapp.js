const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientId, clientSecret } = req.body;

  if (!clientId || !clientSecret) {
    return res.status(400).json({ error: 'Missing clientId or clientSecret' });
  }

  try {
    const { data } = await axios.get(
      'https://graph.facebook.com/oauth/access_token',
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials'
        }
      }
    );

    // If we get an access_token, credentials are valid
    if (data.access_token) {
      return res.status(200).json({ valid: true, data });
    } else {
      return res.status(401).json({ valid: false, error: data });
    }
  } catch (err) {
    // Log full error for debugging
    console.error('Client credentials check failed:', err.response?.data || err.message);

    return res
      .status(401)
      .json({ valid: false, error: err.response?.data || err.message });
  }
};