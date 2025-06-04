document.addEventListener("DOMContentLoaded", async () => {
  // Obtém o código do produto pela URL (ex: produto.html?codigo=123)
  const codigo = new URLSearchParams(location.search).get("codigo");

  // Referência ao container onde o produto será exibido
  const container = document.getElementById("product-detail-container");

  // Validação: se não houver código na URL, mostra erro e encerra
  if (!codigo) {
    container.innerHTML = "<p>Código do produto não informado.</p>";
    return;
  }

  try {
    // Busca o produto pelo código via API
    const produto = await window.api.getProduto(codigo);

    if (!produto) {
      container.innerHTML = "<p>Produto não encontrado.</p>";
      return;
    }

    // Insere o HTML de exibição com os dados do produto
    container.innerHTML = `
      <div class="product-detail product-detail-grid">
        <div class="product-detail-image">
          <img src="${
            produto.Imagem || "https://via.placeholder.com/300"
          }" alt="${produto.Nome}" />
        </div>
        <div class="product-detail-info">
          <div class="product-header">
            <h1>${produto.Nome}</h1>
            <p class="product-code">Código: ${produto.Codigo}</p>
          </div>

          <div class="product-details">
            <div class="detail-section">
              <h4 class="detail-label">Descrição:</h4>
              <p class="detail-text">${produto.Descricao}</p>
            </div>

            <div class="detail-grid">
              <div class="detail-item"><h4>Preço</h4><p class="detail-value">R$ ${parseFloat(
                produto.Preco
              ).toFixed(2)}</p></div>
              <div class="detail-item"><h4>Estoque</h4><p class="detail-value">${
                produto.Estoque
              }</p></div>
              <div class="detail-item"><h4>Avaliação</h4><p class="detail-value">${
                produto.Avaliacao
              }/5</p></div>
              <div class="detail-item"><h4>Categoria</h4><p class="detail-value">${
                produto.Categoria
              }</p></div>
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn btn-primary" id="edit-product-btn">Editar</button>
            <button class="btn btn-danger" id="delete-product-btn">Excluir</button>
            <button class="btn btn-secondary" onclick="window.location.href='index.html'">Voltar</button>
          </div>
        </div>
      </div>
    `;

    // Preenche os campos do formulário de edição com os dados atuais
    document.getElementById("edit-codigo").value = produto.Codigo;
    document.getElementById("edit-nome").value = produto.Nome;
    document.getElementById("edit-preco").value = produto.Preco;
    document.getElementById("edit-descricao").value = produto.Descricao;
    document.getElementById("edit-estoque").value = produto.Estoque;
    document.getElementById("edit-avaliacao").value = produto.Avaliacao;
    document.getElementById("edit-categoria").value = produto.Categoria;

    const editImagemField = document.getElementById("edit-imagem");
    if (editImagemField) editImagemField.value = produto.Imagem || "";

    // Abre modal de edição
    document
      .getElementById("edit-product-btn")
      .addEventListener("click", () => {
        document.getElementById("edit-product-modal").style.display = "flex";
      });

    // Garante que o modal de edição tenha apenas 1 listener ativo
    const editForm = document.getElementById("edit-product-form");
    const newEditForm = editForm.cloneNode(true);
    editForm.parentNode.replaceChild(newEditForm, editForm);

    // Envia os dados atualizados
    newEditForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(newEditForm);
      const data = {
        nome: formData.get("nome"),
        preco: parseFloat(formData.get("preco")),
        descricao: formData.get("descricao"),
        estoque: parseInt(formData.get("estoque")),
        avaliacao: parseFloat(formData.get("avaliacao")), // permite decimal
        categoria: formData.get("categoria"),
        imagem: formData.get("imagem") || "",
      };

      const submitBtn = document.getElementById("edit-modal-submit");
      submitBtn.disabled = true;
      submitBtn.textContent = "Salvando...";

      try {
        const success = await window.api.atualizarProduto(produto.Codigo, data);
        if (success) {
          document.getElementById("edit-product-modal").style.display = "none";
          location.reload(); // recarrega detalhes
        } else {
          alert("Erro ao atualizar produto");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao atualizar produto");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Salvar";
      }
    });

    // Abertura do modal de exclusão
    document
      .getElementById("delete-product-btn")
      .addEventListener("click", () => {
        const deleteModal = document.getElementById("delete-confirm-modal");
        document.getElementById(
          "delete-confirm-text"
        ).innerHTML = `Tem certeza que deseja excluir <strong>${produto.Nome}</strong>? Essa ação não pode ser desfeita.`;
        deleteModal.style.display = "flex";

        const deleteConfirmBtn = document.getElementById(
          "delete-modal-confirm"
        );
        const newDeleteConfirmBtn = deleteConfirmBtn.cloneNode(true);
        deleteConfirmBtn.parentNode.replaceChild(
          newDeleteConfirmBtn,
          deleteConfirmBtn
        );

        newDeleteConfirmBtn.addEventListener("click", async () => {
          try {
            const success = await window.api.deletarProduto(produto.Codigo);
            if (success) {
              window.location.href = "index.html"; // volta pra lista
            } else {
              alert("Erro ao excluir produto");
              deleteModal.style.display = "none";
            }
          } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao excluir produto");
            deleteModal.style.display = "none";
          }
        });
      });

    // Botões de fechar modais
    document
      .getElementById("edit-modal-cancel")
      .addEventListener("click", () => {
        document.getElementById("edit-product-modal").style.display = "none";
      });

    document
      .getElementById("edit-modal-close")
      .addEventListener("click", () => {
        document.getElementById("edit-product-modal").style.display = "none";
      });

    document
      .getElementById("delete-modal-cancel")
      .addEventListener("click", () => {
        document.getElementById("delete-confirm-modal").style.display = "none";
      });
  } catch (error) {
    console.error("Erro ao carregar produto:", error);
    container.innerHTML = "<p>Erro ao carregar produto. Tente novamente.</p>";
  }
});
