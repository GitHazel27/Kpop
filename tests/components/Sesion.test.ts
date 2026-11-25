// @vitest-environment jsdom
import { describe, expect, test} from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils' //Monta el componente y permite interactuar con él
import Sesion from '@/views/Sesion.vue'

const botonDeModo = (wrapper: VueWrapper, texto: string) =>
  wrapper.findAll('.mode-switch button').find((boton) => boton.text() === texto)

describe('Sesion', () => {
  test('muestra los botones para elegir entre iniciar sesión y registrarse', () => {
    const wrapper = mount(Sesion)//Abre la vista

    expect(botonDeModo(wrapper, 'Iniciar sesión')).toBeDefined()//Comprobación
    expect(botonDeModo(wrapper, 'Registrarse')).toBeDefined()
  })

  test('muestra el formulario de inicio de sesión por defecto', () => {
    const wrapper = mount(Sesion)

    expect(wrapper.find('h1').text()).toBe('¡Qué bueno verte!')
    expect(wrapper.find('input[name="email"]').exists()).toBe(true)
    expect(wrapper.find('input[name="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Entrar')
    // El campo de nombre solo aparece en el registro
    expect(wrapper.find('input[name="name"]').exists()).toBe(false)
  })

  test('muestra el formulario de registro al elegir Registrarse', async () => {
    const wrapper = mount(Sesion)

    const registrarse = botonDeModo(wrapper, 'Registrarse')
    expect(registrarse).toBeDefined()
    await registrarse!.trigger('click')//Cambia al registro y espera a que se vea la vista

    expect(wrapper.find('h1').text()).toBe('Únete a la comunidad')
    expect(wrapper.find('input[name="name"]').exists()).toBe(true)
    expect(wrapper.find('input[name="email"]').exists()).toBe(true)
    expect(wrapper.find('input[name="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Crear cuenta')
  })
})