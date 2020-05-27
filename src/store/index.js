import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './user'

Vue.use(Vuex)

const modules = {
  user: user
}

const store = new Vuex.Store({
  modules,
  getters
})

export default store
