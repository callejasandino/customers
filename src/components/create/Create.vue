<template>
   <div class="z-50">
      <TransitionRoot as="template" :show="open">
         <Dialog class="relative z-10" @close="closeModal">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
               <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
               <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                     <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-4/6 sm:max-w-2xl sm:p-6">
                        <div class="mb-5">
                           <div class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 mb-5">
                              <label for="first_name" class="block text-md font-medium text-gray-900">First Name</label>
                              <input type="text" name="first_name" class="block w-full border-0 p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6" v-model="customerInformation.first_name" required />
                           </div>
                           <div class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 mb-5">
                              <label for="last_name" class="block text-md font-medium text-gray-900">Last Name</label>
                              <input type="text" name="last_name" class="block w-full border-0 p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6" v-model="customerInformation.last_name" required />
                           </div>
                           <div class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 mb-5">
                              <label for="age" class="block text-md font-medium text-gray-900">Age</label>
                              <input type="text" name="age" class="block w-full border-0 p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6" v-model="customerInformation.age" required />
                           </div>
                           <div class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 mb-5">
                              <label for="dob" class="block text-md font-medium text-gray-900">Date of Birth</label>
                              <input type="date" name="dob" class="block w-full border-0 p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6" v-model="customerInformation.dob" required />
                           </div>
                           <div class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 mb-5">
                              <label for="email" class="block text-md font-medium text-gray-900">Email</label>
                              <input type="text" name="email" class="block w-full border-0 p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6" v-model="customerInformation.email" required />
                           </div>
                        </div>

                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                           <button type="submit" class="inline-flex w-full justify-center rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 sm:col-start-2" @click.prevent="store()">Save</button>
                           <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="closeModal" ref="cancelButtonRef">Cancel</button>
                        </div>
                     </DialogPanel>
                  </TransitionChild>
               </div>
            </div>
         </Dialog>
      </TransitionRoot>
   </div>
</template>

<script src="./Create.js"></script>

<style scoped></style>
