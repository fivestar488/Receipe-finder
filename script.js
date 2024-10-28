const searchForm = document.querySelector('#searchForm'); // Ensure this matches the form ID
const searchInput = document.querySelector('#search'); // Ensure this matches the input ID
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    searchReceipes();
});

async function searchReceipes() {
    const searchValue = searchInput.value.trim(); // Get value from the input
    if (!searchValue) return; // Exit if no input

    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=345d8a19&app_key=a8b1115ab31711dceb82070dbedf39ec&from=0&to=10`);
    const data = await response.json();
    
    console.log(data); // Log the data to check the response
    displayReceipes(data.hits);
}

function displayReceipes(recipes) {
    let html = '';
    if (recipes.length === 0) {
        html = '<p>No recipes found.</p>';
    } else {
        recipes.forEach(recipe => {
            html += `
            <div>
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <h3>${recipe.recipe.label}</h3>
                <ul>
                    ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            </div>
            `;
        });
    }
    resultsList.innerHTML = html; // Update results
}
