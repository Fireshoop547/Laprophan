import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE || 'appDa8qQEcSLeoLWm');
const TABLE_NAME = 'FormSubmissions';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { persona, topic, objective, details, tone } = req.body || {};

  if (!persona || !topic || !objective || !details || !tone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await base(TABLE_NAME).create({
      Persona: persona,
      Topic: topic,
      Objective: objective,
      Details: details,
      Tone: tone
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 