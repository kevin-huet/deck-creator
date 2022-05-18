<template>
  <div>
    <Alert type="error" :message="alert.message" :active="alert.active"/>
    <v-form
      ref="form"
      v-model="form.valid"
      lazy-validation
    >
      <v-text-field
        v-model="form.username"
        :counter="15"
        :rules="formRules.nameRules"
        label="username"
        required
      ></v-text-field>

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
      <v-text-field
        v-model="form.passwordCheck"
        :rules="formRules.passwordRules"
        label="Password again"
        required
        type="password"
      ></v-text-field>
      <v-checkbox
        v-model="form.terms"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-layout class="d-flex justify-end">
        <v-btn
          :disabled="!form.valid"
          color="primary"
          class="mr-4 mb-6"
          @click="validate(form)"
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
  name: 'RegisterForm',
  props: {},
  data: () => ({
    form: {
      valid: true,
      username: '',
      email: '',
      password: '',
      passwordCheck: '',
      terms: false
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
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters'
      ],
      passwordRules: []
    }
  }),
  methods: {
    validate (form) {
      axios.post(process.env.apiBaseUrl + '/auth/register',
        {
          ...form
        })
        .then(() => {
          this.$emit('nextStep')
          this.$emit('createdUser', form.email)
        })
        .catch(err => {
          this.alert.message = (err.response && err.response.data.message) ? err.response.data.message : ''
          this.alert.active = true
        })
    }
  }
}
</script>

<style scoped>

</style>
