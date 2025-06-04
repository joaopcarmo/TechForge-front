/**
 * Funcionalidade do carrossel com imagens reais de produtos da API
 */
document.addEventListener("DOMContentLoaded", () => {
  // Referências aos elementos do DOM
  const carouselImage = document.getElementById("carousel-image");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const dotsContainer = document.getElementById("carousel-dots");

  // Se qualquer elemento necessário estiver ausente, encerra o script
  if (!carouselImage || !dotsContainer || !prevBtn || !nextBtn) return;

  // Lista de URLs das imagens e índice do slide atual
  let images = [];
  let currentSlide = 0;

  /**
   * Busca produtos da API e extrai as imagens
   */
  async function carregarImagens() {
    try {
      const res = await fetch("http://localhost:3000/produtos");
      const produtos = await res.json();

      // Pega apenas os produtos com imagem definida
      images = produtos.map((p) => p.Imagem).filter(Boolean);

      // Se não houver imagens, não continua
      if (images.length === 0) return;

      criarDots(); // Cria os botões de navegação
      updateCarousel(); // Atualiza imagem e bolinha ativa
      setInterval(nextSlide, 5000); // Avança automaticamente a cada 5 segundos
    } catch (err) {
      console.error("Erro ao carregar imagens:", err);
    }
  }

  /**
   * Cria os indicadores (bolinhas) de navegação
   */
  function criarDots() {
    dotsContainer.innerHTML = ""; // Limpa os indicadores anteriores
    images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("carousel-dot");
      if (index === 0) dot.classList.add("active"); // Primeiro ativo
      dot.addEventListener("click", () => goToSlide(index)); // Evento de clique
      dotsContainer.appendChild(dot);
    });
  }

  /**
   * Atualiza a imagem exibida e o estado das bolinhas
   */
  function updateCarousel() {
    carouselImage.src = images[currentSlide]; // Atualiza a imagem

    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide); // Marca o atual
    });
  }

  /**
   * Vai para um slide específico
   */
  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }

  /**
   * Avança para o próximo slide
   */
  function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
    updateCarousel();
  }

  /**
   * Volta para o slide anterior
   */
  function prevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    updateCarousel();
  }

  // Eventos dos botões de navegação
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Inicia o carregamento das imagens ao carregar a página
  carregarImagens();
});
