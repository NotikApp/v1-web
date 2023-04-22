<template>
    <div style="padding-top: 8px">
        <b-button
                type="is-primary"
                @click="login = true"
                >
            <b-icon icon="note-plus"/>
        </b-button>
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
                <form-modal @close="props.close"/>
            </template>
        </b-modal>
    </div>
</template>

<script>
import LoginForm from "../modal/Login.vue";
import FormModal from "@/modal/FormModal.vue";
export default {
    name: "LoginButton",
    components: {LoginForm, FormModal},
    data() {
        return {
            login: false
        }
    }
}
</script>

<style scoped>

</style>