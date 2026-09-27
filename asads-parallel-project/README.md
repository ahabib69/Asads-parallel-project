# Asad's Parallel — Deploy Guide

## যা আছে
- `index.html` — পুরো site (reminder, quotes, movies, sports, TV, music)
- `api/news.js` — Vercel serverless function যেটা Google News RSS থেকে real, live Bangla headline আনে

## Deploy করা (একদম ফ্রি, কোনো card লাগে না)

1. এই পুরো ফোল্ডারটা একটা GitHub repo-তে push করো
2. https://vercel.com এ GitHub দিয়ে sign in করো
3. "New Project" → repo select করো → Deploy চাপো (কোনো config লাগবে না, Vercel নিজেই `api/` folder detect করে নেয়)
4. Deploy শেষ হলে site লাইভ — `your-project.vercel.app`

## জরুরি নোট

- **Local এ `index.html` সরাসরি খুললে** (double-click করে browser এ) news feature কাজ করবে না — কারণ `/api/news` route শুধু Vercel-এ deploy করলেই কাজ করে
- Local এ test করতে চাইলে: `npx vercel dev` চালাও (Vercel CLI নিজেই api function গুলো simulate করে)
- News প্রতি ৫ মিনিটে refresh হয় — এর বেশি ঘন ঘন করলে Vercel free tier এর limit এ লাগতে পারে (তবে সাধারণ ব্যবহারে সমস্যা হবে না)
- TV embed (Jamuna TV) একইভাবে শুধু deploy করার পরই ঠিকমতো দেখাবে

## Deploy করার পর সরাসরি TV embed করতে চাইলে

`index.html` এ যেখানে "লাইভ দেখতে ক্লিক করো" বাটন আছে, ওটার জায়গায় এটা বসাও:

```html
<div class="video-wrap">
  <iframe src="https://www.youtube.com/embed/live_stream?channel=UCN6sm8iHiPd0cnoUardDAnw" title="Jamuna TV Live" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
```

এটা Vercel-এ কাজ করবে, Claude-এর preview-তে করবে না।

