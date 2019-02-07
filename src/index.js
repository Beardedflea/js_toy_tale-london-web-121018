const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let submitBtn = document.querySelector(".add-toy-form")
const toyCollection = document.getElementById('toy-collection');

let toys;

function addToys(toys){
  toyCollection.innerHTML = '';
    for(const toy of toys){
      addIndividualToy(toy);
    }
}
function addIndividualToy(toy){
    toyCollection.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src = "${toy.image}" class="toy-avatar" />
      <p>${toy.likes}</p>
      <button class="like-btn" id = '${toy.id}'>Like <3 </button>
    </div>`
}
function smashThatMotherFuckingLikeButton(){
  toyCollection.addEventListener('click', e=> {
    if(e.target && e.target.matches('.like-btn')){
    spamThoseLikes(toys[e.target.id -1])
    }
  });
}
function spamThoseLikes(toy){
    toy.likes++;
    updateToy(toy).then()
    addIndividualToy(toy)
}

addBtn.addEventListener('click', () => {

  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function createNewToy(){
  submitBtn.addEventListener('submit', e=>{
    e.preventDefault();
    let newToyForm = new FormData(document.querySelector(".add-toy-form"))
    newToy(newToyForm);
})
}

function initialize(){
    getToys().then(allToys =>{ 
      toys = allToys
      addToys(toys); 
    });
    smashThatMotherFuckingLikeButton();
    createNewToy();
}


//server

function getToys(){
  return fetch('http://localhost:3000/toys')
          .then(resp => resp.json());
}
function updateToy(toy){
  return fetch(`http://localhost:3000/toys/${toy.id}`,{
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

function newToy(newToyForm){
  let toy = {name: newToyForm.get('name'), image: newToyForm.get('image'), likes: 0}
  return fetch('http://localhost:3000/toys',{
    method:'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }).then(getToys).then(addToys);
}

initialize()



 
