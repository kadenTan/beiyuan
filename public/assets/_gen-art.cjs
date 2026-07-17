/* 程序化生成民族织锦主题 SVG 资源。运行: node assets/_gen-art.cjs */
const fs = require("fs");
const path = require("path");
const OUT = __dirname;

// 主题调色板：金 / 靛蓝 / 朱砂 / 青绿
const PALETTES = {
  work:    { a: "#16324a", b: "#0a1c2c", ink: "#e8b04b", ink2: "#f2d491", line: "#37648a" },
  course:  { a: "#7a2418", b: "#39100a", ink: "#f0c24f", ink2: "#f6dca0", line: "#bd5a40" },
  school:  { a: "#123c32", b: "#071e19", ink: "#e2b24c", ink2: "#ecd79a", line: "#3c7d6a" },
  product: { a: "#875616", b: "#452c08", ink: "#1f4a5e", ink2: "#f4e2b8", line: "#caa24f" },
  hero:    { a: "#0e2a3e", b: "#081622", ink: "#e8b04b", ink2: "#f0d08a", line: "#2f5a78" },
};

function rng(seed) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

// 八角星徽记
function star8(cx, cy, r, stroke, fill) {
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const ang = (Math.PI / 8) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${(cx + Math.cos(ang) * rr).toFixed(1)},${(cy + Math.sin(ang) * rr).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`;
}
function diamond(cx, cy, r, stroke, sw = 1.2) {
  return `<path d="M${cx} ${cy-r} L${cx+r} ${cy} L${cx} ${cy+r} L${cx-r} ${cy} Z" fill="none" stroke="${stroke}" stroke-width="${sw}"/>`;
}

module.exports = { fs, path, OUT, PALETTES, rng, star8, diamond };
