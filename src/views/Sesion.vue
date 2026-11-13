<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { markUserAsRegistered } from '@/stores/session'

const router = useRouter()
const mode = ref<'login' | 'register'>('login')
const name = ref('')
const email = ref('')
const password = ref('')

function submitForm() {
  markUserAsRegistered({
    name: name.value || email.value.split('@')[0] || 'Usuario',
    email: email.value,
  })
  void router.push({ name: 'inicio' })
}
</script>

<template>
  <section class="session-page">
    <form class="session-card" @submit.prevent="submitForm">
      <h1>{{ mode === 'login' ? '¡Qué bueno verte!' : 'Únete a la comunidad' }}</h1>
      <p class="intro">
        {{
          mode === 'login'
            ? 'Inicia sesión para continuar.'
            : 'Crea tu cuenta para disfrutar de K-POP.'
        }}
      </p>

      <div class="mode-switch" aria-label="Tipo de formulario">
        <button
          type="button"
          :class="{ active: mode === 'login' }"
          :aria-pressed="mode === 'login'"
          @click="mode = 'login'"
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          :class="{ active: mode === 'register' }"
          :aria-pressed="mode === 'register'"
          @click="mode = 'register'"
        >
          Registrarse
        </button>
      </div>

      <label v-if="mode === 'register'" class="field">
        Nombre
        <input
          v-model.trim="name"
          autocomplete="name"
          name="name"
          placeholder="Tu nombre"
          required
          type="text"
        />
      </label>

      <label class="field">
        Correo electrónico
        <input
          v-model.trim="email"
          autocomplete="email"
          name="email"
          placeholder="tu@correo.com"
          required
          type="email"
        />
      </label>

      <label class="field">
        Contraseña
        <input
          v-model="password"
          :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
          name="password"
          placeholder="Tu contraseña"
          required
          type="password"
        />
      </label>

      <button class="submit-button" type="submit">
        {{ mode === 'login' ? 'Entrar' : 'Crear cuenta' }}
      </button>
      <p class="demo-note">
        Formulario de demostración.
      </p>
    </form>
  </section>
</template>

<style scoped>
.session-page {
  display: grid;
  min-height: 65vh;
  place-items: center;
  padding: 2rem 1rem;
}

.session-card {
  width: min(100%, 440px);
  padding: clamp(1.5rem, 5vw, 2.5rem);
  border: 1px solid #f0d7e9;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0 1rem 3rem rgb(23 19 33 / 10%);
}

h1 {
  margin: 0;
  color: #171321;
  font-size: clamp(1.7rem, 5vw, 2.2rem);
}

.intro {
  margin: 0.65rem 0 1.5rem;
  color: #625a68;
}

.mode-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.35rem;
  padding: 0.35rem;
  margin-bottom: 1.5rem;
  border-radius: 0.75rem;
  background: #f8eef5;
}

.mode-switch button {
  min-height: 2.75rem;
  border: 0;
  border-radius: 0.55rem;
  background: transparent;
  color: #625a68;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.mode-switch button.active {
  background: #fff;
  color: #f42c84;
  box-shadow: 0 2px 8px rgb(23 19 33 / 10%);
}

.field {
  display: grid;
  gap: 0.45rem;
  margin-top: 1rem;
  color: #302a35;
  font-size: 0.95rem;
  font-weight: 600;
}

.field input {
  width: 100%;
  min-height: 2.9rem;
  padding: 0.7rem 0.8rem;
  border: 1px solid #d9ced8;
  border-radius: 0.6rem;
  background: #fff;
  color: #171321;
  font: inherit;
}

.field input:focus {
  border-color: #f42c84;
  outline: 3px solid rgb(244 44 132 / 18%);
}

.submit-button {
  width: 100%;
  min-height: 3rem;
  margin-top: 1.5rem;
  border: 0;
  border-radius: 0.65rem;
  background: #f42c84;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
}

.submit-button:hover {
  background: #d91c6c;
}

.submit-button:focus-visible,
.mode-switch button:focus-visible {
  outline: 3px solid #f42c84;
  outline-offset: 3px;
}

.demo-note {
  margin: 1rem 0 0;
  color: #746b77;
  font-size: 0.8rem;
  line-height: 1.5;
  text-align: center;
}
</style>
