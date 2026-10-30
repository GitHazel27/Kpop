<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-main">
        <div class="footer-brand">
          <RouterLink class="brand" :to="{ name: 'inicio' }">K-POP</RouterLink>
          <p class="tagline">Tu próximo bias está a un clic de distancia.</p>
        </div>

        <div class="footer-links">
          <h2>Explora</h2>
          <nav class="footer-nav" aria-label="Navegación del pie de página">
            <RouterLink :to="{ name: 'inicio' }">Inicio</RouterLink>
            <RouterLink :to="{ name: 'artistas' }">Mis Favs</RouterLink>
            <RouterLink :to="{ name: 'knews' }">K-news</RouterLink>
            <RouterLink :to="{ name: 'merch' }">Merch</RouterLink>
            <RouterLink :to="{ name: 'eventos' }">Eventos</RouterLink>
          </nav>
        </div>

        <div class="footer-social">
          <h2>Síguenos</h2>
          <div class="social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle class="icon-fill" cx="18" cy="6" r="1" />
              </svg>
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 3v11.2a4.2 4.2 0 1 1-3.5-4.1" />
                <path d="M14 3c.4 2.8 2.2 4.5 5 4.8" />
              </svg>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8Z" />
                <path class="icon-fill" d="m10 15 5-3-5-3z" />
              </svg>
            </a>
            <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m4 4 16 16M20 4 4 20M4 4h5l11 16h-5L4 4Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <small>© 2026 K-POP Hecho para fans, con amor.</small>
        <RouterLink :to="{ name: 'sesion' }">Únete a la comunidad <span aria-hidden="true">↗</span></RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  overflow: hidden;
  padding: 3.25rem 2rem 1.25rem;
  background:
    radial-gradient(ellipse at 87% 0%, rgb(162 56 131 / 27%), transparent 37%),
    #171321;
  color: #fff;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-main {
  display: grid;
  grid-template-columns: minmax(220px, 1.2fr) 1fr auto;
  gap: 3rem;
  padding-bottom: 2.5rem;
}

.brand {
  color: #fff;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-decoration: none;
}

.brand span {
  color: #f4a7df;
}

.tagline {
  max-width: 250px;
  margin-top: 0.55rem;
  color: #c9c0cc;
}

h2 {
  margin: 0 0 1rem;
  color: #f4a7df;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.footer-nav {
  display: grid;
  justify-items: start;
  gap: 0.6rem;
}

.footer-nav a,
.footer-bottom a {
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-nav a:hover,
.footer-nav a:focus-visible,
.footer-bottom a:hover,
.footer-bottom a:focus-visible {
  color: #f4a7df;
}

.social-links {
  display: flex;
  gap: 0.65rem;
}

.social-links a {
  display: grid;
  width: 2.65rem;
  height: 2.65rem;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 50%;
  background: rgb(255 255 255 / 5%);
  color: #fff;
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.social-links a:hover {
  transform: translateY(-3px);
  border-color: #f4a7df;
  background: #f4a7df;
  color: #171321;
}

.social-links a:focus-visible,
.footer-nav a:focus-visible,
.footer-bottom a:focus-visible,
.brand:focus-visible {
  outline: 2px solid #f4a7df;
  outline-offset: 4px;
}

.social-links svg {
  width: 1.15rem;
  height: 1.15rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.social-links .icon-fill {
  fill: currentColor;
  stroke: none;
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgb(255 255 255 / 15%);
  color: #c9c0cc;
}

.footer-bottom a span {
  color: #f4a7df;
}

@media (max-width: 760px) {
  .site-footer {
    padding: 2.5rem 1.25rem 1.1rem;
  }

  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1.25rem;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 420px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  .footer-brand {
    grid-column: auto;
  }
}
</style>