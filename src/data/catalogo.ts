export interface catalogo {
    id: number;
    categoria: string;
    idgrupo: number;
    grupo: string;
    titulo: string;
    precio: number;
    descripcion?: string;
    image?: string;
}

export const catalogo: catalogo[] = [
    {
        id: 1,
        categoria: 'Album',
        idgrupo: 1,
        grupo: 'Stray Kids',
        titulo: 'Stray Kids - SKZ IT TAPE [DO IT] (IT ver.)',
        precio: 570.00,
        descripcion: '',
        image:'https://acdn-us.mitiendanube.com/stores/004/726/339/products/d97c4905df0f9f3641b970b83053df105b1e91ab-9ef23b593828ed07d517649564802278-640-0.webp'
    },
    {
        id: 2,
        categoria: 'Album',
        idgrupo: 2,
        grupo: 'BTS',
        titulo: 'BTS - ARIRANG [Living Legend Ver.] + 4 Extra Photocards',
        precio: 809.00,
        descripcion: '',
        image:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS-Ds4gLkl68Cm4K2skb29VJZSCuDkCFOe0K7LNfSAH6uelMkEJSLOm1bVh9STybJeQfQYJzxxSZfItfZUYluwiO_RRoFU8gJOBUxSuqwT2VIzGpVTBP1m_Uhyfj7fE17PCUB2ubGGGkA&usqp=CAc'
    },
    {
        id: 3,
        categoria: 'Album',
        idgrupo: 2,
        grupo: 'BTS',
        titulo: 'BTS Album - MAP OF SOUL : PERSONA [ 2 Ver. ] CD',
        precio: 529.00,
        descripcion: '',
        image:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRq0DWk_d0KRA2-3bd66syAZI4wOJ2IOqMzZJFlJv4NXdMzlIMmAVirQnYZVspyR3EZhwPjtitSwERI4Uqre8seN07n84szLszpQa8IQppz-xurIPFmLw2qN7MPqoTvReA-XlUj0g&usqp=CAc'
    },
    {
        id: 4,
        categoria: 'Album',
        idgrupo: 3, 
         grupo: 'Enhypen',
        titulo: 'ENHYPEN - Álbum Dark Blood (versión ENGENE)',
        precio: 529.00,
        descripcion: '',
        image:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR8CvE_4mghafAWHHd4AHmSwOtDo9q5VJZddLdsCKZ-LEy5zAy4HmfApYuMUNx0I5PXpLGCVE3IjjDVMcuZMr-OrcGh573egzgMk_SLwihpvcujBGsWtgj6VY7KLMDBlfbyANSc2KE&usqp=CAc'
    },
    {
        id: 5,
        categoria: 'Lightstick',
        idgrupo: 1,
        grupo: 'Stray Kids',
        titulo: 'Stray Kids - Light Stick Oficial Versión 2',
        precio: 1299.00,
        descripcion: '',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxquuq0AFBbtm0oaaFGarGRZOpi_FFJp-wwoaL-HDJPQ&s=10'
    },
    {
        id: 6,
        categoria: 'Lightstick',
        idgrupo: 2,
        grupo: 'BTS',
        titulo: 'BTS - Light Stick Oficial Versión 4',
        precio: 1299.00,
        descripcion: '',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3qelsto4sCWrBpmK5p51AU6CYm7MJULvXZ8RaJfPpw&s=10'
    },
    {
        id: 7,
        categoria: 'Lightstick',
        idgrupo: 3,
        grupo: 'Enhypen',
        titulo: 'ENHYPEN - Light Stick Oficial Versión 2',
        precio: 1299.00,
        descripcion: '',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4aBSHaS-yoq-U3II6ta1iqXLhWbqlcxcM7RH4ZQGjuw&s=10'
    },
    {
        id: 8,
        categoria: 'Lightstick',
        idgrupo: 1,
        grupo: 'Stray Kids',
        titulo: 'Stray Kids - Keychain Mini Light Stick Oficial Versión 2',
        precio: 299.00,
        descripcion: '',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFNw0nlaneNmHDQEb3xcaYRxm3MN353qtJ7sCs2VsWKA&s=10'
    },
    {
        id: 9,
        categoria: 'Merch Oficial',
        idgrupo: 1,
        grupo: 'Stray Kids',
        titulo: 'SKZOO Llaver de peluche Secreto VER.',
        precio: 799.00,
        descripcion: '',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWvoKUhqe9LLD1WLzeuX3rRmau5vaszufHvhQr-B3-Fg&s'
    },
    {
        id: 10,
        categoria: 'Merch Oficial',
        idgrupo: 2,
        grupo: 'BTS',
        titulo: 'BTS -Wind Jacket Versión SWIM',
        precio: 1899.00,
        descripcion: '',
        image:'https://cdn-contents.weverseshop.io/public/shop/be0c3508884f6d3795f8403166ad2198.png?w=720&q=95'
    },
    {
        id: 11,
        categoria: 'Merch Oficial',
        idgrupo: 3,
        grupo: 'Enhypen',
        titulo: 'ENHYPEN - Mini Album Keyring',
        precio: 299.00,
        descripcion: '',
        image:'https://cdn-contents.weverseshop.io/public/shop/f81ab15e3df2dad1804fc49e32e8a4c2.png?w=720&q=95'
    },{
        id: 12,
        categoria: 'Lightstick',
        idgrupo: 3,
        grupo: 'Enhypen',
        titulo: 'ENHYPEN - Official Light Stick Ver.2 Keyring',
        precio: 299.00,
        descripcion: '',
        image:'https://cdn-contents.weverseshop.io/public/shop/45485d3da610bee0035b6b4ace3b3597.png?w=720&q=95'
    }
]