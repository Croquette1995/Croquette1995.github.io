async function fetchData(){
    const response = await fetch('casadali.json');
    const data = await response.json();
    return data;
}

async function fetchDataa(){
    const response = await fetch('galerieCasaDali.json');
    const data = await response.json();
    return data;
}

async function loadGallery(){
    let data = await fetchDataa();
    console.log(data);
    let gallery = document.querySelector("#carousel-demo");
    for(let i=0; i< data.length;i++){
        let element = document.createElement("div");
        element.classList.add('card', 'mr-2', 'ml-2');
        element.innerHTML =
        `
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="./Images/GalerieCasaDali/${data[i]}"/>
                </figure>
            </div>
        `
        console.log(element);
        gallery.appendChild(element);
    };
    bulmaCarousel.attach('#carousel-demo', {
        slidesToScroll: 1,
        slidesToShow: 4,
  navigation:true
    });

}

loadGallery();

async function loadGallery1(section){
    let data = await fetchData();
    let valeur = Object.values(data[section]["Images"]);
    console.log(valeur);
    let col = document.querySelector("#section");
    let element = document.createElement("div");
    element.classList.add("column", "carousel");   
    element.id="galerie";
    col.appendChild(element);

    let gallery = document.querySelector("#galerie");

    for(let i=0; i< valeur.length;i++){
        let element = document.createElement("div");
        element.classList.add("card", "m-3");
         
        element.id="remove";
        element.innerHTML =`
                <div class="card-image" id="remove" >
                    <figure class="image is-square" >
                        <img src="./Images/Casadali/${valeur[i]}"/>
                    </figure>
                </div>
        `
        gallery.appendChild(element);
    };
    await bulmaCarousel.attach('#galerie', {
        slidesToScroll: 1,
        slidesToShow: 1,
        navigation:true
    });

    
}





async function loadData(){
    let data = await fetchData();
    
    const value = Object.values(data);
    
    console.log(value);
    const keys = Object.keys(data);
    
    const entries = Object.entries(data);

    addMember(entries);
    document.querySelector(`#${keys[0]}`).classList.add("is-active");
    addDescription(value,0);
    loadGallery1("Généralités");


    let liste = document.querySelectorAll("div.tabs > ul > li");
    liste.forEach(element => {
        element.addEventListener("click", function(){
        
            let activeElement = document.querySelector("li.is-active").classList.toggle("is-active");
            element.classList.toggle("is-active");
            let elementToDelete = document.querySelectorAll("#remove");
            console.log(elementToDelete)
            elementToDelete.forEach(element => {
                element.remove();
            });
            let description = data[element.id]['Description'];
            description.forEach(paragraphe => {
                let element = document.createElement("li");
                element.classList.add("mt-3");
                element.style.textIndent= "5px";
                element.id="remove";
                element.textContent=paragraphe;
                document.querySelector("#description").appendChild(element);
            });
            document.querySelector("#section").lastChild.remove();
            loadGallery1(element.id);


        })
    });

    
}



function addMember(entries){
    entries.forEach(([clé, valeur]) => {
        let ob = Object.values(valeur);
        let element = document.createElement("li");
        
        element.id =clé;
        element.innerHTML =
        `
        <a>
            <span class="icon is-small"> 
                <i class="${ob[ob.length-1]}" aria-hidden="true"> </i>
            </span> 
            <span>
                ${clé} 
            </span>
        </a>
        `
        document.querySelector("#tabs").appendChild(element);        
    });
}

function addDescription(value, chiffre){
    value[chiffre].Description.forEach(member => {
        let element = document.createElement("li");
        element.classList.add("mt-3");
        element.style.textIndent= "5px";
        

        element.id="remove";
        element.textContent=member;
        document.querySelector("#description").appendChild(element);
    });
    
    
    

}
    
    



    

    
    
    
   


    
loadData();

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

