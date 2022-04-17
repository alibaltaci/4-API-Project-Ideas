class LOVE{
    getResult(coupleNameFirst, coupleNameSecond){
        return new Promise( (resolve, reject) => {     
            fetch(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${coupleNameFirst}&fname=${coupleNameSecond}`, {
                "headers": {"x-rapidapi-key": "d69cb5bd09msha8f3eb3e66141c2p1c38eejsncf3170289181"}
            })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(err => reject(err));
        })
    }
}



