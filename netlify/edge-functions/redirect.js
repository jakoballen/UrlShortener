export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/' || path === '') {
    return context.next();
  }

  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.json', '.txt', '.woff2'];
  if (staticExtensions.some(ext => path.endsWith(ext))) {
    return context.next();
  }

  if (path.startsWith('/.netlify/functions/')) {
    return context.next();
  }

  if (request.method !== 'GET') {
    return context.next();
  }

  const shortCode = path.slice(1);

  try {
    const apiUrl = `https://f8n273yvq5.execute-api.us-east-2.amazonaws.com/test_v1/${shortCode}`;
    const apiResponse = await fetch(apiUrl, { redirect: 'manual' }); // prevent auto redirect

    if (apiResponse.status === 302) {
      // Get the Location header with the original long URL
      const originalUrl = apiResponse.headers.get('location');
      if (originalUrl) {
        return Response.redirect(originalUrl, 302);
      } else {
        return new Response('Redirect location header missing', { status: 500 });
      }
    } else if (apiResponse.ok) {
      // If API returns 200 with body for some reason, fallback
      const data = await apiResponse.json();
      const originalUrl = data.original_url || data.url || data.longUrl;
      if (originalUrl) {
        return Response.redirect(originalUrl, 302);
      }
      return new Response('No URL found in API response', { status: 404 });
    } else {
      return new Response('Short URL not found', { status: 404 });
    }
  } catch (error) {
    return new Response(`An error occurred: ${error.message}`, { status: 500 });
  }
};
