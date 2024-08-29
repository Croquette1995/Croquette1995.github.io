let dataPresentation;

// document.addEventListener('DOMContentLoaded', () => {
//     fetch('http://localhost:3000/elcapistranovillage')
//         .then(response => response.json())
//         .then(data => {
//             dataPresentation = data;
            
//             // Appeler addElement ici, après que dataPresentation soit définie
//             addElement("h1", "title", "#containerPresentation", data[0].Titre);
//             for (let i = 1; i < data.length; i++){
//                 addElement("p", "mt-3", "#containerPresentation", data[i].paragraphe);           
//             }
        
//         })
//         .catch(error => {
//             console.error('Erreur lors de la récupération des données:', error);
//         });
// });

function addElement(type, classe, emplacement, contenu){
    let element = document.createElement(type);
    element.classList.add(classe); // Correction de la méthode classList
    element.textContent = `${contenu}`;
    document.querySelector(emplacement).appendChild(element);
}


//   function createCarousel(images) {
//     const carousel = document.getElementById('carousel');
//     images.forEach(image => {
//       const img = document.createElement('img');
//       img.src = image;
//       carousel.appendChild(img);
//     });
//   }


async function fetchDataCapistrano(){
    const response = await fetch('situation.json');
    const data = await response.json();
    return data;
}

async function loadDataCapistrano() {
    const data = await fetchDataCapistrano();
    console.log(data);
    console.log(data.elcapistranovillage[0].Titre);
    addElement("h1", "title", "#containerPresentation", data.elcapistranovillage[0].Titre);
    for (let i = 1; i < data.elcapistranovillage.length; i++){
        addElement("p", "mt-3", "#containerPresentation", data.elcapistranovillage[i].paragraphe);           
    }
    for (let i = 0; i < data.nerja.length; i++){
        addElement("p", "mt-3", "#nerja", data.nerja[i].paragraphe);           
    }
}





loadDataCapistrano();

async function fetchImages() {
    const response = await fetch('images.json');
    const imageFiles = await response.json();
    return imageFiles;
  }
  

  async function loadImages() {
    const images = await fetchImages();
    console.log(images)

    let nextButton = document.querySelector("#nextButton");
  let index = 0;
  document.querySelector("#imageCard").src = `./Images/Situation/CapistranoVillage/${images[index]}`

  nextButton.addEventListener("click", function(){
    index++;
    document.querySelector("#imageCard").src = `./Images/Situation/CapistranoVillage/${images[index]}`;
    if (index === images.length -1){
        this.style.pointerEvents = "none";
        this.style.cursor = "default";
        this.style.backgroundColor= "red";
        console.log("click");
      }
      
  })
  }

  loadImages();

  let buttonMenu = document.querySelector("#buttonMenu");
let colMenu = document.querySelector("#colMenu");

let state = true;
buttonMenu.addEventListener("click", function(){
    if(state){

        colMenu.style.transition = "all 0.5s ease";
        colMenu.style.dislay="none";
        colMenu.classList.add("is-hidden-desktop");
        //let parent = document.querySelector("#test");
        const parent = buttonMenu.parentNode;
        console.log(parent);
        parent.classList.remove("is-four-fifths");
        parent.classList.add("is-full");
        return state = false;
    }
    else{
        colMenu.classList.remove("is-hidden-desktop");
        const parent = buttonMenu.parentNode;
        parent.classList.remove("is-full");
        parent.classList.add("is-four-fifths");
        return state = true;
        
    }
})