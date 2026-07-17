// 动效参数集中配置 — 后续调效果只改这个文件

export const orbDefaults = {
  hue: 20,               // 色相偏移（0-360）
  hoverIntensity: 0.3,   // hover 形变强度
  rotateOnHover: true,   // hover 时旋转
  forceHoverState: false,
  backgroundColor: '#efe7da', // 背景色（--bg）
}

export const magicBentoDefaults = {
  spotlightColor: 'rgba(179, 50, 31, 0.15)', // --accent
  borderGlowColor: 'rgba(179, 50, 31, 0.3)',
  particleColor: '#d99a2b',                   // --pat-3
  magneticPull: 0.3,
}

export const scrollRevealDefaults = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
}

export const buttonGlowDefaults = {
  glowColor: 'rgba(179, 50, 31, 0.4)',
  blurRadius: 12,
}
