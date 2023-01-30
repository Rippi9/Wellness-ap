const dropdowns = document.querySelectorAll('.dropdown:not(.is-hoverable)');

if (dropdowns.length > 0) { //required for downdowns to work (bulma)
  dropdowns.forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      el.classList.toggle('is-active');
    });
  });
  document.addEventListener('click', function(e) {
    closeDropdowns();
  });
}

function closeDropdowns() { //closes dropdowns when click off dropdown (bulma)
  dropdowns.forEach(function(el) {
    el.classList.remove('is-active');
  });
}

//Exercise API functionality
//Console log selected day
function selectedDay () {
  var selectedDayValue = document.getElementById("day-list").value;
  console.log(selectedDayValue);
}

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

document.getElementById("buttontest").addEventListener("click", function(){

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






