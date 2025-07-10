import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE || 'appDa8qQEcSLeoLWm');
const TABLE_NAME = 'FormSubmissions';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const records = await base(TABLE_NAME)
      .select({ sort: [{ field: 'Created', direction: 'desc' }] })
      .all();
    const configs = records.map(record => record.fields);
    return res.status(200).json(configs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 