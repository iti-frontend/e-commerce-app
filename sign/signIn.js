var email = document.querySelector(".email");
var password = document.querySelector(".password");
var inputs = document.querySelectorAll('input');
// a function that runs when error occured..
function showError() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.border = '1px solid red'
    }
    document.querySelector('.error').innerText = 'invalid email or password'
    document.querySelector('.error').style.color = 'red'
}
var usersList;
if (localStorage.users != null) {
    usersList = JSON.parse(localStorage.users)
} else {
    // if not we start with empty array
    usersList = [];
}

var isSigned = false;
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault()
    // checking if app had users from  local storage
    if (usersList.length >= 0) {
        for (let i = 0; i < usersList.length; i++) {
            // comparing and validate the data with local storage
            if (email.value == usersList[i].email && password.value == usersList[i].password) {
                open("../home.html", "_self")
                isSigned = true;
                sessionStorage.setItem('signed', isSigned)
            } else {
                showError()
            }
        }
    } else {
        showError();
    }
})
// making an event run when we make changes after errors
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', function () {
        document.querySelector('.error').innerHTML = ''
        // making nested loops to change all inputs
        for (let j = 0; j < inputs.length; j++) {
            inputs[j].style.border = '1px solid'
        }
    })
}