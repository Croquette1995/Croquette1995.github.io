 async function fetchData(){
    const response = await fetch('liens.json');
    const data = await response.json();
    return data;
 }

async function loadData() {
    const data = await fetchData();
    console.log(data);
    console.log(data.infosUtiles[0]);
    addElements(data.infosUtiles);
    addCard(data.listeRestaurants[0]);
    }


function addElements(infosUtiles){

    infosUtiles.forEach(member => {
        let element = document.createElement("tr");
        element.classList.add("is-bordered");
        element.innerHTML =`
        <td>${member.nom}</td>
        <td>${member.type}</td>
        <td><a href="${member.lien}">${member.lien}</a></td>
        `;
        document.querySelector("#table").appendChild(element);
    });
}

function addCard(card){
    document.querySelector("#cardName").textContent =`${card.titre}`;
    document.querySelector("#cardImage").src =`${card.image}`;
    document.querySelector("#cardLink").href =`${card.lien}`;
    document.querySelector("#cardLink").target ="_blank";
    document.querySelector("#cardDate").textContent =`${card.date}`
    ;
}


loadData();

// async function loadData() {
//     try {
//         const data = await fetchData();
        
//         if (data && data.infosUtiles && data.infosUtiles.length > 0) {
//             renderTable(data.infosUtiles);
//         } else {
//             console.error("Infos Utiles non disponibles");
//         }

//         if (data && data.listeRestaurants && data.listeRestaurants.length > 0) {
//             renderCard(data.listeRestaurants[0]);
//         } else {
//             console.error("Liste de restaurants non disponible");
//         }
//     } catch (error) {
//         console.error("Erreur lors du chargement des données :", error);
//     }
// }

