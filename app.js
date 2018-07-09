const url = 'https://secure-eyrie-78012.herokuapp.com/roles'
const POSTurl = 'https://secure-eyrie-78012.herokuapp.com/users'
function appendList(){
  return fetch(url)
  .then(function(response){
    return response.json()
  })
  .then(function(response){
    for (var i = 0; i < response.length; i++) {
      let drop = response[i].label;
      let el = document.createElement('option');
      el.textContent = drop;
      el.value = drop;
      el.classList.add(response[i].id)
      document.getElementsByClassName('roles')[0].appendChild(el);
    }
    document.getElementById('roles').onchange = insertImage();
  })
}
appendList();


function insertImage() {
  let selected = document.getElementById('roles');
  selected.addEventListener('change', function(event){
    event.preventDefault()
    let img = document.getElementsByTagName('img')[0]
    if (selected.value === 'Assassin') {
      selected.className = '1'
      img.src = 'https://secure-eyrie-78012.herokuapp.com/images/assassin.jpg'
    } else if (selected.value === 'Commando') {
      selected.className = '2'
      img.src = 'https://secure-eyrie-78012.herokuapp.com/images/commando.jpg'
    } else if (selected.value === 'Siren'){
      selected.className = '3'
      img.src = 'https://secure-eyrie-78012.herokuapp.com/images/siren.jpg'
    } else {
      img.src = 'https://secure-eyrie-78012.herokuapp.com/images/placeholder.jpg'
    }
  })
}

document.querySelector('.save').addEventListener('click', function(){
  event.preventDefault()
  fetch(POSTurl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      firstName: document.getElementsByName('firstName')[0].value,
      lastName: document.getElementsByName('lastName')[0].value,
      role: document.getElementById('roles').className
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(function(response){
    let p = document.getElementsByClassName('p')[0];
    p.textContent = response.message
    setTimeout(function() {
      p.textContent = ''
    }, 4000)
  })
})