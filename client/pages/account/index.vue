<template>
  <v-container>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AccountPage',
  mounted () {
    axios.get(process.env.apiBaseUrl + '/auth/user_info', {
      withCredentials: true
    }).then(r => {
      console.log(r)
    })
  }
}
</script>

<style scoped>

</style>
