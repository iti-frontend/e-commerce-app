var main__layout = document.querySelector(".main__layout")
var alert_check_out = document.querySelector(".alert-check-out")

var cartList;
if (localStorage.shoppingcart != null) {
  cartList = JSON.parse(localStorage.shoppingcart)
} else {
  // if not we start with empty array
  cartList = [];
}
localStorage.setItem('shoppingcart', JSON.stringify(cartList))
//===========show all product added to cart
function showProductAtCart() {
  var itemsNumber = 0;
  var productCard = ''
  for (let i = 0; i < cartList.length; i++) {
    console.log(cartList)
    count = cartList[i].count;
    itemsNumber += count
    var result = (cartList[i].price * count).toFixed(2);
    console.log(result)

    productCard += `
<div class="cart-content" >
<div class="cart-content-head">
<div  class="cart-img">
<img src=${cartList[i].images}  alt="${cartList[i].name.split(' ').slice(1, 2).join(" ")}">
</div>
<div class="cart-description">
<div class="cart-desc-line">
<div><h3>${cartList[i].name.split(' ').slice(1, 3).join(" ")}</h3></div>
<div><i class="fas fa-trash-alt pointer"></i> </div>  </div>
<div class="cart-desc-line">
<div class="cat_product_desc"> m</div>
<div class="cart-count"><i class="fa-solid fa-square-minus pointer"></i><div><p class="countNumber font-20">${count}</p></div><i class="fa-solid fa-square-plus pointer"></i></div>
</div>  </div>  </div>
<div> <div class="cart-desc-line cart-content-footer">
<div class="cat_product_desc">$<span>${cartList[i].price}</span></div>
<div class="totalPrice font-20">Total price :$<span>${result}</span></div> </div>
</div> </div>`
  }
  document.querySelector(".cart__items").innerHTML = productCard
  document.querySelector(".cart-all-counts").innerText = itemsNumber




  setupEventListeners()
}

//// ===========this function using when add or minus or delete from cart
function setupEventListeners() {

  ////===========icrease item in cart
  var btn_increaseCount = document.querySelectorAll(".fa-square-plus")
  for (let i = 0; i < cartList.length; i++) {
    btn_increaseCount[i].addEventListener("click", function () {
      cartList[i].count++
      showProductAtCart()
      localStorage.shoppingcart = JSON.stringify(cartList);
    })
  }

  //============decrease item in cart
  var btn_decreaseCount = document.querySelectorAll(".cart-count .fa-square-minus")
  for (let k = 0; k < cartList.length; k++) {
    btn_decreaseCount[k].addEventListener("click", function () {
      if (cartList[k].count == 1) {
        cartList[k].count = 0
        result = 0
        cartList.splice(k, 1)
      } else {
        cartList[k].count--
      }
      showProductAtCart()
      localStorage.shoppingcart = JSON.stringify(cartList);

    })
  }

  //=====delete item from cart
  var btn_deleteItem = document.querySelectorAll(".fa-trash-alt")
  for (let y = 0; y < cartList.length; y++) {
    btn_deleteItem[y].addEventListener("click", function () {
      console.log(cartList[y]);
      cartList.splice(y, 1)
      showProductAtCart()
      localStorage.shoppingcart = JSON.stringify(cartList);
    })

  }
    var sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      sum += (cartList[i].price * cartList[i].count)

    }
    document.querySelector(".fa-dollar-sign").innerText = sum.toFixed(2)
   
}
//=======checkout  and total price
var checkOut_btn = document.querySelector(".checkOut-btn")

function checkOut() {

  var sum = 0;
  for (let i = 0; i < cartList.length; i++) {
    sum += (cartList[i].price * cartList[i].count)

  }
  document.querySelector(".fa-dollar-sign").innerText = sum.toFixed(2)
  cartList = []
  localStorage.shoppingcart = JSON.stringify(cartList);
}

checkOut_btn.addEventListener("click", checkOut)
checkOut_btn.addEventListener("click", function () {

  main__layout.classList.add("d-none")
  alert_check_out.classList.remove("d-none")
  resu = document.querySelector(".fa-dollar-sign").innerText
  document.querySelector(".check-out-price-inAlert").innerText = resu
})

document.querySelector(".btn-alert-check-out").addEventListener("click", function () {
  main__layout.classList.remove("d-none")
  alert_check_out.classList.add("d-none")
  open("../home.html", "_self")
})
var continue_btn = document.querySelector(".back-to-home-btn")
continue_btn.addEventListener("click", function () {
  open("../home.html", "_self")
})
showProductAtCart()



