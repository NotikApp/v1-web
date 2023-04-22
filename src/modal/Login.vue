<template>
  <form action="" lang="en">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
        <button
            type="button"
            class="delete"
            @click="$emit('close')"/>
      </header>
      <section class="modal-card-body">
        <b-field label="Email">
          <b-input
              :value="email"
              placeholder="Your email"
              required
              v-model="email">
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input
              type="password"
              password-reveal
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
            label="Login"
            type="is-primary"
            @click="sendData(); $emit('close')"/>
      </footer>
    </div>
  </form>
</template>

<script>
import Vue from "vue";

export default {
  name: "Login-form",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    sendData() {
      if (this.email !== '' && this.password !== '') {
        this.$http.post(`${url}/auth/sign-in`, {email: this.email, password: this.password}).then( response => {
          localStorage.setItem("notik_jwt", response.body.token)
          window.location.reload()
        }, response => {
            Vue.notify({
                title: 'Authorization',
                text: `Status ${response.status}: ${response.body.message}`,
                type: 'warn'
            })
        })
      } else {
        Vue.notify({
          title: 'Authorization',
          text: 'Please, enter any information to login',
          type: 'warn'
        })
      }
      this.email = ''
      this.password = ''
    }
  }
}
</script>