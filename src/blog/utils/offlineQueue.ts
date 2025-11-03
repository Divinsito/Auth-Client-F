
import { sendContact } from '../api/contactApi';

const QUEUE_KEY = 'contact_queue';

interface QueueItem {
    payload: any;
    idempotencyKey: string;
    createdAt: number;
}

function getQueue(): QueueItem[] {
    const stored = localStorage.getItem(QUEUE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveQueue(queue: QueueItem[]) {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function addToOfflineQueue(payload: any, idempotencyKey: string) {
    const queue = getQueue();
    queue.push({ payload, idempotencyKey, createdAt: Date.now() });
    saveQueue(queue);

    window.dispatchEvent(new CustomEvent('queueUpdate'));
    return getQueueSize();
}

export function getQueueSize() {
    return getQueue().length;
}

export async function syncQueue() {
    if (getQueueSize() === 0) return;
    
    console.log('Internet restaurado. Sincronizando cola...');
    const queue = getQueue();
    const successfulIndexes: number[] = [];
    
    for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        try {
            await sendContact(item.payload, item.idempotencyKey, { isSync: true });
            successfulIndexes.push(i);
        } catch (error) {
            console.error('Fallo al sincronizar un elemento, se reintentará más tarde.', error);

        }
    }

    const newQueue = queue.filter((_, index) => !successfulIndexes.includes(index));
    saveQueue(newQueue);
    window.dispatchEvent(new CustomEvent('queueUpdate'));
    
    if (newQueue.length === 0) {
        console.log('Sincronización de cola completada.');
    } else {
        console.log(`Quedan ${newQueue.length} elementos en cola.`);
    }
}

// Añadir listener global
window.addEventListener('online', syncQueue);