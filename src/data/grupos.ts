export interface Groups {
    id: number;
    nombre: string;
    descripcion: string;
    image?: string;
    video?: string;
}

export const group: Groups[] = [
    {
        id: 1,
        nombre: "Stray Kids",
        descripcion: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1JHtEv4pdt55VltFZKIft9PCoYifeHRhQbPardm9JS3h2IcXx7q6p2J7ZFUZKCH7JsTiOnENTbO8OmUWWB89K4L-AqvVlC_qCM1dSqA&s=10",
    },
    {
        id: 2,
        nombre: "BTS",
        descripcion: "",
        image: "https://m.media-amazon.com/images/M/MV5BYzU5NjA3Y2YtY2UwZi00ZDMwLWE5NjAtOTljNTA4NTI4ZjYyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    {
        id: 3,
        nombre: "Enhypen",
        descripcion: " ",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-p8SkGokXsF-3eCU22b45YabETrLP_om8f-RElPb9_A&s=10",
    }
]