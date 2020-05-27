import AddWithdrawalPasswordModal from '../components/Modal/AddWithdrawalPasswordModal.vue'

const ModalAddWithdrawalPassword = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('AddWithdrawalPasswordModal', AddWithdrawalPasswordModal)
    Vue.prototype.$modalAddWithdrawalPassword = {
      show() {
        ModalAddWithdrawalPassword.EventBus.$emit('show')
      }
    }
  }
}

export default ModalAddWithdrawalPassword
