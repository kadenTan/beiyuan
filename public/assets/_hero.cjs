/* hero 横向 banner 背景 SVG：靛蓝天幕 + 雪山剪影 + 织锦光纹 */
const { PALETTES, rng, star8, diamond } = require("./_gen-art.cjs");

function heroSVG() {
  const p = PALETTES.hero;
  const W = 1600, H = 900;
  const r = rng(77);
  let deco = "";

  // 右侧锦格光纹
  const step = 70;
  for (let y = -step; y < H + step; y += step) {
    for (let x = W * 0.42; x < W + step; x += step) {
      deco += `<g opacity="${(0.05 + r() * 0.06).toFixed(3)}">${diamond(x + (Math.floor(y / step) % 2 ? step / 2 : 0), y, step * 0.46, p.line, 1)}</g>`;
    }
  }
  // 发光八角星（偏右）
  for (let i = 0; i < 12; i++) {
    const cx = W * 0.42 + r() * (W * 0.56), cy = 40 + r() * (H * 0.62);
    const rr = 12 + r() * 22;
    deco += `<g opacity="${(0.1 + r() * 0.16).toFixed(2)}">${star8(cx, cy, rr, p.ink, "none")}</g>`;
  }
  // 主徽记
  const cx = W * 0.73, cy = H * 0.4;
  deco += `<g opacity="0.85">${star8(cx, cy, 120, p.ink, "rgba(232,176,75,0.05)")}${star8(cx, cy, 72, p.ink2, "none")}<circle cx="${cx}" cy="${cy}" r="22" fill="${p.ink}" opacity="0.8"/></g>`;

  // 雪山剪影
  const mtn = (yBase, col, op) => {
    let d = `M0 ${H} L0 ${yBase}`, x = 0;
    while (x < W) {
      const peak = yBase - (40 + r() * 150);
      const vx = x + 120 + r() * 180;
      d += ` L${((x + vx) / 2).toFixed(0)} ${peak.toFixed(0)} L${vx.toFixed(0)} ${(yBase - 10 + r() * 30).toFixed(0)}`;
      x = vx;
    }
    return `<path d="${d} L${W} ${H} Z" fill="${col}" opacity="${op}"/>`;
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<defs>
  <linearGradient id="sky" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0" stop-color="#0c2436"/>
    <stop offset="0.55" stop-color="${p.a}"/>
    <stop offset="1" stop-color="${p.b}"/>
  </linearGradient>
  <radialGradient id="aura" cx="0.72" cy="0.4" r="0.5">
    <stop offset="0" stop-color="${p.ink}" stop-opacity="0.22"/>
    <stop offset="1" stop-color="${p.ink}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="leftshade" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#06121c" stop-opacity="0.72"/>
    <stop offset="0.5" stop-color="#06121c" stop-opacity="0.12"/>
    <stop offset="1" stop-color="#06121c" stop-opacity="0"/>
  </linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
<rect width="${W}" height="${H}" fill="url(#aura)"/>
${deco}
${mtn(H * 0.74, "#0a2230", 0.9)}
${mtn(H * 0.82, "#071824", 0.92)}
${mtn(H * 0.9, "#050f17", 0.96)}
<rect width="${W}" height="${H}" fill="url(#leftshade)"/>
</svg>`;
}
module.exports = { heroSVG };
