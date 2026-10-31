# Singapore Deals & Events

A personal, static one-page site for Singapore promo codes, bank/card offers, free software, SME perks and upcoming expos, warehouse sales, markets and toy fairs. No ads, no affiliate links, no tracking, no build step.

Data is a snapshot **as of 1 Nov 2026**. Each item links to its source. Items marked "check before use" have an unclear expiry or a code built from a monthly pattern.

## Run locally

```bash
# Option 1: Python
python3 -m http.server 8080
# Option 2: Node
npx serve .
```

Open http://localhost:8080 (or the URL `serve` prints). You can also just double-click `index.html`, since the data is loaded from `data.js`, not fetched.

## Files

- `index.html`: page layout
- `styles.css`: mobile-first styles
- `app.js`: category chips, search, event-type filter, copy-code buttons
- `data.json` / `data.js`: the deals and events (same content; `data.js` is what the page loads)
- `build_data.py`: the source of truth. Edit it, then run `python3 build_data.py` to regenerate both data files.

## Updating

Add or edit a `d(...)` (deal) or `e(...)` (event) line in `build_data.py`, rerun it, and refresh the page. Remove expired items during each weekly refresh.
