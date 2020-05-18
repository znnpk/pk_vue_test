import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const  state={
  name:'test',
  userName:'尚未登录的人',
  token:''

};
const mutations={
  userNameChange(state,newName) {
    state.userName = newName
  },
  tokenChange(state,newName){
    state.token = newName
  },
  RESET_STATE (state) {
    Object.assign(state, getDefaultState());
  }
}

export default new Vuex.Store({
  state,
  mutations
})
