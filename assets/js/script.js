
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
    itemsDisplayEl.clear;
    //get items from local storage
    var items = readItemsFromStorage();

    //loop through itens and create a row for each item

    for (let i=0; i < items.length; i++){
      var item = items[i];
      //createa rows and colomns for items
      var rowEl = $('<li>');
      var nameEl = $('<td>').text(item);


      //create a button for each element created so that we can delete each element
      var deleteEl = $(
        '<td><button class="btn btn-sm btn-delete-project" data-index="' +
          i +
          '">X</button></td>'
            //this.addEventListener('click',localStorage.removeItem(item))
      );
      //deleteEl.dele
    
        //localStorage.removeItem(item);
    

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

 


ingredientListEl.on('submit', handleItemsFormSubmit);

ingredientListEl.on('click', '.btn-delete-project', deleteItems);

displayItems();


