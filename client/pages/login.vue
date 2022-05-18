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
  beforeMount () {
    if (this.$cookies.get('Authentication'))
      this.$router.replace('/')
  },
}
</script>

<style scoped>

</style>
