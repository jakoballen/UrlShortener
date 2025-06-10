const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const url = body.url;
  if (!url) {
    return { statusCode: 400, body: 'Missing url field' };
  }

  try {
    const API_URL = process.env.SHORTEN_API_URL;
    const awsResponse = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','x-api-key': process.env.SHORTEN_API_KEY},
      body: JSON.stringify({ url }),
    });

    const data = await awsResponse.json();

    // Expecting { shortCode: "abc123" } from AWS
    const shortCode = data.shortCode || data.short_id || data.shortUrl?.split('/').pop(); // fallback options
    const fullShortUrl = `https://t-9.cc/${shortCode}`;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shortUrl: fullShortUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
