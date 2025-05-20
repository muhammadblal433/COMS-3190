const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'easycal';

app.use(cors());
app.use(bodyParser.json());

let db; //stores connection to the MongoDB database (easycal)
let recipesCollection;
let restaurantsCollection;

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    recipesCollection = db.collection('recipes');
    restaurantsCollection = db.collection('restaurants');
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// GET ROUTE for all recipes
// This route pulls all recipes from the database and sends them as JSON to the frontend.
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await recipesCollection.find().toArray();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// GET ROUTE for a specific recipe
// This route gets one recipe by its ID — useful when we want to show recipe details inside a modal.
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await recipesCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// GET ROUTE for all team members
// Fetches a list of all team members from the MongoDB team collection.
app.get('/api/team', async (req, res) => {
  try {
    const team = await db.collection('team').find().toArray();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team data' });
  }
});

// GET ROUTE for all popularFeatures for the main page
// This fetches the feature highlights for the homepage — like cards for nutrition tools or meal tracking.
app.get('/api/popular-features', async (req, res) => {
  try {
    const features = await db.collection('popularFeatures').find().toArray();
    res.json(features);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch popular features' });
  }
});

// POST ROUTE for AI-generated recipe
// This route generates a recipe based on user input using an AI model
const axios = require('axios');

app.post('/api/generate-recipe', async (req, res) => {
  const { age, weight, height, exercise, meal } = req.body;
//prompt for AI model
  const prompt = `
    You are a professional AI recipe assistant.

    Your task is to generate a healthy, easy-to-make ${meal.toLowerCase()} recipe.

    You MUST respond ONLY in the format below — with no greetings, no explanation, no additional text.

    Follow this format exactly:
    ----------------------------
    Recipe: <short recipe title>
    ---
    Ingredients:
    - <ingredient 1>
    - <ingredient 2>
    - <ingredient 3>
    ...
  `.trim();

  async function getValidRecipe() {
    for (let attempt = 0; attempt < 3; attempt++) {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: "tinyllama:1.1b-chat",
        prompt,
        stream: false
      });

      let output = response.data.response?.trim() || '';
      const recipeMatch = output.match(/Recipe:\s*(.*)/);

      // Valid if we have "Recipe:" and the title doesn’t start with an invalid character
      if (recipeMatch && !/^[<\[\(]/.test(recipeMatch[1].trim())) {
        output = output.substring(output.indexOf("Recipe:")).trim();
        output = output.replace(/Instructions:.*/is, '').trim();
        output = output.replace(/Tips:.*/is, '').trim();
        output = output.replace(/Calories:.*/is, '').trim();
        return output;
      }
    }
    return 'No recipe generated, feel free to try again!';
  }

  try {
    const finalOutput = await getValidRecipe();
    res.json({ output: finalOutput });
  } catch (err) {
    console.error('AI generation failed:', err.message);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
});

// POST ROUTE to create a new recipe
// This lets us add a brand new recipe into the MongoDB database
app.post('/api/recipes', async (req, res) => {
  try {
    const result = await recipesCollection.insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// PUT ROUTE to update a recipe
// This allows us to edit an existing recipe by its ID
app.put('/api/recipes/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid recipe ID" });
    }

    const { _id, ...updateData } = req.body; // we exclude _id so MongoDB doesn't get confused
    const result = await recipesCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    res.json(result);
  } catch (err) {
    console.error("Update recipe error:", err);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// DELETE ROUTE to delete a recipe
// This removes a recipe from the database permanently
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const result = await recipesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

//RESTAURANTS ROUTES
// GET ROUTE for all restaurants
// This fetches all restaurants stored in the database to show on the Popular Restaurants page.
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await restaurantsCollection.find().toArray();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// GET ROUTE for specific restaurant
// This gets details for one restaurant by ID — helpful when you want to show its details in a modal.
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await restaurantsCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurant' });
  }
});

// POST ROUTE to create a new restaurant
// This lets us add a new restaurant to the system
app.post('/api/restaurants', async (req, res) => {
  try {
    const result = await restaurantsCollection.insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
});

// PUT ROUTE to update a restaurant
// This allows us to edit restaurant details, like name or type
app.put('/api/restaurants/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid restaurant ID" });
    }

    const { _id, ...updateData } = req.body;
    const result = await restaurantsCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    res.json(result);
  } catch (err) {
    console.error("Update restaurant error:", err);
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
});

// DELETE ROUTE to delete a restaurant
// This removes a restaurant from the database
app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    const result = await restaurantsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});

// POST devLogins ROUTE
// This route checks if a developer’s email and password match what’s in the MongoDB database.
// This is what powers the LoginPage.jsx on the frontend and controls developer-only access.
app.post('/api/devLogins/check', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection('devLogins').findOne({ email, password });
    if (user) {
      res.json({ success: true, name: user.name });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error checking dev login:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});