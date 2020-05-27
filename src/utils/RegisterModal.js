import RegisterModal from '../components/Modal/RegisterModal'

const ModalRegister = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('RegisterModal', RegisterModal)
    Vue.prototype.$modalRegister = {
      show() {
        ModalRegister.EventBus.$emit('show')
      }
    }
  }
}

export default ModalRegister
