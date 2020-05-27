import request from '../utils/request'

// 登入遊戲
export function gameLogin(data) {
  return request({
    url: 'gameweb/Game/GameLogin',
    method: 'post',
    data
  })
}

export function gameListByType(data) {
  return request({
    url: 'gameweb/Game/GameListByType',
    method: 'post',
    data
  })
}

export function allGameList() {
  return request({
    url: 'gameweb/Game/AllGameList',
    method: 'post'
  })
}

// 取得會員餘額
export function getMemberBalance() {
  return request({
    url: 'gameweb/Game/GetMemberBalance',
    method: 'get'
  })
}

// 取得各平台會員餘額
export function getMemberPlatformBalance(data) {
  return request({
    url: 'gameweb/Game/GetMemberPlatformBalance',
    method: 'post',
    data
  })
}

// 一鍵轉回
export function membeBlanceRecycle() {
  return request({
    url: 'gameweb/Game/MembeBlanceRecycle',
    method: 'get'
  })
}

// 平台轉帳
export function membeTransfer(data) {
  return request({
    url: 'gameweb/Game/MembeTransfer',
    method: 'post',
    data
  })
}

// 取得平台列表
export function getGamePlatform(data) {
  return request({
    url: 'gameweb/Game/GetGamePlatform',
    method: 'post',
    data
  })
}

// 取得電子遊戲子列表
export function getSubGameList(data) {
  return request({
    url: 'gameweb/Game/SubGameList',
    method: 'post',
    data
  })
}
