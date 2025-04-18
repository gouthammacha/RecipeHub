// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  prepTime: {
    type: String,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  calories: {
    type: Number
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  tags: [{
    type: String
  }],
  instructions: [{
    type: String,
    required: true
  }],
  ingredients: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
