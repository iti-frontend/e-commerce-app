var title = document.querySelector('.title')
var price = document.querySelector('.price')
var total = document.querySelector('.total')
var description = document.querySelector('.description')
var album = document.querySelector('.album');
var coverAlbum = document.querySelector('.coverAlbum')
var increaseBtn = document.querySelector('.increase')
var decreaseBtn = document.querySelector('.decrease')
var addToCart = document.querySelector('.addToCart')
var images = document.images
// here to get the product id from req params
var params = new URLSearchParams(window.location.search)
var productId = params.get('id');
// the varible we save our response so we deal with that varible as an object
var myProduct;
// default value for counter
var counter = 1;
// setting up the array that will be pushed to the local storage
var cardList;
// making the request
var req = new XMLHttpRequest()
req.open("GET", '../products.json','true')
req.send()
req.onreadystatechange = function () {
    if (req.status == 200 && req.readyState == 4) {
        var final = JSON.parse(req.responseText)
        var res = final.products.find(p => p.id == productId)
        if (res != null) {
            myProduct = res
        } else {
            console.log('not found')
        }
    }
}
// here we set timeout waiting for the response is set to the varible we created
setTimeout(function () {
    // setting the values for the page elements
    title.innerHTML = myProduct.name
    price.innerHTML = `$${myProduct.price}`
    description.innerHTML = myProduct.description
    total.innerHTML = counter
    // loop so we can access all images
    for (var i = 0; i < myProduct.images.length; i++) {
        album.innerHTML += `<img src=${myProduct.images[i]}>`
    }
    // making the slider
    coverAlbum.style.backgroundImage = "url(" + myProduct.images[1] + ")"
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', function () {
            coverAlbum.style.backgroundImage = "url(" + event.target.src + ")"
        })
    }

    // the event to increase the count and update the total value
    increaseBtn.addEventListener('click', function () {
        counter++
        total.innerHTML = counter
    })
    // the event to decrease the count and update the total value
    decreaseBtn.addEventListener('click', function () {
        if (counter <= 1) {
            counter = 1
        } else {
            counter--
            total.innerHTML = counter
        }
    })
    // the object that pushes into the array and then saved at local storage after adding to card
    var product = {
        name: myProduct.name,
        id: myProduct.id,
        images: myProduct.images[1],
        price: myProduct.price,
        count: counter
    }
    // here we check if we had values at local storage we save it into array
    if (localStorage.shoppingcart != null) {
        cardList = JSON.parse(localStorage.shoppingcart)
    } else {
        // if not we start with empty array
        cardList = [];
    }
    // setting the key to local storage
    window.localStorage.setItem('shoppingcart', JSON.stringify(cardList))

    addToCart.addEventListener('click', function () {
        let currentCount = counter;
        // checking if card list have values
        if (cardList.length > 0 && cardList != []) {
            // loop and validate to makr sure we update the index and pushing new object to the array
            for (let i = 0; i < cardList.length; i++) {
                if (cardList[i].id == product.id) {
                    cardList[i].count = parseInt(cardList[i].count) + currentCount;
                    localStorage.shoppingcart = JSON.stringify(cardList);
                    console.log('updated count');
                    return;
                }
            }
        }
        // If product not found in cardList, we add it then pushed to the array
        let productToAdd = {
            name: myProduct.name,
            id: myProduct.id,
            images: myProduct.images[1],
            price: myProduct.price,
            count: currentCount
        };
        cardList.push(productToAdd);
        localStorage.shoppingcart = JSON.stringify(cardList);
        console.log('new product pushed');
    })

}, 500)

