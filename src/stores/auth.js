import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const prefix = 'auth'

export const useAuthStore = defineStore(prefix, {
   state: () => ({
      error: null,
      isValidated: null
   }),

   actions: {
      async login(payload) {
         try {
            const response = await axios.post(`${prefix}/login`, payload)
            Cookies.set('token', response.data)
         } catch (error) {
            toast.error(error.response.data.error, {
               autoClose: 3000
            })
         }
      },

      async validateToken() {
         try {
            const response = await axios.get(`${prefix}/validateToken`)
            this.isValidated = response.data.validated
         } catch (error) {
            this.error = error
         }
      },

      async logout() {
         try {
            await axios.post(`${prefix}/logout`)
            Cookies.remove('token')
         } catch (error) {
            this.error = error
         }
      },

      async register(payload) {
         try {
            const response = await axios.post(`${prefix}/register`, payload)
            Cookies.set('token', response.data)
         } catch (error) {
            this.error = error.response ? error.response.data : error.message
         }
      }
   },

   getters: {
      getError: (state) => state.error,
      getIsValidated: (state) => state.isValidated
   }
})
