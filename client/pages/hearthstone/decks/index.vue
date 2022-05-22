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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'HearthstoneDecksPage',
  data: () => ({})
}
</script>

<style scoped>

</style>
