const express = require('express');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv/config');

const connectDB = require('./database/connect');
const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-routes');
const orderRoutes = require('./routes/order-routes');
const uploadRoutes = require('./routes/upload-routes');
const { notFound, errorHandler } = require('./middleware/error-middleware');

const app = express();

// connect to database
connectDB();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.use('/uploads/images', express.static(path.join(__dirname, '/uploads', '/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('API is running.');
  });
}

// error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log('Server running!'));
