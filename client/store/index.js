export const state = () => ({
})

export const mutations = {

}

export const actions = {
  async nuxtServerInit({ commit, state }) {
    if (this.$cookies.get('Authentication')) {
      commit('auth/login')
    } else {
      commit('auth/logout')
    }
    console.log(state.auth.logged)
  }
}
