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

  const { clientId, clientSecret, code, redirectUri } = req.body;

  if (!clientId || !clientSecret || !code || !redirectUri) {
    return res.status(400).json({ error: 'Missing clientId, clientSecret, code, or redirectUri' });
  }

  try {
    const { data } = await axios.post(
      'https://graph.facebook.com/v19.0/oauth/access_token',
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        },
      }
    );

    // Check for error in the response data
    if (data.error) {
      return res.status(401).json({ valid: false, error: data.error });
    }

    // Success: you get access_token, token_type, expires_in
    return res.status(200).json({ valid: true, data });
  } catch (err) {
    // Log full error for debugging
    console.error('Token exchange failed:', err.response?.data || err.message);

    // 401 might be more semantically accurate than 200
    return res
      .status(401)
      .json({ valid: false, error: err.response?.data || err.message });
  }
};