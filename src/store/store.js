import Vue from 'vue'
import Vuex from 'vuex'
import mainApi from "../api/mainApi";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('notik_jwt'),
        notes: [],
        search: '',
        edit: null,
        isEdit: false
    },
    getters: {
        allNotes: state => (state.notes || []).sort((a, b) => -(a.id - b.id)),
        getImportant: state => state.notes.filter(it => it.important),
        getNotImportant: state => state.notes.filter(it => !it.important),
    },
    mutations: {
        addTokenMutation(state, token) {
            state.token = token
        },
        addProfileMutation(state, profile) {
            state.profile = profile
        },
        addNotesMutation(state, note) {
            state.notes = [
                ...state.notes, note
            ]
        },
        deleteMessageMutation(state, id) {
            const deletionIndex = state.notes.findIndex(item => item.id === id)
            if (deletionIndex > -1) {
                state.notes = [
                    ...state.notes.slice(0, deletionIndex),
                    ...state.notes.slice(deletionIndex + 1)
                ]
            }
        },
        editNoteMutation(state, note) {
            const updateIndex = state.notes.findIndex(item => item.id === note.id)

            state.notes = [
                ...state.notes.slice(0, updateIndex),
                note,
                ...state.notes.slice(updateIndex + 1)
            ]
        },
        setNotesMutation(state, notes) {
            state.notes = notes
        },
        setSearchMutation(state, text) {
            state.search = text
        },
        setIsEdit(state, edit) {
            state.isEdit = edit
        },
        setEditNote(state, note) {
            state.edit = note
        }
    },
    actions: {
        async addNoteAction({commit, state}, note) {
             let res
             await Vue.http.post(`${url}/api/notes`, note, {headers: {'Authorization': `Bearer ${state.token}`}}).then(resp => {
                 res = resp.body.note
             }, resp => {
                 Vue.notify({
                     title: 'Deletion',
                     text: `Status ${resp.status}: ${resp.body.message}`,
                     type: 'warn'
                 })
             })

             const final = await res
             commit('addNotesMutation', final)
        },
        async deleteNoteAction({commit, state}, note) {
            console.log(`Bearer ${state.token}`)
            await Vue.http.delete(`${url}/api/notes/${note.id}`, {headers: {'Authorization': `Bearer ${state.token}`}}).then(resp => {}, resp => {
                Vue.notify({
                    title: 'Deletion',
                    text: `Status ${resp.status}: ${resp.body.message}`,
                    type: 'warn'
                })
            })

            commit('deleteMessageMutation', note.id)
        },
        async editNoteAction({commit, state}, note) {
            console.log(`Bearer ${state.token}`)
            await Vue.http.put(`${url}/api/notes/${note.id}`, note, {headers: {'Authorization': `Bearer ${state.token}`}}).then(resp => {}, resp => {
                Vue.notify({
                    title: 'Editing',
                    text: `Status ${resp.status}: ${resp.body.message}`,
                    type: 'warn'
                })
            })

            commit('editNoteMutation', note)
        },
        async initNotes({commit, state}) {
            let res
            console.log(`Bearer ${state.token}`)
            await Vue.http.get(`${url}/api/notes`, {headers: {'Authorization': `Bearer ${state.token}`}}).then(resp => {
                res = resp.body.data
            }, resp => {
                Vue.notify({
                    title: 'Deletion',
                    text: `Status ${resp.status}: ${resp.body.message}`,
                    type: 'warn'
                })
            })

            const final = await res
            commit('setNotesMutation', final)
        }
    }
})
