<template>
  <div class="mt-2 mb-5">
    <div class="box mr-2 ml-2" :class=" note.important ? 'green' : ''" style="height: 250px; width: 300px; cursor: pointer;">
      <div @click="openFull">
          <b-field>
              <b-tag type="is-primary"
                     aria-close-label="Close tag">
                  {{ note.tags }}
              </b-tag>
          </b-field>
          <h3 class="title is-4 mb-5" >{{note.title}}</h3>
          <div class="mt-5" style="min-height: 90px">
              {{getBody()}}
          </div>
      </div>
      <div style="margin-left: 160px">
        <b-button type="is-link"
                  icon-right="file-edit"
                  @click="prompt()"/>
        <b-button type="is-danger"
                  icon-right="delete"
                  class="ml-1"
                  @click="deleteCurrent()"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import EditButton from "@/components/FormButton.vue";

export default {
  name: "NoteCard",
  components: {EditButton},
  props: ["note"],
  data() {
    return {
      reveal: false,
      modal: false
    }
  },
  methods: {
    ...mapActions(['deleteNoteAction', 'editNoteAction']),
    getBody() {
      if (this.note.text.length > 40) {
        return this.note.text.substring(0, 39) + '...'
      } else {
        return this.note.text
      }
    },
    deleteCurrent() {
      this.deleteNoteAction(this.note)
    },
    prompt() {
      this.$buefy.dialog.prompt({
        message: `Edit note`,
        inputAttrs: {
          placeholder: 'Enter here...',
          maxlength: 300,
          value: this.note.text
        },
        trapFocus: true,
        onConfirm: (value) => this.editCurrent(value)
      })
    },
    editCurrent(str) {
      if (str !== this.note.text) {
          this.editNoteAction({id: this.note.id, title: this.note.title, text: str, userId: this.note.userId, important: this.note.important, tags: this.note.tags})
      }
    },
    openFull() {
      this.$buefy.dialog.alert({
          title: this.note.title,
          message: this.note.text,
          confirmText: 'Cool!'
      })
    }
  }
}
</script>

<style scoped>
.green {
  background-color: lightgreen;
}
</style>
