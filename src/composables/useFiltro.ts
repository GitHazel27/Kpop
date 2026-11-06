import { computed, ref } from 'vue';
import type { catalogo as Producto } from '@/data/catalogo';

export function useFiltro(productos: Producto[]) {
  const grupoSeleccionado = ref('Todos');
  const grupos = [...new Set(productos.map((producto) => producto.grupo))];

  function filtrarPorGrupo(grupo: string) {
    if (grupo === 'Todos') return productos;

    return productos.filter((producto) => producto.grupo === grupo);
  }

  const productosFiltrados = computed(() => filtrarPorGrupo(grupoSeleccionado.value));

  return { grupoSeleccionado, grupos, productosFiltrados };
}