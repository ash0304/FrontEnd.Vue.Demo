import HintModal from '../components/Modal/HintModal'

const ModalHint = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('HintModal', HintModal)
    Vue.prototype.$modalHint = {
      show(params) {
        ModalHint.EventBus.$emit('show', params)
      },
      loginHint() {
        ModalHint.EventBus.$emit('loginHint')
      },
      homeLoginHint() {
        ModalHint.EventBus.$emit('homeLoginHint')
      }
    }
  }
}

export default ModalHint
