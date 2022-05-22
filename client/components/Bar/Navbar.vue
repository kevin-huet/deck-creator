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
        <v-btn v-for="item in navLinks" text small :to="item.path">
          {{ item.name }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer/>
      <div v-if="this.$store.state.auth.logged">
        <v-btn icon to="/account">
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
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="item in accountLinks"
              :key="item.name"
              @click="() => {}"
            >
              <router-link :to="item.path" style="text-decoration: none; color: inherit">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-toolbar-items class="hidden-sm-and-down ml-6" v-if="!this.$store.state.auth.logged">
        <v-btn text small to="/login">
          Login
        </v-btn>
        <v-btn text small to="/register">
          Register
        </v-btn>
      </v-toolbar-items>
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

          <v-list-item to="/account">
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
      this.$store.commit('auth/logout')
        .then(() => {
          this.$router.push('login')
        })
    }
  },
  data: () => ({
    accountLinks: [
      { name: 'profile', path: '/account'},
      { name: 'logout', path: '/logout'}
    ],
    navLinks: [
      { name: 'Decks', path: '/hearthstone/decks'},
      { name: 'Cards', path: '/hearthstone/cards'},
      { name: 'News', path: '/'}
    ],
    drawer: false,
    group: null,
  }),
  computed: {
    isLoggedIn: function () {
      return this.$store.commit('auth/login')
    }
  }
}
</script>

<style scoped>

</style>
