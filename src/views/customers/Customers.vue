<template>
   <div class="px-4 sm:px-6 lg:px-8 p-10">
      <div class="sm:flex sm:items-center bg-zinc-800 p-10 rounded-lg">
         <div class="sm:flex-auto">
            <h1 class="text-4xl font-semibold leading-6 text-white">Customers</h1>
         </div>
         <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="toggleCreatePost()">Add user</button>
         </div>
         <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="logout()">Logout</button>
         </div>
      </div>
      <div class="mt-8 flow-root">
         <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle">
               <table class="min-w-full divide-y divide-gray-300">
                  <thead>
                     <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">First Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Age</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date of Birth</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                     </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                     <tr v-for="customer in customers" :key="customer.email">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ customer.first_name }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ customer.last_name }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ customer.age }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ customer.dob }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ customer.email }}</td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 lg:pr-8">
                           <button href="#" class="text-indigo-600 hover:text-indigo-900 mr-5" @click="toggleUpdatePost(customer)">Edit<span class="sr-only"></span></button>
                           <button href="#" class="text-indigo-600 hover:text-indigo-900" @click="destroy(customer.id)">Delete<span class="sr-only"></span></button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
      <Create :isCreatePostOpen="isCreatePostOpen" @close="toggleCreatePost()" />

      <Update v-if="customer" :isUpdatePostOpen="isUpdatePostOpen" :customerInfo="customer" @close="toggleUpdatePost()" />
   </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import Create from '@/components/create/Create.vue'
import Update from '@/components/update/Update.vue'
import { useCustomerStore } from '@/stores/customer'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export default defineComponent({
   components: { Create, Update },
   setup() {
      const customerStore = useCustomerStore()
      const customers = ref(null)
      const isCreatePostOpen = ref(false)
      const isUpdatePostOpen = ref(false)
      const customer = ref(false)
      const authStore = useAuthStore()
      const router = useRouter()

      const index = async () => {
         await customerStore.index()
         customers.value = await customerStore.getCustomers
      }

      const destroy = async (customerId) => {
         await customerStore.destroy(customerId)
         index()
      }

      const toggleCreatePost = () => {
         isCreatePostOpen.value = !isCreatePostOpen.value
      }

      const toggleUpdatePost = async (customerInfo) => {
         customer.value = await customerInfo
         isUpdatePostOpen.value = !isUpdatePostOpen.value
      }

      const logout = async () => {
         await authStore.logout()
         Cookies.remove('token')
         router.push({ name: 'Login' })
      }

      watch(isCreatePostOpen, (newValue) => {
         if (newValue === false) {
            index()
         }
      })

      watch(isUpdatePostOpen, (newValue) => {
         if (newValue === false) {
            index()
         }
      })

      onMounted(() => {
         index()
      })

      return { isCreatePostOpen, isUpdatePostOpen, toggleCreatePost, customers, destroy, toggleUpdatePost, customer, logout }
   }
})
</script>

<style scoped></style>
