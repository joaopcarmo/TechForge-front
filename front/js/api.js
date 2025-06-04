// URL base da API (pode ser alterada conforme o ambiente: desenvolvimento, produção etc.)
const API_URL = "http://localhost:3000";

/**
 * Busca todos os produtos da API
 */
async function getProdutos() {
  try {
    const res = await fetch(`${API_URL}/produtos`);

    // Verifica se a resposta foi bem-sucedida (status 200–299)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Retorna os produtos como JSON
    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error; // Lança o erro para ser tratado externamente
  }
}

/**
 * Busca um único produto pelo código
 * @param {string} codigo - Código do produto
 */
async function getProduto(codigo) {
  try {
    const res = await fetch(`${API_URL}/produtos/codigo/${codigo}`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return json[0]; // Retorna o primeiro item (espera-se que seja único)
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
}

/**
 * Cria um novo produto na API
 * @param {Object} produto - Objeto contendo os dados do produto
 */
async function criarProduto(produto) {
  try {
    const res = await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return true; // Produto criado com sucesso
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return false; // Retorna false em caso de erro
  }
}

/**
 * Atualiza um produto existente
 * @param {string} codigo - Código do produto a ser atualizado
 * @param {Object} produto - Objeto com os dados atualizados
 */
async function atualizarProduto(codigo, produto) {
  try {
    const res = await fetch(`${API_URL}/produtos/${codigo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return true; // Atualização bem-sucedida
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return false;
  }
}

/**
 * Deleta um produto pelo código
 * @param {string} codigo - Código do produto a ser removido
 */
async function deletarProduto(codigo) {
  try {
    const res = await fetch(`${API_URL}/produtos/${codigo}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return true; // Produto removido com sucesso
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return false;
  }
}

// Torna as funções acessíveis globalmente pelo objeto window.api
window.api = {
  getProdutos,
  getProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};
