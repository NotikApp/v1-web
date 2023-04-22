import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource)

const notes = Vue.resource(`${url}/api/notes{/id}`)

export default {
    remove: id => notes.remove({id: id}),
    edit: note => notes.update({id: note.id}, note)
}
