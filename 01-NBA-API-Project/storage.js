class Storage{

    static getSearchedPlayersFromStorage(){

        let players;

        if(localStorage.getItem("searchedPlayers") === null){
        
            players = [];
        }
        else{
            players = JSON.parse(localStorage.getItem("searchedPlayers"));
        }
        return players;
    }

    static addSearchedPlayerToStorage(playerName){

        let players = this.getSearchedPlayersFromStorage();

        if(players.indexOf(playerName) === -1){
            players.unshift(playerName);
        }

        localStorage.setItem("searchedPlayers", JSON.stringify(players));
    }

    static clearSearchedPlayerFromStorage(e){

        let players = Storage.getSearchedPlayersFromStorage();
        
        players.splice(e.target.parentElement.textContent, 1);

        localStorage.setItem("searchedPlayers", JSON.stringify(players));
    }

    static clearAllSearchedFromStorage(){

        localStorage.removeItem("searchedPlayers");
    }

    static getSavedPlayersFromStorage(){
        let players;

        if(localStorage.getItem("savedPlayers") === null){

            players = [];
        }
        else{
            players = JSON.parse(localStorage.getItem("savedPlayers"));
        }

        return players;
    }

    static savePlayerToStorage(e){

        let players = Storage.getSavedPlayersFromStorage();

        let player = e.target.parentElement.parentElement.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.textContent;

        if(players.indexOf(player) === -1){

            players.unshift(player);

            alert(`${player} Başarıyla kaydedildi`);
            
        }
        else{
            // ui.showWarning(`${player} zaten kayıtlı`);

            alert(`${player} zaten kayıtlı`);
        }

        localStorage.setItem("savedPlayers", JSON.stringify(players));


    }

    static clearSavedPlayerFromStorage(e){

        let players = Storage.getSavedPlayersFromStorage();

        players.splice(e.target.parentElement.parentElement.nextElementSibling.nextElementSibling.firstElementChild.textContent, 1); // :)

        localStorage.setItem("savedPlayers", JSON.stringify(players));
    }

    static clearAllSavedPlayersFromStorage(){

        localStorage.removeItem("savedPlayers");
    }

}

