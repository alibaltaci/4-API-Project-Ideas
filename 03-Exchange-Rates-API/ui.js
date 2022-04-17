class UI{

    constructor(firstSelct, secondSelect){

        this.firstSelct = firstSelct;
        this.secondSelect = secondSelect;

        this.outputFirst = document.getElementById("outputFirst");
        this.outputSecond = document.getElementById("outputSecond");
        this.outputResult = document.getElementById("outputResult");
    }

    changeFirst(){
        this.outputFirst.textContent = this.firstSelct.options[this.firstSelct.selectedIndex].textContent;
    }

    changeSecond(){
        this.outputSecond.textContent = this.secondSelect.options[this.secondSelect.selectedIndex].textContent;
    }

    displayResult(result){
        this.outputResult.value = result.toFixed(2); 
    }
}