🍽️ FoodieHub — Online Food Ordering Web App

FoodieHub is a full-stack online food ordering platform where users can browse menu items, add them to the cart, and place orders. The project includes an admin panel to manage food items, categories, and orders.

🚀 Features

👤 User Side

Browse food items dynamically from database

Add items to cart

Increase or decrease quantity

Place order

Login / Signup authentication

Search & filter by categories (Pizza, Burger, Drinks, etc.)

🛠️ Admin Side

Add / Edit / Delete food items

Upload images for food

Manage orders & status

View customer details

🧰 Tech Stack
Layer	             Technology Used
Frontend	         HTML, CSS, JavaScript, Bootstrap
Backend     	     Node.js, Express.js
Database    	     MySQL
Authentication     JWT / bcrypt
Image Storage      Local / Cloudinary (optional)
📁 Folder Structure
FoodieHub/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── config/
│
├── frontend/
│   ├── index.html
│   ├── menu.html
│   ├── cart.html
│   ├── login.html
│   └── register.html
│
├── uploads/        # stored food images
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the project
git clone https://github.com/username/FoodieHub.git
cd FoodieHub

2️⃣ Install backend dependencies
cd backend
npm install

3️⃣ Configure Environment Variables

Create .env file:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=foodiehub
JWT_SECRET=your-secret-key

4️⃣ Setup MySQL Database

Run this initial SQL:

CREATE DATABASE foodiehub;

USE foodiehub;

CREATE TABLE food_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  price DECIMAL(10,2),
  category VARCHAR(100),
  image VARCHAR(255),
  description TEXT
);

5️⃣ Start the server
npm start

🧪 API Endpoints
Method	Endpoint	Description
GET	/api/foods	Get all food items
POST	/api/foods	Add new food item (Admin)
PUT	/api/foods/:id	Edit food item
DELETE	/api/foods/:id	Delete food item
POST	/api/auth/register	Create new user
POST	/api/auth/login	Login user


🌟 Future Enhancements

Razorpay / Stripe payment gateway

Delivery personnel tracking system

Real-time order status


