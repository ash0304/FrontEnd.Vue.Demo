import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import i18n from '../lang'

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    // values._field_ = i18n.t(`fields.${field}`);

    return i18n.t(`validation.${values._rule_}`, values)
  }
})
extend('email', {
  validate: value => {
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
    return regex.test(value)
  }
})
extend('required', { ...required })
extend('account', {
  validate: value => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/
    return regex.test(value)
  }
})
extend('password', {
  validate: value => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/
    return regex.test(value)
  }
})
extend('pwdConfirm', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  }
})
extend('name', {
  validate: value => {
    const regex = /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/
    return regex.test(value)
  }
})
extend('phone', {
  validate: value => {
    const regex = /^[0-9]{11,11}$/
    return regex.test(value)
  }
})
extend('agent', {
  validate: value => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,7}$/
    return regex.test(value)
  }
})
extend('qq', {
  validate: value => {
    const regex = /^[0-9]{5,13}$/
    return regex.test(value)
  }
})
extend('wechat', {
  validate: value => {
    const regex = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
    return regex.test(value)
  }
})
extend('chinese', {
  validate: value => {
    const regex = /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/
    return regex.test(value)
  }
})
extend('card', {
  validate: value => {
    const regex = /^[0-9]{13,19}$/
    return regex.test(value)
  }
})
extend('amount', {
  params: ['min', 'max'],
  validate: (value, { min, max }) => {
    min = Number(min)
    max = Number(max)
    value = Number(value)
    if (/^[1-9]\d*$/.test(value)) {
      if (!isNaN(min) && !isNaN(max)) {
        if (max < min && max === 0) {
          return min <= value
        } else {
          return min <= value && value <= max
        }
      } else if (!isNaN(min)) {
        return min <= value
      } else if (!isNaN(max)) {
        return value <= max
      } else {
        return true
      }
    } else {
      return false
    }
  }
})

const veeValidate = {
  install(Vue) {
    Vue.component('ValidationProvider', ValidationProvider)
    Vue.component('ValidationObserver', ValidationObserver)
  }
}
export default veeValidate
