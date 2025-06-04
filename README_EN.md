# English Version | [Português](README.md)

# TECHFORGE Product Management System

A complete product management system built with vanilla JavaScript on the frontend and Node.js + SQL Server on the backend. It allows users to dynamically and responsively view, add, edit, and delete products.

## 📋 Features

- **Product listing** with responsive grid
- **Product details** on individual page
- **Add new products** via modal
- **Edit existing products** with pre-filled form
- **Delete products** with confirmation modal
- **Featured product carousel** on the main page
- **Modern and responsive interface**
- **RESTful API** for all CRUD operations

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3 (modern and responsive design)
- Vanilla JavaScript (ES6+)
- Interactive modals
- Custom carousel

### Backend ([https://github.com/joaopcarmo/TechForge-back](https://github.com/joaopcarmo/TechForge-back))

- Node.js
- Express.js
- SQL Server (mssql)
- Enabled CORS
- dotenv for environment variables
- Artificial Intelligence used for code comments

## 📁 Project Structure

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

## 🗃️ Database Schema

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

## ⚙️ Setup and Installation

### Requirements

- Node.js (version 14 or higher)
- SQL Server
- npm or yarn

### Backend

1. **Clone the repository**

```bash
git clone [repository-url]
cd sistema-produtos/back
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env` file in the `back` folder:

```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_SERVER=your_server
DB_DATABASE=your_database
```

4. **Start the server**

```bash
npm start
# or
node index.js
```

Server will run at `http://localhost:3000`

### Frontend

1. **Navigate to the frontend folder**

```bash
cd sistema-produtos/front
```

2. **Open `index.html`** in your web browser

   - Or use a local server like Live Server (VS Code)
   - Or via Python: `python -m http.server 8000`

## 💡 Frontend Features

### Main Page (index.html)

- Featured product carousel
- Product grid with pagination
- Add new product button
- Edit and delete modals

### Detail Page (produto.html)

- Full product information
- Detailed layout
- Edit and delete buttons
- Navigation back to the main list

### Interactive Modals

- **Add Product**: Complete form with validation
- **Edit Product**: Pre-filled form
- **Confirm Deletion**: Warning confirmation modal

## 🎨 Design and UX

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Contemporary colors and typography
- **Micro-interactions**: Hover effects and smooth transitions
- **Visual Feedback**: Loading states and confirmation messages
- **Accessibility**: High contrast and keyboard navigation

## 👨‍💼 Author

**João Pedro Carmo**

- Course: Systems Analysis and Development
- Class: Evening
- Year: 2025

## 📄 License

© 2025 Product Management System. All rights reserved.

## 🤝 Contribution

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📞 Support

For questions or suggestions, reach out via the social media links in the site footer.
