
var addButton = document.querySelector('#addButton');

//Remember this is an input(rename the itemsDisplayEl)

var itemsDisplayEl = $('#items');
var ingredientListEl = $('#ingredient-list');
var itemsList = [];

//TEMPORARY - CLEARS THE PAGE ON REFRESH
localStorage.removeItem("items");

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
  ingredientListEl.empty(); //clear current items on the page
  var items = readItemsFromStorage();  //get items from local storage
  console.log('displayItems');
  
  for (let i=0; i < items.length; i++){ //loop through itens and create a row for each item
    var item = items[i];
    //createa rows and colomns for items
    var rowEl = $('<li>');
    var nameEl = $('<td>').text(item);
    var deleteEl = $(//create a button for each element created so that we can delete each element
      '<td><button class="colomn" data-index="'+ i +'">X</button></td>'
    );
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
}

// Adds a project to local storage and prints the project data
function handleItemsFormSubmit(event) {
  event.preventDefault();
  var itemsName = document.getElementById("items").val().trim();  // read user input from the form
  var newItems = {name: itemsName};
  var items = readItemsFromStorage();  // add items to local storage
  items.push(newItems);
  saveItemsToStorage(items);
  displayItems(); // print items  
  ingredientListEl.val('');  // clear the form inputs
}


ingredientListEl.on('submit', handleItemsFormSubmit);

ingredientListEl.on('click', '.btn-delete-project', deleteItems);
displayItems();


//Exercise API functionality
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

var day;


document.getElementById("clicktosaveme").addEventListener("click", function(){
var selectedExerciseValue = document.getElementById("exercise-list").value;
var selectedMuscleValue = document.getElementById("muscle-list").value;
  if(selectedExerciseValue == 2 || selectedMuscleValue == 1){
    console.log(selectedExerciseValue);
  }else{
    var selectedDayValue = day;
    var addTR = document.createElement("tr")
    var addTdEmpty = document.createElement('td');
    var addTdMuscle = document.createElement('td');
    var addTdExercise = document.createElement('td');
    var dayTable = document.getElementById(`${selectedDayValue}Table`)
    dayTable.appendChild(addTR);
    addTR.appendChild(addTdEmpty);
  
    addTdMuscle.textContent = selectedMuscleValue;
    addTdMuscle.classList.add("muscle");
    addTR.appendChild(addTdMuscle);
  
    addTdExercise.textContent = selectedExerciseValue;
    addTdExercise.classList.add("exercise");
    addTR.appendChild(addTdExercise);
  }

});

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

function resetTabs(){
  mondayExercise.style.display = "none";
  tuesdayExercise.style.display = "none";
  wednesdayExercise.style.display = "none";
  thursdayExercise.style.display = "none";
  fridayExercise.style.display = "none";
  saturdayExercise.style.display = "none";
  sundayExercise.style.display = "none";
  monday.classList.remove("is-active");
  tuesday.classList.remove("is-active");
  wednesday.classList.remove("is-active");
  thursday.classList.remove("is-active");
  friday.classList.remove("is-active");
  saturday.classList.remove("is-active");
  sunday.classList.remove("is-active");
}

resetTabs()

monday.addEventListener("click", function(){
  console.log("mondayTab");
  resetTabs();
  mondayExercise.style.display = "unset";
  day = "monday";
  monday.classList.add("is-active");
});

tuesday.addEventListener("click", function(){
  console.log("tuesdayTab");
  resetTabs();
  tuesdayExercise.style.display = "unset";
  day = "tuesday";
  tuesday.classList.add("is-active");
});

wednesday.addEventListener("click", function(){
  console.log("wednesdayTab");
  resetTabs();
  wednesdayExercise.style.display = "unset";
  day = "wednesday";
  wednesday.classList.add("is-active");
});

thursday.addEventListener("click", function(){
  console.log("thursdayTab");
  resetTabs();
  thursdayExercise.style.display = "unset";
  day = "thursday";
  thursday.classList.add("is-active");
});

friday.addEventListener("click", function(){
  console.log("fridayTab");
  resetTabs();
  fridayExercise.style.display = "unset";
  day = "friday";
  friday.classList.add("is-active");
});

saturday.addEventListener("click", function(){
  console.log("saturdayTab");
  resetTabs();
  saturdayExercise.style.display = "unset";
  day = "saturday";
  saturday.classList.add("is-active");
});

sunday.addEventListener("click", function(){
  console.log("sundayTab");
  resetTabs();
  sundayExercise.style.display = "unset";
  day = "sunday";
  sunday.classList.add("is-active");
});

