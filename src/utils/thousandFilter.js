export const thousandFilter = value => {
  value += ''
  if (value.indexOf('.') > -1) {
    value = Number(value).toFixed(2)
    value += ''
  }
  const arr = value.split('.')
  const re = /(\d{1,3})(?=(\d{3})+$)/g
  return arr[0].replace(re, '$1,') + (arr.length === 2 ? '.' + arr[1] : '')
}
