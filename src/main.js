import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import 'vue3-date-time-picker/dist/main.css'

createApp(App).use(router).use(store).mount('#app')
