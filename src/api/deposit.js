import request from '../utils/request'

// 取得支付設定
export function getPaymentSetting() {
  return request({
    url: 'gameweb/Deposit/GetPaymentSetting',
    method: 'post'
  })
}

// 取得支付银行卡
export function getPaymentBankCard(data) {
  return request({
    url: 'gameweb/Deposit/GetPaymentBankCard',
    method: 'post',
    data
  })
}

// 银行卡充值
export function bankCardDeposit(data) {
  return request({
    url: 'gameweb/Deposit/BankCardDeposit',
    method: 'post',
    data
  })
}

// 取得第三方充值通道
export function getThridPartyDepositChannel(data) {
  return request({
    url: 'gameweb/Deposit/GetThridPartyDepositChannel',
    method: 'post',
    data
  })
}

// 第三方充值
export function thirdPartyDeposit(data) {
  return request({
    url: 'gameweb/Deposit/ThridPartyDeposit',
    method: 'post',
    data
  })
}
