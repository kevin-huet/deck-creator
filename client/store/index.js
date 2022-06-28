export const state = () => ({
})

export const mutations = {

}

export const actions = {
  async nuxtServerInit({ commit, state }) {
    console.log('nuxt serv init store')
    if (this.$cookies.get('Authentication')) {
      try {
        await this.$axios.get(process.env.apiBaseUrl + '/auth/user')
      } catch (e) {
        commit('auth/logout')
      }
      commit('auth/login')
    } else {
      commit('auth/logout')
    }
    console.log(state.auth.logged)
  }
}
