<template>
  <form lang="en">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Register</p>
        <button
            type="button"
            class="delete"
            @click="$emit('close')"/>
      </header>
      <section class="modal-card-body">
        <b-field label="Email">
          <b-input
              type="email"
              :value="email"
              placeholder="Your email"
              required
              v-model="email">
          </b-input>
        </b-field>

        <b-field label="Username">
          <b-input
              type="username"
              placeholder="Your username"
              required
              v-model="username">
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input
              type="password"
              password-reveal
              minlength="12"
              maxlength="20"
              placeholder="Your password"
              required
              v-model="password">
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button
            label="Close"
            @click="$emit('close')" />
        <b-button
            label="Register"
            type="is-primary"
            @click="sendData(); $emit('close')"/>
      </footer>
    </div>
  </form>
</template>

<script>

import Vue from "vue";

export default {
  name: "Register-form",
  data() {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  methods: {
    async sendData() {
      if (this.email !== '' && this.password !== '' && this.username !== '') {
        await this.$http.post(`${url}/auth/sign-up`, {email: this.email, password: this.password, userName: this.username}).then(response => {
          if (response.status !== 200) {
            Vue.notify({
              title: 'Registration',
              text: response.body.message,
              type: 'error'
            })
          } else {
            Vue.notify({
              title: 'Registration',
              text: 'You have been successfully registered!'
            })
            this.username = ''
            this.password = ''
            this.email = ''
            this.launchAlert()
          }
        })
      } else {
        Vue.notify({
          title: 'Registration',
          text: 'Please, enter any information to register',
          type: 'warn'
        })
      }
    },
    launchAlert() {
        this.$buefy.dialog.alert({
            title: 'Email verification',
            message: 'You`re nearly here! Now check your email for verification email and follow instructions. If you don`t see any, check your spam box',
            confirmText: 'Cool!'
        })
    }
  }
}
</script>

<style scoped>

</style>