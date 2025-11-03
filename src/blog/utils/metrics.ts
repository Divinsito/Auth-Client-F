

interface Metric {
    ok: boolean;
    latency?: number;
}

const METRICS_KEY = 'contact_metrics';

function getMetrics() {
    const stored = localStorage.getItem(METRICS_KEY);
    return stored ? JSON.parse(stored) : {
        success: 0,
        failed: 0,
        latencies: [] as number[],
    };
}

export function trackMetric(metric: Metric) {
    const currentMetrics = getMetrics();
    
    if (metric.ok) {
        currentMetrics.success++;
        if (metric.latency !== undefined) {
            currentMetrics.latencies.push(metric.latency);
        }
    } else {
        currentMetrics.failed++;
    }

    localStorage.setItem(METRICS_KEY, JSON.stringify(currentMetrics));
    
    window.dispatchEvent(new CustomEvent('metricsUpdate')); 
}

export function getStats() {
    const metrics = getMetrics();
    const total = metrics.success + metrics.failed;
    
    const avgLatency = metrics.latencies.length > 0
        ? metrics.latencies.reduce((a: number, b: number) => a + b, 0) / metrics.latencies.length
        : 0;

    return {
        success: metrics.success,
        failed: metrics.failed,
        totalAttempts: total,
        avgLatency: avgLatency.toFixed(2) + ' ms',
    };
}