const express = require('express');
const { sequelize } = require('./models');
const productsRouter = require('./routes/products');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/products', productsRouter);

const PORT = process.env.PORT || 5002;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connected!');
});
