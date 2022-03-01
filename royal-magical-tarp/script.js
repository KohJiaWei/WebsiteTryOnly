/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });


  document.addEventListener('DOMContentLoaded', function() {
    var elemsModal = document.querySelectorAll('.modal');
    var instances2 = M.Modal.init(elemsModal, {});
  });



