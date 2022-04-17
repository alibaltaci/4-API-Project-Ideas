// Selection of Elements 

// for search and clear 
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");

// for last serches
const lastUsers = document.getElementById("last-users");

// create Github object 
const github = new Github();    

// create UI object
const ui = new UI();

const deleteUser = document.querySelector(".list-group");


eventListeners();

function eventListeners(){

    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSerhed);
}

function getData(e){

    let userName = nameInput.value.trim();

    if (userName === ""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz!");
    }
    else{
        github.getGithubData(userName)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError(`${userName} adında bir kullanıcı bulunamadı!`);
            }
            else{
                // for UI
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
                ui.addsearchedUserToUI(userName);

                // for storage
                Storage.addSearchedUserToStorage(userName);


            }})
        // .then(response => response.followers.forEach(element => {
        //     console.log(element)
        // }))
        .catch(err => ui.showUserInfo(err));
    }

    ui.clearInput(); // clear input field
    
    e.preventDefault();
}

function getAllSerhed(){

    let users = Storage.getSearchedUsersFromStorage();

    let result = "";

    users.forEach( userName => {

        result += `<li class="list-group-item d-flex justify-content-between">${userName} </li>`;

        // way 2 - for add UI
        // lastUsers.innerHTML += `<li class="list-group-item">${userName};
    
    });

    lastUsers.innerHTML = result;

}

function clearAllSearched(){

    if(confirm("Kullanıcıları silmek istediğinize emin misiniz?")){

        Storage.clearAllSearchedUsersFromStorage();

        ui.clearAllSearchedFromUI();
    }

}