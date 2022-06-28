<template>
  <v-container class="my-6">
    <v-card min-height="85vh" rounded>
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
            <v-select
              class="mx-3" single-line hide-details
              v-model="searchForm.classId"
              items=""
              item-text="name"
              item-value="blizzard_id">

            </v-select>
            <v-btn icon @click="search">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </v-col>
        <v-col cols="6" sm="8" md="8" lg="9">
          <v-row>
            <v-col cols="12" xs="6" sm="4" lg="2" v v-for="(item) in cards" :key="item.blizzard_id">

              <v-img v-ripple="{ class: `primary--text` }" @click="showAddButton(item, $event)" :src="item.image"/>

            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3">
          <v-card class="mx-2 px-2" color="grey darken-3" height="100%">
            {{ this.deckCost }}
            <v-list dense color="transparent">
              <transition-group name="list" tag="div">
                <v-list-item
                  class="rounded-lg my-1"
                  :style="{ 'background-size': '100% contain', 'background-image': 'url(' + item.cropImage + ')' }"
                  dense v-for="(item, index) in  inDeck" :key="index"
                  @click="showDeleteButton(item, $event)">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-card color="blue darken-4" style="display: inline-flex" class="px-1 py-1">
                        <div style="display: inline-table">{{ item.manaCost }}</div>
                      </v-card>
                      <v-card style="display: inline-flex" class="px-1 py-1">
                        <div style="display: inline-table">{{ item.name }}</div>
                      </v-card>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </transition-group>
            </v-list>
            <v-btn @click="saveDeck">Save</v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-model="page"
        @input="changePage"
        :length="parseInt(this.totalCardNb / 12)"
        :total-visible="7"
        class="mt-12 pb-6"
      ></v-pagination>
    </v-card>
    <v-menu
      v-model="showMenu"
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
            <v-btn @click="addCard" style="border: limegreen 1px solid!important;">
              <v-icon color="success">mdi-check-bold</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-list-item>
      </v-list>
    </v-menu>
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


    <v-dialog
      v-model="dialog"
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
            @click="dialog = false"
          >
            Close
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
import axios from "axios";

export default {
  name: 'edit',
  data: () => ({
    deckCost: 0,
    snackbar: false,
    showMenu: false,
    showMenuDelete: false,
    dialog: false,
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
    const deckResult = await this.$axios.get(process.env.apiBaseUrl + `/hearthstone/deck/${this.$route.params.id}`)
    const cardsResult = await this.$axios.get(process.env.apiBaseUrl + `/hearthstone/cards?page=1&cardClass=${deckResult.data.deck.classId}`)
    this.searchForm.classId = deckResult.data.deck.classId
    this.inDeck = deckResult.data.deck.cards
    this.cards = cardsResult.data.cards
    this.totalCardNb = cardsResult.data.count
    const costArray = this.inDeck.map(card => card.rarity.craftingCost[0])
    this.deckCost = (costArray.length > 0) ? costArray.reduce((x, y) => x + y) : 0
  },
  methods: {
    async sortTable(a, b) {
      if (a.manaCost < b.manaCost) {
        return -1;
      }
      if (a.manaCost > b.manaCost) {
        return 1;
      }
      return 0;
    },
    async addCard() {
      let i = 0;
      this.inDeck.forEach(element => {
        if (element.name === this.target.name)
          i++;
      });
      if (i < 2) {
        this.inDeck.push(this.target)
        this.inDeck.sort((a, b) => b.manaCost - a.manaCost || a.name.localeCompare(b.name))
        this.deckCost += this.target.rarity.craftingCost[0]
      }
    },
    async deleteCard() {
      this.inDeck = this.inDeck.filter(a => a !== this.target)
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
    async showDeleteButton(target, e) {
      e.preventDefault()
      this.showMenuDelete = false
      this.x = e.clientX
      this.y = e.clientY
      this.target = target
      this.$nextTick(() => {
        this.showMenuDelete = true
      })
    },
    async changePage() {
      const cardsResult = await this.$axios.get(process.env.apiBaseUrl + `/hearthstone/cards?page=${this.page}
      &cardClass=${this.searchForm.classId}&name=${this.searchForm.name}`)
      this.cards = cardsResult.data.cards;
    },
    async search() {
      this.page = 1
      await this.changePage()
    },
    async saveDeck() {
      const result = await this.$axios.put(process.env.apiBaseUrl + `/hearthstone/deck/cards`, {
        deckId: this.$route.params.id,
        cards: this.inDeck
      }, {
        withCredentials: true
      })
      this.snackbar = true
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
.v-btn--active::before, .v-btn:focus::before {
  opacity: 0 !important;
}

.list-enter, .list-leave-to {
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: opacity 0.5s ease;
}

.zz {
  background-size: 100%, contain;
}
</style>
