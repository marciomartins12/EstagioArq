// Hero Splide
document.addEventListener('DOMContentLoaded', () => {
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
      pagination: 'splide__pagination your-class-pagination',
    }
  }).mount();
});

// Carrossel personalizado
document.addEventListener('DOMContentLoaded', () => {
  new Splide('#carrosselCirculos', {
    type: 'loop', // Loop para o carrossel
    perPage: 4, // Quantidade de itens visíveis por vez
    gap: '30px', // Distância entre os círculos
    arrows: true, // Ativa as setas de navegação
    pagination: false, // Desabilita a paginação
    classes: {
      prev: 'splide__arrow--prev splide__arrow--prev-circulos',
      next: 'splide__arrow--next splide__arrow--next-circulos',
    }
  }).mount();

  // Personalizando o posicionamento das setas
  const prevArrow = document.querySelector('.splide__arrow--prev-circulos');
  const nextArrow = document.querySelector('.splide__arrow--next-circulos');

  if (prevArrow && nextArrow) {
    // Posicionando as setas em relação ao carrossel
    prevArrow.style.position = 'absolute';
    prevArrow.style.top = '50%';
    prevArrow.style.left = '-40px';  // Ajuste a distância da seta à esquerda
    prevArrow.style.transform = 'translateY(-50%)'; // Centraliza a seta verticalmente
    prevArrow.style.zIndex = '10'; // Garante que a seta fique visível

    nextArrow.style.position = 'absolute';
    nextArrow.style.top = '50%';
    nextArrow.style.right = '-40px'; // Ajuste a distância da seta à direita
    nextArrow.style.transform = 'translateY(-50%)'; // Centraliza a seta verticalmente
    nextArrow.style.zIndex = '10'; // Garante que a seta fique visível
  }
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  let currentIndex = 0;
  let isPlaying = true;
  let interval;
  const totalItems = track.children.length;
  const playPauseIcon = document.getElementById('playIcon');

  const updateSlide = () => {
    track.style.transform = `translateX(-${currentIndex * 16.666}%)`;
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateSlide();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateSlide();
  };

  const startAutoScroll = () => {
    interval = setInterval(nextSlide, 3000);
    playPauseIcon?.setAttribute('d', 'M6 4h4v16H6zm8 0h4v16h-4z');
    isPlaying = true;
  };

  const stopAutoScroll = () => {
    clearInterval(interval);
    playPauseIcon?.setAttribute('d', 'M8 5v14l11-7z');
    isPlaying = false;
  };

  document.querySelector('[aria-label="Próximo"]')?.addEventListener('click', nextSlide);
  document.querySelector('[aria-label="Anterior"]')?.addEventListener('click', prevSlide);
  document.querySelector('[aria-label="Play/Pause"]')?.addEventListener('click', () => {
    isPlaying ? stopAutoScroll() : startAutoScroll();
  });

  document.querySelector('.carousel-wrapper')?.addEventListener('mouseenter', stopAutoScroll);
  document.querySelector('.carousel-wrapper')?.addEventListener('mouseleave', () => {
    if (isPlaying) startAutoScroll();
  });

  document.querySelectorAll('.carousel-controls button').forEach(btn =>
    btn.addEventListener('click', () => btn.blur())
  );

  startAutoScroll();
});

// Scroller duplicação
const scrollers = document.querySelectorAll(".scroller");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  scrollers.forEach(scroller => {
    scroller.setAttribute("data-animated", true);
    const inner = scroller.querySelector(".scroller__inner");
    const content = Array.from(inner.children);
    content.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", true);
      inner.appendChild(clone);
    });
  });
}

