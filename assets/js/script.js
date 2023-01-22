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