document.addEventListener("DOMContentLoaded", () => {
  // Referência ao modal de Adicionar Produto
  const addProductModal = document.getElementById("add-product-modal");
  const addProductBtn = document.getElementById("add-product-btn");
  const addModalClose = document.getElementById("add-modal-close");
  const addModalCancel = document.getElementById("add-modal-cancel");
  const addProductForm = document.getElementById("add-product-form");

  // Referência ao modal de Editar Produto
  const editProductModal = document.getElementById("edit-product-modal");
  const editModalClose = document.getElementById("edit-modal-close");
  const editModalCancel = document.getElementById("edit-modal-cancel");
  const editProductForm = document.getElementById("edit-product-form");

  // Referência ao modal de Confirmação de Exclusão
  const deleteConfirmModal = document.getElementById("delete-confirm-modal");
  const deleteModalCancel = document.getElementById("delete-modal-cancel");
  const deleteModalConfirm = document.getElementById("delete-modal-confirm");

  // Evento para abrir o modal de Adicionar Produto
  if (addProductBtn) {
    addProductBtn.addEventListener("click", () => {
      addProductModal.style.display = "flex";
    });
  }

  // Eventos para fechar o modal de Adicionar Produto
  if (addModalClose) {
    addModalClose.addEventListener("click", () => {
      addProductModal.style.display = "none";
    });
  }

  if (addModalCancel) {
    addModalCancel.addEventListener("click", () => {
      addProductModal.style.display = "none";
    });
  }

  // Evento para enviar o formulário de Adicionar Produto
  if (addProductForm) {
    addProductForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Coleta os dados do formulário
      const formData = new FormData(addProductForm);
      const product = {
        nome: formData.get("nome"),
        codigo: formData.get("codigo"),
        preco: parseFloat(formData.get("preco")),
        descricao: formData.get("descricao"),
        estoque: parseInt(formData.get("estoque")),
        avaliacao: parseInt(formData.get("avaliacao")),
        categoria: formData.get("categoria"),
        imagem: formData.get("imagem") || "",
      };

      const submitBtn = document.getElementById("add-modal-submit");
      submitBtn.disabled = true;
      submitBtn.textContent = "Salvando...";

      try {
        // Envia para API
        const success = await window.api.criarProduto(product);

        if (success) {
          addProductModal.style.display = "none";
          addProductForm.reset();
          if (typeof loadProducts === "function") {
            loadProducts();
          } else {
            window.location.reload();
          }
        } else {
          alert("Erro ao adicionar produto");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao adicionar produto");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Salvar";
      }
    });
  }

  // Evento para fechar o modal de Editar Produto
  if (editModalClose) {
    editModalClose.addEventListener("click", () => {
      editProductModal.style.display = "none";
    });
  }

  if (editModalCancel) {
    editModalCancel.addEventListener("click", () => {
      editProductModal.style.display = "none";
    });
  }

  // Evento para enviar o formulário de Editar Produto
  if (editProductForm) {
    editProductForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Coleta os dados do formulário
      const formData = new FormData(editProductForm);
      const codigo = formData.get("codigo");
      const product = {
        nome: formData.get("nome"),
        preco: parseFloat(formData.get("preco")),
        descricao: formData.get("descricao"),
        estoque: parseInt(formData.get("estoque")),
        avaliacao: parseInt(formData.get("avaliacao")),
        categoria: formData.get("categoria"),
        imagem: formData.get("imagem") || "",
      };

      const submitBtn = document.getElementById("edit-modal-submit");
      submitBtn.disabled = true;
      submitBtn.textContent = "Salvando...";

      try {
        // Envia para API
        const success = await window.api.atualizarProduto(codigo, product);

        if (success) {
          editProductModal.style.display = "none";
          if (typeof loadProducts === "function") {
            loadProducts();
          } else {
            window.location.reload();
          }
        } else {
          alert("Erro ao editar produto");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao editar produto");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Salvar";
      }
    });
  }

  // Evento para cancelar o modal de exclusão
  if (deleteModalCancel) {
    deleteModalCancel.addEventListener("click", () => {
      deleteConfirmModal.style.display = "none";
    });
  }

  // Fecha modais ao clicar fora da área deles
  window.addEventListener("click", (e) => {
    if (e.target === addProductModal) {
      addProductModal.style.display = "none";
    }
    if (e.target === editProductModal) {
      editProductModal.style.display = "none";
    }
    if (e.target === deleteConfirmModal) {
      deleteConfirmModal.style.display = "none";
    }
  });
});

// Exibe o modal de edição com os dados do produto preenchidos
function showEditModal(product) {
  const editProductModal = document.getElementById("edit-product-modal");

  // Preenche os campos com os dados do produto
  document.getElementById("edit-codigo").value = product.Codigo;
  document.getElementById("edit-nome").value = product.Nome;
  document.getElementById("edit-preco").value = product.Preco;
  document.getElementById("edit-descricao").value = product.Descricao;
  document.getElementById("edit-estoque").value = product.Estoque;
  document.getElementById("edit-avaliacao").value = product.Avaliacao;
  document.getElementById("edit-categoria").value = product.Categoria;

  const editImagemField = document.getElementById("edit-imagem");
  if (editImagemField) {
    editImagemField.value = product.Imagem || "";
  }

  editProductModal.style.display = "flex";
}

// Exibe o modal de confirmação para excluir o produto
function showDeleteModal(product) {
  const deleteConfirmModal = document.getElementById("delete-confirm-modal");
  const deleteConfirmText = document.getElementById("delete-confirm-text");
  const deleteModalConfirm = document.getElementById("delete-modal-confirm");

  // Mensagem de confirmação com nome do produto
  deleteConfirmText.innerHTML = `
    Tem certeza que deseja excluir o produto <strong>"${product.Nome}"</strong>? Esta ação não pode ser desfeita.
  `;

  // Substitui event listeners antigos
  const newDeleteModalConfirm = deleteModalConfirm.cloneNode(true);
  deleteModalConfirm.parentNode.replaceChild(
    newDeleteModalConfirm,
    deleteModalConfirm
  );

  // Evento para confirmar a exclusão do produto
  newDeleteModalConfirm.addEventListener("click", async () => {
    try {
      const success = await window.api.deletarProduto(product.Codigo);

      if (success) {
        deleteConfirmModal.style.display = "none";
        if (window.location.pathname.includes("produto.html")) {
          window.location.href = "index.html";
        } else {
          if (typeof loadProducts === "function") {
            loadProducts();
          } else {
            window.location.reload();
          }
        }
      } else {
        alert("Erro ao excluir produto");
        deleteConfirmModal.style.display = "none";
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir produto");
      deleteConfirmModal.style.display = "none";
    }
  });

  deleteConfirmModal.style.display = "flex";
}
