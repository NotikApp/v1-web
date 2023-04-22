<template>
  <div class="container" v-if="token !== null">
    <div style="display: flex; flex-direction: row; flex-wrap: wrap; transform: translateX(37px)" v-if="search !== ''">
        <note-card v-for="note in this.allNotes.filter(it => it.tags === search || it.tags.startsWith(search))"
                   :note="note"/>
    </div>

    <div style="display: flex; flex-direction: row; flex-wrap: wrap; transform: translateX(37px)" v-if="search === ''">
      <note-card v-for="note in this.allNotes"
                 :note="note"/>
    </div>
    <div class="text-divider" v-if="notes.length !== 0 && this.getNotImportant.length !== 0 && this.getImportant.length !== 0"/>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap; transform: translateX(37px)" v-if="search === ''">
      <note-card v-for="note in this.allNotes.filter(it => !it.important)"
                 :note="note"/>
    </div>
  </div>

  <div class="container" v-else style="margin-top: 200px">
    <img
        src="https://i.im.ge/2023/03/15/DqvHnq.noteik-logo.webp"
        alt="Notik"
        class="mt-6"
        style="margin: 0 auto; display: block"
    >
    <div style="display: flex; justify-content: center; margin-top: 70px;">
      <login-button/>
      <register-button/>
      <a class="button" href="https://github.com/gavrylenkoIvan" target="_blank" style="margin-left: 10px">
          <b-icon icon="github"/>
      </a>
    </div>
  </div>
</template>

<script>
import NoteCard from "../notes/NoteCard.vue";
import {mapGetters, mapState} from "vuex";
import LoginButton from "../components/LoginButton.vue";
import RegisterButton from "../components/RegisterButton.vue";
export default {
  name: "NoteList",
  components: {RegisterButton, LoginButton, NoteCard},
  computed: {
    ...mapGetters(['allNotes', 'getNotImportant', 'getImportant']),
    ...mapState(['notes', 'token', "search"])
  }
}
</script>

<style scoped>
.text-divider {
  content: '';
  height: 1px;
  background-color: silver;
  flex-grow: 1;
  margin-bottom: 35px;
  margin-top: 15px;
}
</style>