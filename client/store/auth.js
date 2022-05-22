export const state = () => ({
  logged: false
})

export const getters = () => ({
  isLoggedIn(state) {
    return state.logged
  }
})

export const mutations = {
  login(state) {
    state.logged = true
  },
  logout(state) {
    state.logged = false
  }
}

