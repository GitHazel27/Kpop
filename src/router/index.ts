import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Sesion from '../views/Sesion.vue'
import Cart from '../views/Cart.vue'
import Knews from '@/views/Knews.vue'
import Merch from '@/views/Merch.vue'
import Artistas from '@/views/Artistas.vue'
import Eventos from '@/views/Eventos.vue'

const routes = [
    {path: '/',name: 'inicio',component: Inicio,},
    {path: '/sesion' ,name: 'sesion', component: Sesion},
    {path: '/cart' ,name:'cart' ,component: Cart},
    {path: '/knews' ,name:'knews' ,component: Knews},
    {path: '/merch' ,name:'merch' ,component: Merch},
    {path: '/grupos' ,name:'grupos' ,component: Artistas},
    {path: '/eventos' ,name:'eventos' ,component: Eventos}
  ]
  
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
})

export default router