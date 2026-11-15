let emplacement ="#container"

async function fetchData(){
    const response = await fetch('conditions.json');
    const data = await response.json() ;
    return data;
}

async function loadData(){
    let data = await fetchData();
    console.log(data);
    
    const valeurs = Object.values(data);
    Object.values(data).forEach(content => {
        console.log(content);
        console.log(content['sous-titre']);
        console.log(content['paragraphe']);
        if (content['sous-titre']) {
            
            addElement("h2",["title", "is-3"], emplacement, content['sous-titre']);
        }


        if(content['paragraphe']){
            console.log("huhu");
            content['paragraphe'].forEach((paragraph) => {
                addElement("p", "mb-3", emplacement, `${paragraph}`)
            });
        }

        if(content['contact']) {
            console.log(`${content['contact']}`);
            addElement("a", "mb-2", emplacement, `Contact : ${content['contact']}`)

        }
       
    });
    
    
}

function addElement(type, classe, emplacement, contenu){
    let element = document.createElement(type);
    if(typeof classe === "object"){
        classe.forEach(member => {
            element.classList.add(member)
        });
        console.log("kikou");
    }
    else{
        element.classList.add(classe);
    }
     // Correction de la méthode classList
    element.textContent = `${contenu}`;
    document.querySelector(emplacement).appendChild(element);
}

loadData();

//#container

// async function loadDataCapistrano() {
//     const data = await fetchDataCapistrano();
//     console.log(data);
//     console.log(data.elcapistranovillage[0].Titre);
//     addElement("h1", "title", "#containerPresentation", data.elcapistranovillage[0].Titre);
//     for (let i = 1; i < data.elcapistranovillage.length; i++){
//         addElement("p", "mt-3", "#containerPresentation", data.elcapistranovillage[i].paragraphe);           
//     }
//     for (let i = 0; i < data.nerja.length; i++){
//         addElement("p", "mt-3", "#nerja", data.nerja[i].paragraphe);           
//     }
// }

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