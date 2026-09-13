import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

// Map our ticker instruments to Yahoo Finance symbols.
const INSTRUMENTS = [
  { symbol: "^NSEI", label: "NIFTY 50", kind: "index" },
  { symbol: "^BSESN", label: "SENSEX", kind: "index" },
  { symbol: "USDINR=X", label: "USD/INR", kind: "currency" },
  { symbol: "GC=F", label: "GOLD", kind: "gold" },
  { symbol: "SI=F", label: "SILVER", kind: "silver" },
  { symbol: "CL=F", label: "CRUDE", kind: "crude" },
];

const TROY_OUNCE_GRAMS = 31.1034768;

interface Quote {
  price: number;
  changePct: number;
}

async function fetchQuote(symbol: string): Promise<Quote> {
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Yahoo request failed for ${symbol}: ${res.status}`);
  }
  const json = await res.json();
  const meta = json?.chart?.result?.[0]?.meta;
  if (!meta || typeof meta.regularMarketPrice !== "number") {
    throw new Error(`No usable data for ${symbol}`);
  }
  const price: number = meta.regularMarketPrice;
  const prevClose: number = meta.chartPreviousClose ?? meta.previousClose ?? price;
  const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;
  return { price, changePct };
}

function indianFormat(value: number, fractionDigits = 0): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Fetch all instruments in parallel; tolerate individual failures.
    const results = await Promise.all(
      INSTRUMENTS.map(async (inst) => {
        try {
          const quote = await fetchQuote(inst.symbol);
          return { inst, quote };
        } catch (_err) {
          return { inst, quote: null as Quote | null };
        }
      }),
    );

    // USD -> INR rate (INR per USD) needed to convert bullion spot prices.
    const usdInr = results.find((r) => r.inst.symbol === "USDINR=X")?.quote;
    const usdInrRate = usdInr?.price ?? 0;

    const items = results
      .filter((r) => r.quote !== null)
      .map((r) => {
        const { inst, quote } = r as { inst: typeof INSTRUMENTS[number]; quote: Quote };
        const positive = quote.changePct >= 0;
        let display = inst.label;

        if (inst.kind === "index") {
          const sign = positive ? "+" : "";
          display = `${inst.label}  ${sign}${quote.changePct.toFixed(2)}%`;
        } else if (inst.kind === "currency") {
          display = `${inst.label}  \u20b9${quote.price.toFixed(2)}`;
        } else if (inst.kind === "gold") {
          const per10g = quote.price * (10 / TROY_OUNCE_GRAMS) * usdInrRate;
          display = `${inst.label}  \u20b9${indianFormat(per10g)} / 10g`;
        } else if (inst.kind === "silver") {
          const perKg = quote.price * (1000 / TROY_OUNCE_GRAMS) * usdInrRate;
          display = `${inst.label}  \u20b9${indianFormat(perKg)} / kg`;
        } else if (inst.kind === "crude") {
          display = `${inst.label}  $${quote.price.toFixed(2)}`;
        }

        return {
          symbol: inst.symbol,
          label: inst.label,
          display,
          positive,
          price: quote.price,
          changePct: Number(quote.changePct.toFixed(2)),
        };
      });

    if (items.length === 0) {
      return new Response(
        JSON.stringify({ error: "No quotes available right now" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ updatedAt: new Date().toISOString(), items }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Relay failed",
        detail: err instanceof Error ? err.message : String(err),
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
