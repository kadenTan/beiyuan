import { onMounted, onUnmounted } from 'vue'
import { buttonGlowDefaults } from '@/config'

export function useButtonGlow(selector, options = {}) {
  const opts = { ...buttonGlowDefaults, ...options }
  let listeners = []

  onMounted(() => {
    const buttons = document.querySelectorAll(selector)
    buttons.forEach(btn => {
      function onMove(e) {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        btn.style.setProperty('--glow-x', `${x}px`)
        btn.style.setProperty('--glow-y', `${y}px`)
      }
      btn.addEventListener('mousemove', onMove)
      listeners.push([btn, onMove])
    })
  })

  onUnmounted(() => {
    listeners.forEach(([btn, fn]) => btn.removeEventListener('mousemove', fn))
  })
}
