<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="px-8 py-4">
            <v-form>
              <v-text-field
                v-model="form.name"
                label="name"
                required
              ></v-text-field>
              <v-select
                v-model="form.blizzard_id"
                :items="listClass"
                item-text="name"
                item-value="blizzard_id"
                :rules="[v => !!v || 'class is required']"
                label="Item"
                required
              ></v-select>
              <v-text-field
                v-model="form.description"
                label="description"
              ></v-text-field>
              <v-layout class="d-flex justify-end">
                <v-btn
                  color="primary"
                  class="mr-4 mb-6"
                  @click="validate(form)"
                >
                  Validate
                </v-btn>
              </v-layout>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HearthstoneCreateDeck',
  data: () => ({
    form: {
      name: '',
      description: '',
      blizzard_id: ''
    },
    listClass: []
  }),
  methods: {
    validate (form) {
      console.log('valid form')
      axios.post(process.env.apiBaseUrl + '/hearthstone/deck',
        {
          ...form
        }, { withCredentials: true })
        .then(r => {
          console.log(r.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  beforeCreate() {
    if (!this.$cookies.get('Authentication')) {
      this.$router.replace('/login')
    }
    axios.get(process.env.apiBaseUrl + '/hearthstone/classes')
      .then(r => {
        console.log(r.data.classes)
        this.listClass = r.data.classes
      })
  }
}
</script>

<style scoped>

</style>
