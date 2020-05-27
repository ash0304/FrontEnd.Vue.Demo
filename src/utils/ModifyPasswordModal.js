import ModifyPasswordModal from '../components/Modal/ModifyPasswordModal'

const ModalModifyPassword = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('ModifyPasswordModal', ModifyPasswordModal)
    Vue.prototype.$modalModifyPassword = {
      show() {
        ModalModifyPassword.EventBus.$emit('show')
      }
    }
  }
}

export default ModalModifyPassword
