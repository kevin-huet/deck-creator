<template>
  <v-card class="card-overflow dark mb-2" height="400" max-width="265">
    <v-list dense color="transparent" class="px-2">
      <transition-group name="list" tag="div">
        <v-list-item
          class="rounded-lg my-1"
          :style="{ 'max-width': '240px', 'background-size': '100% contain', 'background-image': 'url(' + item.cropImage + ')' }"
          dense v-for="(item, index) in  inDeck" :key="index"
          @click="clickItem(item, $event)">
          <v-list-item-content>
            <v-list-item-title>
              <v-card color="blue darken-4" style="display: inline-flex" class="px-1 py-1">
                <div style="display: inline-table">{{ item.manaCost }}</div>
              </v-card>
              <v-card style="display: inline-flex" class="px-1 py-1">
                <div style="display: inline-table">{{ item.name }}</div>
              </v-card>
              <v-card v-if="item.nb" style="display: inline-flex; margin-left: auto" class="px-1 py-1">
                <div style="display: inline-table">x{{ item.nb }}</div>
              </v-card>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </transition-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "CardList",
  props: {
    inDeck: Array
  },
  methods: {
    clickItem(item, e) {
      this.$emit('clickItemEvent', {target: item, event: e})
    }
  }
}
</script>

<style scoped>
.list-enter, .list-leave-to {
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: opacity 0.5s ease;
}
</style>
