class UI{

    constructor(){

        this.resultPer = document.getElementById("result-per");

        this.resultMessage = document.getElementById("result-message");

        this.header = document.getElementById("resultsHeader");

        this.nameFirst = document.getElementById("couple-name-first");

        this.nameSecond = document.getElementById("couple-name-second");

    }

    addResultsToUI(response){

        if(this.resultMessage.firstElementChild !== null){
            this.resultMessage.removeChild(this.resultMessage.firstElementChild);
        }

        this.header.innerHTML = `<h1>${response.sname} & ${response.fname}`;

        let per = response.percentage;

        let counter = 0;

        setInterval( () => {

            if(counter <= per){
            
                this.resultPer.innerHTML = `

                <div id="percentage-box"> <span>${counter}</span> % </div>
        
                `;
            }

            counter++
            
        },100);

        setTimeout( () => 

            {this.resultMessage.innerHTML = `
        
            <div id="message-box"> ${response.result} </div>
    
            `;}, per * 100)



    }

    clearInputs(){

        this.nameFirst.value = "";

        this.nameSecond.value = "";

    }
}