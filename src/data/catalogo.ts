export interface catalogo {
    id: number;
    categoria: string;
    grupo: string;
    titulo: string;
    precio: string;
    descripcion?: string;
    image?: string;
}

export const catalogo: catalogo[] = [
    {
        id: 1,
        categoria: 'Album',
        grupo: 'Stray Kids',
        titulo: 'Stray Kids - SKZ IT TAPE [DO IT] (IT ver.)',
        precio: '$570.00',
        descripcion: '',
        image:'https://acdn-us.mitiendanube.com/stores/004/726/339/products/d97c4905df0f9f3641b970b83053df105b1e91ab-9ef23b593828ed07d517649564802278-640-0.webp'
    }
]