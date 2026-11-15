
function addElement(type, classe, emplacement, contenu){
    let element = document.createElement(type);
    element.classList.add(classe); // Correction de la méthode classList
    if(classe === "title"){
        element.id =`${contenu.split(" ").join("")}`;
    }
    element.textContent = `${contenu}`;
    document.querySelector(emplacement).appendChild(element);
}



async function loadGallery(section, carouselContainerId, pathFolderImages){
    let data = await fetchData();
    let images = Object.values(data[section].Images);
    for(let i=0; i< images.length;i++){
        let element = document.createElement("div");
        element.classList.add('card', 'mr-2', 'ml-2');
        element.innerHTML =
        `
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="${pathFolderImages}${images[i]}"/>
                </figure>
            </div>
        `
        document.querySelector(carouselContainerId).appendChild(element);
    };
    carousel(carouselContainerId)
}

async function loadCard(section, carouselContainerId, pathFolderImages){
    let data = await fetchData();
    let card = Object.values(data[section]);
    card.forEach(membre => {
        let element = document.createElement("div");
        element.classList.add('card', 'mr-2', 'ml-2', 'is-shadowless');
        element.innerHTML =
        `
        <header class="card-header has-background-white-ter">
            <p class="card-header-title is-centered">${membre.Titre}</p>
        </header>
        <div class="card-image is-flex-grow-1">
                <figure class="image is-4by3">
                    <img src="${pathFolderImages}${membre.Image}"/>
                </figure>
        </div>
        <div class="card-content is-flex-grow-1 has-background-white-ter is-flex-wrap-wrap" >
            <div class="content is-flex-grow-3">${membre.Description}</div>
        </div>
        `
        console.log(membre.Image);
        console.log(element.innerHTML);

        document.querySelector(carouselContainerId).appendChild(element);
    });
    bulmaCarousel.attach(carouselContainerId, {
        slidesToScroll: 1,
        slidesToShow: 3,
        navigation:true
    });

}

loadCard("Les incontournables :", "#carouselToSee","./Images/Situation/Incontournables/");

async function carousel(idContainer){
    bulmaCarousel.attach(idContainer, {
        slidesToScroll: 1,
        slidesToShow: 1,
        navigation:true
    });
}


async function fetchData(){
    const response = await fetch('situation.json');
    const data = await response.json();
    return data;
}

async function loadDataCapistrano() {
    const data = await fetchData();
    let section = Object.values(data["elcapistranovillage"]);
    addElement("h1", "title", "#containerPresentation", section[0]);

    section[1].forEach(member => {
        addElement("p", "mt-3", "#containerPresentation", member);
    });
};

async function loadDataNerja() {
    const data = await fetchData();
    let section = Object.values(data["nerja"]);
    addElement("h1", "title", "#nerja", section[0]);

    section[1].forEach(member => {
        addElement("p", "mt-3", "#nerja", member);
    });
};

    
    

loadDataCapistrano();
loadDataNerja();
loadGallery("elcapistranovillage", "#carousel-demo", "./Images/Situation/CapistranoVillage/");
loadGallery("nerja", "#carouselNerja", "./Images/Situation/Nerja/");





  

  


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