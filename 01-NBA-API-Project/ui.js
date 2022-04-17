class UI{

    constructor(){

        this.playerGrup = document.getElementById("message"); // showError

        this.inputField = document.getElementById("search"); // clearInput

        // showPlayerInfo
        this.playerInfoHeader = document.getElementById("player-group-header");  // head

        this.playerInfo = document.getElementById("player-group-body");  //list
        
        // addSearchedPlayerToUI
        this.searchedHead = document.getElementById("searched-head"); //head

        this.searchedList = document.getElementById("searched-list"); // body

        this.clearSearched = document.getElementById("clear-players-row"); // clear button

        // showSuccess - alert
        this.clearAllMessage = document.getElementById("clearAllMessage");

        // clearAllSavedPlayers
        this.claerAllSavedBtn = document.getElementById("clearSavedBtn");

    }

    showError(message){

                // clear last players from ui
        while(this.playerInfo.firstElementChild !== null){
            this.playerInfo.removeChild(this.playerInfo.firstElementChild);
        }
        
        while(this.playerInfoHeader.firstElementChild !== null){
            this.playerInfoHeader.removeChild(this.playerInfoHeader.firstElementChild);
        }

        const div = document.createElement("div");

        div.className = "alert alert-danger"; 

        div.textContent = message;

        this.playerGrup.appendChild(div);

        setTimeout( () => {
            div.remove();
        }, 3000);
    }

    clearInput(){
        this.inputField.value = "";
    }

    showPlayerInfo(response){

        // clear last players from ui
        while(this.playerInfo.firstElementChild !== null){
            this.playerInfo.removeChild(this.playerInfo.firstElementChild);
        }

        while(this.playerInfoHeader.firstElementChild !== null){
            this.playerInfoHeader.removeChild(this.playerInfoHeader.firstElementChild);
        }

        if(this.claerAllSavedBtn.firstElementChild !== null){
            this.claerAllSavedBtn.firstElementChild.remove();
        }

        // create a h3 element 
        const h3 = document.createElement("h3");

        h3.className = "total-players";

        h3.textContent = `Toplam ${response.meta.total_count} Oyuncu Bulundu`;

        this.playerInfoHeader.appendChild(h3);

        // add informations     
        response.data.forEach(player => {

            this.playerInfo.innerHTML += `
            <div class="player-card">
                    <div class="player-card-header">
                        <div class="name">${player.first_name +" "+ player.last_name}</div>
                        <div class="icon"><i class="fa-regular fa-bookmark"></i></div>
                    </div>
                    
                    <hr>
                    <div class="palayer-informations">
                        <div class="item">Oyuncu ID: <span> ${player.id} </span></div> 
                        <div class="item">Takım ID: ${player.team.id}</div> 
                        <div class="item">Mevki: ${player.position}</div>
                        <div class="item">Takım: ${player.team.full_name}</div>
                        <div class="item">Kısaltma: ${player.team.abbreviation} </div>
                        <div class="item">şehir: ${player.team.city}</div>
                        <div class="item">Konferans: ${player.team.conference} </div>
                        <div class="item">Grup: ${player.team.division} </div>
                    </div>
                </div>
            `
        });
    }

    addSearchedPlayerToUI(playerName){
        
        let players = Storage.getSearchedPlayersFromStorage();

        if(players.indexOf(playerName) === -1){

            this.searchedHead.innerHTML = `<h3 class="last-search-head">Arama Geçmişi</h3>`;

            this.searchedList.innerHTML += `<li class="searched-item">${playerName} <i class="fa-solid fa-circle-xmark"></i></li>`;

            this.clearSearched.innerHTML = `<button id="clear-last-players"  class="btn btn-danger">Tüm Arananları Temizle </button>`;

        }
        
    }

    clearSearchedPlayerFromUI(e){

        e.target.parentElement.remove();

        // If the list is empty, to completely remove the search history field. (head - button)
        if(this.searchedList.firstElementChild === null){

            this.searchedHead.removeChild(this.searchedHead.firstElementChild);

            this.clearSearched.removeChild(this.clearSearched.firstElementChild);

        }
        
    }
    
    clearAllSearchedFromUI(e){

        // e.target.parentElement.parentElement.remove(); // Since it deletes the non-dynamic element, the search history field is 
                                                            // not shown in the usages without refreshing the page.

        
        while(this.searchedList.firstElementChild !== null){
            this.searchedList.removeChild(this.searchedList.firstElementChild);
        }

        this.searchedHead.removeChild(this.searchedHead.firstElementChild);

        this.clearSearched.removeChild(this.clearSearched.firstElementChild);
    }

    showSuccess(message){

        this.clearAllMessage.innerHTML = `<div class="alert alert-success">${message}</div>`; 
        
        setTimeout( () => {
            this.clearAllMessage.firstElementChild.remove()
        }, 3000);
    }

    addSavedPlayersToUI(){

        if(this.playerInfoHeader.firstElementChild !== null){

            this.playerInfoHeader.removeChild(this.playerInfoHeader.firstElementChild);
        }

        while(this.playerInfo.firstElementChild !== null){
            this.playerInfo.removeChild(this.playerInfo.firstElementChild);
        }

        let players = Storage.getSavedPlayersFromStorage();

        if(players.length !== 0){
            this.claerAllSavedBtn.innerHTML = `<button class="btn btn-danger">Tüm kayıtları sil</button>`;
        }

        players.forEach( player => {
            nba.getPlayersWithID(player)
            .then( player => {
                this.playerInfo.innerHTML += `
                    <div class="player-card">
                            <div class="player-card-header">
                                <div class="name">${player.first_name +" "+ player.last_name}</div>
                                <div class="icon"><i class="fa-solid fa-circle-xmark"></i></div>
                            </div>
                            
                            <hr>
                            <div class="palayer-informations">
                                <div class="item">Oyuncu ID: <span> ${player.id} </span></div> 
                                <div class="item">Takım ID: ${player.team.id}</div> 
                                <div class="item">Mevki: ${player.position}</div>
                                <div class="item">Takım: ${player.team.full_name}</div>
                                <div class="item">Kısaltma: ${player.team.abbreviation} </div>
                                <div class="item">şehir: ${player.team.city}</div>
                                <div class="item">Konferans: ${player.team.conference} </div>
                                <div class="item">Grup: ${player.team.division} </div>
                            </div>
                        </div>
                    `
                
            })
        })  
        
    }

    showWarning(message){

        while(this.playerInfo.firstElementChild !== null){
        this.playerInfo.removeChild(this.playerInfo.firstElementChild);
        }

        if(this.playerInfoHeader.firstElementChild !== null){

            this.playerInfoHeader.removeChild(this.playerInfoHeader.firstElementChild);
        }

        this.playerInfo.innerHTML += `<div class="alert alert-success">${message}</div>`; 
        
        setTimeout( () => {
            this.playerInfo.lastElementChild.remove();
        }, 2000);
    }

    clearSavedPlayerFromUI(e){

        e.target.parentElement.parentElement.parentElement.remove();

        if(this.playerInfo.firstElementChild === null){

            this.claerAllSavedBtn.firstElementChild.remove();
        }
    }

    clearAllSavedPlayersFromUI(){

        while(this.playerInfo.firstElementChild !== null){
            this.playerInfo.removeChild(this.playerInfo.firstElementChild);
        }

        this.claerAllSavedBtn.firstElementChild.remove();
    }
}