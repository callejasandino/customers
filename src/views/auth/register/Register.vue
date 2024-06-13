<template>
   <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
         <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form class="space-y-6" action="#" method="POST">
            <div>
               <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
               <div class="mt-2">
                  <input id="name" name="name" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="credentials.name" />
               </div>
            </div>

            <div>
               <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
               <div class="mt-2">
                  <input id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="credentials.email" />
               </div>
            </div>

            <div>
               <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
               </div>
               <div class="mt-2">
                  <input id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="credentials.password" />
               </div>
            </div>

            <div>
               <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
               </div>
               <div class="mt-2">
                  <input id="password_confirm" name="password_confirm" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="credentials.password_confirmation" />
               </div>
            </div>

            <div>
               <button type="button" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-5" @click="register()">Register</button>

               <RouterLink to="/" type="button" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back to Login</RouterLink>
            </div>
         </form>
      </div>
   </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { RouterLink } from 'vue-router'

export default defineComponent({
   setup() {
      const authStore = useAuthStore()
      const router = useRouter()

      const credentials = reactive({
         name: null,
         email: null,
         password: null,
         password_confirm: null
      })

      const clear = () => {
         credentials.name = ''
         credentials.email = ''
         credentials.password = ''
         credentials.password_confirmation = ''
      }

      const invokeToast = (message) => {
         toast.error(message, {
            autoClose: 3000
         })
      }

      const register = async () => {
         if (credentials.name === null) {
            invokeToast('Name is required')
            return
         }
         if (credentials.email === null) {
            invokeToast('Email is required')
            return
         }
         if (credentials.password === null) {
            invokeToast('Password is required')
            return
         }
         if (credentials.password_confirmation === null) {
            invokeToast('Password Confirmation is required')
            return
         }

         if (credentials.password !== credentials.password_confirmation) {
            invokeToast('Password must match')
            return
         }

         await authStore.register(credentials)

         const token = Cookies.get('token')

         clear()
         if (token !== null || token !== '') {
            router.push({ name: 'Customers' })
         }
      }

      return { credentials, register, RouterLink }
   }
})
</script>

<style scoped></style>
