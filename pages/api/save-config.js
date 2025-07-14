import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

  try {
    await redis.set('user-config', data);
    return res.status(200).json({ success: true, message: 'Configuration saved successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 