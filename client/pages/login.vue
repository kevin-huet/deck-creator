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
  name: 'HearthstoneDecksPage',
  data: () => ({
    page: 1,
    totalDecks: 8,
    decks: [],
    deckPage: 16,
    deckPagination: 1
  }),
  methods: {
    async changePage() {
      const result = await this.$axios.get(process.env.apiBaseUrl + `/hearthstone/decks?page=${this.page}`)
      this.decks = result?.data?.decks
      console.log(result.data)
    }
  },
  async beforeMount() {
    this.deckPagination = (this.totalDecks > 16) ? this.totalDecks / 16 : 1
    const result = await this.$axios.get(process.env.apiBaseUrl + `/hearthstone/decks?page=${this.page}`)
    this.decks = result?.data?.decks
    console.log(result.data)
    this.totalDecks = result?.data?.count
    this.totalDecks = 18
  }
}
</script>

<style scoped>

</style>
