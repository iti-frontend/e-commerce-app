var title = document.querySelector('.title')
var price = document.querySelector('.price')
var total = document.querySelector('.total')
var description = document.querySelector('.description')
var album = document.querySelector('.album')
var increaseBtn = document.querySelector('.increase')
var decreaseBtn = document.querySelector('.decrease')
var addToCart = document.querySelector('.addToCart')
// here to get the product id from req params
var params = new URLSearchParams(window.location.search)
var productId = params.get('id');
// the varible we save our response so we deal with that varible as an object
var myProduct;
// default value for counter
var count = 1;
// setting up the array that will be pushed to the local storage
var cardList = [];
// making the request
var req = new XMLHttpRequest()
req.open("GET", '../products.json')
req.send()
req.onreadystatechange = function () {
    if (req.status == 200 && req.readyState == 4) {
        var final = JSON.parse(req.responseText)
        var res = final.products.find(p => p.id == productId)
        if (res != null) {
            console.log(res)
            myProduct = res
        } else {
            console.log('not found')
        }
    }
}
// here we set timeout waiting for the response is set to the varible we created
setTimeout(function () {
    // the object that pushes into the array and then saved at local storage after adding to card

    // setting the values for the page elements
    title.innerHTML = myProduct.name
    price.innerHTML = myProduct.price
    total.innerHTML = count
    description.innerHTML = myProduct.description
    // loop so we can access all images
    for (var i = 0; i < myProduct.images.length; i++) {
        album.innerHTML += `<img src=${myProduct.images[i]}>`
    }
    // the event to increase the count and update the total value
    increaseBtn.addEventListener('click', function () {
        count++
        total.innerHTML = count
    })
    // the event to decrease the count and update the total value
    decreaseBtn.addEventListener('click', function () {
        if (count <= 1) {
            count = 1
        } else {
            count--
            total.innerHTML = count
        }
    })
    var product = {
        name: myProduct.name,
        id: myProduct.id,
        images: myProduct.images[1],
        price: myProduct.price,
        count: count
    }
    window.localStorage.setItem('cartList', JSON.stringify(cardList))
    addToCart.addEventListener('click', function () {
        product.count = count
        cardList.push(product)
    })

}, 50)

