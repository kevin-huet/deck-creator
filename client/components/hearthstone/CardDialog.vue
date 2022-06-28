<template>
  <v-dialog
    v-model="dialog"
    @click:outside="close"
    v-if="target"
    max-width="600"
  >
    <v-card
      dark
    >
      <v-card-title
        class="text-h5"
        v-text="target.name"
      ></v-card-title>
      <v-divider></v-divider>

      <v-card-subtitle class="py-6" v-html="target.text"></v-card-subtitle>
      <v-card-text>
        <p>{{ target.blizzard_id }}</p>
        <p v-if="target.cardSet">{{ target.cardSet.name }}</p>
        <p v-if="target.hsClass">{{ target.hsClass.name }}</p>
        <p v-if="target.rarity">{{ target.rarity.name }}</p>
        <p>{{ target.rarity.craftingCost[0] }}</p>
        <p v-if="target.manaCost"><b>Mana cost: </b>{{ target.manaCost }}</p>
        <p v-if="target.attack"><b>Attack: </b>{{ target.attack }}<br></p>
        <p v-if="target.health"><b>Health: </b>{{ target.health }}<br></p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CardDialog",
  props: {
    dialog: Boolean,
    target: Object
  },
  methods: {
    close() {
      this.$emit('closeDialog', false)
    }
  }
}
</script>

<style scoped>

</style>
