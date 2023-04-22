<template>
  <div>
    <b-button
        label="Log in"
        type="is-primary"
        @click="login = true" />
    <b-modal
        v-model="login"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Login modal"
        close-button-aria-label="Close"
        aria-modal>
      <template #default="props">
        <login-form @close="props.close"></login-form>
      </template>
    </b-modal>
  </div>
</template>

<script>
import LoginForm from "../modal/Login.vue";

export default {
  name: "LoginButton",
  components: {LoginForm},
  data() {
    return {
      login: false
    }
  }
}
</script>

<style scoped>

</style>