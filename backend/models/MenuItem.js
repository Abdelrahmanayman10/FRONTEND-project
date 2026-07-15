const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a menu item name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  img: {
    type: String,
    required: [true, 'Please provide an image path or URL']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Breakfast', 'Main Dishes', 'Drinks', 'Desserts']
  },
  description: {
    type: String,
    default: 'Made with fresh, premium ingredients to satisfy your cravings.'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
