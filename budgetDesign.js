const mongoose = require('mongoose');

// Helper function to generate a random hex color
function generateHexColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  return `#${hex}`;
}

const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    match: /^#[0-9A-Fa-f]{6}$/,
    default: generateHexColor
  }
});

module.exports = mongoose.model('BudgetItem', budgetSchema);
