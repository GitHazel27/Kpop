import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Sesion from '../views/Sesion.vue'
import Knews from '@/views/Knews.vue'
import Merch from '@/views/Merch.vue'
import Artistas from '@/views/Artistas.vue'
import GrupoDet from '@/views/GrupoDet.vue'
import Eventos from '@/views/Eventos.vue'
import { guardarPaginaAnterior } from '@/stores/session'

const routes = [
    {path: '/',name: 'inicio',component: Inicio,},
    {path: '/sesion' ,name: 'sesion', component: Sesion},
    {path: '/cart', redirect: { name: 'merch' }},
    {path: '/knews' ,name:'knews' ,component: Knews},
    {path: '/merch' ,name:'merch' ,component: Merch},
    {path: '/grupos' ,name:'grupos' ,component: Artistas},
    {path: '/grupos/:id' ,name:'grupo-det' ,component: GrupoDet},
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

// Guarda la página desde la que se llegó a /sesion para volver ahí al iniciar sesión.
router.beforeEach((to, from) => {
  if (to.name === 'sesion' && from.name && from.name !== 'sesion') {
    guardarPaginaAnterior(from.fullPath)
  }
})

export default router