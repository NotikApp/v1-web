<template>
    <form action="">
        <div class="modal-card" style="width: 650px">
            <header class="modal-card-head">
                <p class="modal-card-title">New note...</p>
                <button
                        type="button"
                        class="delete"
                        @click="$emit('close')"/>
            </header>
            <section class="modal-card-body">
                <b-field label="Title" label-position="on-border">
                    <b-input v-model="title"></b-input>
                </b-field>

                <b-field label="Text"
                         label-position="on-border">
                    <b-input maxlength="300" type="textarea" v-model="text"></b-input>
                </b-field>

                <div style="display: flex">
                    <b-field label="Tag"
                             label-position="on-border">
                        <b-input v-model="tag"></b-input>
                    </b-field>
                    <b-button class="ml-2 is-success" @click="tagResult = tag; tag = ''">
                        Add tag
                    </b-button>
                </div>

                <b-field v-if="tagResult !== ''">
                    <b-tag attached
                           closable
                           aria-close-label="Delete"
                           @close="tagResult = ''">
                        {{ tagResult }}
                    </b-tag>
                </b-field>

                <h6 class="title is-6 mb-3">Mark this note as important?</h6>
                <b-field>
                    <b-checkbox v-model="isImportant">
                        {{ isImportant }}
                    </b-checkbox>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <b-button class="is-primary" @click="save">
                    Save
                </b-button>
            </footer>
        </div>
    </form>
</template>

<script>
import {mapActions} from "vuex";
import Vue from "vue";
export default {
    name: "NoteForm",
    data() {
        return {
            text: '',
            title: '',
            isImportant: false,
            isComponentModalActive: false,
            isOpen: false,
            tag: '',
            tagResult: ''
        }
    },
    methods: {
        ...mapActions(['addNoteAction']),
        save() {
            if (this.text !== '' && this.title !== '') {
                this.addNoteAction({title: this.title, text: this.text, important: this.isImportant, tags: this.tagResult})
                this.text = ''
                this.title = ''
                Vue.notify({
                    title: 'Notik',
                    text: 'New note have been successfully posted!'
                })
            }
        }
    }
}
</script>

<style scoped>

</style>