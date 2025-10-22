// Budget API
const express = require('express');
const mongoose = require('mongoose');
const BudgetItem = require('./budgetDesign');
const app = express();
const port = 3000;

app.use('/', express.static('public'));
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/budgetDB');

// Routes
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', async (req, res) => {
  try {
    const items = await BudgetItem.find({});
    res.json({ myBudget: items });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/budget', async (req, res) => {
  try {
    const newItem = new BudgetItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('POST error:', err.message); // Add this for debugging
    res.status(400).send(err.message);
  }
});

app.put('/budget/:id', async (req, res) => {
  try {
    const updatedItem = await BudgetItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).send('Item not found');
    }
    res.json(updatedItem);
  } catch (err) {
    console.error('PUT error:', err.message);
    res.status(400).send(err.message);
  }
});

app.delete('/budget', async (req, res) => {
  try {
    const result = await BudgetItem.deleteMany({});
    res.json({ message: 'All budget items deleted', deletedCount: result.deletedCount });
  } catch (err) {
    console.error('DELETE error:', err.message);
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
