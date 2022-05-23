<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" offset-lg="2" md="10" lg="8" sm="12">
        <v-card shaped class="px-4 py-4">
          <v-card class="px-12 py-6" shaped color="#121212">
            <LoginForm/>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.state.auth.logged)
        vm.$router.replace(from.path || from.fullPath)
    })
  }
}
</script>

<style scoped>

</style>
