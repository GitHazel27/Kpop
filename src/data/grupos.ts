export interface Groups {
    id: number;
    nombre: string;
    descripcion: string;
    image?: string;
    edit?: string;
    video?: string;
}

export const group: Groups[] = [
    {
        id: 1,
        nombre: "Stray Kids",
        descripcion: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIz7R3fPB0rry04WIbdZqjPQwMte5kC4195Ek5VUlrEA&s=10",
        edit: "https://www.tiktok.com/@crznows/video/7700920695789784340?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",

    },
    {
        id: 2,
        nombre: "BTS",
        descripcion: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNhEvhxAi1d8S8rM92lSn9hOEWbNWQPAL-rX_6p5N0mw&s=10",
        edit: "https://www.tiktok.com/@_190811jk/video/7620914322973232392?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",
    },
    {
        id: 3,
        nombre: "Enhypen",
        descripcion: " ",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0r9SVj_GyKpDYSGvWi0fyJGY0LwjhqURyZXYKCmxgHA&s=10",
        edit:"https://www.tiktok.com/@wonifice/video/7596042342197415190?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",
    }
]