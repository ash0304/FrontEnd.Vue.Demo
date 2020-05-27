import axios from 'axios'
import store from '../store'
import { getToken, removeToken } from './auth'
import router from '../router/index'
import ModalHint from '../utils/HintModal'

// axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60 * 1000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.Code === 406) {
      removeToken()
      store.dispatch('user/logout')
      router
        .push({
          name: 'Home'
        })
        .catch(() => { })
      ModalHint.EventBus.$emit('show', {
        text: '验证过期，请重新登录'
      })
      store.dispatch('user/spinnerSwitch', 'close')
    } else if (res.Code === 105) {
      let isDoubleModal
      if (document.body.style['overflow-y'] === 'hidden') {
        isDoubleModal = true
      } else {
        isDoubleModal = false
      }
      ModalHint.EventBus.$emit('show', {
        text: '帐号已停用，请联系客服',
        isDoubleModal
      })
      store.dispatch('user/spinnerSwitch', 'close')
      return
    }
    return res
  },
  error => {
    console.log('error', error)
    // error Code 401時 登出且彈窗告知驗證過期
    // if (error.response.status === 401 || error.response.status === 406) {
    //   removeToken()
    //   store.dispatch('user/logout')
    //   router
    //     .push({
    //       name: 'Home'
    //     })
    //     .catch(() => { })
    //   ModalHint.EventBus.$emit('show', {
    //     text: '验证过期，请重新登录'
    //   })
    //   store.dispatch('user/spinnerSwitch', 'close')
    // } else {
    //   return Promise.reject(error)
    // }
  }
)

export default service
