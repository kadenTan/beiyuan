import siteContent from '@/data/site-content.js'

export function fetchWorks() {
  // TODO: 后续替换为 fetch('/api/v1/works')
  return Promise.resolve(siteContent.exhibition?.list || [])
}
