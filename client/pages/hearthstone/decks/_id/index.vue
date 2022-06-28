<template>
  <v-container class="my-6">
    <v-card min-height="85vh" rounded>
      <v-row>
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
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'HearthstoneDeckPage'
}
</script>

<style scoped>

</style>
