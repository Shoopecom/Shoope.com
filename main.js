// Função para trocar a imagem principal ao clicar em uma miniatura
function changeImage(thumbnail) {
  const thumbnails = document.querySelectorAll('.thumbnail-images img');
  thumbnails.forEach(thumb => {
    thumb.classList.remove('active');
  });

  thumbnail.classList.add('active');

  const mainImage = document.getElementById('main-product-image');
  mainImage.style.opacity = '0.5';

  setTimeout(() => {
    mainImage.src = thumbnail.src;
    mainImage.alt = thumbnail.alt;
    mainImage.style.opacity = '1';
  }, 200);
}

// Função para navegar entre as abas de detalhes do produto
function openTab(tabId) {
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => {
    tab.classList.remove('active');
  });

  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });

  document.getElementById(tabId).classList.add('active');

  const clickedButton = Array.from(tabButtons).find(button =>
    button.getAttribute('onclick') === `openTab('${tabId}')`
  );

  if (clickedButton) {
    clickedButton.classList.add('active');
  }

  const tabsContainer = document.querySelector('.details-tabs');
  const tabTop = tabsContainer.getBoundingClientRect().top;

  if (tabTop < 0 || tabTop > window.innerHeight) {
    tabsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Configurar os controladores de quantidade
document.addEventListener('DOMContentLoaded', function () {
  const mainImage = document.getElementById('main-product-image');
  if (mainImage) {
    mainImage.style.transition = 'opacity 0.2s ease';
  }

  const minusButton = document.querySelector('.quantity-button.minus');
  const plusButton = document.querySelector('.quantity-button.plus');
  const quantityInput = document.querySelector('.quantity-input');

  if (minusButton && plusButton && quantityInput) {
    minusButton.addEventListener('click', function () {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        minusButton.classList.add('clicked');
        setTimeout(() => {
          minusButton.classList.remove('clicked');
        }, 200);
      }
    });

    plusButton.addEventListener('click', function () {
      let currentValue = parseInt(quantityInput.value);
      let maxValue = parseInt(quantityInput.getAttribute('max'));
      if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
        plusButton.classList.add('clicked');
        setTimeout(() => {
          plusButton.classList.remove('clicked');
        }, 200);
      }
    });

    quantityInput.addEventListener('change', function () {
      let currentValue = parseInt(quantityInput.value);
      let minValue = parseInt(quantityInput.getAttribute('min'));
      let maxValue = parseInt(quantityInput.getAttribute('max'));

      if (isNaN(currentValue) || currentValue < minValue) {
        quantityInput.value = minValue;
      } else if (currentValue > maxValue) {
        quantityInput.value = maxValue;
      }
    });
  }

  const variantOptions = document.querySelectorAll('.variant-option');
  variantOptions.forEach(option => {
    option.addEventListener('click', function () {
      const parentDiv = this.parentElement;
      const siblingOptions = parentDiv.querySelectorAll('.variant-option');

      siblingOptions.forEach(sibling => {
        sibling.classList.remove('selected');
      });

      this.classList.add('selected');

      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 200);
    });
  });

  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      this.classList.add('active');

      const reviewsList = document.querySelector('.reviews-list');
      if (reviewsList) {
        reviewsList.style.opacity = '0.5';
        setTimeout(() => {
          reviewsList.style.opacity = '1';
        }, 300);
      }
    });
  });

  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', function () {
      this.textContent = 'Carregando...';
      this.disabled = true;

      setTimeout(() => {
        this.textContent = 'Carregar Mais Avaliações';
        this.disabled = false;
        alert('Carregando mais avaliações...');
      }, 800);
    });
  }

  const addToCartButton = document.querySelector('.add-to-cart');
  const buyNowButton = document.querySelector('.buy-now');

  if (addToCartButton) {
    addToCartButton.addEventListener('click', function () {
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 200);

      const selectedColor = document.querySelector('.variant-options .variant-option.selected span')?.textContent || 'Indefinido';
      const selectedStorage = document.querySelector('.storage-options .variant-option.selected span')?.textContent || 'Indefinido';
      const quantity = document.querySelector('.quantity-input').value;

      alert(`Produto adicionado ao carrinho!\nCor: ${selectedColor}\nArmazenamento: ${selectedStorage}\nQuantidade: ${quantity}`);
    });
  }

  if (buyNowButton) {
    buyNowButton.addEventListener('click', function () {
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 200);

      // Redirecionamento para Carregamento.html
      setTimeout(() => {
        window.location.href = "Carregamento.html";
      }, 300);
    });
  }

  const reviewPhotos = document.querySelectorAll('.review-photos img');
  reviewPhotos.forEach(photo => {
    photo.addEventListener('click', function () {
      const img = this;
      img.style.transform = 'scale(1.05)';

      setTimeout(() => {
        img.style.transform = 'scale(1)';
        alert('Abrindo imagem em tamanho maior...');
      }, 200);
    });
  });

  document.querySelectorAll('button, .variant-option, .review-photos img, a').forEach(element => {
    element.style.transition = 'all 0.2s ease';
  });

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Estilos para animações de clique e transições
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .clicked {
      transform: scale(0.95);
      opacity: 0.8;
    }

    .quantity-button, .variant-option, .add-to-cart, .buy-now, .filter-button, .tab-button {
      transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }

    .variant-option:active, .quantity-button:active, .add-to-cart:active, .buy-now:active {
      transform: scale(0.95);
    }

    .review-photos img {
      transition: transform 0.2s ease;
    }

    .review-photos img:hover {
      transform: scale(1.05);
    }

    .reviews-list {
      transition: opacity 0.3s ease;
    }

    #main-product-image {
      transition: opacity 0.2s ease;
    }
  </style>
`);
