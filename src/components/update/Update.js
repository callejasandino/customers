import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { useCustomerStore } from '@/stores/customer'

export default defineComponent({
   props: {
      isUpdatePostOpen: {
         type: Boolean,
         required: true
      },
      customerInfo: {
         type: Object,
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
      const open = ref(props.isUpdatePostOpen)

      const customerInformation = reactive({
         first_name: props.customerInfo.first_name,
         last_name: props.customerInfo.last_name,
         age: props.customerInfo.age,
         dob: props.customerInfo.dob,
         email: props.customerInfo.email,
         id: props.customerInfo.id
      })

      const clear = () => {
         customerInformation.first_name = ''
         customerInformation.last_name = ''
         customerInformation.age = ''
         customerInformation.dob = ''
         customerInformation.email = ''
         customerInformation.id = ''
      }

      watchEffect(() => {
         open.value = props.isUpdatePostOpen
      })

      const invokeToast = (message) => {
         toast.error(message, {
            autoClose: 3000
         })
      }

      const update = async () => {
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

         await customerStore.update(customerInformation.id, customerInformation)
         clear()
         emit('close')
      }

      const closeModal = () => {
         open.value = false
         clear()
         emit('close')
      }

      return { open, closeModal, customerInformation, update }
   }
})
