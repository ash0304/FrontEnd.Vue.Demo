import pagination from '../components/pagination'

const paginationComp = {
  install(Vue) {
    Vue.component('pagination', pagination)
  }
}

export default paginationComp
