import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.post('/api/contact', async ({ request }) => {

    await delay(600); 

    if (Math.random() < 0.2) {
      console.log('MSW: fallo 503.');
      return HttpResponse.json({ error: 'Temporary failure' }, { status: 503 });
    }

    // 3. Simula éxito
    const body = (await request.json()) as Record<string, any>; 
    console.log('MSW: Envío exitoso.', body);

    return HttpResponse.json({ 
      status: 'queued', 
      id: crypto.randomUUID(), 
      ...body
    }, { status: 202 });
  }),
];
