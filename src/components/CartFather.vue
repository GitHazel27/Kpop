<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Cart from '@/views/Cart.vue'
import { limpiarCarrito, isCartOpen, type CheckoutRequest } from '@/stores/cart'
import { isRegistered } from '@/stores/session'

type CheckoutStage = 'cart' | 'payment' | 'confirmation'
type PaymentMethod = 'Tarjeta' | 'PayPal' | 'Efectivo'
const paymentMethods: PaymentMethod[] = ['Tarjeta', 'PayPal', 'Efectivo']

const router = useRouter()
const stage = ref<CheckoutStage>('cart')
const checkout = ref<CheckoutRequest | null>(null)
const customerName = ref('')
const customerEmail = ref('')
const country = ref('México')
const postalCode = ref('')
const address = ref('')
const paymentMethod = ref<PaymentMethod>('Tarjeta')
const orderNumber = ref('')
const confirmedEmail = ref('')
const confirmedTotal = ref(0)

function receiveCheckout(payload: CheckoutRequest) {
  if (!isRegistered.value) {
    closeCart()
    void router.push({ name: 'sesion' })
    return
  }

  checkout.value = payload
  customerName.value = payload.account.name
  customerEmail.value = payload.account.email
  stage.value = 'payment'
}

function closeCart() {
  isCartOpen.value = false
  stage.value = 'cart'
}

function confirmPurchase() {
  if (!isRegistered.value || !checkout.value) {
    closeCart()
    void router.push({ name: 'sesion' })
    return
  }

  confirmedEmail.value = customerEmail.value
  confirmedTotal.value = checkout.value.total
  orderNumber.value = `KPB-${Date.now().toString().slice(-6)}`
  limpiarCarrito()
  stage.value = 'confirmation'
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)
}

function continueShopping() {
  closeCart()
  void router.push({ name: 'merch' })
}
</script>

<template>
  <div class="checkout-overlay" @click.self="closeCart" @keydown.esc.window="closeCart">
    <Cart
      v-if="stage === 'cart'"
      @close="closeCart"
      @checkout="receiveCheckout"
    />

    <section
      v-else-if="stage === 'payment'"
      class="payment-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-title"
    >
      <header class="payment-header">
        <div>
          <h1 id="payment-title">Finalizar Compra Segura</h1>
          <p>Garantía oficial de importación coreana y protección al comprador.</p>
        </div>
        <button class="close-button" type="button" aria-label="Cerrar pago" @click="closeCart">
          ×
        </button>
      </header>

      <form class="payment-form" @submit.prevent="confirmPurchase">
        <label class="field">
          Nombre Completo
          <input v-model.trim="customerName" autocomplete="name" required maxlength="100">
        </label>

        <label class="field">
          Correo Electrónico
          <input
            v-model.trim="customerEmail"
            autocomplete="email"
            type="email"
            required
            maxlength="254"
          >
        </label>

        <div class="address-row">
          <label class="field">
            País
            <select v-model="country" autocomplete="country-name" required>
              <option>México</option>
              <option>Estados Unidos</option>
              <option>Canadá</option>
              <option>Otro</option>
            </select>
          </label>
          <label class="field">
            Código Postal
            <input
              v-model.trim="postalCode"
              autocomplete="postal-code"
              inputmode="numeric"
              required
              maxlength="12"
            >
          </label>
        </div>

        <label class="field">
          Dirección de Entrega
          <input
            v-model.trim="address"
            autocomplete="street-address"
            required
            maxlength="200"
          >
        </label>

        <fieldset class="payment-methods">
          <legend>Método de Pago</legend>
          <div class="method-options">
            <button
              v-for="method in paymentMethods"
              :key="method"
              type="button"
              :class="{ selected: paymentMethod === method }"
              :aria-pressed="paymentMethod === method"
              @click="paymentMethod = method"
            >
              {{ method }}
            </button>
          </div>
        </fieldset>

        <button class="pay-button" type="submit">
          CONFIRMAR Y PAGAR ({{ formatCurrency(checkout?.total ?? 0) }})
        </button>
      </form>
    </section>

    <section
      v-else
      class="confirmation-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      <button class="close-button confirmation-close" type="button" aria-label="Cerrar confirmación" @click="closeCart">
        ×
      </button>
      <div class="success-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
          <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="3" />
          <path d="m15 24 6 6 12-13" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <h1 id="confirmation-title">¡Pedido Confirmado!</h1>
      <p class="confirmation-copy">
        Hemos enviado tu comprobante y código de seguimiento al correo electrónico
        <strong>{{ confirmedEmail }}</strong>.
      </p>
      <div class="order-summary">
        <p><span>Número de Orden:</span><strong>{{ orderNumber }}</strong></p>
        <p><span>Total:</span><strong class="paid-total">{{ formatCurrency(confirmedTotal) }}</strong></p>
        <p><span>Método de Pago:</span><strong>{{ paymentMethod }}</strong></p>
        <p><span>Tiempo de Entrega:</span><strong>3 a 5 días hábiles</strong></p>
      </div>
      <button class="pay-button" type="button" @click="continueShopping">
        SEGUIR EXPLORANDO K-POP
      </button>
    </section>
  </div>
</template>

<style scoped>
.checkout-overlay {
  position: fixed;
  z-index: 1100;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  overflow: auto;
  background: rgb(0 0 0 / 72%);
  backdrop-filter: blur(5px);
  animation: overlay-appear 180ms ease-out;
}

.payment-panel {
  width: min(640px, 100%);
  min-height: 100%;
  padding: clamp(1.25rem, 4vw, 2rem);
  background: #12121a;
  color: #f7f7fb;
  box-shadow: -12px 0 36px rgb(0 0 0 / 28%);
  animation: panel-appear 220ms ease-out;
}

.payment-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.8rem;
}

.payment-header h1,
.confirmation-panel h1 {
  margin: 0;
  font-size: clamp(1.6rem, 5vw, 2rem);
  font-weight: 850;
  line-height: 1.2;
}

.payment-header p {
  margin: 0.5rem 0 0;
  color: #9ba8bf;
  line-height: 1.5;
}

.close-button {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #0c0c12;
  color: #d3d8e3;
  cursor: pointer;
  font: inherit;
  font-size: 1.8rem;
  line-height: 1;
}

.payment-form {
  display: grid;
  gap: 1.25rem;
}

.field {
  display: grid;
  gap: 0.45rem;
  color: #c3cada;
  font-size: 0.95rem;
  font-weight: 650;
}

.field input,
.field select {
  width: 100%;
  min-height: 3rem;
  padding: 0.7rem 0.8rem;
  border: 1px solid #2c2d3e;
  border-radius: 0.65rem;
  background: #191925;
  color: #f7f7fb;
  font: inherit;
}

.field input:focus-visible,
.field select:focus-visible {
  border-color: #ff2e83;
  outline: 2px solid rgb(255 46 131 / 30%);
}

.address-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.payment-methods {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}

.payment-methods legend {
  padding: 0;
  margin-bottom: 0.65rem;
  color: #c3cada;
  font-size: 0.95rem;
  font-weight: 650;
}

.method-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
}

.method-options button {
  min-height: 3rem;
  border: 1px solid #2c2d3e;
  border-radius: 0.65rem;
  background: #191925;
  color: #9ba8bf;
  cursor: pointer;
  font: inherit;
}

.method-options button.selected {
  border-color: #ff2e83;
  background: rgb(255 46 131 / 16%);
  color: #fff;
  font-weight: 700;
}

.pay-button {
  display: flex;
  width: 100%;
  min-height: 3.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 0.75rem;
  background: #fa267b;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  text-align: center;
  box-shadow: 0 0.6rem 1.4rem rgb(250 38 123 / 24%);
  margin-top: 1.5rem;
}

.pay-button:hover {
  background: #e51d6d;
}

.confirmation-panel {
  position: relative;
  display: flex;
  width: min(640px, calc(100% - 2rem));
  flex-direction: column;
  align-self: center;
  padding: clamp(2rem, 6vw, 3.5rem);
  margin: 2rem auto;
  border: 1px solid #292a3b;
  border-radius: 1.25rem;
  background: #12121a;
  color: #f7f7fb;
  text-align: center;
  box-shadow: 0 1.5rem 5rem rgb(0 0 0 / 35%);
  animation: confirmation-appear 220ms ease-out;
}

.confirmation-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
}

.success-icon {
  display: grid;
  width: 5rem;
  height: 5rem;
  place-items: center;
  align-self: center;
  margin-bottom: 1.5rem;
  border: 1px solid rgb(0 210 151 / 40%);
  border-radius: 50%;
  background: rgb(0 210 151 / 12%);
  color: #00d297;
}

.confirmation-panel h1 {
  margin-bottom: 0.8rem;
}

.confirmation-copy {
  margin: 0;
  color: #c3cada;
  line-height: 1.6;
}

.confirmation-copy strong {
  color: #ff2e83;
  overflow-wrap: anywhere;
}

.order-summary {
  display: grid;
  gap: 0.8rem;
  padding: 1.25rem;
  margin: 1.5rem 0 0;
  border: 1px solid #292a3b;
  border-radius: 1rem;
  background: #191925;
  text-align: left;
}

.order-summary p {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
}

.order-summary span {
  color: #9ba8bf;
}

.order-summary strong {
  text-align: right;
}

.order-summary .paid-total {
  color: #00d297;
}

.close-button:focus-visible,
.method-options button:focus-visible,
.pay-button:focus-visible {
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

@keyframes confirmation-appear {
  from { opacity: 0; transform: translateY(0.5rem); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .checkout-overlay,
  .payment-panel,
  .confirmation-panel {
    animation: none;
  }
}

@media (max-width: 480px) {
  .address-row {
    grid-template-columns: 1fr;
  }

  .confirmation-panel {
    padding: 4.5rem 1.25rem 1.5rem;
  }

  .order-summary p {
    flex-direction: column;
    gap: 0.2rem;
  }

  .order-summary strong {
    text-align: left;
  }
}
</style>