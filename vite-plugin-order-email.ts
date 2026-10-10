import type { Plugin } from 'vite';

const ORDER_EMAIL = 'luneashope@gmail.com';

export function orderEmailPlugin(): Plugin {
  return {
    name: 'order-email-api',
    configureServer(server) {
      server.middlewares.use('/api/send-order', (req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }

        let rawBody = '';
        req.on('data', (chunk) => {
          rawBody += chunk;
        });
        req.on('end', async () => {
          try {
            const response = await fetch(`https://formsubmit.co/ajax/${ORDER_EMAIL}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Referer: `${req.headers.origin ?? 'http://localhost:3000'}/`,
              },
              body: rawBody,
            });

            const text = await response.text();
            res.statusCode = response.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(text);
          } catch {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: 'false', message: 'Failed to send order email' }));
          }
        });
      });
    },
  };
}
