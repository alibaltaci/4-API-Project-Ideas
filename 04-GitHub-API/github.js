class Github{

    constructor(){

        this.url = "https://api.github.com/users/";
    }

    async getGithubData(userName){

        // get user 
        const responseUser = await fetch(this.url + userName);

        // get users repos
        const responseRepo = await fetch(this.url + userName + "/repos");

        // get followers 
        // const responseFollowers = await fetch(this.url + userName +"/followers");

        const userData = await responseUser.json();

        const repoData = await responseRepo.json();

        // const followersData = await responseFollowers.json();

        return {
            user : userData,
            repo : repoData,
            // followers : followersData
        }

    }

}