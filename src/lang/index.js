import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import elementTWLocale from 'element-ui/lib/locale/lang/zh-TW' // element-ui lang
// import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
// import elementJaLocale from 'element-ui/lib/locale/lang/ja'// element-ui lang
import zhLocale from './zh'
import twLocale from './tw'
import enLocale from './en'

Vue.use(VueI18n)

const messages = {
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  tw: {
    ...twLocale,
    ...elementTWLocale
  },
  en: {
    ...enLocale,
    ...elementEnLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: 'zh',
  // set locale messages
  messages
})

export default i18n
