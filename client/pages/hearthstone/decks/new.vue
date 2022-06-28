<template>
  <v-container class="my-6">
    <v-card rounded>
      <v-row>
        <v-col cols="12" class="pt-0 pb-1">
          <v-toolbar
            rounded
            class="my-0 py-0"
            dense
            floating
            width="100%"
          >
            <v-text-field
              hide-details
              single-line
              v-model="searchForm.name"
              placeholder="Search by name"
            ></v-text-field>
            <v-btn icon @click="search">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </v-col>
        <v-col cols="6" sm="8" md="8" lg="9" class="pl-6">
          <v-card height="650" class="dark card-overflow" rounded color="grey darken-3 px-2">
            <v-row>
              <v-col cols="12" xs="6" sm="4" lg="2" v v-for="(item) in cards" :key="item.blizzard_id">

                <v-img v-ripple="{ class: `primary--text` }" @click="showAddButton(item, $event)" :src="item.image"/>

              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3">
          <v-card class="d-flex flex-column mx-2 px-4 py-4 dark" color="grey darken-3" height="650">
            <v-card-subtitle>
              <v-card>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img max-width="24" max-height="24"
                         :src="require(`~/assets/images/hearthstone/dust.webp`)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="this.deckCost"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              </v-card>
            </v-card-subtitle>
            <v-card-text>
              <CardList v-if="inDeck.length" :in-deck="inDeck" @clickItemEvent="showDeleteButton"></CardList>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn @click="saveDialog = true">Save</v-btn>
              <v-btn :disabled="inDeck.length === 0" @click="generateDeckCode">Export</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-text-field
                v-if="deckCode"
                class="py-0"
                :value="deckCode"
                label=""
                solo
                readonly
              ></v-text-field>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-model="page"
        @input="changePage"
        :length="parseInt(this.totalCardNb / 36 + 1)"
        :total-visible="7"
        class="mt-12 pb-6"
      ></v-pagination>
    </v-card>
    <CardMenu @openCardDialog="openCardDialog" @addCardInDeck="addCardInDeck" :x="x" :y="y" :deck-cost="deckCost"
              :in-deck="inDeck" :target="target" :show-menu="showMenu"/>
    <v-menu
      v-model="showMenuDelete"
      :position-x="x"
      :position-y="y"
      absolute
      class="px-0"
    >
      <v-list>
        <v-list-item class="py-0 px-3">
          <v-btn-toggle dense class="py-0">
            <v-btn outlined @click.stop="dialog = true">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn @click="deleteCard" style="border: darkred 1px solid!important;">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-list-item>
      </v-list>
    </v-menu>
    <CardDialog @closeDialog="closeDialog" :target="target" :dialog="showCardDialog"/>

    <v-dialog
      v-model="saveDialog"
      max-width="600"
    >
      <v-card
        dark
      >

        <v-card-title class="py-6">
          Enter a name for your Deck
        </v-card-title>
        <v-card-text>
          <v-text-field
            class="py-3"
            v-model="deckName"
            label="Deck Name"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn :disabled="!deckName"
                 color="primary" @click="createDeck">
            Create Deck
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      top
      color="success"
      v-model="snackbar"
    >
      <div class="black--text">Deck saved</div>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="black"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'new',
  data: () => ({
    deckCost: 0,
    snackbar: false,
    showMenu: false,
    showMenuDelete: false,
    showCardDialog: false,
    dialog: false,
    deckCode: undefined,
    saveDialog: false,
    deckName: undefined,
    page: 1,
    x: 0,
    y: 0,
    cards: [],
    inDeck: [],
    items: [
      {title: 'Add to deck'},
      {title: 'Click Me'}
    ],
    target: undefined,
    totalCardNb: 0,
    searchForm: {

      name: '',
      classId: '',
    }
  }),
  async mounted() {
    const cardsResult = await this.$axios.get(process.env.apiBaseUrl + `/hearthstone/cards?page=1&cardClass=${this.$route.query.class}`)
    this.cards = cardsResult.data.cards
    this.totalCardNb = cardsResult.data.count
    console.log(this.cards)
  },
  methods: {
    async closeDialog(value) {
      this.showCardDialog = false
    },
    async openCardDialog(value) {
      console.log(value)
      this.showCardDialog = value
    },
    async generateDeckCode() {
      try {
        console.log(this.$route.query.class)
        const result = await this.$axios.post(process.env.apiBaseUrl + '/hearthstone/encode', {
          cards: this.inDeck,
          classSlug: this.$route.query.class
        })
        this.deckCode = result.data
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    },
    async sortTable(a, b) {
      if (a.manaCost < b.manaCost) {
        return -1;
      }
      if (a.manaCost > b.manaCost) {
        return 1;
      }
      return 0;
    },
    addCardInDeck(deckData) {
      console.log(deckData)
      this.inDeck = deckData.deck
      this.deckCost = deckData.cost
    },
    async deleteCard() {
      if (this.target.nb === 2) {
        this.inDeck = this.inDeck.map((item) => {
          if (item === this.target) {
            item.nb--
          }
          return item
        })
      } else {
        this.inDeck = this.inDeck.filter(a => a !== this.target)
      }
      this.deckCost -= this.target.rarity.craftingCost[0]
    },
    async showAddButton(target, e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.target = target
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    async showDeleteButton(value) {
      const {target, event} = value
      this.target = target
      event.preventDefault()
      this.showMenuDelete = false
      this.x = event.clientX
      this.y = event.clientY
      this.target = target
      this.$nextTick(() => {
        this.showMenuDelete = true
      })
    },
    async changePage() {
      const cardsResult = await this.$axios.get(process.env.apiBaseUrl + `/hearthstone/cards?page=${this.page}
      &cardClass=${this.$route.query.class}&name=${this.searchForm.name}`)
      this.cards = cardsResult.data.cards
      this.totalCardNb = cardsResult.data.count
    },
    async search() {
      this.page = 1
      await this.changePage()
    },
    async createDeck() {
      try {
        const result = await this.$axios.post(process.env.apiBaseUrl + `/hearthstone/deck`, {
          cards: this.inDeck.map(card => ({
            blizzard_id: card.blizzard_id,
            nb: card.nb ? card.nb : 1
          })),
          classSlug: this.$route.query.class,
          deckName: this.deckName,
        }, {
          withCredentials: true
        })
        this.dialog = false;
        await this.$router.push('/')
      } catch (e) {

      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
}
</script>

<style scoped>

.card-overflow {
  overflow-y: auto;
  overflow-x: hidden;
}

.v-btn--active::before, .v-btn:focus::before {
  opacity: 0 !important;
}

.zz {
  background-size: 100%, contain;
}

.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.dark::-webkit-scrollbar {
  width: 15px;
}

.dark::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>

