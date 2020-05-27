import SiteNotifyModal from '../components/Modal/SiteNotifyModal'

const ModalSiteNotify = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('SiteNotifyModal', SiteNotifyModal)
    Vue.prototype.$modalSiteNotify = {
      show(params) {
        ModalSiteNotify.EventBus.$emit('show', params)
      }
    }
  }
}

export default ModalSiteNotify
