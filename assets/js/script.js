// const dropdowns = document.querySelectorAll('.dropdown:not(.is-hoverable)');

// if (dropdowns.length > 0) { //required for downdowns to work (bulma)
//   dropdowns.forEach(function(el) {
//     el.addEventListener('click', function(e) {
//       e.stopPropagation();
//       el.classList.toggle('is-active');
//     });
//   });
//   document.addEventListener('click', function(e) {
//     closeDropdowns();
//   });
// }

// function closeDropdowns() { //closes dropdowns when click off dropdown (bulma)
//   dropdowns.forEach(function(el) {
//     el.classList.remove('is-active');
//   });
// }



// // code to get item from the fridge to generate a recipe option ============================

// //const yummy = document.getElementById("yummy");
// const mealList = document.getElementById("meal");
// const mealDetailsContent = document.querySelector('.meal-details-content');
// const recipeCloseBtn = document.getElementById("recipe-close-btn");

// //event listeners
// //yummy.addEventListener('click', getMealList);
// //mealList.addEventListener('click', getMealRecipe);
// //mealList.addEventListener('click', (e) => getMealRecipe(ingredients, e));
// //recipeCloseBtn.addEventListener('click', () => {
//   //mealDetailsContent.parentElement.classList.remove
//   //('showRecipe');
// //});
// getMealList()
// //get meal list that matches with the ingredients
// function getMealList() {
//   //let searchInputTxt = document.getElementById('yummy').value.trim(); //get from the local storage
//   let ingredients = ["chicken", "eggs"] //searchInputTxt.split(',');
//   fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=6cd84474f70041749e500fbd3ece2d45&ingredients=${ingredients.join(',')}&number=2`, {
//   })
//   .then(response => response.json())
//   .then(data => {
//     let html = "";
//     if(data) {
//       data.forEach(meal => {
//         html += `
//             <div class = "meal-item" data-id = "${meal.id}">
//               <div class = "meal-img">
//                   <img src = "${meal.img}"
//                   alt = "food">
//               </div>
//               <div class = "meal-name">
//                   <h3>${meal.title}</h3>
//                   <a href = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=6cd84474f70041749e500fbd3ece2d45&ingredients=${ingredients.join(',')}&number=2" class = "recipe-btn">Get Recipe</a>
//               </div>
//             </div>
//         `; 
//       });
//       mealList.innerHTML = html; // set the meals to the HTML
//       mealList.classList.remove('notFound');
//     } else {
//       html = "Sorry, We didn't find any meal!";
//       mealList.innerHTML = html;
//       mealList.classList.add('notFound');
//     }
//   })
// }

// //function to get recipe meal
// function getMealRecipe(ingredients, e) {
//   e.preventDefault();
//   if(e.target.classList.contains('recipe-btn')) {
//     let mealItem = e.target.parentElement.parentElement;
//     fetch(`https://api.spoonacular.com/recipes/${mealItem.dataset.id}/analyzedInstructions`, {
//         headers: {
//             "X-RapidAPI-Key": "6cd84474f70041749e500fbd3ece2d45"
//         }
//     })
//     .then(response => response.json())
//     .then(data => mealRecipeModal(data));
//   }
// }

// // creating a modal
// function mealRecipeModal(data) {
//   let html = `
//   <h2 class="recipe-title">${data.title}</h2>
//   <div class="recipe-instruct">
//       <h3>Instruction:</h3>
//       <ol>`;
//   data.analyzedInstructions[0].steps.forEach(step => {
//       html += `<li>${step.step}</li>`;
//   });
//   html += `</ol>
//   </div>`;
//   mealDetailsContent.innerHTML = html;
//   mealDetailsContent.parentElement.classList.add('showRecipe');
// }

// //End of Recipe options based on the fridge items ==================================================================================


// var addButton = document.querySelector('#addButton');

// //Remember this is an input(rename the itemsDisplayEl)

// var itemsDisplayEl = $('#items');
// var ingredientListEl = $('#ingredient-list');

// var itemsList = [];

// //TEMPORARY - CLEARS THE PAGE ON REFRESH
// localStorage.clear();

// function addFridgeItems(){
//   var myItems = document.getElementById("items");
//   var items = readItemsFromStorage();
//   items.push(myItems.value);
//   saveItemsToStorage(items);
//   displayItems();
//   itemsDisplayEl.val('');
// }
// addButton.addEventListener('click',addFridgeItems);





// //returns an empty array if there are no items added
//   function readItemsFromStorage(){
//     var items = localStorage.getItem('items');
//     if(items){
//       items = JSON.parse(items);
      
//     }
//     else{
//       items = [];
//     }
//     return items;
    
//   }
// //takes an array of items and saves them to a local storage

//   function saveItemsToStorage(items){
//     localStorage.setItem('items',JSON.stringify(items));

//   }

//   function displayItems(){
    
//     //clear current items on the page
//     itemsDisplayEl.clear;
//     //get items from local storage
//     var items = readItemsFromStorage();

//     //loop through itens and create a row for each item

//     for (let i=0; i < items.length; i++){
//       var item = items[i];
//       //createa rows and colomns for items
//       var rowEl = $('<li>');
//       var nameEl = $('<td>').text(item);


//       // //create a button for each element created so that we can delete each element
//       // var deleteEl = $(
//       //   '<td><button class="btn btn-sm btn-delete-project" data-index="' +
//       //     i +
//       //     '">X</button></td>'
//       //       //this.addEventListener('click',localStorage.removeItem(item))
//       // );
//       //deleteEl.dele
    
//         //localStorage.removeItem(item);
    

//         //append elements to DOM to display them
//         rowEl.append(nameEl);
//         ingredientListEl.append(rowEl);
//     }
//   }

//  // delete items 
  
 
//   function deleteItems(){
//     var itemIndex = parseInt($(this).attr('data-index'));
//     var items = readItemsFromStorage();
//     //remove item from the array
//     items.splice(itemIndex,1);
//     saveItemsToStorage(items);

//     //printItems
//     //displayItems();
    
//   }


// // Adds a project to local storage and prints the project data
// function handleItemsFormSubmit(event) {
//   event.preventDefault();

//   // read user input from the form
//   var itemsName = document.getElementById("items").val().trim();
  
//   var newItems = {
//     name: itemsName,
//   };

//   // add items to local storage
//   var items = readItemsFromStorage();
//   items.push(newItems);
//   saveItemsToStorage(items);

//   // print items  
//   displayItems();

//   // clear the form inputs
//   ingredientListEl.val('');
  
// }

// ingredientListEl.on('submit', handleItemsFormSubmit);

// ingredientListEl.on('click', '.btn-delete-project', deleteItems);

// displayItems();

// code to get item from the fridge to generate a recipe option ============================

//const yummy = document.getElementById("yummy");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById("recipe-close-btn");

//event listeners
//yummy.addEventListener('click', getMealList);
//mealList.addEventListener('click', getMealRecipe);
//mealList.addEventListener('click', (e) => getMealRecipe(ingredients, e));
//recipeCloseBtn.addEventListener('click', () => {
  //mealDetailsContent.parentElement.classList.remove
  //('showRecipe');
//});
document.getElementById("find").addEventListener("click", function(){
  var test1 = document.getElementById("ingredient-list");
  var test2 = test1.children.textContent;
  console.log(test2);
  getMealRecipe();
})
//get meal list that matches with the ingredients
function getMealList() {
  //let searchInputTxt = document.getElementById('yummy').value.trim(); //get from the local storage
  let ingredients = ["ingredient-list"] //searchInputTxt.split(',');
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=6cd84474f70041749e500fbd3ece2d45&ingredients=${ingredients.join(',')}&number=2`, {
  })
  .then(response => response.json())
  .then(data => {
    let html = "";
    if(data) {
      data.forEach(meal => {
        html += `
            <div class = "meal-item" data-id = "${meal.id}">
              <div class = "meal-img">
                  <img src = "${meal.img}"
                  alt = "food">
              </div>
              <div class = "meal-name">
                  <h3>${meal.title}</h3>
                  <a href = "#" class = "recipe-btn">Get Recipe</a>
              </div>
            </div>
        `; 
      });
      mealList.innerHTML = html; // set the meals to the HTML
      mealList.classList.remove('notFound');
    } else {
      html = "Sorry, We didn't find any meal!";
      mealList.innerHTML = html;
      mealList.classList.add('notFound');
    }
  })
}

//function to get recipe meal
function getMealRecipe(ingredients, e) {
  e.preventDefault();
  if(e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://api.spoonacular.com/recipes/${mealItem.dataset.id}/analyzedInstructions`, {
        headers: {
            "X-RapidAPI-Key": "6cd84474f70041749e500fbd3ece2d45"
        }
    })
    .then(response => response.json())
    .then(data => mealRecipeModal(data));
  }
}

// creating a modal
function mealRecipeModal(data) {
  let html = `
  <h2 class="recipe-title">${data.title}</h2>
  <div class="recipe-instruct">
      <h3>Instruction:</h3>
      <ol>`;
  data.analyzedInstructions[0].steps.forEach(step => {
      html += `<li>${step.step}</li>`;
  });
  html += `</ol>
  </div>`;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}

//End of Recipe options based on the fridge items ==================================================================================
