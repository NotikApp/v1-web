<template>
  <div class="ml-2">
    <b-button
        label="Register"
        type="is-grey"
        @click="register = true" />
    <b-modal
        v-model="register"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Register modal"
        close-button-aria-label="Close"
        aria-modal>
      <template #default="props">
        <register-form @close="props.close"></register-form>
      </template>
    </b-modal>
  </div>
</template>

<script>
import RegisterForm from "../modal/Register.vue";

export default {
  name: "RegisterButton",
  components: {RegisterForm},
  data() {
    return {
      register: false
    }
  }
}
</script>

<style scoped>

</style>