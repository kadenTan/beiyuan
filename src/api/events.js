import siteContent from '@/data/site-content.js'

export function fetchEvents() {
  // TODO: 后续替换为 fetch('/api/v1/events')
  return Promise.resolve(siteContent.events || [])
}

export function fetchEventDetail(id) {
  // TODO: 后续替换为 fetch(`/api/v1/events/${id}`)
  return Promise.resolve(siteContent.events?.list?.find(e => e.id === id) || null)
}
