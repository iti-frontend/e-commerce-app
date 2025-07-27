var username = document.querySelector(".username")
var email = document.querySelector(".email")
var password = document.querySelector(".password")
var inputs = document.querySelectorAll('input')

var usersList;
if (localStorage.users != null) {
    usersList = JSON.parse(localStorage.users)
} else {
    // if not we start with empty array
    usersList = [];
}
window.localStorage.setItem('users', JSON.stringify(usersList))
// regex pattern to validate the inputs
var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var namePattern = /^[A-Z]/
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault()
    
    var user = {
        username: username.value,
        email: email.value,
        password: password.value
    }
    // checking the validatio of inputs
    if (!namePattern.test(username.value)) {
        // if the test failed we update the style border and showing an error msg
        username.style.border = "2px solid red"
        // here we use nextElementSibling to specify which span will update with the error msg
        username.nextElementSibling.innerHTML = 'Username must start with capital letter'
        return;
    }
    // same logic 
    if (!emailPattern.test(email.value)) {
        email.style.border = "2px solid red"
        email.nextElementSibling.innerHTML = 'invalid email'

        return
    }
    // same logic 
    if (password.value.length < 5) {
        password.style.border = "2px solid red"
        password.nextElementSibling.innerHTML = 'Password Must Contain at least 5 charachter'
        return
    }
    // here we check if email already exists 
    for (var i = 0; i < usersList.length; i++) {
        if (user.email == usersList[i].email) {
            email.style.border = "2px solid red"
            email.nextElementSibling.innerHTML = 'email already exists'
            return;
        }
    }
    usersList.push(user)
    localStorage.users = JSON.stringify(usersList)
    open("signIn.html", "_self")

})
// the loop which clear the error action when user changes the value
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', function () {
        inputs[i].nextElementSibling.innerHTML = ''
        inputs[i].style.border = '1px solid black'
    })
}
