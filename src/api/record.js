import request from '../utils/request'

export function getTransactionRecords(data) {
  return request({
    url: 'gameweb/Record/GetTransactionRecords',
    method: 'post',
    data
  })
}

export function getBetRecords(data) {
  return request({
    url: 'gameweb/Record/GetBetRecords',
    method: 'post',
    data
  })
}
