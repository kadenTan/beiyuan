import siteContent from '@/data/site-content.js'

/**
 * 账号密码登录
 * @param {string} phone 手机号
 * @param {string} password 密码
 */
export function login(phone, password) {
  // TODO: 后续替换为真实 API
  // return fetch('/api/v1/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, password }) })
  const account = siteContent.defaultAccount
  if (phone === account.phone && password === account.password) {
    return Promise.resolve({ success: true, token: 'mock-token', data: { nickname: '阿圆', phone } })
  }
  return Promise.resolve({ success: false, message: '账号或密码错误' })
}

/**
 * 手机号快捷登录（验证码登录）
 * @param {string} phone 手机号
 * @param {string} code 验证码
 */
export function loginBySms(phone, code) {
  // TODO: 后续替换为真实 API
  // return fetch('/api/v1/auth/login/sms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, code }) })
  return Promise.resolve({ success: true, token: 'mock-token', data: { phone } })
}

/**
 * 发送短信验证码
 * @param {string} phone 手机号
 */
export function sendSmsCode(phone) {
  // TODO: 后续替换为真实 API
  // return fetch('/api/v1/auth/sms/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone }) })
  return Promise.resolve({ success: true, message: '验证码已发送' })
}

/**
 * 用户注册
 * @param {object} data { nickname, phone, code?, password, confirmPassword }
 */
export function register(data) {
  // TODO: 后续替换为真实 API
  // return fetch('/api/v1/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (data.password !== data.confirmPassword) {
    return Promise.resolve({ success: false, message: '两次密码不一致' })
  }
  return Promise.resolve({ success: true, message: '注册成功', data: { nickname: data.nickname, phone: data.phone } })
}
