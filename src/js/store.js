import Vue from 'vue'
import Vuex from 'vuex'
//数据持久化
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)
const routers = {
  namespaced: true,
  state: () => ({
    routers:"",
  }),
  mutations: {
    routers(state, newsdata) {
      state.routers = newsdata
    },
  },
  actions: {
    routers(context) {
      context.commit('routers')
    },
  },
  getters: {
    routers(state) {
      console.log("getters", state)
      return state.routers
    },
    
  }
}
const store = new Vuex.Store({
  modules: {
    routers: routers,
  },
  
  // 数据持久化
  plugins: [createPersistedState({
    //key是存储数据的键名
    key: 'routersData',
    //paths是存储state中的那些数据，如果是模块下具体的数据需要加上模块名称，如user.token  
    paths: ["routers.routers"]
  })]
})
export default store
