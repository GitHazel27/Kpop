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
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1JHtEv4pdt55VltFZKIft9PCoYifeHRhQbPardm9JS3h2IcXx7q6p2J7ZFUZKCH7JsTiOnENTbO8OmUWWB89K4L-AqvVlC_qCM1dSqA&s=10",
        edit: "https://www.tiktok.com/@crznows/video/7700920695789784340?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",

    },
    {
        id: 2,
        nombre: "BTS",
        descripcion: "",
        image: "https://m.media-amazon.com/images/M/MV5BYzU5NjA3Y2YtY2UwZi00ZDMwLWE5NjAtOTljNTA4NTI4ZjYyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        edit: "https://www.tiktok.com/@_190811jk/video/7620914322973232392?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",
    },
    {
        id: 3,
        nombre: "Enhypen",
        descripcion: " ",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-p8SkGokXsF-3eCU22b45YabETrLP_om8f-RElPb9_A&s=10",
        edit:"https://www.tiktok.com/@wonifice/video/7596042342197415190?is_from_webapp=1&sender_device=pc&web_id=7664273445575919122",
    }
]