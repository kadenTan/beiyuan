/* 生成全部主题 SVG 资源。运行: node assets/_build.cjs */
const { fs, path, OUT, PALETTES, rng, star8, diamond } = require("./_gen-art.cjs");

// 卡片占位图：织锦纹理 + 中心徽记 + 标签
function cardSVG(theme, label, seed) {
  const p = PALETTES[theme];
  const W = 800, H = 600;
  const r = rng(seed);
  let layers = "";

  // 斜向锦格网（菱形排列）
  const step = 54;
  for (let y = -step; y < H + step; y += step) {
    for (let x = -step; x < W + step; x += step) {
      const op = (0.05 + r() * 0.05).toFixed(3);
      layers += `<g opacity="${op}">${diamond(x + (Math.floor(y / step) % 2 ? step / 2 : 0), y, step * 0.46, p.line, 1)}</g>`;
    }
  }
  // 散布小八角星
  for (let i = 0; i < 7; i++) {
    const cx = 60 + r() * (W - 120), cy = 60 + r() * (H - 120);
    const rr = 10 + r() * 10;
    layers += `<g opacity="${(0.12 + r() * 0.12).toFixed(2)}">${star8(cx, cy, rr, p.ink, "none")}</g>`;
  }
  // 中心主徽记
  const cx = W * 0.5, cy = H * 0.46;
  const center =
    `<g opacity="0.9">${star8(cx, cy, 74, p.ink, "rgba(255,255,255,0.04)")}` +
    `${star8(cx, cy, 44, p.ink2, "none")}` +
    `<circle cx="${cx}" cy="${cy}" r="15" fill="${p.ink}" opacity="0.85"/></g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
    <stop offset="0" stop-color="${p.a}"/><stop offset="1" stop-color="${p.b}"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.5" cy="0.42" r="0.6">
    <stop offset="0" stop-color="${p.ink}" stop-opacity="0.18"/>
    <stop offset="1" stop-color="${p.ink}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
${layers}
${center}
<rect x="22" y="22" width="${W - 44}" height="${H - 44}" fill="none" stroke="${p.ink}" stroke-width="1.5" opacity="0.5" rx="6"/>
<text x="${W / 2}" y="${H - 54}" text-anchor="middle" font-family="'PingFang SC','Microsoft YaHei',sans-serif" font-size="30" font-weight="700" fill="${p.ink2}" opacity="0.92">${label}</text>
</svg>`;
}

module.exports = { cardSVG };

if (require.main === module) {
  // 占位，实际批量在 _build-run.cjs
  console.log("cardSVG ready");
}
