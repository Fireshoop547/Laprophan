const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const configsDir = path.join(process.cwd(), 'api', 'configs');
    if (!fs.existsSync(configsDir)) {
      return res.status(404).json({ error: 'No configs found' });
    }
    const files = fs.readdirSync(configsDir).filter(f => f.endsWith('.json'));
    if (files.length === 0) {
      return res.status(404).json({ error: 'No configs found' });
    }
    // Sort files by timestamp in filename (descending)
    files.sort((a, b) => b.localeCompare(a));
    const latestFile = files[0];
    const content = fs.readFileSync(path.join(configsDir, latestFile), 'utf-8');
    const data = JSON.parse(content);
    data.filename = latestFile;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 