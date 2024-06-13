import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import App from './App.vue'
import router from './router'
import Cookies from 'js-cookie'

const api = import.meta.env.VITE_API_URL

const app = createApp(App)

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.request.use(
   async (config) => {
      config.url = `${api}${config.url}`
      const token = Cookies.get('token')
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }

      return await config
   },
   (error) => {
      return Promise.reject(error)
   }
)

app.use(router)
app.use(createPinia())

app.mount('#app')
