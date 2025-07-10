const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const configsDir = path.join(process.cwd(), 'api', 'configs');
  if (!fs.existsSync(configsDir)) {
    return res.status(200).json({ success: true, configs: [], count: 0 });
  }

  const files = fs.readdirSync(configsDir).filter(f => f.endsWith('.json'));
  const configs = files.map(file => {
    const content = fs.readFileSync(path.join(configsDir, file), 'utf-8');
    const data = JSON.parse(content);
    data.filename = file;
    return data;
  });

  // Sort by timestamp (newest first)
  configs.sort((a, b) => {
    return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
  });

  return res.status(200).json({ success: true, configs, count: configs.length });
} 