<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="px-8 py-4">
            deck
            <v-col cols="3">
              <DeckCard :deck-id="1"/>
            </v-col>
            <v-pagination
              v-model="page"
              :length="15"
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
    decks: []
  }),
  async beforeMount() {
    const result = this.$axios.get(process.env.apiBaseUrl + `/hearthstone/decks?page=${this.page}`)
    this.decks = result?.data?.decks
  }
}
</script>

<style scoped>

</style>
