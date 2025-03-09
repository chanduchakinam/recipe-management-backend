const express = require("express");
const Recipe = require("../models/Recipe");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// GET all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// GET a single recipe
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


// POST a new recipe
router.post(
    "/",
    [body("title").notEmpty(), body("ingredients"), body("instructions").notEmpty()],
    async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        console.log(req.body);
        try {
            const recipe = new Recipe(req.body);
            const result = await recipe.save();
            console.log(result);
            res.status(201).json(recipe);
        } catch (error) {
            res.status(500).json({ message: "Error creating recipe" });
        }
    }
);

// PUT update a recipe
router.put("/:id", async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: "Error updating recipe" });
    }
});

// PUT update order of recipes
router.put("/reorder", async (req, res) => {
    try {
        const newOrder = req.body;
        newOrder.forEach(async (recipe, index) => {
            await Recipe.findByIdAndUpdate(recipe._id, { order: index });
        });
        res.json({ message: "Order updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating order" });
    }
});

module.exports = router;
