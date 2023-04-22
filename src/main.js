import Vue from 'vue'
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import Notifications from 'vue-notification'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(Notifications)

window.addEventListener('load', function () {
    new Vue({
        router,
        store,
        render: a => a(App)
    }).$mount('#app')
})
