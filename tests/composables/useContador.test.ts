import { beforeEach, describe, expect, test } from 'vitest'
import { useContador } from '@/composables/useContador'
import { limpiarCarrito } from '@/composables/cart'

describe('useContador', () => {
  //El carrito es estado compartido: se vacía antes de cada prueba.
  beforeEach(() => {
    limpiarCarrito()
  })

  test('incrementa la cantidad de un producto', () => {
    const { quantities, incrementar } = useContador()

    incrementar(1)

    expect(quantities.value[1]).toBe(1)
  })

  test('suma varias unidades', () => {
    const { quantities, incrementar } = useContador()

    incrementar(1)
    incrementar(1)

    expect(quantities.value[1]).toBe(2)
  })

  test('decrementa la cantidad', () => {
    const { quantities, incrementar, decrementar } = useContador()

    incrementar(1)
    incrementar(1)
    decrementar(1)

    expect(quantities.value[1]).toBe(1)
  })
})