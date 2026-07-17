import { onMounted, onUnmounted } from 'vue'
import { magicBentoDefaults } from '@/config'

// MagicBento — 卡片聚光灯 + 磁吸 + 边框光 + 点击涟漪
export function useMagicBento(containerRef, options = {}) {
  const opts = { ...magicBentoDefaults, ...options }
  let cleanupFns = []

  onMounted(() => {
    const container = containerRef.value
    if (!container) return

    const cards = container.querySelectorAll('.bento-card')
    if (!cards.length) return

    cards.forEach(card => {
      let rafId = null

      function onMove(e) {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2

        // 磁吸微位移
        const pullX = (x - cx) * opts.magneticPull
        const pullY = (y - cy) * opts.magneticPull
        card.style.transform = `translate(${pullX}px, ${pullY}px)`

        // 聚光灯跟随
        card.style.setProperty('--spotlight-x', `${x}px`)
        card.style.setProperty('--spotlight-y', `${y}px`)
      }

      function onLeave() {
        card.style.transform = 'translate(0, 0)'
        card.style.setProperty('--spotlight-x', '50%')
        card.style.setProperty('--spotlight-y', '50%')
      }

      function onClick() {
        // 涟漪
        card.style.transform = 'scale(0.98)'
        requestAnimationFrame(() => {
          card.style.transform = ''
        })
      }

      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      card.addEventListener('click', onClick)
      cleanupFns.push(() => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
        card.removeEventListener('click', onClick)
      })

      // Inject spotlight style
      if (!card.style.getPropertyValue('--spotlight-x')) {
        card.style.transition = 'transform 0.15s ease-out'
        card.style.position = 'relative'
        card.style.overflow = 'hidden'
        const overlay = document.createElement('div')
        overlay.className = 'bento-overlay'
        overlay.style.cssText = `
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(circle 200px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${opts.spotlightColor}, transparent 70%);
        `
        card.appendChild(overlay)
        cleanupFns.push(() => overlay.remove())
      }
    })
  })

  onUnmounted(() => {
    cleanupFns.forEach(fn => fn())
  })
}
