import { computed, defineComponent, reactive, ref, watchEffect } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { useCustomerStore } from '@/stores/customer'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineComponent({
   props: {
      isCreatePostOpen: {
         type: Boolean,
         required: true
      }
   },
   components: {
      Dialog,
      DialogPanel,
      DialogTitle,
      TransitionChild,
      TransitionRoot,
      CheckIcon
   },

   setup(props, { emit }) {
      const customerStore = useCustomerStore()
      const open = ref(props.isCreatePostOpen)

      const customerInformation = reactive({
         first_name: null,
         last_name: null,
         age: null,
         dob: null,
         email: null
      })

      const clear = () => {
         customerInformation.first_name = ''
         customerInformation.last_name = ''
         customerInformation.age = ''
         customerInformation.dob = ''
         customerInformation.email = ''
      }

      watchEffect(() => {
         open.value = props.isCreatePostOpen
      })

      const invokeToast = (message) => {
         toast.error(message, {
            autoClose: 3000
         })
      }

      const store = async () => {
         if (customerInformation.first_name === null) {
            invokeToast('First Name is required')
            return
         }
         if (customerInformation.last_name === null) {
            invokeToast('Last Name is required')
            return
         }
         if (customerInformation.age === null) {
            invokeToast('Age is required')
            return
         }
         if (customerInformation.dob === null) {
            invokeToast('Date of Birth is required')
            return
         }
         if (customerInformation.email === null) {
            invokeToast('Email is required')
            return
         }

         await customerStore.store(customerInformation)
         clear()
         emit('close')
      }

      const closeModal = () => {
         open.value = false
         emit('close')
      }

      return { open, closeModal, customerInformation, store }
   }
})
