/**
 * URL 查询参数
 * @param {string} 参数key
 */
export function getQueryString(name: string) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const search =
    window.location.search.substring(1) ||
    window.location.href.split('?')[1] ||
    ''
  let r = search.match(reg)
  // eslint-disable-next-line eqeqeq
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}
