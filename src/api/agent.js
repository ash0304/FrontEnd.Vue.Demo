import request from '../utils/request'

export function addAgentApply(data) {
  return request({
    url: 'gameweb/Agent/AddAgentApply',
    method: 'post',
    data
  })
}
