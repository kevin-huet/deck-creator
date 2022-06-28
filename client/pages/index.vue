<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8">
      <v-card class="pa-6">
        <v-row>
          <v-col cols="6" sm="4" md="3" v-for="item in classes" v-if="item.slug !== 'neutral'">
            <nuxt-link class="link" :to="`/hearthstone/decks/new?class=${item.slug}`">
            <v-img :src="require(`~/assets/images/hearthstone/classes/${item.slug}.webp`)"/>
            <v-card :color="colors[item.slug]" width="100%">
              <v-card-subtitle class="text-center pa-2 black--text">
                <b>{{ item.name.toUpperCase() }}</b>
              </v-card-subtitle>
            </v-card>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    colors: {
      druid: '#FF7C0A',
      hunter: '#AAD372',
      mage: '#3FC7EB',
      paladin: '#F48CBA',
      warlock: '#8788EE',
      warrior: '#C69B6D',
      rogue: '#FFF468',
      priest: '#FFFFFF',
      shaman: '#0070DD',
      demonhunter: '#A330C9',
    },
    classes: []
  }),
  async beforeMount() {
    const result = await this.$axios.get(process.env.apiBaseUrl + '/hearthstone/classes')
    this.classes = result.data.classes
    console.log(this.classes)
  }
}
</script>
<style scoped>
.link {
  text-decoration: none;
  color: inherit;
}
</style>
