async function fetchData(){
    const response = await fetch('casadali.json');
    const data = await response.json();
    return data;
}

async function loadData(){
    let data = await fetchData();
    
    const value = Object.values(data);
    console.log(value[0].Description);
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
        let element = document.createElement("p");
        element.classList.add("mt-3")
        element.id="remove";
        element.textContent=member;
        document.querySelector("#description").appendChild(element);
    });

}


    
loadData();

