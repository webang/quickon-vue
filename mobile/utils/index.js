/**
 * 追加参数到url
 */
export function buildQuery(url, name, value) {
  if (url.indexOf('?') === -1) {
    url += '?';
  } else {
    url += '&';
  }
  url += name + '=' + value;
  return url;
}

/**
 * 追加多个参数到url
 */
export function buildQuerys(url, obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      url = buildQuery(url, key, obj[key]);
    }
  }
  return url;
}
