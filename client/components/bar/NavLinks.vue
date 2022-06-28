<template>

</template>

<script>
export default {
  name: "NavLinks",
  props: {
    links: Array
  },
  beforeMount() {
    console.log(this.navLinks)
  }
}
</script>

<style scoped>

</style>
