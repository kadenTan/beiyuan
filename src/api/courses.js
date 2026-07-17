import siteContent from '@/data/site-content.js'

export function fetchCourses() {
  // TODO: 后续替换为 fetch('/api/v1/courses')
  return Promise.resolve(siteContent.courses || [])
}
