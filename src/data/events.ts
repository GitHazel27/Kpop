export type Category = 'concierto' | 'comeback' | 'fanmeet' | 'merch' | 'cumple' 
export type Action = 'like'|'asistir'|'avisar'

export interface KpopEvent {
  title: string
  start: string
  end?: string
  allDay?: boolean
  category: Category
  place?: string
  description?: string
  actions?: Action
}

export const kpopEvents: KpopEvent[] = [
  {
    title: 'Stray kids - Comeback: nuevo mini álbum',
    start: '2026-11-17T18:00:00',
    category: 'comeback',
    description: 'Lanzamiento del nuevo mini álbum y video musical.',
    actions: 'avisar'
  },
  {
    title: 'BTS - Concierto en Ciudad de México',
    start: '2026-11-21T20:00:00',
    category: 'concierto',
    place: 'Arena Ciudad de México',
    description: 'Gira mundial, primera fecha en México.',
    actions: 'asistir'
  },
  {
    title: 'BTS - Fan meeting',
    start: '2026-11-23T17:00:00',
    category: 'fanmeet',
    place: 'Teatro Metropólitan',
    description: 'Firma de álbumes y sesión de preguntas con los fans.',
    actions: 'asistir'
  },
  {
    title: 'Drop de merch',
    start: '2026-11-27',
    allDay: true,
    category: 'merch',
    description: 'Nueva colección de lightsticks y photocards.',
    actions: 'avisar'
  },
  {
    title: 'BTS - Jin day',
    start: '2026-12-04',
    allDay: true,
    category: 'cumple',
    description: 'Hora de trendear en redes.',
    actions: 'like'
  },
  {
    title: 'Enhypen - Concierto en Guadalajara',
    start: '2026-12-05T20:00:00',
    category: 'concierto',
    place: 'Auditorio Telmex',
    actions: 'asistir'
  },
  {
    title: 'K/DA - Comeback: sencillo digital',
    start: '2026-12-10T12:00:00',
    category: 'comeback',
    actions: 'avisar'
  },
  {
    title: 'Stray Kids - Fan meeting de fin de año',
    start: '2026-12-18T16:00:00',
    category: 'fanmeet',
    place: 'Foro Sol',
    actions: 'asistir'
  },
  {
    title: 'BTS - V day',
    start: '2026-12-30',
    allDay: true,
    category: 'cumple',
    description: 'Hora de trendear en redes.',
    actions: 'like'
  },
  {
    title: 'Enhypen - Jake day',
    start: '2026-11-15',
    allDay: true,
    category: 'cumple',
    description: 'Hora de trendear en redes.',
    actions: 'like'
  },
  {
    title: 'Enhypen - Sunghoon day',
    start: '2026-12-08',
    allDay: true,
    category: 'cumple',
    description: 'Hora de trendear en redes.',
    actions: 'like'
  },
  {
    title: 'Enhypen - Niki day',
    start: '2026-12-09',
    allDay: true,
    category: 'cumple',
    description: 'Hora de trendear en redes.',
    actions: 'like'
  },
]