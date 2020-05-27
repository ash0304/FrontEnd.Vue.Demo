import Vue from 'vue'
import './styles/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'
import Carousel3d from 'vue-carousel-3d'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ModalLogin from './utils/LoginModal'
import ModalHint from './utils/HintModal'
import ModalAddWithdrawalPassword from './utils/AddWithdrawalPasswordModal'
// import ModalModifyPassword from './utils/ModifyPasswordModal'
import ModalSiteNotify from './utils/SiteNotifyModal'
import Pagination from './utils/Pagination'
import veeValidate from './utils/Validate'
import vueHeadful from 'vue-headful'
import i18n from './lang'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import animated from 'animate.css'
import VueFullPage from 'vue-fullpage.js'

Vue.use(animated)
Vue.component('vue-headful', vueHeadful)
Vue.use(veeValidate)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Carousel3d)
Vue.use(ModalLogin)
Vue.use(ModalHint)
Vue.use(ModalAddWithdrawalPassword)
// Vue.use(ModalModifyPassword)
Vue.use(ModalSiteNotify)
Vue.use(Pagination)
Vue.use(Antd)
Vue.use(VueFullPage)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
