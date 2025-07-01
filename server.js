const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/verify-whatsapp', async (req, res) => {
  const { clientId, clientSecret } = req.body;
  try {
    const response = await axios.post('https://graph.facebook.com/v19.0/oauth/access_token', null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    });
    if (response.data.access_token) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (err) {
    res.json({ valid: false });
  }
});

app.listen(3000, () => console.log('Server running on port 3000')); 