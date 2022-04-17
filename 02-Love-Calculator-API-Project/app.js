const calculateForm = document.getElementById("calculate-form");

const nameFirst = document.getElementById("couple-name-first");

const nameSecond = document.getElementById("couple-name-second");

const calcBtn = document.querySelector(".btn");

const love = new LOVE();

const ui = new UI();

// eventListeners();

// function eventListeners(){

//     calculateForm.addEventListener("submit", result);

// }

calculateForm.addEventListener("submit", result);


function result(e){

    let coupleNameFirst = nameFirst.value.trim();

    let coupleNameSecond = nameSecond.value.trim();

    if(coupleNameFirst === "" && coupleNameSecond === ""){
        // ui.showError("Lütfen ")
    }
    else{
        love.getResult(coupleNameFirst, coupleNameSecond)
        .then(response => ui.addResultsToUI(response))
        // .catch(err => reject(err));
    }

    ui.clearInputs();

    e.preventDefault();
}