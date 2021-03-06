class LoginController {

    constructor() {
        
        this.restController = new RestController()
        this.inputUsername
        this.inputPassword
        this.loginBtn
        this.user

    }
    
    init() {
        $(document).ready(function () {
            this.inputUsername = $("#inputUsername")
            this.inputPassword = $("#inputPassword")
            this.loginBtn = $("#loginBtn")

            this.loginBtn.click(function(){
                var username = this.inputUsername.val()
                var password = this.inputPassword.val()
                
                console.log("user", username)
                console.log("password", password)
                this.getUtente(username, password)

            }.bind(this))


        }.bind(this))

    }      
    
    getUtente(username, password) {
        this.restController.getUser("https://cms-front-end-chiara.herokuapp.com/users?username="+username+"&password="+password,
            function () {
                console.log("Loggato")
                sessionStorage.setItem('username', JSON.stringify(username))             
                sessionStorage.setItem('password', JSON.stringify(password))
                window.location.href = 'articles.html'
            }.bind(this)
        )


    }

}