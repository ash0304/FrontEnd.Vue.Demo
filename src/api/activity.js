import request from '../utils/request'

export function activityList(data) {
  return request({
    url: 'gameweb/Activity/ActivityList',
    method: 'post',
    data
  })
}

export function signUpActivity(data) {
  return request({
    url: 'gameweb/Activity/SignUpActivity',
    method: 'post',
    data
  })
}

export function myCurrentActivity() {
  return request({
    url: 'gameweb/Activity/MyCurrentActivity',
    method: 'post'
  })
}
export function applyLoginBonus() {
  return request({
    url: 'gameweb/Activity/ApplyLoginBonus',
    method: 'post'
  })
}
