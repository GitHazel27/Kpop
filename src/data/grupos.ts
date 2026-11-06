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
        }
    >;
}

export const group: Groups[] = [
    {
        id: 1,
        nombre: "Stray Kids",
        descripcion: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIz7R3fPB0rry04WIbdZqjPQwMte5kC4195Ek5VUlrEA&s=10",
        edit: "https://www.tiktok.com/@crznows/video/7700920695789784340?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",
        videoDebut: "",
        videoFav: "",
        integrantes: [
            {
                nombre: "Bang Chan",
                posicion: "Líder, vocalista, rapero, bailarín, productor"
            },
            {
                nombre: "Lee Know",
                posicion: "	Bailarín principal, vocalista"
            },
            {
                nombre: "Changbin",
                posicion: "Rapero principal, productor"
            },
            {
                nombre: "Hyunjin",
                posicion: "Bailarín principal, rapero, visual"
            },
            {
                nombre: "Han",
                posicion: "Rapero principal, vocalista, productor"  
            },
            {
                nombre: "Felix",
                posicion: "Bailarín, rapero"
            },
            {
                nombre: "Seungmin", 
                posicion: "Vocalista principal"
            },
            {
                nombre: "I.N",
                posicion: "Maknae, vocalista, bailarín"
            }
        ]
    },
    {
        id: 2,
        nombre: "BTS",
        descripcion: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNhEvhxAi1d8S8rM92lSn9hOEWbNWQPAL-rX_6p5N0mw&s=10",
        edit: "https://www.tiktok.com/@_190811jk/video/7620914322973232392?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",
        videoDebut: "",
        videoFav: "",
        integrantes: [
            {
                nombre: "RM (Kim Namjoon)",
                posicion: "Líder, rapero principal"
            },
            {
                nombre: "Jin (Kim Seokjin)",
                posicion: "Vocalista, visual"
            },
            {
                nombre: "SUGA (Min Yoongi)",
                posicion: "Rapero líder, productor"
            },
            {
                nombre: "J-Hope (Jung Hoseok)",
                posicion: "Bailarín principal, rapero líder"
            },
            {
                nombre: "Jimin (Park Jimin)",
                posicion: "Bailarín principal, vocalista líder"
            },
            {
                nombre: "V (Kim Taehyung)",
                posicion: "Vocalista principal"
            },
            {
                nombre: "Jungkook (Jeon Jungkook)",
                posicion: "Vocalista principal, bailarín líder, maknae"
            }
        ]
    },
    {
        id: 3,
        nombre: "Enhypen",
        descripcion: " ",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0r9SVj_GyKpDYSGvWi0fyJGY0LwjhqURyZXYKCmxgHA&s=10",
        edit:"https://www.tiktok.com/@wonifice/video/7596042342197415190?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",
        videoDebut: "",
        videoFav: "",
        integrantes: [
            {
                nombre: "Jungwon",
                posicion: "Líder, vocalista, bailarín"
            },
            {
                nombre: "Jay",
                posicion: "Vocalista, rapero, bailarín"
            },
            {
                nombre: "Jake",
                posicion: "Vocalista, bailarín"
            },
            {
                nombre: "Sunghoon",
                posicion: "Vocalista, bailarín, visual"
            },
            {
                nombre: "Sunoo",
                posicion: "Vocalista"  
            },
            {
                nombre: "Ni-ki",
                posicion: "Bailarín principal, rapero, maknae"
            },
        ]
    }
]