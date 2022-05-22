<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" offset-lg="2" md="10" lg="8" sm="12">
        <v-card class="pa-4" shaped>
          <v-stepper v-model="e1" shaped>
            <v-stepper-header>
              <v-stepper-step
                :complete="e1 > 1"
                step="1"
              >
                User informations
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="e1 > 2"
                step="2"
              >
                Verification code
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">
                Account created
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card
                  shaped
                  class="pa-5"
                >
                  <RegisterForm @nextStep="nextStep" @createdUser="createdUser"/>
                </v-card>

                <v-layout class="d-flex justify-end">
                </v-layout>

              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card
                  shaped
                  class="pa-5"
                >
                  <VerificationCodeForm @nextStep="nextStep" :email="this.user.email"/>
                </v-card>
                <v-layout class="d-flex justify-end">
                </v-layout>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                  class="pa-12 my-8"
                >
                  <v-card-subtitle class="text--primary text-center">
                    Your registration is now complete. You can now login
                  </v-card-subtitle>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      color="primary"
                      href="/login"
                    >
                      Login
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'RegisterPage',
  data: () => ({
    e1: 1,
    user: {
      email: ''
    }
  }),
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.state.auth.logged)
        vm.$router.replace(from.path || from.fullPath)
    })
  },
  methods: {
    nextStep () {
      this.e1 = this.e1 + 1
    },
    createdUser (email) {
      this.user.email = email
    },
    precedentStep () {
      this.e1--
    }
  }
}
</script>

<style scoped>

</style>
