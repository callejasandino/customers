import { defineStore } from 'pinia'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const prefix = 'customers'

export const useCustomerStore = defineStore(prefix, {
   state: () => ({
      error: null,
      customer: null,
      customers: null
   }),

   actions: {
      async index() {
         try {
            const response = await axios.get(`${prefix}/index`)
            this.customers = response.data.customers
         } catch (error) {
            this.error = error
         }
      },
      async store(payload) {
         try {
            const response = await axios.post(`${prefix}/store`, payload)
            this.customer = response.data
         } catch (error) {
            Object.entries(error.response.data.errors).forEach(([field, messages]) => {
               messages.forEach((message) => {
                  toast.error(message, {
                     autoClose: 3000
                  })
               })
            })
         }
      },
      async update(customerId, payload) {
         try {
            const response = await axios.put(`${prefix}/update/${customerId}`, payload)
            this.customer = response.data
         } catch (error) {
            Object.entries(error.response.data.errors).forEach(([field, messages]) => {
               messages.forEach((message) => {
                  toast.error(message, {
                     autoClose: 3000
                  })
               })
            })
         }
      },
      async destroy(customerId) {
         try {
            const response = await axios.delete(`${prefix}/destroy/${customerId}`)
            this.customer = response.data
         } catch (error) {
            this.error = error
         }
      }
   },

   getters: {
      getError: (state) => state.error,
      getCustomers: (state) => state.customers,
      getCustomer: (state) => state.customer
   }
})
