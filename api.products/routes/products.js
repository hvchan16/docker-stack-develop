const express = require('express');
const { Product } = require('../models');

const productsRouter = express.Router();

productsRouter.get('/all', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({ data: products, message: '' });
    } catch (err) {
        res.status(500).json({ data: [], message: err.message });
    }
});

module.exports = productsRouter;
