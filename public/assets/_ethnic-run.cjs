/* 维/彝/回/满 纹样 + 批量输出。运行: node assets/_ethnic-run.cjs */
const { fs, path, OUT, wrap, P } = require("./_ethnic.cjs");

// 维吾尔族：巴旦木纹 + 对称石榴花，宝石绿底金线
P.weiwuer = () => {
  const c = "#e9c45c", c2 = "#f3e1a6";
  let g = "";
  // 巴旦木(杏仁)主形
  g += `<path d="M60 26 q22 18 0 50 q-22 -32 0 -50 Z" fill="none" stroke="${c}" stroke-width="2.4"/>`;
  g += `<path d="M60 36 q12 12 0 30 q-12 -18 0 -30 Z" fill="${c}" opacity="0.85"/>`;
  // 下方对称石榴花卷草
  const vine = (dir) => `<path d="M60 84 q${18*dir} 2 ${20*dir} 18 q${-2*dir} -12 ${-12*dir} -12" fill="none" stroke="${c2}" stroke-width="1.8"/>`;
  g += vine(1) + vine(-1);
  g += `<circle cx="60" cy="86" r="3.2" fill="${c}"/>`;
  return wrap(g, "#16604e");
};

// 彝族：火镰纹 + 羊角纹，黑底红黄(彝族尚黑红黄)
P.yi = () => {
  const c = "#e0452f", c2 = "#f0b73e";
  let g = "";
  // 中心火镰(回旋火纹)
  g += `<path d="M60 34 q20 0 20 20 q0 16 -16 16 q-12 0 -12 -12 q0 -8 8 -8 q5 0 5 5" fill="none" stroke="${c}" stroke-width="2.6"/>`;
  // 双羊角(对称外卷)
  const ram = (dir) => `<path d="M60 84 q${22*dir} 2 ${22*dir} -16 q0 -8 ${-8*dir} -8 q${-6*dir} 0 ${-5*dir} 7" fill="none" stroke="${c2}" stroke-width="2.4"/>`;
  g += ram(1) + ram(-1);
  g += `<circle cx="60" cy="86" r="3.4" fill="${c2}"/>`;
  return wrap(g, "#1d1714");
};

// 回族：阿拉伯几何缠枝(八角对称)，青底金线
P.hui = () => {
  const c = "#e7c45a", c2 = "#f4e3a6";
  let g = "";
  // 八角几何星(伊斯兰风)
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI / 8) * i - Math.PI / 2;
    const r = i % 2 === 0 ? 34 : 18;
    pts.push(`${(60 + Math.cos(a) * r).toFixed(1)},${(60 + Math.sin(a) * r).toFixed(1)}`);
  }
  g += `<polygon points="${pts.join(" ")}" fill="none" stroke="${c}" stroke-width="2.2"/>`;
  // 内嵌叠加八角(旋转)
  g += `<rect x="42" y="42" width="36" height="36" fill="none" stroke="${c2}" stroke-width="1.6"/>`;
  g += `<rect x="42" y="42" width="36" height="36" fill="none" stroke="${c2}" stroke-width="1.6" transform="rotate(45 60 60)"/>`;
  g += `<circle cx="60" cy="60" r="5" fill="${c}"/>`;
  return wrap(g, "#16544f");
};

// 满族：云纹 + 海水江崖，石青底金线
P.man = () => {
  const c = "#edc95c", c2 = "#f5e4ad";
  let g = "";
  // 如意云头(上)
  g += `<path d="M60 28 q-14 0 -14 12 q-10 -2 -10 8 q0 8 10 8 h28 q10 0 10 -8 q0 -10 -10 -8 q0 -12 -14 -12 Z" fill="none" stroke="${c}" stroke-width="2.2"/>`;
  // 海水江崖(下，多层弧)
  for (let i = 0; i < 3; i++) {
    const y = 78 + i * 6;
    g += `<path d="M24 ${y} q18 -12 36 0 q18 12 36 0" fill="none" stroke="${i === 0 ? c : c2}" stroke-width="1.8"/>`;
  }
  // 立水竖线
  g += `<path d="M60 92 V104 M48 94 V104 M72 94 V104" stroke="${c2}" stroke-width="1.5"/>`;
  return wrap(g, "#1f3a5c");
};

const order = [
  ["zhuang", "壮族"], ["miao", "苗族"], ["zang", "藏族"], ["meng", "蒙古族"],
  ["weiwuer", "维吾尔族"], ["yi", "彝族"], ["hui", "回族"], ["man", "满族"],
];
order.forEach(([key]) => {
  fs.writeFileSync(path.join(OUT, key + ".svg"), P[key]().trim());
});
// 输出清单供页面用
fs.writeFileSync(path.join(OUT, "_manifest.json"), JSON.stringify(order));
console.log("生成 " + order.length + " 个民族纹样 → assets/patterns/");
