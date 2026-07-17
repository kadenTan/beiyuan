/* 批量生成全部资源。运行: node assets/_build-run.cjs */
const fs = require("fs");
const path = require("path");
const { cardSVG } = require("./_build.cjs");
const { heroSVG } = require("./_hero.cjs");
const OUT = __dirname;

const jobs = [];

// hero
jobs.push(["hero-lab.svg", heroSVG()]);

// works 8
const works = ["民族纹样海报","非遗色彩艺术","虚拟讲述人","城市文化IP","影像短片","文创概念","云端展馆","结课影像"];
works.forEach((l, i) => jobs.push([`work-0${i + 1}.svg`, cardSVG("work", l, 101 + i * 7)]));

// courses 6
const courses = ["AIGC 创作导论","影像短片项目课","虚拟讲述人课","版权与存证","文创IP设计","展厅策展运营"];
courses.forEach((l, i) => jobs.push([`course-0${i + 1}.svg`, cardSVG("course", l, 201 + i * 7)]));

// schools 6
const schools = ["中央民族影像室","西部艺术学院","湾区数字创意","华东传媒设计","非遗创新中心","文化影像研究院"];
schools.forEach((l, i) => jobs.push([`school-0${i + 1}.svg`, cardSVG("school", l, 301 + i * 7)]));

// products 6
const products = ["纹样明信片","提示词卡牌","云展纪念册","院校视觉包","节庆动态海报","短片概念设定"];
products.forEach((l, i) => jobs.push([`product-0${i + 1}.svg`, cardSVG("product", l, 401 + i * 7)]));

jobs.forEach(([name, svg]) => {
  fs.writeFileSync(path.join(OUT, name), svg.trim());
});
console.log(`生成 ${jobs.length} 个 SVG 资源`);
