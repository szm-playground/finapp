import firebase from 'firebase'
import localforage from 'localforage'

const store = {
  state: {
    user: null
  },

  getters: {
    user(state) {
      return state.user
    }
  },

  actions: {
    async signOut({ commit, state }) {
      firebase.auth().signOut()
      await localforage.removeItem('old:data')
      await localforage.removeItem('old:trns')
      await localforage.removeItem('old:user')
      commit('signOut')
    }
  },

  mutations: {
    signIn(state, user) {
      state.user = user
    },

    signOut(state) {
      state.user = null
    }
  }
}

export default store
