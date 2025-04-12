// Controle do Header ao Scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header.classList.toggle('scrolled', window.scrollY > 100);
});

// Inicialização dos Carrosséis
document.addEventListener('DOMContentLoaded', function () {
  // Carrossel Hero
  new Splide('.hero-carousel', {
    type: 'fade',
    autoplay: true,
    pauseOnHover: false,
    interval: 5000,
    arrows: false,
    pagination: true,
    classes: {
      arrows: 'splide__arrows your-class-arrows',
      arrow: 'splide__arrow your-class-arrow',
      prev: 'splide__arrow--prev your-class-prev',
      next: 'splide__arrow--next your-class-next',
      pagination: 'splide__pagination your-class-pagination',
    }
  }).mount();

  // Controles do Carrossel Personalizado
  let currentIndex = 0;
  let isPlaying = true;
  let interval;
  const track = document.getElementById('carouselTrack');
  const totalItems = track.children.length;
  const playPauseIcon = document.getElementById('playIcon');

  // Funções de Controle
  function updateSlide() {
    const translateX = -(currentIndex * 16.666);
    track.style.transform = `translateX(${translateX}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateSlide();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateSlide();
  }

  function startAutoScroll() {
    interval = setInterval(() => {
      nextSlide();
    }, 3000);
    playPauseIcon.setAttribute('d', 'M6 4h4v16H6zm8 0h4v16h-4z');
    isPlaying = true;
  }

  function stopAutoScroll() {
    clearInterval(interval);
    playPauseIcon.setAttribute('d', 'M8 5v14l11-7z');
    isPlaying = false;
  }

  function togglePlay() {
    if (isPlaying) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  }

  // Event Listeners
  document.querySelector('[aria-label="Próximo"]').addEventListener('click', nextSlide);
  document.querySelector('[aria-label="Anterior"]').addEventListener('click', prevSlide);
  document.querySelector('[aria-label="Play/Pause"]').addEventListener('click', togglePlay);

  // Inicialização
  startAutoScroll();

  // Pausar ao passar mouse
  document.querySelector('.carousel-wrapper').addEventListener('mouseenter', stopAutoScroll);
  document.querySelector('.carousel-wrapper').addEventListener('mouseleave', () => {
    if (isPlaying) startAutoScroll();
  });

  // Controle de Ícones
  document.querySelectorAll('.carousel-controls button').forEach(button => {
    button.addEventListener('click', function () {
      this.blur();
    });
  });
});

// Mobile Menu
const menuMobile = document.querySelector('.menu-mobile');
const navList = document.querySelector('.nav-list');

menuMobile.addEventListener('click', () => {
  navList.classList.toggle('active');
  menuMobile.classList.toggle('active');
});

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
    menuMobile.classList.remove('active');
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Zoom nas Imagens do Carrossel
document.querySelectorAll('.carousel-item img').forEach(img => {
  img.addEventListener('click', function () {
    this.classList.toggle('zoomed');
    document.body.classList.toggle('no-scroll');
  });
});

// Validação de Formulário
document.querySelector('.contato-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  // Validação Simples
  if (!formData.get('nome') || !formData.get('email') || !formData.get('mensagem')) {
    alert('Por favor, preencha todos os campos obrigatórios!');
    return;
  }

  // Simulação de Envio
  this.reset();
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
});

// Observador de Intersecção para Animações
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

// Aplicar a elementos animáveis
document.querySelectorAll('.servico-card, .sobre-content, .parceiro-item').forEach(el => {
  observer.observe(el);
});


// carrossel 2

const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
