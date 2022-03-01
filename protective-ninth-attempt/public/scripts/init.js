// Instruction from https://materializecss.com/auto-init.html to initialize
M.AutoInit();

// Instruction from https://materializecss.com/navbar.html
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
  
  var elems2 = document.querySelectorAll('.slider');
  var instances2 = M.Slider.init(elems2, {});
});