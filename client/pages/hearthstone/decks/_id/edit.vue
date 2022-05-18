<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col lg="8">
          <v-row>
            <v-col lg="3" v-for="item in [1, 2, 3, 4]" :key="item">
              <v-img src="https://bnetcmsus-a.akamaihd.net/cms/gallery/S188K29IOQ1V1558079058884.png"></v-img>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="4">
          <v-card class="mx-4 px-6" color="grey darken-3" height="100%">
            <v-list dense color="transparent">
              <v-list-item style="max-width: 75%;" dense class="zz" v-for="item in [1, 2, 3, 4]" :key="item">
                <v-list-item-content>
                  <v-list-item-title>Single-line item</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'edit',
  data: () => ({

  }),
  mounted () {
    axios.get(process.env.apiBaseUrl + 'hearthstone/decks', {
      params: {
        id: this.$route.params.id
      }
    })
  },
  methods: {

  }
}
</script>

<style scoped>
.zz {
  background-size: 100%, contain;
  background-image: url("https://d15f34w2p8l1cc.cloudfront.net/hearthstone/7661ecd48e4960368544463fab6ae42bb5b1af781a73c33fbbe38f89e1f55b63.jpg")!important;
}
</style>
