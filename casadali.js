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

async function loadData(){
    let data = await fetchData();
    
    const value = Object.values(data);
    console.log(value[0].Images);
    const keys = Object.keys(data);
    const entries = Object.entries(data);
    entries.forEach((key, value) => {
        console.log(key);
        console.log(value);
    });

    

    addMember(entries);
    document.querySelector(`#${keys[0]}`).classList.add("is-active");
    addDescription(value,0);

    let actif = 'is-active';
    keys.forEach(nomId => {
        const element = document.querySelector(`#${nomId.replace(/ /g, '\\ ')}`);
        element.addEventListener("click", function(){
            document.querySelector("li.is-active").classList.remove("is-active");
            document.querySelector(`#${nomId.replace(/ /g, '\\ ')}`).classList.add("is-active")
            let elementToDelete = document.querySelectorAll("#remove");
            elementToDelete.forEach(element => {
            element.remove();
            });
            

            entries.forEach((key, valuee) => {
                if(key[0] === nomId){
                    addDescription(value, valuee);
                    
                        
                }
            });

        });
        
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
    let galerie = value[chiffre].Images;
    console.log(galerie);
    document.querySelector("#image").src=galerie[0];
    


    
    



    let buttonRight = document.querySelector("#buttonRight");
    let buttonLeft = document.querySelector("#buttonLeft");
    buttonLeft.disabled = true;
    buttonLeft.style.visibility="hidden";
    let index=0;

    
    
    
    buttonRight.addEventListener("click", function(){
        index++;
        document.querySelector("#image").src=galerie[index];

        if(index === galerie.length -1){
            buttonRight.disabled = true;
            buttonRight.style.visibility="hidden";
        }
        
        if(index > 0){
            buttonLeft.disabled = false;
            buttonLeft.style.visibility="";
        }
    })

    buttonLeft.addEventListener("click", function(){
        index--;
        document.querySelector("#image").src=galerie[index];

        if(index < galerie.length -1){
            buttonRight.disabled = false;
            buttonRight.style.visibility="";
        }

        if(index === 0){
            buttonLeft.disabled = true;
            buttonLeft.style.visibility="hidden";
        }
        
    })
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