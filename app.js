(function(){
  const data = window.PORTAL_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const NOCODE = /^(No code|Collect|Clip|Shown|See|Watch|Apply|Code in)/;
  $("asof").textContent = data.asOf;
  let cat = "All", q = "", type = "All";
  const cats = ["All", ...new Set(data.deals.map(d => d.category))];
  const types = ["All", ...new Set(data.events.map(e => e.type))];
  function chips(el, list, cur, on){
    el.innerHTML = list.map(c => `<button class="chip${c===cur?" on":""}" data-v="${esc(c)}">${esc(c)}</button>`).join("");
    el.querySelectorAll("button").forEach(b => b.onclick = () => on(b.dataset.v));
  }
  function renderDeals(){
    chips($("chips"), cats, cat, v => { cat = v; renderDeals(); });
    const t = q.toLowerCase();
    const rows = data.deals.filter(d => (cat==="All"||d.category===cat) &&
      (!t || [d.brand,d.offer,d.code,d.category].join(" ").toLowerCase().includes(t)));
    $("dealCount").textContent = rows.length + " of " + data.deals.length;
    $("dealGrid").innerHTML = rows.length ? rows.map(d => {
      const free = d.code === "Free";
      const codeHtml = free ? `<span class="pill free">FREE</span>` :
        NOCODE.test(d.code) ? `<span class="nocode">${esc(d.code)}</span>` :
        `<span class="code">${esc(d.code)}<button data-c="${esc(d.code)}">Copy</button></span>`;
      const warn = d.note && d.note.startsWith("check") ? `<span class="pill warn" title="${esc(d.note)}">check before use</span>` : "";
      return `<article class="card"><span class="cat">${esc(d.category)}</span><h3>${esc(d.brand)}</h3>
        <div>${esc(d.offer)}</div>${codeHtml}
        <div class="meta"><span>Valid: ${esc(d.valid)}</span>${warn}</div>
        <a class="src" href="${esc(d.source)}" target="_blank" rel="noopener noreferrer">Source →</a></article>`;
    }).join("") : `<div class="empty">No deals match.</div>`;
    $("dealGrid").querySelectorAll("button[data-c]").forEach(b => b.onclick = () => {
      navigator.clipboard && navigator.clipboard.writeText(b.dataset.c);
      b.textContent = "Copied"; setTimeout(() => b.textContent = "Copy", 1200);
    });
  }
  function renderEvents(){
    chips($("typeChips"), types, type, v => { type = v; renderEvents(); });
    const rows = data.events.filter(e => type==="All"||e.type===type).sort((a,b) => a.start.localeCompare(b.start));
    $("eventCount").textContent = rows.length + " events";
    $("eventList").innerHTML = rows.map(e => `<article class="ev"><div class="date">${esc(e.dates)}</div>
      <div><h3>${esc(e.event)}</h3><div class="v">${esc(e.venue)} · ${esc(e.type)}</div></div>
      <div class="fee"><div>Entry: <strong>${esc(e.fee)}</strong></div><a class="src" href="${esc(e.source)}" target="_blank" rel="noopener noreferrer">Source →</a></div></article>`).join("");
  }
  $("search").addEventListener("input", e => { q = e.target.value; renderDeals(); });
  renderDeals(); renderEvents();
})();
