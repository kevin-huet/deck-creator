<template>
  <v-card
    rounded
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="125"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{ deckName }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-btn icon small>
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
        <v-btn icon small>
          <v-icon>mdi-thumb-down</v-icon>
        </v-btn>
      </v-row>

      <div class="my-4">
        {{ deckDesc }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-list-item>
      <v-list-item-subtitle>Craft cost: <b>{{ deckCost }}</b></v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-subtitle>Average cost: <b>0</b></v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-subtitle>Card number: <b>{{ deckCardNb }}</b></v-list-item-subtitle>
    </v-list-item>

    <v-card-text>

      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >

        <v-chip>{{ deckClass }}</v-chip>

        <v-chip>{{ gameMode }}</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        :to="'/hearthstone/decks/'+deckId"
      >
        Show
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DeckCard",
  props: {
    deckId: Number,
    deckName: String,
    deckDesc: String,
    deckClass: String,
    gameMode: String,
    deckCost: Number,
    deckCardNb: Number,
    deckAuthor: String
  },
  data: () => ({}),

  methods: {}
}
</script>

<style scoped>

</style>
