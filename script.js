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
