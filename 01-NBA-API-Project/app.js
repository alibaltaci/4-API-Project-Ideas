// Selection of elements

const playerElement = document.getElementById("search-form");

const inputField = document.getElementById("search");

const clearLastSearched = document.getElementById("clear-players-row");   // btn ---> row !!!!

const searchedList = document.getElementById("searched-list");

const searchedHead = document.getElementById("searched-head");

const playerBody = document.getElementById("player-group-body");

const savedPlayersBtn = document.getElementById("go-players");

const clearAllSavedBtn = document.getElementById("clearSavedBtn");

// create a new NBA Object 
const nba = new NBA();

// create a new UI Object
const ui = new UI();




// event listener

eventListeners();

function eventListeners(){

    playerElement.addEventListener("submit", searchPlayerName);

    document.addEventListener("DOMContentLoaded", getAllSerchedPlayers);

    clearLastSearched.addEventListener("click", clearAllSearched);

    searchedList.addEventListener("click", clearSelectedPlayer);

    playerBody.addEventListener("click", savePlayer);

    savedPlayersBtn.addEventListener("click", getSavedPlayers);

    clearAllSavedBtn.addEventListener("click", clearAllSavedPlayers);
}


function searchPlayerName(e){

    let playerName = inputField.value.trim().toLocaleLowerCase();

    if(playerName === ""){        
        alert("Lütfen bir oyuncu adı giriniz!");
    }
    else{
        nba.getPlayers(playerName)
        .then(response => {
            if(response.meta.total_count === 0){
                ui.showError(`${playerName} adında bir oyuncu bulunamadı!`)
            }
            else{
                ui.showPlayerInfo(response)
                ui.addSearchedPlayerToUI(playerName)
                Storage.addSearchedPlayerToStorage(playerName)
            }
        })
    }

    ui.clearInput();

    e.preventDefault();
}

function getAllSerchedPlayers(){

    let players = Storage.getSearchedPlayersFromStorage();

    if(players.length !== 0){

        searchedHead.innerHTML = `<h3 class="last-search-head">Arama Geçmişi</h3>`;

        players.forEach( playerName => 
            {searchedList.innerHTML += `<li class="searched-item">${playerName} <i class="fa-solid fa-circle-xmark"></i></li>`;
        })

        clearLastSearched.innerHTML = `<button id="clear-last-players"  class="btn btn-danger">Tüm Arananları Temizle </button>`;
    }
}

function clearSelectedPlayer(e){

    if(e.target.className === "fa-solid fa-circle-xmark"){

        if(confirm(`${e.target.parentElement.textContent} kaldırılsın mı?`)){

            ui.showSuccess(`${e.target.parentElement.textContent} kaldırıldı`);

            ui.clearSearchedPlayerFromUI(e)

            Storage.clearSearchedPlayerFromStorage(e);

        }

    }
}

function clearAllSearched(e){

    if(e.target.id === "clear-last-players"){

        if(confirm("Tüm Arananları Silmek İstediğinize Emin Misiniz?")){

            ui.clearAllSearchedFromUI(e);

            Storage.clearAllSearchedFromStorage();

            ui.showSuccess(`Tüm arananlar başarıyla silindi`);

    }}
}

function savePlayer(e){

    if(e.target.className === "fa-regular fa-bookmark"){

        Storage.savePlayerToStorage(e);
    }
    else if (e.target.className === "fa-solid fa-circle-xmark"){

        if(confirm(`${e.target.parentElement.previousElementSibling.textContent} kaldırılsın mı?`)){

            Storage.clearSavedPlayerFromStorage(e);

            ui.clearSavedPlayerFromUI(e);
        }
        
    }
}

function getSavedPlayers(){

    let players = Storage.getSavedPlayersFromStorage();
    
    if(players.length === 0){
        ui.showWarning(`Kayıtlı Oyuncu Bulunmuyor...`);
    }
    else{
        ui.addSavedPlayersToUI();
    }
}

function clearAllSavedPlayers(){

    if(confirm("Kayıtlı Tüm Oyuncular Silinsin mi?")){

        ui.clearAllSavedPlayersFromUI();

        Storage.clearAllSavedPlayersFromStorage();

    }
}