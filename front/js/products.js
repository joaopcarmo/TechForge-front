document.addEventListener("DOMContentLoaded", async () => {
  // Elemento onde os produtos serão renderizados
  const productsGrid = document.getElementById("products-grid");

  // Função responsável por exibir os produtos na tela
  function renderProducts(produtos) {
    // Caso a lista esteja vazia ou nula, exibe uma mensagem
    if (!produtos || produtos.length === 0) {
      productsGrid.innerHTML =
        '<div class="no-products">Nenhum produto encontrado.</div>';
      return;
    }

    // Limpa o conteúdo anterior
    productsGrid.innerHTML = "";

    // Renderiza os últimos 12 produtos na tela
    produtos.slice(-12).forEach((prod) => {
      const div = document.createElement("div");
      div.className = "product-card";

      // Monta o HTML de cada produto
      div.innerHTML = `
        <img src="${
          prod.Imagem || "https://via.placeholder.com/200x150"
        }" class="product-image" alt="${prod.Nome}">
        <h3 class="product-name">${prod.Nome}</h3>
        <p class="product-price">R$ ${parseFloat(prod.Preco).toFixed(2)}</p>
        <div class="product-actions">
          <button class="btn btn-sm btn-secondary" onclick="window.location='produto.html?codigo=${
            prod.Codigo
          }'">Detalhes</button>
        </div>
      `;
      productsGrid.appendChild(div);
    });
  }

  // Função global para carregar os produtos da API e renderizá-los
  window.loadProducts = async function () {
    try {
      // Mostra mensagem de carregamento
      productsGrid.innerHTML =
        '<div class="loading-message">Carregando produtos...</div>';

      // Busca os produtos da API
      const produtos = await window.api.getProdutos();

      // Renderiza os produtos na tela
      renderProducts(produtos);
    } catch (error) {
      // Exibe erro caso ocorra falha na requisição
      console.error("Erro ao carregar produtos:", error);
      productsGrid.innerHTML =
        '<div class="error-message">Erro ao carregar produtos. Tente novamente.</div>';
    }
  };

  // Função global para editar um produto (abre o modal com os dados do produto)
  window.editProduct = async function (codigo) {
    try {
      const produto = await window.api.getProduto(codigo);
      if (produto) {
        // Chama função que mostra o modal de edição
        showEditModal(produto);
      } else {
        alert("Produto não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      alert("Erro ao buscar dados do produto");
    }
  };

  // Função global para deletar um produto (abre o modal de confirmação)
  window.deleteProduct = async function (codigo) {
    try {
      const produto = await window.api.getProduto(codigo);
      if (produto) {
        // Chama função que mostra o modal de exclusão
        showDeleteModal(produto);
      } else {
        alert("Produto não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      alert("Erro ao buscar dados do produto");
    }
  };

  // Chama a função de carregamento ao iniciar a página
  loadProducts();
});
