document.onreadystatechange = function(){
    if(document.readyState == "complete"){
    }
    readFriend()
}

async function readFriend(){ 
    const res = await fetch("http://localhost:3000/friends")
    const data = await res.json();
    document.getElementById("list").innerHTML = ""
    data.forEach(friend => {
        document.getElementById("list").innerHTML += `
         <div class="profilContainer">
                <div class="personProfil">
                    <p>${friend.nom}</p>
                    <p>${friend.postnom}</p>
                    <p>${friend.prenom}</p>
                </div>
                <div class="trashContainer">
                    <img src="trash.png" onclick = "deleteFriend(${friend.id})">
                </div>
        </div>`
    });
}

async function deleteFriend(id){
    await fetch("http://localhost:3000/delete",{
        method: "POST",
        body: JSON.stringify({
            id:id
        }),
        headers : {"Content-type" : "application/json; charset=UTF-8"}
    })
    readFriend()
}

async function addFriend(){ 
    const nom = document.getElementById("nom").value
    const postnom = document.getElementById("postnom").value
    const prenom  = document.getElementById("prenom").value
    if (nom == "" || postnom == "" || prenom == ""){
       alert("Veuillez remplir tous les champs pour ajouter une personne dans la liste d'amis")
       return
    }
    await fetch("http://localhost:3000/add",{
         method: "POST",
         body: JSON.stringify({
            nom : nom,
            postnom : postnom,
            prenom : prenom
        }),
        headers : {"Content-type" : "application/json; charset=UTF-8"}
     })
    document.getElementById("nom").value = "" 
    document.getElementById("postnom").value = ""
    document.getElementById("prenom").value = ""
    location.href = "index.html";
}
