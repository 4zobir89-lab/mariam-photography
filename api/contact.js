const { Pool } = require('@neondatabase/serverless');

let pool = null;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return null;
    }
    pool = new Pool({ connectionString, max: 1 });
  }
  return pool;
}

async function initDb() {
  const p = getPool();
  if (!p) return false;
  try {
    await p.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        service VARCHAR(100),
        event_date VARCHAR(100),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    return true;
  } catch (e) {
    console.error('DB init error:', e.message);
    return false;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, service, event_date, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const dbReady = await initDb();
  if (dbReady) {
    try {
      const p = getPool();
      await p.query(
        'INSERT INTO contacts (name, email, service, event_date, message) VALUES ($1, $2, $3, $4, $5)',
        [name, email, service || null, event_date || null, message]
      );
    } catch (e) {
      console.error('DB insert error:', e.message);
    }
  }

  return res.status(200).json({ success: true, message: 'Message received. Thank you!' });
};
