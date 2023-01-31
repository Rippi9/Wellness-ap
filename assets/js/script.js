
var addButton = document.querySelector('#addButton');

//Remember this is an input(rename the itemsDisplayEl)

var itemsDisplayEl = $('#items');
var ingredientListEl = $('#ingredient-list');

var itemsList = [];

//TEMPORARY - CLEARS THE PAGE ON REFRESH
localStorage.clear();

function addFridgeItems(){
  var myItems = document.getElementById("items");
  var items = readItemsFromStorage();
  items.push(myItems.value);
  saveItemsToStorage(items);
  displayItems();
  itemsDisplayEl.val('');
}
addButton.addEventListener('click',addFridgeItems);





//returns an empty array if there are no items added
  function readItemsFromStorage(){
    var items = localStorage.getItem('items');
    if(items){
      items = JSON.parse(items);
      
    }
    else{
      items = [];
    }
    return items;
    
  }
//takes an array of items and saves them to a local storage

  function saveItemsToStorage(items){
    localStorage.setItem('items',JSON.stringify(items));

  }

  function displayItems(){
    
    //clear current items on the page
    ingredientListEl.empty();
    //get items from local storage
    var items = readItemsFromStorage();
    console.log('displayItems');

    //loop through itens and create a row for each item

    for (let i=0; i < items.length; i++){
      var item = items[i];
      //createa rows and colomns for items
      var rowEl = $('<li>');
      var nameEl = $('<td>').text(item);


      //create a button for each element created so that we can delete each element
      var deleteEl = $(
        '<td><button class="colomn" data-index="' +
          i +
          '">X</button></td>'
          
      );
      
     
      //deleteEl.addEventListener('click',console.log("delete pressed"));

        //append elements to DOM to display them
        rowEl.append(nameEl, deleteEl);
        ingredientListEl.append(rowEl);
    }
  }

 // delete items 
  
 
  function deleteItems(){
    var itemIndex = parseInt($(this).attr('data-index'));
    var items = readItemsFromStorage();
    //remove item from the array
    items.splice(itemIndex,1);
    saveItemsToStorage(items);

    //printItems
    //displayItems();
    
  }


// Adds a project to local storage and prints the project data
function handleItemsFormSubmit(event) {
  event.preventDefault();




  
  // read user input from the form
  var itemsName = document.getElementById("items").val().trim();
  
  var newItems = {
    name: itemsName,
  };

  // add items to local storage
  var items = readItemsFromStorage();
  items.push(newItems);
  saveItemsToStorage(items);

  // print items  
  displayItems();

  // clear the form inputs
  ingredientListEl.val('');
  
}

//Exercise API functionality
//Console log selected day
var exerciseInputs = function () {
  var selectedMuscleValue = document.getElementById("muscle-list").value;
  var selectedDifficultyValue = document.getElementById("difficulty-list").value;
  
if (selectedMuscleValue !== "" && selectedDifficultyValue !== "") {
  fetch('https://api.api-ninjas.com/v1/exercises?muscle=' + selectedMuscleValue + '&difficulty=' + selectedDifficultyValue, {
    headers: {'X-Api-Key': 'MVnVdWDFItY57sxyJSm1VQ==jiHDRhYRgkayxHmw'}
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    var exerciseList = document.getElementById("exercise-list");
    exerciseList.innerHTML = "";
    data.forEach(function(exercise) {
      var exerciseOption = document.createElement("option");
      exerciseOption.innerHTML = exercise.name;
      exerciseList.appendChild(exerciseOption);
      
      instructions = exercise.instructions;
      console.log(instructions);
      
    });
  })
  .catch(error => {
    console.log(error);
  });
}};

document.getElementById("clicktosaveme").addEventListener("click", function(){

  var selectedDayValue = document.getElementById("day-list").value;
  
  var selectedMuscleValue = document.getElementById("muscle-list").value;
  var selectedExercise = ("exercise-list").value;

  var calendarMuscle = document.getElementById(`${selectedDayValue}-mg`);
  calendarMuscle.innerHTML = selectedMuscleValue;
  console.log(selectedExercise);



  var selectedDayValue = document.getElementById("day-list").value;

  
  console.log(selectedExercise);



  var selectedDayValue = document.getElementById("day-list").value;

  var selectedExerciseValue = document.getElementById("exercise-list").value;
  var selectedExercise = ("exercise-list").value;

  var calendarMuscle = document.getElementById(`${selectedDayValue}-exercise`);
  calendarMuscle.innerHTML = selectedExerciseValue;
  console.log(selectedExercise);


});




ingredientListEl.on('submit', handleItemsFormSubmit);

ingredientListEl.on('click', '.btn-delete-project', deleteItems);

displayItems();

const buttontest = document.querySelector("#buttontest");




// code to get item from the fridge to generate a recipe option ============================


const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById("recipe-close-btn");


document.getElementById("find").addEventListener("click", function(){
  
  getMealList();
})
//get meal list that matches with the ingredients
function getMealList() {

  let ingredients = readItemsFromStorage();
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
                  <img src = "${meal.image}"
                  alt = "food">
              </div>
              <div class = "meal-name">
                  <h3>${meal.title}</h3>
                  <a href = "#" class = "recipe-btn">Get Recipe</a>
              </div>
            </div>
        `; 
      });
      // set the meals to the HTML
      mealList.innerHTML = html; 
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

