const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 }
];

let categories = [
  { id: 1, name: 'Elektronik' },
  { id: 2, name: 'Perabotan' }
];

// GET semua produk
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET produk berdasarkan ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// POST produk baru
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update produk
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = { id: productId, ...req.body };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE produk
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(p => p.id !== productId);
  res.status(204).send();
});

// GET semua kategori
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// GET kategori berdasarkan ID
app.get('/api/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = categories.find(c => c.id === categoryId);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'kategori tidak ditemukan' });
  }
});

// POST kategori baru
app.post('/api/categories', (req, res) => {
  const newCategory = req.body;
  newCategory.id = categories.length ? categories[categories.length - 1].id + 1 : 1;
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// PUT update kategori
app.put('/api/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex(c => c.id === categoryId);
  if (categoryIndex !== -1) {
    categories[categoryIndex] = { id: categoryId, ...req.body };
    res.json(categories[categoryIndex]);
  } else {
    res.status(404).json({ message: 'kategori tidak ditemukan' });
  }
});

// DELETE kategori
app.delete('/api/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  categories = categories.filter(c => c.id !== categoryId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
