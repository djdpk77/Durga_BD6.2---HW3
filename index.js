const express = require('express');
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 2, name: 'Coffee Maker', category: 'Appliances' },
  { id: 3, name: 'Headphones', category: 'Electronics' },
  { id: 4, name: 'Running Shoes', category: 'Footwear' },
];

function getProducts() {
  return products;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function addNewProduct(product) {
  products.push(product);
  return product;
}

app.get('/products', (req, res) => {
  res.json(getProducts());
});

app.get('/products/:id', (req, res) => {
  let id = parseInt(req.params.id);
  res.json(getProductById(id));
});

app.post('/products/new', (req, res) => {
  let newProduct = req.body;
  res.json(addNewProduct(newProduct));
});

module.exports = app;
