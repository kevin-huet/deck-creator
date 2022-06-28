<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="px-8 py-4">
            <v-card-title>Decks list</v-card-title>
            <v-row>
              <v-col cols="6" md="3" sm="6" lg="2" v-for="(deck, index) in decks" :key="index">
                <DeckCard :deck-card-nb="deck.deck.cards.length" :deck-id="deck.deck.id" :deck-cost="deck.cost"
                          :deck-name="deck.deck.name"/>
              </v-col>
            </v-row>
            <v-pagination
              v-model="page"
              @input="changePage"
              :length="20"
              :total-visible="7"
            ></v-pagination>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
