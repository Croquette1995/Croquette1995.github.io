document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {
  
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
  
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
      
    });
  });
  });


window.addEventListener('scroll', scrollBoutonRemonter)

function scrollBoutonRemonter()
{
  var boutonRemonter = document.getElementById("boutonRemonter")
  var partieScrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var partieScrollee = document.documentElement.scrollTop;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  {
    if ((partieScrollee/partieScrollable) * 100 > 35){
      boutonRemonter.style.display = "flex"; 

    }
    else{
      boutonRemonter.style.display = "none"; 

    } 
  }
  else
  {
    if((partieScrollee/partieScrollable) * 100 > 60){
      boutonRemonter.style.display = "flex"; 

    }
    else{
      boutonRemonter.style.display = "none"; 

    }
  }
}

function remonter(){
  document.documentElement.scrollTo({top: 0, behavior:"smooth"});
}