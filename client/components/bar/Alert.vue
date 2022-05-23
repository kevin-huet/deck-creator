<template>
  <v-alert
    shaped
    :type="type"
    v-if="active"
  >
    <v-row align="center">
      <v-col class="grow">
        {{ message }}
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    active: Boolean,
    message: String,
    type: String
  }
}
</script>

<style scoped>

</style>
