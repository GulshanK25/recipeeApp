This project is a Recipe Management App with both frontend and backend components. The backend is built with Node.js, Express.js, and MongoDB, while the frontend is a basic implementation in the web browser.

Backend
The backend API allows users to perform CRUD (Create, Read, Update, Delete) operations on recipes stored in a MongoDB database.

Dependencies
cors (^2.8.5)
dotenv (^16.4.5)
express (^4.19.2)
mongodb (^6.5.0)
mongoose (^8.3.0)
nodemon (^3.1.0)
Features
Create: Users can add new recipes to the database.
Read: Users can view all recipes or retrieve a specific recipe by its ID.
Update: Users can edit existing recipes.
Delete: Users can delete recipes from the database.
Setup
Clone the repository.
Navigate to the backend directory.
Install dependencies with npm install.
Create a .env file in the backend directory and set up environment variables like PORT and MONGODB_URI.
Run the server using npm start or nodemon.
Usage
GET /recipes: Retrieve all recipes.
GET /recipes/:id: Retrieve a specific recipe by its ID.
POST /recipes: Add a new recipe.
PUT /recipes/:id: Update an existing recipe.
DELETE /recipes/:id: Delete a recipe by its ID.
Environment Variables
PORT: Port number for the server to listen on.
MONGODB_URI: URI for connecting to the MongoDB database.
Frontend
The frontend provides a basic interface for interacting with the Recipe Management API.

Technologies Used
HTML
CSS
JavaScript
Features
View Recipes: Display all recipes.
Add Recipe: Create a new recipe.
Edit Recipe: Modify an existing recipe.
Delete Recipe: Remove a recipe from the list.
Setup
Open the frontend directory.
Open the index.html file in a web browser.
