import { useAuthStore } from '@/stores/auth'
import Cookies from 'js-cookie'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
   {
      path: '/',
      name: 'Login',
      component: () => import('../views/auth/Login.vue')
   },
   {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/register/Register.vue')
   },
   {
      path: '/customers',
      name: 'Customers',
      component: () => import('../views/customers/Customers.vue'),
      meta: { requiresAuth: true }
   }
]

const router = createRouter({
   history: createWebHistory(),
   routes
})

router.beforeEach(async (to, from, next) => {
   const token = Cookies.get('token') ?? null

   const authStore = useAuthStore()

   if (token === null) {
      // If there is no token and the route requires authentication, redirect to login
      if (to.meta.requiresAuth) {
         next({ name: 'Login' })
      } else {
         // If the route does not require authentication, proceed as normal
         next()
      }
      return
   }

   try {
      // Validate the token
      await authStore.validateToken()
      const isValid = authStore.getIsValidated

      if (isValid !== true) {
         // If the token is not valid, remove the token and redirect to login
         Cookies.remove('token')
         next({ name: 'Login' })
         return
      }

      // If the user is authenticated and tries to navigate to login, redirect to home
      if (to.name === 'Login' || to.name === 'Register') {
         next({ name: 'Customers' })
      } else {
         // Otherwise, proceed as normal
         next()
      }
   } catch (error) {
      // Redirect to login if there's an error in token validation
      Cookies.remove('token')
      next({ name: 'Login' })
   }
})

export default router
