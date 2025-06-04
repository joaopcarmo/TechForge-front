Portugues | [English](README_EN.md)

# Sistema de Produtos TECHFORGE

Sistema completo de gerenciamento de produtos desenvolvido com JavaScript vanilla no frontend e Node.js + SQL Server no backend. Permite visualizar, adicionar, editar e excluir produtos de forma dinâmica e responsiva.

## 📋 Funcionalidades

- **Listagem de produtos** com grid responsivo
- **Detalhes do produto** em página individual
- **Adicionar novos produtos** através de modal
- **Editar produtos existentes** com formulário pré-preenchido
- **Excluir produtos** com confirmação de segurança
- **Carousel de destaque** na página principal
- **Interface moderna e responsiva**
- **API RESTful** para todas as operações CRUD

## 🛠️ Tecnologias Utilizadas

### Frontend

- HTML5
- CSS3 (com design moderno e responsivo)
- JavaScript Vanilla (ES6+)
- Modais interativos
- Carousel customizado

### Backend (https://github.com/joaopcarmo/TechForge-back)

- Node.js
- Express.js
- SQL Server (mssql)
- CORS habilitado
- dotenv para variáveis de ambiente

- Inteligencia artificial para comentar os codigos.

## 📁 Estrutura do Projeto

```
sistema-produtos/
├── front/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── api.js
│   │   ├── carousel.js
│   │   ├── details.js
│   │   ├── modals.js
│   │   └── products.js
│   ├── index.html
│   └── produto.html
├── back/
│   ├── node_modules/
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## 🗃️ Estrutura do Banco de Dados

```sql
CREATE TABLE Produtos (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(255) NOT NULL,
    Codigo NVARCHAR(50) UNIQUE NOT NULL,
    Preco DECIMAL(10,2) NOT NULL,
    Descricao NVARCHAR(MAX) NOT NULL,
    Estoque INT NOT NULL,
    Avaliacao INT CHECK (Avaliacao >= 1 AND Avaliacao <= 5),
    Categoria NVARCHAR(100) NOT NULL,
    Imagem NVARCHAR(500)
);
```

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- SQL Server
- npm ou yarn

### Backend

1. **Clone o repositório**

```bash
git clone [url-do-repositorio]
cd sistema-produtos/back
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na pasta `back` com:

```env
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_SERVER=seu_servidor
DB_DATABASE=sua_base_de_dados
```

4. **Execute o servidor**

```bash
npm start
# ou
node index.js
```

O servidor estará rodando em `http://localhost:3000`

### Frontend

1. **Navegue para a pasta frontend**

```bash
cd sistema-produtos/front
```

2. **Abra o arquivo `index.html`** em um navegador web
   - Ou use um servidor local como Live Server (VS Code)
   - Ou Python: `python -m http.server 8000`

## 🚀 Endpoints da API

### Produtos

| Método   | Endpoint                         | Descrição                    |
| -------- | -------------------------------- | ---------------------------- |
| `GET`    | `/produtos`                      | Lista todos os produtos      |
| `GET`    | `/produtos/codigo/:codigo`       | Busca produto por código     |
| `GET`    | `/produtos/categoria/:categoria` | Lista produtos por categoria |
| `POST`   | `/produtos`                      | Adiciona novo produto        |
| `PUT`    | `/produtos/:codigo`              | Atualiza produto existente   |
| `DELETE` | `/produtos/:codigo`              | Remove produto               |

### Exemplo de Requisição POST

```json
{
  "nome": "Cadeira Gamer",
  "codigo": "CG001",
  "preco": 1299.0,
  "descricao": "Cadeira gamer confortável",
  "estoque": 10,
  "avaliacao": 5,
  "categoria": "Móveis",
  "imagem": "https://exemplo.com/imagem.jpg"
}
```

## 💡 Funcionalidades do Frontend

### Página Principal (index.html)

- Carousel de produtos em destaque
- Grid de produtos com paginação
- Botão para adicionar novos produtos
- Modais para edição e exclusão

### Página de Detalhes (produto.html)

- Visualização completa do produto
- Informações detalhadas
- Botões para editar e excluir
- Navegação de volta para a lista

### Modais Interativos

- **Adicionar Produto**: Formulário completo com validação
- **Editar Produto**: Formulário pré-preenchido
- **Confirmar Exclusão**: Modal de confirmação com aviso

## 🎨 Design e UX

- **Design Responsivo**: Funciona em desktop, tablet e mobile
- **Interface Moderna**: Cores e tipografia contemporâneas
- **Micro-interações**: Hover effects e transições suaves
- **Feedback Visual**: Loading states e mensagens de confirmação
- **Acessibilidade**: Contraste adequado e navegação por teclado

## 👨‍💻 Autor

**João Pedro Carmo**

- Curso: Análise e Desenvolvimento de Sistemas
- Turma: Noturno
- Ano: 2025

## 📄 Licença

© 2025 Sistema de Produtos. Todos os direitos reservados.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através das redes sociais listadas no rodapé do sistema.
