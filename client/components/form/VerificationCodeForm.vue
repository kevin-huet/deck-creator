<template>
  <div>
    <Alert :active="alert.active" :message="alert.message" :type="alert.type"/>
    <v-form
      ref="form"
      v-model="form.valid"
      lazy-validation
    >
      <v-layout class="d-flex justify-center">
          <v-otp-input
            style="max-width: 300px"
            v-model="form.code"
            :rules="form.codeRules"
            label="code"
            required
            length="6"
          ></v-otp-input>
      </v-layout>

      <v-layout class="d-flex justify-end">
        <v-btn
          :disabled="!form.valid"
          color="primary"
          class="mr-4  mt-6"
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
  name: 'VerificatioCodeForm',
  props: {
    email: String,
  },
  mounted () {
    if (this.$store.state.isLogged) {
      this.$router.push('/')
    }
  },
  data: () => ({
    form: {
      valid: true,
      code: '',
      codeRules: [
        v => !!v || 'Code is required',
        v => (v && v.length === 6) || 'Code must be 6 digits'
      ]
    },
    alert: {
      type: 'success',
      message: '',
      active: false
    }
  }),
  methods: {
    validate (form) {
      axios.post(process.env.apiBaseUrl + '/auth/code', {
        code: form.code,
        email: this.email
      }).then((r) => {
          this.$emit('nextStep')
          this.alert.message = r.data.message
          this.alert.active = true
          this.alert.type = 'success'
        }
      ).catch((error) => {
        this.alert.message = (error.response && error.response.data.message) ? error.response.data.message : ''
        this.alert.active = true
        this.alert.type = 'error'
      })
    }
  }
}
</script>

<style scoped>

</style>
