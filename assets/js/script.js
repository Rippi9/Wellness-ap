
var addButton = document.querySelector('#addButton');
var clearListButton = document.querySelector('#clearListButton')
var itemsDisplayEl = $('#items');
var ingredientListEl = $('#ingredient-list');
var itemsList = [];

//adds items to storage and displays them 
function addFridgeItems() {
  var myItems = document.getElementById("items");
  var items = readItemsFromStorage();
  items.push(myItems.value);
  saveItemsToStorage(items);
  displayItems();
  itemsDisplayEl.val('');
}

addButton.addEventListener('click', addFridgeItems);

//clears all items on the ingredients list and local storage
function clearListItems() {
  ingredientListEl.empty();
  localStorage.removeItem("items");
}
clearListButton.addEventListener('click', clearListItems);

//returns an empty array if there are no items added
function readItemsFromStorage() {
  var items = localStorage.getItem('items');
  if (items) {
    items = JSON.parse(items);
  }
  else {
    items = [];
  }
  return items;
}

//takes an array of items and saves them to a local storage
function saveItemsToStorage(items) {
  localStorage.setItem('items', JSON.stringify(items));
}

function displayItems() {
  //clear current items on the page
  ingredientListEl.empty();
  //get items from local storage
  var items = readItemsFromStorage();
  //loop through itens and create a row for each item
  for (let i = 0; i < items.length; i++) {
    var item = items[i];
    //createa rows and colomns for items
    var rowEl = $('<div>');
    rowEl.addClass("is-fullwidth columns");
    var nameEl = $('<p>"').text(item);
    nameEl.addClass("column is-10 has-text-centered");
    //create a button for each element created so that we can delete each element
    var deleteEl = $(
      '<p class="colomn"><button class="button" id = "i" data-index="' +
      i +
      '">remove</button></p>'
    );
    //append elements to DOM to display them
    rowEl.append(nameEl, deleteEl);
    ingredientListEl.append(rowEl);
  }
}
//deletes each item on the list
$(document).on('click', '#i', function () {
  var indexToDelete = $(this).data("index");
  var items = readItemsFromStorage();
  items.splice(indexToDelete, 1);
  saveItemsToStorage(items);
  displayItems();
});

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

ingredientListEl.on('submit', handleItemsFormSubmit);

//Exercise

var dayFitness = [];


var exerciseInputs = function () {
  var selectedMuscleValue = document.getElementById("muscle-list").value;
  var selectedDifficultyValue = document.getElementById("difficulty-list").value;

  if (selectedMuscleValue !== "" && selectedDifficultyValue !== "") {
    fetch('https://api.api-ninjas.com/v1/exercises?muscle=' + selectedMuscleValue + '&difficulty=' + selectedDifficultyValue, {
      headers: { 'X-Api-Key': 'MVnVdWDFItY57sxyJSm1VQ==jiHDRhYRgkayxHmw' }
    })
      .then(response => response.json())
      .then(data => {
        var exerciseList = document.getElementById("exercise-list");
        exerciseList.innerHTML = "";
        data.forEach(function (exercise) {
          var exerciseOption = document.createElement("option");
          exerciseOption.innerHTML = exercise.name;
          exerciseList.appendChild(exerciseOption);
          instructions = exercise.instructions;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

function fitnessStorage() {
  var exercise = localStorage.getItem('exercise');
  if (exercise) {
    exercise = JSON.parse(exercise);
  }
  else {
    exercise = [];
  }
  return exercise;
}


function displayFitness() {
  var fitnessParse = fitnessStorage();
  for (i = 0; i < fitnessParse.length; i++) {
    var fitnessTemp = fitnessParse[i];
    var dayTable = document.getElementById(`${fitnessTemp.day}Table`)
    var addTR = document.createElement("tr")
    var addTdEmpty = document.createElement('td');
    var addTdMuscle = document.createElement('td');
    var addTdExercise = document.createElement('td');

    dayTable.appendChild(addTR);
    addTR.appendChild(addTdEmpty);
    addTR.setAttribute("id", `${fitnessTemp.day}`)
    
    addTdMuscle.textContent = fitnessTemp.muscle;
    addTdMuscle.classList.add("muscle");
    addTR.appendChild(addTdMuscle);

    addTdExercise.textContent = fitnessTemp.exercise;
    addTdExercise.classList.add("exercise");
    addTR.appendChild(addTdExercise);
  }
}



document.getElementById("clicktosaveme").addEventListener("click", function () {
  clearDaydisplay()
  var selectedExerciseValue = document.getElementById("exercise-list").value;
  var selectedMuscleValue = document.getElementById("muscle-list").value;
  var selectedDayValue = day;
  if (selectedExerciseValue == 2 || selectedMuscleValue == 1) {
  } else {
    var fitnessData = {
      id: Date.now(),
      day: selectedDayValue,
      muscle: selectedMuscleValue,
      exercise: selectedExerciseValue
    }
    var dayFitness = fitnessStorage();
    dayFitness.push(fitnessData);
    localStorage.setItem('exercise', JSON.stringify(dayFitness));
  }
  displayFitness()
});

function clearDaydisplay(){
  var mondayTableDis = document.getElementById('mondayTable');
  var tuesdayTableDis = document.getElementById('tuesdayTable');
  var wednesdayTableDis = document.getElementById('wednesdayTable');
  var thursdayTableDis = document.getElementById('thursdayTable');
  var fridayTableDis = document.getElementById('fridayTable');
  var saturdayTableDis = document.getElementById('saturdayTable');
  var sundayTableDis = document.getElementById('sundayTable');
  mondayTableDis.innerHTML = "";
  tuesdayTableDis.innerHTML = "";
  wednesdayTableDis.innerHTML = "";
  thursdayTableDis.innerHTML = "";
  fridayTableDis.innerHTML = "";
  saturdayTableDis.innerHTML = "";
  sundayTableDis.innerHTML = "";
}


function clearDay(){
  clearDaydisplay()
  var daydelete = fitnessStorage();
  var selectedDayValue = day;
  var filtered = daydelete.filter(day => day.day != selectedDayValue);
  console.log(filtered);
  localStorage.setItem('exercise', JSON.stringify(filtered));
  displayFitness() 
}

var mondayExercise = document.getElementById("mondayExercise");
var tuesdayExercise = document.getElementById("tuesdayExercise");
var wednesdayExercise = document.getElementById("wednesdayExercise");
var thursdayExercise = document.getElementById("thursdayExercise");
var fridayExercise = document.getElementById("fridayExercise");
var saturdayExercise = document.getElementById("saturdayExercise");
var sundayExercise = document.getElementById("sundayExercise");
var monday = document.getElementById("monday");
var tuesday = document.getElementById("tuesday");
var wednesday = document.getElementById("wednesday");
var thursday = document.getElementById("thursday");
var friday = document.getElementById("friday");
var saturday = document.getElementById("saturday");
var sunday = document.getElementById("sunday");

function resetTabs() {
  monday.classList.remove("is-active");
  tuesday.classList.remove("is-active");
  wednesday.classList.remove("is-active");
  thursday.classList.remove("is-active");
  friday.classList.remove("is-active");
  saturday.classList.remove("is-active");
  sunday.classList.remove("is-active");
}
function resetTables() {
  mondayExercise.style.display = "none";
  tuesdayExercise.style.display = "none";
  wednesdayExercise.style.display = "none";
  thursdayExercise.style.display = "none";
  fridayExercise.style.display = "none";
  saturdayExercise.style.display = "none";
  sundayExercise.style.display = "none";
}

resetTables()
mondayExercise.style.display = "unset";

monday.addEventListener("click", function () {
  resetTabs();
  resetTables();
  mondayExercise.style.display = "unset";
  day = "monday";
  monday.classList.add("is-active");
});

tuesday.addEventListener("click", function () {
  resetTabs();
  resetTables();
  tuesdayExercise.style.display = "unset";
  day = "tuesday";
  tuesday.classList.add("is-active");
});

wednesday.addEventListener("click", function () {
  resetTabs();
  resetTables();
  wednesdayExercise.style.display = "unset";
  day = "wednesday";
  wednesday.classList.add("is-active");
});
displayItems();
thursday.addEventListener("click", function () {
  resetTabs();
  resetTables();
  thursdayExercise.style.display = "unset";
  day = "thursday";
  thursday.classList.add("is-active");
});

friday.addEventListener("click", function () {
  resetTabs();
  resetTables();
  fridayExercise.style.display = "unset";
  day = "friday";
  friday.classList.add("is-active");
});
saturday.addEventListener("click", function () {
  resetTabs();
  resetTables();
  saturdayExercise.style.display = "unset";
  day = "saturday";
  saturday.classList.add("is-active");
});

sunday.addEventListener("click", function () {
  resetTabs();
  resetTables();
  sundayExercise.style.display = "unset";
  day = "sunday";
  sunday.classList.add("is-active");
});

displayItems();
displayFitness()
// code to get item from the fridge to generate a recipe option ============================
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById("recipe-close-btn");


document.getElementById("find").addEventListener("click", function () {

  getMealList();
})
//get meal list that matches with the ingredients
function getMealList() {

  let ingredients = readItemsFromStorage();
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=f548cec71a484fb6b35ec095d03c4de3&ingredients=${ingredients.join(',')}&number=2`, {
  })
    .then(response => response.json())
    .then(data => {
      let html = "";
      if (data) {
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
  if (e.target.classList.contains('recipe-btn')) {
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
var day = "monday";
