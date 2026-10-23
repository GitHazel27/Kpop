import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Sesion from '../views/Sesion.vue'
import Cart from '../views/Cart.vue'

const routes = [
    {path: '/',name: 'inicio',component: Inicio,},
    {path: '/sesion' ,name: 'sesion', component: Sesion},
    {path: '/cart' ,name:'cart' ,component: Cart}
  ]
  
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router