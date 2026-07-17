import { onMounted, onUnmounted } from 'vue'
import { scrollRevealDefaults } from '@/config'

export function useScrollReveal(selector, options = {}) {
  const opts = { ...scrollRevealDefaults, ...options }
  let observer = null

  onMounted(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-8')
        }
      })
    }, { threshold: opts.threshold, rootMargin: opts.rootMargin })

    elements.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out')
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
