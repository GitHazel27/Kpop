export interface Cancion {
  id: string
  titulo: string
  artista: string
  /** ID del video en YouTube: youtube.com/watch?v=ESTE_ID */
  youtubeId: string
  /** ID de la canción en Spotify: open.spotify.com/track/ESTE_ID */
  spotifyId: string
}

export const canciones: Cancion[] = [
  {
    id: 'firestarter',
    titulo: 'FIRESTARTER',
    artista: 'K/DA',
    youtubeId: 'Mmw-PpWhKFg',
    spotifyId: '6UeSC8jEhf9XmUL8EX2rni',
  },
  {
    id: 'chk-chk-boom',
    titulo: 'Chk Chk Boom',
    artista: 'Stray Kids',
    youtubeId: '0P0aQreFs8w',
    spotifyId: '0GqAWZe1A5ecKadZrHk6XH',
  },
  {
    id: 'fever',
    titulo: 'FEVER',
    artista: 'ENHYPEN',
    youtubeId: 'toUmJm5G37w',
    spotifyId: '0UzymivvUH5s8z4PeWZJaK',
  },
]