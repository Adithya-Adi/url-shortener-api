const express = require('express');
const router = express.Router();
const { generateShortCode } = require('../utils/shorten');
const db = require('../utils/db');

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  const shortCode = generateShortCode();

  try {
    const query = 'INSERT INTO url_mappings (short_code, original_url) VALUES ($1, $2)';
    await db.query(query, [shortCode, originalUrl]);

    const domain = req.hostname; //  req.get('host')
    const port = process.env.PORT || 3000;
    const shortUrl = `http://${domain}:${port}/${shortCode}`;
    res.json({ shortUrl });
  } catch (error) {
    console.error('Error saving to PostgreSQL:', error);
    res.status(500).json({ error: 'Error creating short URL.' });
  }
});

router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const query = 'SELECT original_url FROM url_mappings WHERE short_code = $1';
    const result = await db.query(query, [shortCode]);

    if (result.rows.length > 0) {
      const originalUrl = result.rows[0].original_url;
      res.redirect(originalUrl);
    } else {
      res.status(404).json({ error: 'URL not found.' });
    }
  } catch (error) {
    console.error('Error retrieving from PostgreSQL:', error);
    res.status(500).json({ error: 'Error retrieving URL.' });
  }
});

module.exports = router;
