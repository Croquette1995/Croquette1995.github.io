

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






