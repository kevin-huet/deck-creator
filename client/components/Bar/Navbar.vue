<template>
  <div>
    <v-toolbar
      dark
      dense
      class="px-md-6 px-lg-12"
    >
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Deck Creator</v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down ml-6">
        <v-btn text small to="">
          Cards
        </v-btn>
        <v-btn text small to="">
          Deck
        </v-btn>
        <v-btn text small to="">
          News
        </v-btn>
      </v-toolbar-items>
      <v-spacer/>
      <div v-if="this.$cookies.get('Authentication')">
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="n in 5"
              :key="n"
              @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  mounted() {
  },
  methods: {
    menuActionClick: function (action) {
      if (action === 'logout') {
        this.logout()
      }
    },
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('login')
        })
    }
  },
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Click Me',
        link: '',
        action: 'profile',
        method: ''
      },
      {
        title: 'Deconnexion',
        link: '',
        action: 'logout',
        method: ''
      }
    ]
  }),
  computed: {
    isLoggedIn: function () {
      return this.$store.state.auth.isLogged
    }
  }
}
</script>

<style scoped>

</style>
