import request from '../utils/request'

export function messageList(data) {
  return request({
    url: 'gameweb/Message/MessageList',
    method: 'post',
    data
  })
}
