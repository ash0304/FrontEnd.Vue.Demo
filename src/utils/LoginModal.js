import LoginModal from '../components/Modal/LoginModal'

const ModalLogin = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('LoginModal', LoginModal)
    Vue.prototype.$modalLogin = {
      show() {
        ModalLogin.EventBus.$emit('show')
      }
    }
  }
}

export default ModalLogin
