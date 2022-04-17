// With ES6 ()


const BASE_URL = "https://free-nba.p.rapidapi.com/players"

const fetchConfig = {
    "headers": {"x-rapidapi-key": "d69cb5bd09msha8f3eb3e66141c2p1c38eejsncf3170289181"}
}

class NBA{

    getPlayers(player){
        return new Promise( (resolve, reject) => {
            fetch(`${BASE_URL}?page=0&per_page=25&search=${player}`, fetchConfig)
            .then(response => response.json())
            .then(players => resolve(players))
            .catch(err => reject(err));
        })
    }

    getPlayersWithID(player){
        return new Promise( (resolve, reject) => {
            fetch(`${BASE_URL}/${player}`, fetchConfig)
            .then(response => response.json())
            .then(players => resolve(players))
            .catch(err => reject(err));
        })
    }    
}
