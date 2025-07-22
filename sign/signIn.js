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

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault()
    // checking if there is an email password saved to local storage
    if (localStorage.email != null && localStorage.password != null) {
        // getting data from local storage
        var emaillocal = window.localStorage.getItem("email")
        var passlocal = window.localStorage.getItem("password")
        // comparing and validate the data with local storage
        if (email.value == emaillocal && password.value == passlocal) {
            open("home.html", "_self")
        } else {
            showError()
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