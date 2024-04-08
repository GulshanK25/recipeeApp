// Function to fetch recipes from the API and populate the table
async function fetchRecipes() {
  try {
      const response = await fetch('http://localhost:5000/api/recipe');
      const recipes = await response.json();
      
      const tableBody = document.querySelector('#recipe-table tbody');
      tableBody.innerHTML = ''; // Clear existing rows
      
      recipes.forEach(recipe => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${recipe.id}</td>
              <td>${recipe.recipetitle}</td>
              <td>${recipe.description}</td>
              <td>${recipe.ingredients}</td>
              <td>${recipe.instructions}</td>
              <td>${recipe.cooktime}</td>
              <td>
                  <button onclick="editRecipe(${recipe.id})">Edit</button>
                  <button onclick="deleteRecipe(${recipe.id})">Delete</button>
              </td>
          `;
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error('Error fetching recipes:', error);
  }
}

// async function addRecipe(event) {
//   event.preventDefault(); // Prevent the default form submission behavior
  
//   // Gather data from the form
//   const formData = new FormData(this);
//   const recipeData = Object.fromEntries(formData.entries());

//   try {
//       // Send a POST request to add the recipe
//       const response = await fetch('http://localhost:5000/api/recipe', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(recipeData)
//       });
      
//       if (response.ok) {
//           // Recipe added successfully
//           alert('Recipe added successfully!');
//           // Clear the form
//           this.reset();
//       } else {
//           // Failed to add recipe
//           throw new Error('Failed to add recipe');
//       }
//   } catch (error) {
//       console.error('Error adding recipe:', error);
//       alert('Failed to add recipe. Please try again.');
//   }
// }

// // Attach the addRecipe function to the form's submit event
// // const addRecipeForm = document.getElementById('Add_recipe');
// // addRecipeForm.addEventListener('submit', addRecipe);


// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
  // Function to handle form submission for adding a new recipe
  async function addRecipe(event) {
      event.preventDefault(); // Prevent the default form submission behavior
      
      // Gather data from the form
      const formData = new FormData(event.target);
      const recipeData = Object.fromEntries(formData.entries());
    
      try {
          // Send a POST request to add the recipe
          const response = await fetch('http://localhost:5000/api/recipe', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(recipeData)
          });
          
          if (response.ok) {
              // Recipe added successfully
              alert('Recipe added successfully!');
              // Clear the form
              event.target.reset();
          } else {
              // Failed to add recipe
              throw new Error('Failed to add recipe');
          }
      } catch (error) {
          console.error('Error adding recipe:', error);
          alert('Failed to add recipe. Please try again.');
      }
  }

  // Attach the addRecipe function to the form's submit event
  const addRecipeForm = document.getElementById('Add_recipe');
  addRecipeForm.addEventListener('submit', addRecipe);
});


// Function to handle editing a recipe
// function editRecipe(id) {
//   // Fetch the recipe details based on the provided ID
//   fetch(`http://localhost:5000/api/recipe/${id}`)
//     .then(response => response.json())
//     .then(recipe => {
//       // Populate the form fields with the fetched recipe details
//       document.getElementById('title').value = recipe.recipetitle;
//       document.getElementById('description').value = recipe.description;
//       document.getElementById('ingredients').value = recipe.ingredients;
//       document.getElementById('instructions').value = recipe.instructions;
//       document.getElementById('cooktime').value = recipe.cooktime;
      
//       // Show a modal or form for editing the recipe
//       // For example:
//       document.getElementById('edit-recipe-modal').style.display = 'block';
//     })
//     .catch(error => console.error('Error fetching recipe details:', error));
// }

// // Event listener for the "Edit" button in the table row
// document.addEventListener('click', function(event) {
//   if (event.target.classList.contains('edit-button')) {
//     const id = event.target.dataset.id;
//     editRecipe(id);
//   }
// });

// async function editRecipe(id) {
//   try {
//       const response = await fetch(`http://localhost:5000/api/recipe/${id}`);
//       const recipe = await response.json();

//       // Populate the edit form fields with the fetched recipe details
//       document.getElementById('edit-id').value = recipe.id;
//       document.getElementById('edit-title').value = recipe.recipetitle;
//       document.getElementById('edit-description').value = recipe.description;
//       document.getElementById('edit-ingredients').value = recipe.ingredients;
//       document.getElementById('edit-instructions').value = recipe.instructions;
//       document.getElementById('edit-cooktime').value = recipe.cooktime;

//       // Show the edit form
//       document.getElementById('edit-recipe-form').style.display = 'block';
//   } catch (error) {
//       console.error('Error fetching recipe details:', error);
//       alert('Failed to fetch recipe details. Please try again.');
//   }
// }

// // Event listener for the "Edit" button in the table row
// document.addEventListener('click', function(event) {
//   if (event.target.classList.contains('edit-button')) {
//       const id = event.target.dataset.id;
//       editRecipe(id);
//   }
// });

// // Function to handle form submission for updating a recipe
// async function updateRecipe(event) {
//   event.preventDefault(); // Prevent the default form submission behavior
  
//   // Gather data from the form
//   const formData = new FormData(event.target);
//   const recipeData = Object.fromEntries(formData.entries());

//   try {
//       // Send a PUT request to update the recipe
//       const response = await fetch(`http://localhost:5000/api/recipe/${recipeData.id}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(recipeData)
//       });
      
//       if (response.ok) {
//           // Recipe updated successfully
//           alert('Recipe updated successfully!');
//           // Hide the form
//           document.getElementById('edit-recipe-form').style.display = 'none';
//           // Refresh the table
//           fetchRecipes();
//       } else {
//           // Failed to update recipe
//           throw new Error('Failed to update recipe');
//       }
//   } catch (error) {
//       console.error('Error updating recipe:', error);
//       alert('Failed to update recipe. Please try again.');
//   }
// }

// // Attach the updateRecipe function to the form's submit event
// const editRecipeForm = document.getElementById('edit-recipe-form');
// editRecipeForm.addEventListener('submit', updateRecipe);

// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Event listener for the "Edit" button in the table row
  document.addEventListener('click', function(event) {
      if (event.target.classList.contains('edit-button')) {
          const id = event.target.dataset.id;
          editRecipe(id);
      }
  });
  async function editRecipe(id) {
    try {
        // Fetch the recipe details based on the provided ID
        const response = await fetch(`http://localhost:5000/api/recipe/${id}`);
        const recipe = await response.json();
      
        // Populate the form fields with the fetched recipe details
        document.getElementById('edit-id').value = recipe.id;
        document.getElementById('edit-title').value = recipe.recipetitle;
        document.getElementById('edit-description').value = recipe.description;
        document.getElementById('edit-ingredients').value = recipe.ingredients;
        document.getElementById('edit-instructions').value = recipe.instructions;
        document.getElementById('edit-cooktime').value = recipe.cooktime;
      
        // Show the form for editing the recipe
        document.getElementById('edit-recipe-form').style.display = 'block';
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
  }
  
});

// Function to fetch recipe details for editing



async function deleteRecipe(id) {
  const confirmation = confirm('Are you sure you want to delete this recipe?');
  if (confirmation) {
      try {
          const response = await fetch(`http://localhost:5000/api/recipe/${id}`, {
              method: 'DELETE'
          });
          
          if (response.ok) {
              // Refresh the table after deleting the recipe
              fetchRecipes();
          } else {
              throw new Error('Failed to delete recipe');
          }
      } catch (error) {
          console.error('Error deleting recipe:', error);
      }
  }
}

// Call fetchRecipes function when the page loads
window.onload = fetchRecipes;
