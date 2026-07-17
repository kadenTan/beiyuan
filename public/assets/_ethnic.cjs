/* 8 民族具象传统纹样 SVG 生成器。运行: node assets/_ethnic.cjs
   每个纹样输出 120x120 viewBox，传统配色，线描+填充结合 */
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "patterns");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

function wrap(inner, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
<rect width="120" height="120" rx="10" fill="${bg}"/>
${inner}
</svg>`;
}

const P = {};

// 壮族：壮锦菱形几何 + 云雷回纹，红底金线
P.zhuang = () => {
  const c = "#e8c25a", c2 = "#f4e3a8";
  let g = "";
  // 中心大菱形锦格
  g += `<path d="M60 18 L102 60 L60 102 L18 60 Z" fill="none" stroke="${c}" stroke-width="2.4"/>`;
  g += `<path d="M60 34 L86 60 L60 86 L34 60 Z" fill="none" stroke="${c2}" stroke-width="1.6"/>`;
  g += `<path d="M60 48 L72 60 L60 72 L48 60 Z" fill="${c}"/>`;
  // 四角云雷纹
  const corner = (x, y, sx, sy) =>
    `<path d="M${x} ${y} h${10*sx} v${10*sy} h${-6*sx} v${-6*sy} h${2*sx}" fill="none" stroke="${c2}" stroke-width="1.6"/>`;
  g += corner(20, 20, 1, 1) + corner(100, 20, -1, 1) + corner(20, 100, 1, -1) + corner(100, 100, -1, -1);
  return wrap(g, "#9e2b1c");
};

// 苗族：苗绣螺旋纹 + 蝴蝶妈妈母题，靛蓝底银线
P.miao = () => {
  const c = "#cfe3ec", c2 = "#7fb5cc";
  let g = "";
  // 双螺旋
  const spiral = (cx, dir) =>
    `<path d="M${cx} 60 q0 -18 ${18*dir} -18 q14 0 14 14 q0 10 -10 10 q-7 0 -7 -7" fill="none" stroke="${c}" stroke-width="2.2"/>`;
  g += spiral(50, 1) + spiral(70, -1);
  // 蝴蝶身体
  g += `<ellipse cx="60" cy="78" rx="5" ry="16" fill="${c2}"/>`;
  // 蝶翼
  g += `<path d="M60 70 q-22 -6 -26 14 q14 8 26 -2 Z" fill="none" stroke="${c}" stroke-width="2"/>`;
  g += `<path d="M60 70 q22 -6 26 14 q-14 8 -26 -2 Z" fill="none" stroke="${c}" stroke-width="2"/>`;
  g += `<circle cx="48" cy="80" r="2.4" fill="${c}"/><circle cx="72" cy="80" r="2.4" fill="${c}"/>`;
  return wrap(g, "#1c4a63");
};

// 藏族：八宝吉祥 + 雍仲(卍)纹，绛红底金线
P.zang = () => {
  const c = "#f0c95a", c2 = "#f7e6b0";
  let g = "";
  // 中心宝瓶轮廓(吉祥八宝之一)
  g += `<path d="M60 30 q-6 6 -6 12 q0 4 3 6 q-9 4 -9 16 q0 14 12 14 q12 0 12 -14 q0 -12 -9 -16 q3 -2 3 -6 q0 -6 -6 -12 Z" fill="none" stroke="${c}" stroke-width="2.2"/>`;
  // 雍仲纹(卍)四角
  const yung = (cx, cy, s) =>
    `<path d="M${cx} ${cy-s} V${cy} H${cx+s} M${cx} ${cy} H${cx-s} V${cy+s} M${cx} ${cy} V${cy+s} H${cx+s} M${cx} ${cy} H${cx-s} V${cy-s}" fill="none" stroke="${c2}" stroke-width="1.5"/>`;
  g += yung(28, 28, 7) + yung(92, 28, 7) + yung(28, 92, 7) + yung(92, 92, 7);
  return wrap(g, "#7a1f15");
};

// 蒙古族：盘长纹(无尽结) + 犄角纹，蓝底白线
P.meng = () => {
  const c = "#eaf2f8", c2 = "#a9cbe0";
  let g = "";
  // 盘长结(无尽结)
  g += `<path d="M44 44 h32 v32 h-32 Z" fill="none" stroke="${c}" stroke-width="2.4"/>`;
  g += `<path d="M60 30 V90 M30 60 H90" stroke="${c}" stroke-width="2.4"/>`;
  g += `<path d="M44 30 V44 H30 M76 30 V44 H90 M44 90 V76 H30 M76 90 V76 H90" fill="none" stroke="${c2}" stroke-width="2"/>`;
  // 犄角纹两侧
  const horn = (cx, dir) => `<path d="M${cx} 22 q${10*dir} 4 ${6*dir} 14 q${-3*dir} 6 ${-10*dir} 4" fill="none" stroke="${c2}" stroke-width="1.8"/>`;
  g += horn(20, 1) + horn(100, -1);
  return wrap(g, "#234b78");
};

module.exports = { fs, path, OUT, wrap, P };
