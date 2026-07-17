import siteContent from '@/data/site-content.js'

export function fetchNewsList() {
  // TODO: 后续替换为 fetch('/api/v1/news')
  // 统一使用 siteContent.news 作为列表数据源
  return Promise.resolve(siteContent.news || [])
}

export function fetchNewsDetail(id) {
  // TODO: 后续替换为 fetch(`/api/v1/news/${id}`)
  // id 为数组下标；优先取 newsDetail 详情数据，不存在则用 news 数组行 fallback
  const idx = parseInt(id, 10)
  const allNews = siteContent.news || []
  const allDetail = siteContent.newsDetail || []

  if (allDetail[idx]) {
    return Promise.resolve({ detail: allDetail[idx], allNews, idx })
  }
  // fallback：从 news 二维数组拼简易详情
  const row = allNews[idx]
  if (!row) return Promise.resolve({ detail: null, allNews, idx })

  return Promise.resolve({
    detail: {
      title: row[1],
      subtitle: row[2],
      category: row[0],
      date: row[4],
      source: '贝元民族影像智创平台',
      author: '平台运营中心',
      readCount: '',
      coverImage: row[3],
      sections: [{ type: 'p', text: row[2] }],
    },
    allNews,
    idx,
  })
}
