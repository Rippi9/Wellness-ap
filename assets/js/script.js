
var addButton = document.querySelector('#addButton');
var clearListButton = document.querySelector('#clearListButton')
var itemsDisplayEl = $('#items');
var ingredientListEl = $('#ingredient-list');
var itemsList = [];

//adds items to storage and displays them 
function addFridgeItems(){
  var myItems = document.getElementById("items");
  var items = readItemsFromStorage();
  items.push(myItems.value);
  saveItemsToStorage(items);
  displayItems();
  itemsDisplayEl.val('');
}
addButton.addEventListener('click',addFridgeItems);

//clears all items on the ingredients list and local storage
function clearListItems(){
  ingredientListEl.empty();
  localStorage.clear();
}
clearListButton.addEventListener('click',clearListItems);

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
    //loop through itens and create a row for each item
    for (let i=0; i < items.length; i++){
      var item = items[i];
      //createa rows and colomns for items
      var rowEl = $('<li> id = "i"');
      var nameEl = $('<td>').text(item);
      //create a button for each element created so that we can delete each element
      var deleteEl = $(
        '<td><button class="colomn" id = "i" data-index="' +
          i +
          '">X</button></td>'
      );
        //append elements to DOM to display them
      rowEl.append(nameEl, deleteEl);
      ingredientListEl.append(rowEl);
    }
  } 
   //deletes each item on the list
  $(document).on('click','#i', function(){
    var indexToDelete=  $(this).data("index");
    var items= readItemsFromStorage();
    items.splice(indexToDelete,1);
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

  var selectedDifficultyValue = document.getElementById("difficulty-list").value;
  var selectedDifficulty = ("difficulty-list").value; 

  var calendarMuscle = document.getElementById(`${selectedDayValue}-reps`);
  calendarMuscle.innerHTML = selectedDifficultyValue;
  console.log(selectedExercise);



  var selectedDayValue = document.getElementById("day-list").value;

  var selectedExerciseValue = document.getElementById("exercise-list").value;
  var selectedExercise = ("exercise-list").value;

  var calendarMuscle = document.getElementById(`${selectedDayValue}-exercise`);
  calendarMuscle.innerHTML = selectedExerciseValue;
  console.log(selectedExercise);


});






displayItems();


ingredientListEl.on('submit', handleItemsFormSubmit);





