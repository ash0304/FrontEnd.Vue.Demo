import MyActivityModal from '../components/Modal/MyActivityModal'

const ModalMyActivity = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('MyActivityModal', MyActivityModal)
    Vue.prototype.$modalMyActivity = {
      show() {
        ModalMyActivity.EventBus.$emit('show')
      }
    }
  }
}

export default ModalMyActivity
