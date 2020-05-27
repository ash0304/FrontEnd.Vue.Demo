import request from '../utils/request'

// 提款
export function withdrawal(data) {
  return request({
    url: 'gameweb/Withdrawal/Withdrawal',
    method: 'post',
    data
  })
}

// 取得提款限制
export function getWithdrawalLimit() {
  return request({
    url: 'gameweb/Withdrawal/GetWithdrawalLimit',
    method: 'post'
  })
}
