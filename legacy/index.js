

async function fetchData(){
    const response = await fetch('index.json');
    data = await response.json();
    return data;
}

async function loadData(){
    const data = await fetchData();
    console.log(data.section.presentationTitre);

    Object.values(data).forEach(element => {
        console.log(element.presentationTitre);
        addElement("h1", "title", "#containerPresentation", element.presentationTitre);
        element['paragraphe'].forEach(member => {
            addElement("p", "mt-3", "#containerPresentation", member);           
        });
    })
}

function addElement(type, classe, emplacement, contenu){
    let element = document.createElement(type);
    element.classList.add(classe); // Correction de la méthode classList
    element.textContent = `${contenu}`;
    document.querySelector(emplacement).appendChild(element);
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




