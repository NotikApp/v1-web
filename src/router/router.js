import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        component: () => import("../pages/NoteList.vue")
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})
