const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  let data = req.body;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }

  if (!data) {
    return res.status(400).json({ error: 'No data provided' });
  }

  // Save to /public/latest-config.json
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const filepath = path.join(publicDir, 'latest-config.json');
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

  return res.status(200).json({ success: true, message: 'Latest config saved successfully' });
} 