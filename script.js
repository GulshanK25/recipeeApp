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
                  <button onclick="updateRecipe(${recipe.id})">Update</button>
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


async function updateRecipe(id) {
    try {
        // Fetch the existing recipe details
        const response = await fetch(`http://localhost:5000/api/recipe/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipe details');
        }
        const recipe = await response.json();

        // Create a form dynamically
        const form = document.createElement('form');

        // Add input fields for each recipe property
        Object.keys(recipe).forEach(key => {
            const label = document.createElement('label');
            label.textContent = `${key}: `;
            const input = document.createElement('input');
            input.type = 'text';
            input.name = key;
            input.value = recipe[key];
            form.appendChild(label);
            form.appendChild(input);
            form.appendChild(document.createElement('br'));
        });

        // Add a submit button
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Update Recipe';
        form.appendChild(submitButton);

        // Handle form submission
        form.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(form);
            const updatedRecipeData = Object.fromEntries(formData.entries());

            try {
                // Send a PUT request to update the recipe
                const response = await fetch(`http://localhost:5000/api/recipe/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedRecipeData)
                });

                if (response.ok) {
                    // Recipe updated successfully
                    alert('Recipe updated successfully!');
                    // Refresh the table
                    // fetchRecipes();
                    location.reload();
                } else {
                    // Failed to update recipe
                    throw new Error('Failed to update recipe');
                }
            } catch (error) {
                console.error('Error updating recipe:', error);
                alert('Failed to update recipe. Please try again.');
            }
        });

        // Append the form to the document
        document.body.appendChild(form);

        form.scrollIntoView({ behavior: 'smooth', block: 'start' });


    } catch (error) {
        console.error('Error fetching recipe details:', error);
        alert('Failed to fetch recipe details. Please try again.');
    }
}




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
