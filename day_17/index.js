const express = require('express');

const app = express();
app.use(express.json());

const port = 3000;

let products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

let nextId = 6;

// Logger middleware
const logger = (req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(`${req.time} - ${req.method} method on ${req.url}`);
  next();
};

app.use(logger);

// Routes
app.get('/products', (req, res, next) => {
  try {
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

app.get('/products/search', (req, res, next) => {
  try {
    const save = req.query;
    // Do something with the data
    res.status(200).send("Query processed");
  } catch (err) {
    next(err);
  }
});

app.get('/products/:id', (req, res, next) => {
  try {
    const itemID = req.params.id;
    const result = products.filter(product => product.id.toString() === itemID);

    if (result.length === 0) {
      throw new Error("Product not found");
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

app.post('/products', (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      throw new Error("Name and price are required");
    }

    products.push({ id: nextId, name, price });
    nextId++;

    res.status(200).send("Product successfully created.");
  } catch (err) {
    next(err);
  }
});

app.put('/products/:id', (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    const newData = req.body;

    const productIndex = products.findIndex(product => product.id === itemId);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    products[productIndex] = { ...products[productIndex], ...newData };
    res.status(200).send("The product was updated successfully.");
  } catch (err) {
    next(err);
  }
});

app.delete('/products/:id', (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    const productIndex = products.findIndex(product => product.id === itemId);

    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    products.splice(productIndex, 1);
    res.status(200).send("The product was deleted.");
  } catch (err) {
    next(err);
  }
});

// Error handling middleware (must have 4 params)
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
