export interface News {
    id: number;
    titulo: string;
    descripcion: string;
    image?: string;
    enlace?: string;
}

export const news: News[] = [
    {
        id: 1,
        titulo: "Nuevo miniálbum japonés Siatsu",
        descripcion: " El grupo anunció el lanzamiento de su cuarto miniálbum japonés titulado \"Siatsu\", programado para el 25 de noviembre de 2026.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREJ-DvH9H7huj1ubFhOQ8ZXifmTv59ja5vvaMmpPrB-w&s=10",
        enlace: "https://www.straykidsjapan.com/suiatsu/",
    },
    {
        id: 2,
        titulo: "Jisoo presenta el teaser del video musical de 'Addicted'",
        descripcion: "Jisoo, integrante de Blackpink, presentó el 28 de octubre un adelanto del video musical de “Addicted”, el segundo sencillo de su primer álbum de estudio.",
        image: "https://worldimg.kbs.co.kr/src/images/music_news/261030011538_63.jpg",
        enlace: "https://world.kbs.co.kr/service/contents_view.htm?lang=s&menu_cate=enternews&id=&board_seq=472434&page=1&board_code=",
    },
    {
        id: 3,
        titulo: "Stray kids se prepara para su cuarta gira mundial 'RUN IT'",
        descripcion: "De manera oficial se ha dado a conocer que Stray Kids llevará su World Tour RUN IT, a salas de cine dentro del territorio nacional con una transmisión especial, desde el Tokyo Dome. Se espera que el legendario evento sea el próximo 7 de noviembre del 2026.",
        image: "https://tvazteca.brightspotcdn.com/dims4/default/7eae2aa/2147483647/strip/true/crop/1200x665+0+0/resize/752x417!/format/webp/quality/90/?url=https%3A%2F%2Ftv-azteca-brightspot-production-us-west-2.s3.us-west-2.amazonaws.com%2F06%2F5e%2F0886fb9a467ebd2664721217002e%2Fstray-kids-1.jpg",
        enlace: "https://www.tvazteca.com/azteca7/noticias-musica/stray-kids-run-it-llegara-a-cines-mexico-y-esto-es-todo-lo-que-debes-saber/",
    }
]   