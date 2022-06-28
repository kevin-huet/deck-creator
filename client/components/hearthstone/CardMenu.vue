<template>
  <div>
    <v-menu
      v-model="show"
      :position-x="x"
      :position-y="y"
      absolute
      class="px-0"
    >
      <v-list>
        <v-list-item class="py-0 px-3">
          <v-btn-toggle dense class="py-0">
            <v-btn outlined @click="openDialog">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn @click="addCard" style="border: limegreen 1px solid!important;">
              <v-icon color="success">mdi-check-bold</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "CardMenu",
  props: {
    x: Number,
    y: Number,
    showMenu: Boolean,
    target: Object,
    deckCost: Number,
    inDeck: Array
  },
  data: () => ({
    cost: 0,
    showDialog: false,
  }),
  created() {
    this.cost = this.deckCost
    this.show = this.showMenu
  },
  computed: {
    show: {
      set(value) {
      },
      get() {
        return this.showMenu
      }
    }
  },
  methods: {
    async openDialog() {
      this.$emit('openCardDialog', true)
    },
    async addCard() {
      let nb = 0;
      this.inDeck.forEach(element => {
        if (element.name === this.target.name) {
          nb = element.nb ? element.nb : 1
      }});
      if (nb < 2) {
        if (nb === 1) {
          this.target.nb = 2;
        } else {
          this.inDeck.push(this.target)
        }
        this.inDeck.sort((a, b) => b.manaCost - a.manaCost || a.name.localeCompare(b.name))
        this.cost = (this.deckCost + this.target.rarity.craftingCost[0])
        this.$emit('addCardInDeck', {
          deck: this.inDeck,
          cost: this.cost
        })
      }
    }
  }
}
</script>

<style scoped>
.v-btn--active::before, .v-btn:focus::before {
  opacity: 0 !important;
}

</style>
