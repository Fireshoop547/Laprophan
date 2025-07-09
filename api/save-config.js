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

  // Save to /api/configs directory (for demo/dev only)
  const configsDir = path.join(process.cwd(), 'api', 'configs');
  if (!fs.existsSync(configsDir)) {
    fs.mkdirSync(configsDir, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `config_${timestamp}.json`;
  const filepath = path.join(configsDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

  return res.status(200).json({ success: true, filename, message: 'Configuration saved successfully' });
} 