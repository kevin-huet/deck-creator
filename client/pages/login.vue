<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="px-8 py-4">
          <LoginForm/>
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
