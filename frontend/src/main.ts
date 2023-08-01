// main.js

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // make sure the path is correct
import './style.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
