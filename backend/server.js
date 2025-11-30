require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Test root
app.get('/', (req,res) => res.send('Food ordering backend is running.'));

// Sync DB and start server
const PORT = process.env.PORT || 5000;

db.sequelize.sync({ alter: true }) // use {force:true} to drop tables (danger)
  .then(async () => {
    console.log('DB synced');
    // Optionally seed menu items if table empty
    const count = await db.MenuItem.count();
    if(count === 0) {
      await db.MenuItem.bulkCreate([
        { name: 'Margherita Pizza', description: 'Classic cheese pizza', price: 199.00 },
        { name: 'Cheese Burger', description: 'Beef patty with cheese', price: 129.00 },
        { name: 'Veg Pasta', description: 'Creamy tomato pasta', price: 149.00 }
      ]);
      console.log('Seeded menu items');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to sync DB:', err);
  });
