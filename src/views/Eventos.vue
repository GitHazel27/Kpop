<script setup lang="ts">
import { computed, ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import type { CalendarOptions, EventClickArg } from '@fullcalendar/core'
import type { Action, Category } from '@/data/events'
import { kpopEvents } from '@/data/events'
import { isRegistered } from '@/stores/session'


interface SelectedEvent {
  title: string
  category: Category
  action?: Action
  when: string
  place?: string
  description?: string
}

const categoryList: { key: Category; label: string }[] = [
  { key: 'concierto', label: 'Conciertos' },
  { key: 'comeback', label: 'Comebacks' },
  { key: 'fanmeet', label: 'Fan meetings' },
  { key: 'merch', label: 'Merch' },
  { key: 'cumple', label: 'Cumpleaños' },
]

const categoryLabel = Object.fromEntries(
  categoryList.map(c => [c.key, c.label])
) as Record<Category, string>

const activeCategories = ref<Category[]>(categoryList.map(c => c.key))
const selected = ref<SelectedEvent | null>(null)
const selectedActions = ref<string[]>([])

const toggleCategory = (key: Category) => {
  activeCategories.value = activeCategories.value.includes(key)
    ? activeCategories.value.filter(k => k !== key)
    : [...activeCategories.value, key]
}

const isAction = (value: unknown): value is Action =>
  value === 'like' || value === 'avisar' || value === 'asistir'

const actionLabel = (action: Action) => ({
  like: 'Me gusta',
  avisar: 'Avisarme',
  asistir: 'Asistiré al evento'
})[action]

const actionIcon = (action: Action, isSelected: boolean) => {
  if (action === 'like') return isSelected ? '♥' : '♡'
  if (action === 'avisar') return '🔔'
  return '✓'
}

const toggleSelectedAction = (title: string) => {
  selectedActions.value = selectedActions.value.includes(title)
    ? selectedActions.value.filter(item => item !== title)
    : [...selectedActions.value, title]
}

const visibleEvents = computed(() =>
  kpopEvents
    .filter(e => activeCategories.value.includes(e.category))
    .map(({ category, place, description, actions, ...event }) => ({
      ...event,
      classNames: [`ev-${category}`],
      extendedProps: { category, place, description, actions }
    }))
)

const formatWhen = (date: Date | null, allDay: boolean) => {
  if (!date) return ''
  return new Intl.DateTimeFormat(
    'es',
    allDay ? { dateStyle: 'full' } : { dateStyle: 'full', timeStyle: 'short' }
  ).format(date)
}

const onEventClick = ({ event }: EventClickArg) => {
  const { category, place, description, actions } = event.extendedProps
  selected.value = {
    title: event.title,
    category,
    action: isAction(actions) ? actions : undefined,
    when: formatWhen(event.start, event.allDay),
    place,
    description
  }
}

const calendarOptions = computed<CalendarOptions>(() => ({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  locale: esLocale,
  firstDay: 1,
  height: 'auto',
  fixedWeekCount: false,
  eventDisplay: 'list-item',
  displayEventTime: false,
  dayMaxEvents: 3,
  moreLinkText: n => `+${n} más`,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: ''
  },
  events: visibleEvents.value,
  eventClick: onEventClick
}))
</script>

<template>
  <section class="kcal">
    <header class="kcal__head">
      <h2>Calendario K-pop</h2>
      <p>Comebacks, conciertos y fechas que no te puedes perder.</p>
    </header>

    <div class="kcal__filters" role="group" aria-label="Filtrar eventos por tipo">
      <button
        v-for="item in categoryList"
        :key="item.key"
        type="button"
        class="chip"
        :class="{ 'chip--off': !activeCategories.includes(item.key) }"
        :aria-pressed="activeCategories.includes(item.key)"
        @click="toggleCategory(item.key)"
      >
        <span class="dot" :class="`dot--${item.key}`" aria-hidden="true"></span>
        {{ item.label }}
      </button>
    </div>

    <div class="kcal__board">
      <FullCalendar :options="calendarOptions">
        <template #eventContent="{ event }">
          <span class="calendar-event">
            <span class="dot" :class="`dot--${event.extendedProps.category}`" aria-hidden="true"></span>
            <span
              v-if="isRegistered && isAction(event.extendedProps.actions)"
              class="calendar-event__action"
              :class="{ 'calendar-event__action--selected': selectedActions.includes(event.title) }"
              aria-hidden="true"
            >
              {{ actionIcon(event.extendedProps.actions, selectedActions.includes(event.title)) }}
            </span>
            <span class="calendar-event__title">{{ event.title }}</span>
          </span>
        </template>
      </FullCalendar>
    </div>

    <aside v-if="selected" class="kcal__detail" aria-live="polite">
      <div class="detail__top">
        <span class="dot" :class="`dot--${selected.category}`" aria-hidden="true"></span>
        <span class="detail__tag">{{ categoryLabel[selected.category] }}</span>
        <button type="button" class="detail__close" aria-label="Cerrar detalle" @click="selected = null">
          ×
        </button>
      </div>
      <h3>{{ selected.title }}</h3>
      <p class="detail__when">{{ selected.when }}</p>
      <p v-if="selected.place" class="detail__place">{{ selected.place }}</p>
      <p v-if="selected.description" class="detail__desc">{{ selected.description }}</p>
      <button
        v-if="isRegistered && selected.action"
        type="button"
        class="detail__action"
        :class="{ 'detail__action--selected': selectedActions.includes(selected.title) }"
        :aria-pressed="selectedActions.includes(selected.title)"
        @click="toggleSelectedAction(selected.title)"
      >
        <span aria-hidden="true">
          {{ actionIcon(selected.action, selectedActions.includes(selected.title)) }}
        </span>
        {{ actionLabel(selected.action) }}
      </button>
    </aside>
    <div v-if="isRegistered" class="kcal__board" style="margin-top: 1.25rem;">
      <p style="color: var(--pink-soft); font-size: 0.9rem; text-align: center;">
        Selecciona un evento para elegir tu acción.
      </p>
    </div>
  </section>
</template>

<style scoped>
.kcal {
  --ink: #0e0a12;
  --panel: #16101b;
  --line: #2d2034;
  --text: #fbeaf5;
  --muted: #b9a3b4;
  --pink: #ff5cc0;
  --pink-soft: #f4a7df;
  --magenta: #a23883;

  width: min(100%, 1000px);
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
  border-radius: 1.25rem;
  background: var(--ink);
  color: var(--text);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

/* ---------- Encabezado y filtros ---------- */
.kcal__head h2 {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--pink);
  text-shadow: 0 0 24px rgb(255 92 192 / 45%);
}

.kcal__head p {
  margin: 0.4rem 0 1.25rem;
  color: var(--muted);
}

.kcal__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.85rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--panel);
  color: var(--text);
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  transition: border-color 0.15s, opacity 0.15s;
}

.chip:hover {
  border-color: var(--pink);
}

.chip--off {
  opacity: 0.45;
}

.chip:focus-visible,
.detail__close:focus-visible {
  outline: 3px solid var(--pink-soft);
  outline-offset: 2px;
}

.dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  flex: 0 0 auto;
}

.dot--concierto { background: var(--pink); }
.dot--comeback { background: linear-gradient(135deg, var(--magenta), var(--pink)); }
.dot--fanmeet { background: var(--pink-soft); }
.dot--merch { border: 2px solid var(--pink); }
.dot--cumple { background: #fff; }

/* ---------- Calendario ---------- */
.kcal__board {
  --fc-page-bg-color: var(--panel);
  --fc-neutral-bg-color: #1d1424;
  --fc-border-color: var(--line);
  --fc-today-bg-color: rgb(255 92 192 / 12%);
  --fc-list-event-hover-bg-color: #241830;
  --fc-more-link-bg-color: transparent;

  --fc-button-bg-color: var(--magenta);
  --fc-button-border-color: var(--magenta);
  --fc-button-text-color: #fff;
  --fc-button-hover-bg-color: var(--pink);
  --fc-button-hover-border-color: var(--pink);
  --fc-button-active-bg-color: var(--pink);
  --fc-button-active-border-color: var(--pink);

  --fc-event-bg-color: var(--pink);
  --fc-event-border-color: var(--pink);
  --fc-event-text-color: var(--ink);

  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: 1rem;
  background: var(--panel);
  box-shadow: 0 0 0 1px rgb(255 92 192 / 8%), 0 1.5rem 3rem rgb(0 0 0 / 45%);
}

.kcal__board :deep(.fc-header-toolbar) {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}

.kcal__board :deep(.fc-toolbar-chunk:nth-child(2)) {
  justify-self: center;
}

.kcal__board :deep(.fc-toolbar-title) {
  color: var(--text);
  font-size: 1.35rem;
  font-weight: 800;
  text-transform: capitalize;
}

.kcal__board :deep(.fc .fc-button) {
  font-weight: 600;
  text-transform: capitalize;
}

.kcal__board :deep(.fc .fc-button-primary:not(:disabled).fc-button-active),
.kcal__board :deep(.fc .fc-button-primary:hover) {
  color: var(--ink);
}

.kcal__board :deep(.fc .fc-button:focus-visible) {
  box-shadow: 0 0 0 3px var(--pink-soft);
}

.kcal__board :deep(.fc-col-header-cell) {
  background: #1d1424;
}

.kcal__board :deep(.fc-col-header-cell-cushion) {
  padding: 0.6rem 0.25rem;
  color: var(--pink-soft);
  text-decoration: none;
  text-transform: capitalize;
}

.kcal__board :deep(.fc-daygrid-day-number) {
  color: var(--muted);
  text-decoration: none;
}

.kcal__board :deep(.fc-day-other .fc-daygrid-day-top) {
  opacity: 0.4;
}

/* Día actual: la parte más "lightstick" del calendario */
.kcal__board :deep(.fc-day-today .fc-daygrid-day-number) {
  margin: 4px;
  padding: 0 0.5rem;
  border-radius: 999px;
  background: var(--pink);
  color: var(--ink);
  font-weight: 800;
  box-shadow: 0 0 14px rgb(255 92 192 / 70%);
}

.kcal__board :deep(.fc-more-link) {
  color: var(--pink-soft);
  font-weight: 600;
}

/* ---------- Eventos por categoría ---------- */
.kcal__board :deep(.fc-event) {
  border-radius: 0.4rem;
  cursor: pointer;
  font-weight: 600;
}

.kcal__board :deep(.ev-concierto) {
  --fc-event-bg-color: var(--pink);
  --fc-event-border-color: var(--pink);
  --fc-event-text-color: var(--ink);
}

.kcal__board :deep(.ev-comeback) {
  --fc-event-bg-color: var(--magenta);
  --fc-event-border-color: var(--pink);
  --fc-event-text-color: #fff;
}

.kcal__board :deep(.ev-comeback .fc-daygrid-event-dot),
.kcal__board :deep(.ev-merch .fc-daygrid-event-dot) {
  box-sizing: border-box;
  width: 0.7rem;
  height: 0.7rem;
  flex: 0 0 0.7rem;
  border-radius: 50%;
}

.kcal__board :deep(.ev-comeback .fc-daygrid-event-dot) {
  border: 0;
  background: linear-gradient(135deg, var(--magenta), var(--pink));
}

.kcal__board :deep(.ev-fanmeet) {
  --fc-event-bg-color: var(--pink-soft);
  --fc-event-border-color: var(--pink-soft);
  --fc-event-text-color: var(--ink);
}

.kcal__board :deep(.ev-merch) {
  --fc-event-bg-color: transparent;
  --fc-event-border-color: var(--pink);
  --fc-event-text-color: var(--pink-soft);
}

.kcal__board :deep(.ev-merch .fc-daygrid-event-dot) {
  border: 2px solid var(--pink);
  background: transparent;
}

.kcal__board :deep(.ev-cumple) {
  --fc-event-bg-color: #fff;
  --fc-event-border-color: #fff;
  --fc-event-text-color: var(--ink);
}

/* Vista de lista */
.kcal__board :deep(.fc-list-day-cushion) {
  background: #1d1424;
  color: var(--pink-soft);
}

.kcal__board :deep(.fc-list-event td) {
  color: var(--text);
}

.kcal__board :deep(.fc-list-event-dot) {
  border-color: var(--pink);
}

.kcal__board :deep(.ev-fanmeet .fc-list-event-dot) { border-color: var(--pink-soft); }
.kcal__board :deep(.ev-cumple .fc-list-event-dot) { border-color: #fff; }

.calendar-event {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  min-width: 0;
}

.calendar-event__action {
  flex: 0 0 auto;
  color: var(--pink-soft);
  font-size: 0.8rem;
  font-weight: 800;
}

.calendar-event__action--selected {
  color: var(--pink);
}

.calendar-event__title {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---------- Detalle del evento ---------- */
.kcal__detail {
  margin-top: 1.25rem;
  padding: 1.1rem 1.25rem;
  border: 1px solid var(--pink);
  border-radius: 1rem;
  background: var(--panel);
  box-shadow: 0 0 24px rgb(255 92 192 / 18%);
}

.detail__top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail__tag {
  color: var(--pink-soft);
  font-size: 0.85rem;
  font-weight: 600;
}

.detail__close {
  margin-left: auto;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1;
}

.detail__close:hover {
  color: var(--pink);
}

.detail__action {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.85rem;
  padding: 0.45rem 0.8rem;
  border: 1px solid var(--pink);
  border-radius: 999px;
  background: transparent;
  color: var(--pink-soft);
  cursor: pointer;
  font: inherit;
}

.detail__action--selected {
  background: var(--pink);
  color: var(--ink);
}

.detail__action:focus-visible {
  outline: 3px solid var(--pink-soft);
  outline-offset: 2px;
}

.kcal__detail h3 {
  margin: 0.5rem 0 0.25rem;
  font-size: 1.25rem;
}

.detail__when,
.detail__place {
  margin: 0;
  color: var(--muted);
  text-transform: capitalize;
}

.detail__place {
  text-transform: none;
}

.detail__desc {
  margin: 0.75rem 0 0;
  max-width: 60ch;
  line-height: 1.5;
}

/* ---------- Responsive ---------- */
@media (max-width: 640px) {
  .kcal__board {
    padding: 0.5rem;
  }

  .kcal__board :deep(.fc-header-toolbar) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }

  .kcal__board :deep(.fc-toolbar-chunk) {
    display: flex;
    justify-content: center;
  }

  .kcal__board :deep(.fc-toolbar-title) {
    font-size: 1.1rem;
    text-align: center;
  }
}
</style>