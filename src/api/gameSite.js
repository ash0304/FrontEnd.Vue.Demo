import request from '../utils/request'

export function siteInfo(data) {
  return request({
    url: 'gameweb/GameSite/SiteInfo',
    method: 'post',
    data
  })
}

export function bannerList() {
  return request({
    url: 'gameweb/GameSite/BannerList',
    method: 'post'
  })
}
