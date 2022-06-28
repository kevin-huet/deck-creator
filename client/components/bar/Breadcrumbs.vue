<template>
  <v-breadcrumbs :items="crumbs.map(item => {
    return item.name
  })"></v-breadcrumbs>
</template>

<script>

export default {
  name: "Breadcrumbs",
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.substring(1).split('/')
      const crumbs = []
      let path = ''

      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)

        if (match.name !== null) {
          crumbs.push(match)
        }
      })
      console.log(crumbs)
      return crumbs
    },
  },
}
</script>

<style scoped>

</style>
