<template>
  <div>
    <b-navbar wrapper-class="container" shadow>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
              src="https://i.im.ge/2023/03/13/DFDkxP.helloworld.webp"
              alt="Notik"
          >
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item href="#">
          Home
        </b-navbar-item>
        <b-navbar-item href="https://github.com/gavrylenkoIvan" target="_blank">
            <b-icon icon="github" style="height: 15px" class="mr-1"/> Github
        </b-navbar-item>
        <b-navbar-item tag="div">
            <b-field style="width: 400px; margin: 0 auto 0 200px" v-if="!!token">
                <b-input placeholder="Search by tag..."
                         type="search"
                         icon-right="magnify"
                         v-model="text">
                </b-input>
            </b-field>
        </b-navbar-item>
        <form-button v-if="!!token"/>
      </template>

      <template #end v-if="!!!token">
        <b-navbar-item tag="div">
          <div class="buttons">
            <login-button/>
            <register-button/>
          </div>
        </b-navbar-item>
      </template>

      <template v-else #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button class="button is-primary" style="width: 40px; height: 40px" @click="logout">
                <b-icon icon="exit-to-app"></b-icon>
            </b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <notifications position="bottom right"/>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import LoginForm from "./modal/Login.vue";
import RegisterForm from "./modal/Register.vue";
import LoginButton from "./components/LoginButton.vue";
import RegisterButton from "./components/RegisterButton.vue";
import { mapActions } from "vuex";
import FormButton from "@/components/FormButton.vue";
import EditButton from "@/components/FormButton.vue";

export default {
  name: "App",
  components: {RegisterButton, LoginButton, LoginForm, RegisterForm, EditButton, FormButton},
  computed: mapState(['notes', 'token']),
  data() {
    return {
      login: false,
      register: false,
      text: ''
    }
  },
  watch: {
    text(newText, oldText) {
        this.setSearchMutation(newText)
    }
  },
  methods: {
    ...mapActions(['initNotes']),
    ...mapMutations(['setSearchMutation']),
    logout() {
        localStorage.removeItem("notik_jwt")
        window.location.reload()
    }
  },
  created() {
    if (!!this.token) {
        this.initNotes()
    }
  }
}
</script>

<style scoped>

</style>