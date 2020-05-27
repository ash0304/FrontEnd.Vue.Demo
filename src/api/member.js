import request from '../utils/request'

export function register(data) {
  return request({
    url: 'gameweb/Member/Register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: 'gameweb/Member/Login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'gameweb/Member/Logout',
    method: 'get'
  })
}

export function refreshToken() {
  return request({
    url: 'gameweb/Member/RefreshToken',
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: 'gameweb/Member/Info',
    method: 'get'
  })
}

export function getMemberInfo() {
  return request({
    url: 'gameweb/Member/GetMemberInfo',
    method: 'get'
  })
}

export function editMemberInfo(data) {
  return request({
    url: 'gameweb/Member/EditMemberInfo',
    method: 'post',
    data
  })
}

export function changeLoginPassword(data) {
  return request({
    url: 'gameweb/Member/ChangeLoginPassword',
    method: 'post',
    data
  })
}

// 修改取款密碼
export function changeWithdrawalPassword(data) {
  return request({
    url: 'gameweb/Member/ChangeWithdrawalPassword',
    method: 'post',
    data
  })
}

// 新增取款密碼
export function createWithdrawalPassword(data) {
  return request({
    url: 'gameweb/Member/CreateWithdrawalPassword',
    method: 'post',
    data
  })
}

// 取得會員银行卡
export function getMemberBankCard() {
  return request({
    url: 'gameweb/Member/GetMemberBankCard',
    method: 'get'
  })
}

// 取得银行列表
export function getBankList() {
  return request({
    url: 'gameweb/Member/GetBankList',
    method: 'get'
  })
}

// 填入會員姓名
export function fillMemberName(data) {
  return request({
    url: 'gameweb/Member/FillMemberName',
    method: 'post',
    data
  })
}

// 新增會員银行卡
export function createMemberBankCard(data) {
  return request({
    url: 'gameweb/Member/CreateMemberBankCard',
    method: 'post',
    data
  })
}

// 是否有提款密碼
export function hasWithdrawalPassword() {
  return request({
    url: 'gameweb/Member/HasWithdrawalPassword',
    method: 'post'
  })
}

export function checkIP() {
  return request({
    url: 'gameWeb/Member/CheckIP',
    method: 'get'
  })
}
