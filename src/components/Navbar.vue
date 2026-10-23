<template>
  <header class="site-header">
    <nav class="navbar" aria-label="Navegación principal">
      <RouterLink class="brand" to="/">K-POP</RouterLink>
      <input class="menu-toggle-input" id="menu-toggle" type="checkbox" aria-label="Abrir o cerrar menú">
        <label class="menu-toggle" for="menu-toggle" aria-hidden="true">☰</label>
          <div class="nav-menu">
            <RouterLink class="nav-link" :to="{ name: 'inicio' }">Inicio</RouterLink>
            <RouterLink class="nav-link" to="/knews">K-news</RouterLink>
            <RouterLink class="nav-link" to="/merch">Merch</RouterLink>
            <RouterLink class="nav-link" to="/artistas">Artistas</RouterLink>
            <RouterLink class="nav-link" to="/eventos">Eventos</RouterLink>
            <RouterLink class="nav-sesion" to="/sesion">
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z" fill="currentColor"/>
              </svg>
            </RouterLink>
            <RouterLink class="nav-cart" to="/cart">
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g id="Interface / Shopping_Cart_02">
                <path id="Vector" d="M3 3H3.26835C3.74213 3 3.97943 3 4.17267 3.08548C4.34304 3.16084 4.48871 3.28218 4.59375 3.43604C4.71269 3.61026 4.75564 3.8429 4.84137 4.30727L7.00004 16L17.4218 16C17.875 16 18.1023 16 18.29 15.9199C18.4559 15.8492 18.5989 15.7346 18.7051 15.5889C18.8252 15.4242 18.8761 15.2037 18.9777 14.7631L18.9785 14.76L20.5477 7.95996L20.5481 7.95854C20.7023 7.29016 20.7796 6.95515 20.6947 6.69238C20.6202 6.46182 20.4635 6.26634 20.2556 6.14192C20.0184 6 19.6758 6 18.9887 6H5.5M18 21C17.4477 21 17 20.5523 17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21ZM8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
              </svg>
            </RouterLink>
          </div>
    </nav>
    <section class="nav-message">
      <h4>Envíos a todo méxico</h4>
    </section>
  </header>
</template>

<style scoped>
.site-header {
  background: #171321;
  color: #fff;
}

.navbar {
  width: 100%;
  min-height: 4.5rem;
  padding: 0 1rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-menu {
  display: contents;
}

.menu-toggle-input,
.menu-toggle {
  display: none;
}

.brand {
  color: #f4a7df;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.nav-link {
  color: #fff;
  font-weight: 500;
}

.nav-sesion {
  margin-left: auto;
  color: #ffff;
  transition: color 0.2s ease;
}

.nav-sesion:hover,
.nav-cart:hover {
  color: #f77dd6;
}

.nav-cart {
  margin-right: 3rem;
  color: #ffff;
  transition: color 0.2s ease;
}

.brand,
.nav-link {
  text-decoration: none;
  transition: color 0.2s ease;
}

.brand:hover,
.nav-link:hover,
.nav-link.router-link-active,
.nav-cart.router-link-active,
.nav-sesion.router-link-active {
  color: #f77dd6;
}

.nav-link.router-link-active {
  font-weight: 600;
}

.nav-message{
  width: 100%;
  min-height: .5rem;
  padding: 0 1rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: #ffd5f4;
}

h4{
  color: black;
  display:flex ;
  align-items: center;
  font-weight: 500;
}

@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    gap: 0;
    padding: 0.75rem 1rem;
  }

  .brand {
    margin-right: auto;
  }

  .menu-toggle-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  .menu-toggle {
    display: inline-block;
    margin-left: auto;
    cursor: pointer;
    color: #fff;
    font-size: 1.75rem;
    line-height: 1;
  }

  .menu-toggle-input:focus-visible + .menu-toggle {
    outline: 2px solid #f77dd6;
    outline-offset: 2px;
  }

  .nav-menu {
    display: none;
    flex-basis: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-top: 0.75rem;
  }

  .menu-toggle-input:checked ~ .nav-menu {
    display: flex;
  }

  .nav-link {
    padding: 0.65rem 0;
  }

  .nav-sesion {
    margin-left: 0;
    padding: 0.5rem 0;
  }

  .nav-cart {
    margin-right: 0;
    padding: 0.5rem 0;
  }
}
</style>