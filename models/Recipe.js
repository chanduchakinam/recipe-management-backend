const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    category: { type: String, default: "Uncategorized" },
    createdAt: { type: Date, default: Date.now },
    order: { type: Number, required: true },
});

module.exports = mongoose.model("Recipe", RecipeSchema, "recipes");
