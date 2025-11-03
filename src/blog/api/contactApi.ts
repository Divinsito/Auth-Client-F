
import axios, { AxiosError } from 'axios';
import * as Metrics from '../utils/metrics'; 
import { addToOfflineQueue } from '../utils/offlineQueue'; 
import { ContactPayload } from '../pages/Contact'; 


const api = axios.create({ baseURL: '/api', timeout: 3000 }); 

interface SendContactOptions {
    isSync?: boolean;
}

export async function sendContact(payload: ContactPayload, idempotencyKey: string, options: SendContactOptions = {}) {
  const maxRetries = options.isSync ? 0 : 2; 
  let attempt = 0;
  const headers = { 
      'Idempotency-Key': idempotencyKey,
      'X-Offline-Sync': options.isSync ? 'true' : 'false'
  };

  while (attempt <= maxRetries) {
    try {
      if (attempt > 0) {
          console.log(`[API] Reintento ${attempt} de ${maxRetries} para key: ${idempotencyKey.slice(0, 4)}...`);
      }
      
      const t0 = performance.now();
      const res = await api.post('/contact', payload, { headers });
      const t1 = performance.now();
      

      Metrics.trackMetric({ ok: true, latency: t1 - t0 }); 
      return res.data;

    } catch (err: unknown) {
      const axiosError = err as AxiosError;

      Metrics.trackMetric({ ok: false }); 

      const isNetworkError = !navigator.onLine || axiosError.code === 'ERR_NETWORK' || axiosError.response?.status === 503;

      if (!options.isSync && isNetworkError) {
          console.warn('[API] Offline/503 temporal detectado. Encolando el envío...');
          addToOfflineQueue(payload, idempotencyKey);
          throw new Error('OFFLINE_QUEUED'); 
      }

      const shouldRetry = attempt <= maxRetries && (
          axiosError.response?.status === 503 || axiosError.response?.status === 500
      );

      if (shouldRetry) {
          const delayTime = 500 * attempt;
          console.log(`[API] Fallo 5xx. Esperando ${delayTime}ms...`);
          await new Promise(r => setTimeout(r, delayTime)); 
          continue; 
      }
      
      console.error('[API] Fallo definitivo o error 4xx:', axiosError.response?.status || axiosError.message);
      throw err;
    }
  }
}