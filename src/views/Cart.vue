<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { catalogo } from '@/data/catalogo'
import { cartItemCount, decrementar, incrementar, isCartOpen, quantities } from '@/stores/cart'
import { isRegistered } from '@/stores/session'

const router = useRouter()
const checkoutMessage = ref('')
const cartProducts = computed(() =>
  catalogo
    .filter((product) => (quantities.value[product.id] ?? 0) > 0)
    .map((product) => ({ ...product, quantity: quantities.value[product.id] ?? 0 })),
)
const subtotal = computed(() =>
  cartProducts.value.reduce((total, product) => total + product.precio * product.quantity, 0),
)

function closeCart() {
  isCartOpen.value = false
}

function proceedToCheckout() {
  if (!isRegistered.value) {
    closeCart()
    void router.push({ name: 'sesion' })
    return
  }

  checkoutMessage.value = 'El proceso de pago estará disponible próximamente.'
}
</script>

<template>
  <div class="cart-overlay" @click.self="closeCart" @keydown.esc.window="closeCart">
    <aside
      id="shopping-cart"
      class="cart-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <header class="cart-header">
        <h1 id="cart-title">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
            <path
              d="M5 8h14l1 13H4L5 8Zm3 0V6a4 4 0 0 1 8 0v2"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Carrito de Compras ({{ cartItemCount }})
        </h1>
        <button class="close-button" type="button" aria-label="Cerrar carrito" @click="closeCart">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div v-if="cartProducts.length" class="cart-content">
        <ul class="cart-items">
          <li v-for="product in cartProducts" :key="product.id" class="cart-item">
            <img v-if="product.image" :src="product.image" :alt="product.titulo" class="item-image">
            <div v-else class="item-image item-placeholder" aria-hidden="true">K-POP</div>
            <div class="item-details">
              <p class="item-group">{{ product.grupo }}</p>
              <h2>{{ product.titulo }}</h2>
              <strong>${{ product.precio.toFixed(2) }}</strong>
              <div class="quantity-controls" :aria-label="`Cantidad de ${product.titulo}`">
                <button
                  type="button"
                  :aria-label="`Restar una unidad de ${product.titulo}`"
                  @click="decrementar(product.id)"
                >
                  −
                </button>
                <output aria-live="polite">{{ product.quantity }}</output>
                <button
                  type="button"
                  :aria-label="`Sumar una unidad de ${product.titulo}`"
                  @click="incrementar(product.id)"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div v-else class="empty-cart">
        <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden="true">
          <path
            d="M12 23h40l3 34H9l3-34Zm8 0v-6a12 12 0 0 1 24 0v6"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M24 35a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
        </svg>
        <h2>Tu carrito está vacío</h2>
        <p>Descubre álbumes oficiales y lightsticks en nuestra tienda.</p>
        <RouterLink :to="{ name: 'merch' }" class="shop-link" @click="closeCart">
          Explorar tienda
        </RouterLink>
      </div>

      <footer v-if="cartProducts.length" class="cart-footer">
        <div class="subtotal">
          <span>Subtotal</span>
          <strong>${{ subtotal.toFixed(2) }}</strong>
        </div>
        <p v-if="!isRegistered" class="register-reminder">
          Para comprar, primero debes iniciar sesión o registrarte.
        </p>
        <RouterLink
          v-if="!isRegistered"
          class="checkout-button"
          :to="{ name: 'sesion' }"
          @click="closeCart"
        >
          Iniciar sesión para comprar
        </RouterLink>
        <button v-else class="checkout-button" type="button" @click="proceedToCheckout">
          Finalizar compra
        </button>
        <p v-if="checkoutMessage" class="checkout-message" aria-live="polite">
          {{ checkoutMessage }}
        </p>
      </footer>
    </aside>
  </div>
</template>

<style scoped>
.cart-overlay {
  position: fixed;
  z-index: 1100;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  background: rgb(0 0 0 / 62%);
  backdrop-filter: blur(5px);
  animation: overlay-appear 180ms ease-out;
}

.cart-panel {
  display: flex;
  width: min(520px, 100%);
  height: 100%;
  flex-direction: column;
  border-left: 1px solid rgb(255 255 255 / 10%);
  background: #12121a;
  color: #f7f7fb;
  box-shadow: -12px 0 36px rgb(0 0 0 / 28%);
  animation: panel-appear 220ms ease-out;
}

.cart-header {
  display: flex;
  min-height: 76px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1.5rem;
  border-bottom: 1px solid #292936;
}

.cart-header h1 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: 1.35rem;
  font-weight: 800;
}

.cart-header h1 svg {
  flex: 0 0 auto;
  color: #f42c84;
}

.close-button {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #9da3b5;
  cursor: pointer;
}

.close-button:hover {
  background: rgb(255 255 255 / 8%);
  color: #fff;
}

.cart-content {
  flex: 1;
  overflow: auto;
}

.cart-items {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  margin: 0;
  list-style: none;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #292936;
}

.item-image {
  width: 88px;
  height: 104px;
  flex: 0 0 auto;
  border-radius: 0.65rem;
  background: #211b30;
  object-fit: cover;
}

.item-placeholder {
  display: grid;
  place-items: center;
  color: #f4a7df;
  font-size: 0.75rem;
  font-weight: 800;
}

.item-details {
  min-width: 0;
  flex: 1;
}

.item-group {
  margin: 0 0 0.25rem;
  color: #f42c84;
  font-size: 0.75rem;
  font-weight: 700;
}

.item-details h2 {
  margin: 0 0 0.45rem;
  font-size: 0.95rem;
  line-height: 1.4;
}

.item-details strong {
  font-size: 0.9rem;
}

.quantity-controls {
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 0.65rem;
  margin-top: 0.7rem;
  padding: 0.2rem;
  border: 1px solid #3b3b4b;
  border-radius: 999px;
}

.quantity-controls button {
  display: grid;
  width: 1.8rem;
  height: 1.8rem;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #f42c84;
  color: #fff;
  cursor: pointer;
  font-size: 1.1rem;
}

.quantity-controls output {
  min-width: 1ch;
  text-align: center;
}

.empty-cart {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.empty-cart > svg {
  margin-bottom: 1rem;
  color: #48566d;
}

.empty-cart h2 {
  margin: 0 0 0.35rem;
  font-size: 1.25rem;
}

.empty-cart p {
  margin: 0;
  color: #9ba8bf;
  line-height: 1.5;
}

.shop-link {
  margin-top: 1.25rem;
  color: #ff4d9b;
  font-weight: 700;
  text-underline-offset: 3px;
}

.cart-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #292936;
}

.subtotal {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.05rem;
}

.register-reminder,
.checkout-message {
  margin: 0 0 0.8rem;
  color: #9ba8bf;
  font-size: 0.88rem;
  line-height: 1.5;
}

.checkout-button {
  display: flex;
  width: 100%;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1rem;
  border: 0;
  border-radius: 0.65rem;
  background: #f42c84;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 750;
  text-align: center;
  text-decoration: none;
}

.checkout-button:hover {
  background: #d91c6c;
}

.checkout-message {
  margin: 0.75rem 0 0;
}

.close-button:focus-visible,
.quantity-controls button:focus-visible,
.checkout-button:focus-visible,
.shop-link:focus-visible {
  outline: 3px solid #ff85bb;
  outline-offset: 3px;
}

@keyframes overlay-appear {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes panel-appear {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .cart-overlay,
  .cart-panel {
    animation: none;
  }
}

@media (max-width: 480px) {
  .cart-header {
    min-height: 68px;
    padding: 0 1rem;
  }

  .cart-header h1 {
    font-size: 1.1rem;
  }

  .cart-footer {
    padding: 1rem;
  }
}
</style>