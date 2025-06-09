document.getElementById('shorten-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const longUrl = document.getElementById('longUrl').value;
  const resultEl = document.getElementById('result');
  resultEl.textContent = 'Shortening...';

  try {
    const response = await fetch('/.netlify/functions/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: longUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    const data = await response.json();

    // Show short URL and copy button side by side
    resultEl.innerHTML = `
      <a href="${data.shortUrl}" target="_blank" rel="noopener" id="short-url">${data.shortUrl}</a>
      <button id="copy-btn" type="button">Copy</button>
    `;

    // Copy button logic
    document.getElementById('copy-btn').addEventListener('click', () => {
      navigator.clipboard.writeText(data.shortUrl).then(() => {
        const btn = document.getElementById('copy-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 1500);
      }).catch(() => {
        alert('Failed to copy to clipboard');
      });
    });
  } catch (err) {
    resultEl.textContent = `Error: ${err.message}`;
  }
});
