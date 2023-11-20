const loadData = async () => {
    const inputElement = document.getElementById('input-field');
    const element = inputElement.value;
    inputElement.value = '';
    if(element === ''){
        return alert('Please Provide a Correct Player Name');
    }
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${element}`;

    const res = await fetch(url);
    const data = await res.json();
    showData(data.player);
}

const showData = (players) => {
    const container = document.getElementById('card-container');
    container.textContent = '';
    players.forEach(player => {
        // console.log(player);
        const div = document.createElement('div');
        const { strCutout, strPlayer, strNationality, idPlayer } = player;
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
      <img style="height: 220px;" src="${strCutout ? strCutout : 'https://picsum.photos/id/1/200/300'}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${strPlayer}</h5>
        <p class="card-text">Nationality: ${strNationality}</p>
        <div>
        <button type="button" class="btn btn-outline-warning">Remove</button>
        <button onclick="singleDataLoad('${idPlayer}')" type="button" class="btn btn-outline-info">Details</button>
        </div>
    </div>
        
        `;
        container.appendChild(div);


    })
}

const singleDataLoad = async (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;

    const res = await fetch(url);
    const data = await res.json();
    showSingleData(data.players[0])

}

const showSingleData = (data) => {
    console.log(data);

    const { strCutout, strPlayer, strDescriptionEN, strGender } = data;
    const elementMale = document.getElementById('male');
    const elementFemale = document.getElementById('female');
    if (strGender === 'Male') {
        elementMale.classList.remove('d-none');
        elementFemale.classList.add('d-none')
    }
    else {
        
        elementFemale.classList.remove('d-none');
        elementMale.classList.add('d-none');
    }

    const container = document.getElementById('single-player-container');
    container.innerHTML = `
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${strCutout}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${strPlayer}</h5>
        <p class="card-text">${strDescriptionEN.slice(0, 120) + "..."}</p>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
    
    `
}