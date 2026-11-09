export interface Groups {
    id: number;
    nombre: string;
    descripcion: string;
    image?: string;
    edit?: string;
    videoDebut?: string;
    videoFav?: string;
    integrantes?: Array<
        {
            nombre: string;
            posicion: string;
            foto?: string;
        }
    >;
}

export const group: Groups[] = [
    {
        id: 1,
        nombre: "Stray Kids",
        descripcion: "Stray Kids es un grupo surcoreano de ocho integrantes que debutó en 2017 bajo JYP Entertainment. Se caracteriza por su estilo musical experimental, combinando géneros como hip-hop, electrónica y pop. Gran parte de su música es producida por ellos mismos, especialmente a través de su equipo creativo 3RACHA. Sus canciones transmiten mensajes de identidad, libertad y confianza en uno mismo.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIz7R3fPB0rry04WIbdZqjPQwMte5kC4195Ek5VUlrEA&s=10",
        edit: "https://www.tiktok.com/@crznows/video/7700920695789784340?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",
        videoDebut: "https://www.youtube.com/watch?v=AdfIfFGCqgo&list=RDAdfIfFGCqgo&start_radio=1",
        videoFav: "https://www.youtube.com/watch?v=Dab4EENTW5I&list=RDDab4EENTW5I&start_radio=1",
        integrantes: [
            {
                nombre: "Bang Chan",
                posicion: "Líder, vocalista, rapero, bailarín, productor",
                foto:"https://i.pinimg.com/736x/c1/d5/9e/c1d59e56afb768a935e4bf5f474c0e81.jpg"
            },
            {
                nombre: "Lee Know",
                posicion: "	Bailarín principal, vocalista",
                foto:"https://i.pinimg.com/736x/ed/8b/01/ed8b018764aa66449852b7eadfd3ff67.jpg"
            },
            {
                nombre: "Changbin",
                posicion: "Rapero principal, productor",
                foto:"https://i.pinimg.com/736x/b4/9a/13/b49a13baad85ae211aea6d91df0c039c.jpg"
            },
            {
                nombre: "Hyunjin",
                posicion: "Bailarín principal, rapero, visual",
                foto:"https://i.pinimg.com/736x/b4/aa/1d/b4aa1da48d3e4bd59d48786c17a2f65c.jpg"
            },
            {
                nombre: "Han",
                posicion: "Rapero principal, vocalista, productor",
                foto:"https://i.pinimg.com/1200x/39/57/15/395715be6935fb01d0957fa85d9d2c16.jpg"
            },
            {
                nombre: "Felix",
                posicion: "Bailarín, rapero",
                foto:"https://i.pinimg.com/736x/b0/97/9d/b0979de5ca76c6afa89d92b58e9f49fd.jpg"
            },
            {
                nombre: "Seungmin", 
                posicion: "Vocalista principal",
                foto:"https://i.pinimg.com/736x/67/8b/70/678b70aece320b151c93022c5fde62d8.jpg"
            },
            {
                nombre: "I.N",
                posicion: "Maknae, vocalista, bailarín",
                foto:"https://i.pinimg.com/1200x/2d/b4/ba/2db4ba7d60675697380eaeaea44c53e4.jpg"
            }
        ]
    },
    {
        id: 2,
        nombre: "K/DA",
        descripcion: "K/DA es un grupo femenino virtual de K-pop creado por Riot Games, inspirado en cuatro personajes del videojuego League of Legends. Debutó en 2018 con la canción POP/STARS, que rápidamente ganó popularidad a nivel mundial. Su estilo combina K-pop, pop y música electrónica, destacando por sus conceptos futuristas, coreografías y una imagen llena de actitud y confianza. Sus canciones transmiten empoderamiento, individualidad y seguridad en uno mismo.",
        image: "https://images.openai.com/static-rsc-4/U2qhI0esysCivkHsdfLzLjtns6XWBPrJH0fKnwMILGf7HoAb6O4f4WJvYseHC_QBCcTKWtkfkFvFVpMyw5YUS7E8-7lLudwO5dy6ai31bGfV4ON_Hl3aJ96HHi4gOEVfGRQ1nMIgHhA3_L-E0HaDrwyjvim1s-Ber3-2-Y-85vU?purpose=inline",
        edit: "",
        videoDebut: "https://www.youtube.com/watch?v=UOxkGD8qRB4&list=RDUOxkGD8qRB4&start_radio=1",
        videoFav: "https://www.youtube.com/watch?v=3VTkBuxU4yk&list=RD3VTkBuxU4yk&start_radio=1",
        integrantes: [
            {
                nombre: "Ahri",
                posicion: "Líder, vocalista principal y visual",
                foto:"https://images.openai.com/static-rsc-4/dPrs_ih_hKQnTLR1g1aTo8eh7X_nRSUGY1SdTCjTTYF1ALoSoyUhV8S1hRwzCQcJKFcu4oS48tBszaxwYwIK0lzmPt4ZwWhqN1kTgVSxM-mfYhzZBAMvcYvrzizmoftFbCVUlMaOu0fvn9k89BI--V3GXpyT9A9bV-mRg4R0EkHDhIyAJQx0isFiRh4iucXk?purpose=fullsize"
            },
            {
                nombre: "Akali",
                posicion: "Rapera principal",
                foto:"https://i.pinimg.com/736x/bd/b0/a3/bdb0a39c7834f1daa0a3a603e75843b4.jpg"
            },
            {
                nombre: "Evelynn",
                posicion: "Vocalista principal",
                foto:"https://i1.sndcdn.com/artworks-HHvwpBVwW72vmFSl-y9muog-t500x500.jpg"
            },
            {
                nombre: "Kai'Sa",
                posicion: "Bailarina principal, vocalista y rapera",
                foto:"https://images.openai.com/static-rsc-4/RahxvHUHMKv4GOafTzJu6cjH605ge9by1LdrgtKr7U5NA7Z4-SlDClen2Hlg12Gt2hBTImIIu9rx-6RnbbbyOP3ONmEGxV_0e5QWrN1JBdWvDeyNKFldMxwe5WlsOhSrN7x2kzvZ_eNEEFXq9l-uadPmkeejxkFWZ_tdsViImKOLOgm5ftuDZmThYXxXiaSq?purpose=fullsize"
            },
        ]
    },
    {
        id: 3,
        nombre: "Enhypen",
        descripcion: "ENHYPEN es un grupo surcoreano que debutó en 2020 bajo BELIFT LAB. Formado a través del programa de supervivencia I-LAND, destaca por sus conceptos visuales, coreografías y una narrativa musical que frecuentemente incorpora elementos de fantasía y misterio. Su nombre representa la conexión entre personas para descubrirse y crecer juntas, reflejando la unión entre sus integrantes y sus fans, conocidos como ENGENE.",
        image: "https://i.pinimg.com/736x/67/81/80/678180b53db071414511f4f70496734d.jpg",
        edit:"https://www.tiktok.com/@wonifice/video/7596042342197415190?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",
        videoDebut: "https://www.youtube.com/watch?v=nQ6wLuYvGd4&list=RDnQ6wLuYvGd4&start_radio=1",
        videoFav: "https://www.youtube.com/watch?v=Fc7-Oe0tj5k&list=RDFc7-Oe0tj5k&start_radio=1",
        integrantes: [
            {
                nombre: "Jungwon",
                posicion: "Líder, vocalista, bailarín",
                foto:"https://i.pinimg.com/1200x/8d/c1/c1/8dc1c11b3f72d30da9ee7534fd99a872.jpg"
            },
            {
                nombre: "Jay",
                posicion: "Vocalista, rapero, bailarín",
                foto:"https://i.pinimg.com/1200x/ec/40/23/ec4023fc380b0ef4101f63a87fea7816.jpg"
            },
            {
                nombre: "Jake",
                posicion: "Vocalista, bailarín",
                foto:"https://i.pinimg.com/1200x/17/88/7e/17887e5a05c761b7de4d14c6dd305eda.jpg"
            },
            {
                nombre: "Sunghoon",
                posicion: "Vocalista, bailarín, visual",
                foto:"https://i.pinimg.com/1200x/3d/7f/52/3d7f520cb623ec86bf000804ba64b3d4.jpg"
            },
            {
                nombre: "Sunoo",
                posicion: "Vocalista",
                foto:"https://i.pinimg.com/1200x/d6/1c/b6/d61cb6a6b1ec376255c8e041b6528857.jpg"
            },
            {
                nombre: "Ni-ki",
                posicion: "Bailarín principal, rapero, maknae",
                foto:"https://i.pinimg.com/1200x/cb/c6/3d/cbc63dbf4bbb9750f668cb85d77c3b63.jpg"
            },
        ]
    },
    {
        id: 4,
        nombre: "BTS",
        descripcion: "BTS es un grupo surcoreano formado por siete integrantes que debutó en 2013 bajo Big Hit Entertainment. Reconocidos mundialmente por su música, coreografías y mensajes de amor propio, sus canciones abarcan temas como la juventud, los sueños, la superación y las emociones. Conocidos como Bangtan Sonyeondan, han logrado convertirse en uno de los grupos más influyentes de la industria del K-pop.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNhEvhxAi1d8S8rM92lSn9hOEWbNWQPAL-rX_6p5N0mw&s=10",
        edit: "https://www.tiktok.com/@_190811jk/video/7620914322973232392?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",
        videoDebut: "https://www.youtube.com/watch?v=rBG5L7UsUxA",
        videoFav: "https://www.youtube.com/watch?v=9DwzBICPhdM&list=RD9DwzBICPhdM&start_radio=1",
        integrantes: [
            {
                nombre: "RM (Kim Namjoon)",
                posicion: "Líder, rapero principal",
                foto:"https://i.pinimg.com/736x/4b/af/67/4baf675f2a9df3505f9f8e7a7afab825.jpg"
            },
            {
                nombre: "Jin (Kim Seokjin)",
                posicion: "Vocalista, visual",
                foto:"https://i.pinimg.com/736x/1d/c5/ab/1dc5ab8140b9592a6605da6eb241e435.jpg"
            },
            {
                nombre: "SUGA (Min Yoongi)",
                posicion: "Rapero líder, productor",
                foto:"https://i.pinimg.com/736x/53/85/b6/5385b63524f853c3a26371d499d21539.jpg"
            },
            {
                nombre: "J-Hope (Jung Hoseok)",
                posicion: "Bailarín principal, rapero líder",
                foto:"https://i.pinimg.com/736x/f3/ed/af/f3edaf9fbf16ea7a53c6631b814c4b69.jpg"
            },
            {
                nombre: "Jimin (Park Jimin)",
                posicion: "Bailarín principal, vocalista líder",
                foto:"https://i.pinimg.com/736x/98/da/30/98da3051d30278357fe2419ecdd05358.jpg"
            },
            {
                nombre: "V (Kim Taehyung)",
                posicion: "Vocalista principal",
                foto:"https://i.pinimg.com/736x/3f/dc/5a/3fdc5a8772889db316e4aad7966cb97a.jpg"
            },
            {
                nombre: "Jungkook (Jeon Jungkook)",
                posicion: "Vocalista principal, bailarín líder, maknae",
                foto:"https://i.pinimg.com/736x/91/03/b2/9103b2729bfa2fc6262730fdd02fdcba.jpg"
            }
        ]
    },
]