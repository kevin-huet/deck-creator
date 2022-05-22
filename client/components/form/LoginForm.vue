<template>
  <div>
    <Alert type="error" :message="alert.message" :active="alert.active"/>
    <v-form
      ref="form"
      @submit.prevent="validate(form)"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="form.email"
        :rules="form.emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :rules="formRules.passwordRules"
        label="Password"
        required
        type="password"
      ></v-text-field>

      <v-layout class="d-flex justify-end">
        <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4 mb-6"
          type="submit"
        >
          Validate
        </v-btn>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginForm',
  props: {},
  data: () => ({
    valid: true,
    form: {
      email: '',
      password: '',
    },
    alert: {
      message: '',
      active: false
    },
    formRules: {
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: []
    }
  }),
  methods: {
    validate (form) {
      console.log('valid form')
      axios.post(process.env.apiBaseUrl + '/auth/login',
        {
          ...form
        },{ withCredentials: true })
        .then(r => {
          this.$store.commit('auth/login')
          this.$router.push('/')
        })
        .catch(err => {
          this.alert.message = (err.response && err.response.data.message) ? err.response.data.message : ''
          this.alert.active = true
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
