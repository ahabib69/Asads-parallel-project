// /api/news.js — Vercel serverless function (Node.js runtime)
// Google News-এর official RSS feed থেকে real, live headline আনে (legal, publicly available)

export default async function handler(req, res) {
  try {
    const r = await fetch('https://news.google.com/rss?hl=bn&gl=BD&ceid=BD:bn');
    const xml = await r.text();

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .slice(0, 8)
      .map((m) => {
        const block = m[1];
        const title = (block.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]
          .replace(/<!\[CDATA\[|\]\]>/g, '')
          .trim();
        const link = (block.match(/<link>([\s\S]*?)<\/link>/) || [, ''])[1].trim();
        return { title, link };
      });

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate'); // 5 min cache, ফ্রি tier এ request বাঁচায়
    res.status(200).json({ items, updated: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ items: [], error: 'failed to fetch news' });
  }
}
