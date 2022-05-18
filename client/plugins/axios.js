export default ({ $axios, redirect }, context) => {
  $axios.onError(error => {
    if (error.response.status === 403 || error.response.status === 401) {
      context.app.store.commit('logout')
      redirect('/login')
    }
  })
}
