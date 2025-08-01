# Vivek Studioz Minor

A full-stack e-commerce application featuring a Node.js/Express backend and a React frontend.

---

## 📁 Project Structure

```
Vivek Studioz Minor/
│
├── .env
├── package.json
├── server.js
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── CategoryController.js
│   └── productController.js
├── helpers/
│   └── authhelper.js
├── middlewares/
│   └── authMiddlewares.js
├── models/
│   ├── CategoryModel.js
│   ├── OrderModel.js
│   ├── productModels.js
│   └── usermodels.js
├── routers/
│   ├── authroute.js
│   ├── CategoryRoutes.js
│   └── productRoutes.js
└── user/
    ├── package.json
    ├── public/
    └── src/
```

---

## 🚀 Features

- User Authentication (JWT)
- Product & Category Management
- Order Processing
- RESTful API
- React-based User Interface

---

## 🛠️ Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/viveksurti-dev/React-Ecommerce-App.git
cd React Ecommerce App
```

### 2. Backend Setup

```sh
npm install
# Create a .env file with your environment variables (see .env.example)
npm start
```

The backend server will run on [http://localhost:5000](http://localhost:5000) by default.

### 3. Frontend Setup

```sh
cd user
npm install
npm start
```

The React app will run on [http://localhost:3000](http://localhost:3000).

---

## 💡 How to Use the App

1. **Register/Login:**  
   Create a new account or log in with existing credentials.

2. **Browse Products:**  
   View products by category, search, and filter as needed.

3. **Add to Cart & Checkout:**  
   Add products to your cart and proceed to checkout.

4. **Admin Features:**  
   (If logged in as admin) Manage products, categories, and view orders.

---

## 📦 Scripts

### Backend

- `npm start` — Start the backend server

### Frontend

- `npm start` — Start the React development server
- `npm run build` — Build the React app for production
- `npm test` — Run frontend tests

### For Both
- `npm run dev` - Start both at one command
---

## 📚 Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Express Documentation](https://expressjs.com/)

---

## 📝 License

This project is licensed under the MIT License.
