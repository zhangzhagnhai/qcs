/**
 * Created by Administrator on 2017/7/21.
 */
export function formatDateA(date, fmt) {
  //date= new Date(Date.parse(date)/1000)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

export function formatDate(date, fmt) {
  if(!date)
    return
  //date= new Date(Date.parse(date)/1000)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.substr(0,4) + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.substr(5,2),
    'd+': date.substr(8,2),
    'h+': date.substr(11,2),
    'm+': date.substr(14,2),
    's+': date.substr(17,2)
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
