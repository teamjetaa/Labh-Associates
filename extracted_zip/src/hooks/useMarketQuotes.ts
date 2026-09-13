import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface TickerItem {
  label: string;
  positive: boolean;
}

interface LiveQuote {
  symbol: string;
  display: string;
  positive: boolean;
}

/**
 * The ticker layout. Items with a `key` are replaced by live Yahoo Finance
 * quotes when available; the rest stay as static reference figures, because
 * Yahoo does not carry them.
 */
const TICKER_TEMPLATE: { key?: string; label: string; positive: boolean }[] = [
  { key: '^NSEI', label: 'NIFTY 50  +0.82%', positive: true },
  { key: '^BSESN', label: 'SENSEX  +0.61%', positive: true },
  { key: 'USDINR=X', label: 'USD/INR  \u20b983.42', positive: false },
  { key: 'GC=F', label: 'GOLD  \u20b962,150 / 10g', positive: true },
  { label: 'REPO RATE  6.50%', positive: false },
  { label: '10Y G-SEC  6.98%', positive: false },
  { key: 'CL=F', label: 'CRUDE  $78.20', positive: false },
  { label: 'MSME CREDIT  +12.4%', positive: true },
  { label: 'HOME LOAN  ~8.35%', positive: false },
  { key: 'SI=F', label: 'SILVER  \u20b974,300 / kg', positive: true },
];

const DEFAULT_TICKER: TickerItem[] = TICKER_TEMPLATE.map((item) => ({
  label: item.label,
  positive: item.positive,
}));

const REFRESH_INTERVAL_MS = 60000;

export function useMarketQuotes() {
  const [items, setItems] = useState<TickerItem[]>(DEFAULT_TICKER);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const load = useCallback(async () => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        'yahoo-finance-quotes',
      );
      if (fnError) throw fnError;

      const liveItems: LiveQuote[] = Array.isArray(data?.items) ? data.items : [];
      if (liveItems.length === 0) return;

      const liveMap = new Map<string, LiveQuote>();
      liveItems.forEach((quote) => liveMap.set(quote.symbol, quote));

      if (!mountedRef.current) return;

      const merged: TickerItem[] = TICKER_TEMPLATE.map((template) => {
        if (!template.key) return { label: template.label, positive: template.positive };
        const live = liveMap.get(template.key);
        if (!live) return { label: template.label, positive: template.positive };
        return { label: live.display, positive: live.positive };
      });

      setItems(merged);
      setError(null);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err instanceof Error ? err.message : 'Unable to load live quotes');
      // Keep the last known figures on screen so the ticker never goes blank.
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    load();
    const intervalId = setInterval(load, REFRESH_INTERVAL_MS);
    return () => {
      mountedRef.current = false;
      clearInterval(intervalId);
    };
  }, [load]);

  return { items, loading, error, refresh: load };
}