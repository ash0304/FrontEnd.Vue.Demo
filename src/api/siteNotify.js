import request from '../utils/request'

export function siteNotifyList(data) {
  return request({
    url: 'gameweb/SiteNotify/SiteNotifyList',
    method: 'post',
    data
  })
}

export function readNotify(data) {
  return request({
    url: 'gameweb/SiteNotify/ReadNotify',
    method: 'post',
    data
  })
}

export function deleteNotify(data) {
  return request({
    url: 'gameweb/SiteNotify/DeleteNotify',
    method: 'post',
    data
  })
}

export function clearAllNotify() {
  return request({
    url: 'gameweb/SiteNotify/ClearAllNotify',
    method: 'post'
  })
}
