var req=new XMLHttpRequest()
// var productList=[];
req.open("GET","../products.json")
req.send()
 req.onreadystatechange=function(){
    if(req.status==200&&req.readyState==4){
     var final=JSON.parse(req.responseText)
var data=final.products
    localStorage.setItem("list",JSON.stringify(data))
    }
}


var main__layout= document.querySelector(".main__layout")
 var alert_check_out= document.querySelector(".alert-check-out")

var cartList;
if (localStorage.getItem("list") == null) {
    cartList = [];
} else {
    cartList = JSON.parse(localStorage.getItem("list"))
    var count;
      for (var i = 0; i < cartList.length; i++) {
    if (cartList[i].count === undefined || cartList[i].count === null) {
      cartList[i].count = 1;
    }
  }
  localStorage.setItem("list", JSON.stringify(cartList));
}

function addCart(cartList) {
  
}

//===========show all product added to cart

function showProductAtCart(){
var itemsNumber=0;
 var productCard=''
for (let i = 0; i < cartList.length; i++) {

count=cartList[i].count;
itemsNumber += count
  var result = (cartList[i].price * count).toFixed(2);

productCard+=`
<div class="cart-content" >
<div class="cart-content-head">
<div  class="cart-img">
<img src=${cartList[i].images[1]}  alt="${cartList[i].name.split(' ').slice(1,2).join(" ")}">
</div>
<div class="cart-description">
<div class="cart-desc-line">
<div><h3>${cartList[i].name.split(' ').slice(1,3).join(" ")}</h3></div>
<div><i class="fas fa-trash-alt pointer"></i> </div>  </div>
<div class="cart-desc-line">
<div class="cat_product_desc"> ${cartList[i].sizes[0]}</div>
<div class="cart-count"><i class="fa-solid fa-square-minus pointer"></i><div><p class="countNumber font-20">${count}</p></div><i class="fa-solid fa-square-plus pointer"></i></div>
</div>  </div>  </div>
<div> <div class="cart-desc-line cart-content-footer">
<div class="cat_product_desc">$<span>${cartList[i].price}</span></div>
<div class="totalPrice font-20">Total price :$<span>${result}</span></div> </div>
</div> </div>`
}
document.querySelector(".cart__items").innerHTML =productCard
document.querySelector(".cart-all-counts").innerText=itemsNumber




setupEventListeners()
}






//// ===========this function using when add or minus or delete from cart
function setupEventListeners() {

////===========icrease item in cart
var btn_increaseCount=document.querySelectorAll(".fa-square-plus")
  for (let i = 0; i < cartList.length; i++) {
btn_increaseCount[i].addEventListener("click",function(){
  cartList[i].count++
showProductAtCart()
localStorage.setItem("list",JSON.stringify(cartList))
})
  }

//============decrease item in cart
var btn_decreaseCount=document.querySelectorAll(".cart-count .fa-square-minus")
for (let k = 0; k < cartList.length; k++) {
btn_decreaseCount[k].addEventListener("click",function(){
  if(cartList[k].count ==1){
    cartList[k].count =0
    result=0
    cartList.splice(k,1)
  }else{
   cartList[k].count--
  }
showProductAtCart()
localStorage.setItem("list",JSON.stringify(cartList))

})
}

//=====delete item from cart
  var btn_deleteItem=document.querySelectorAll(".fa-trash-alt")
  for (let y = 0; y < cartList.length; y++) {
btn_deleteItem[y].addEventListener("click",function(){
   console.log(cartList[y]);
   cartList.splice(y,1)
   localStorage.list=JSON.stringify(cartList)
   showProductAtCart()
// localStorage.setItem("list",JSON.stringify(cartList))

})
  
}

checkOut()
}
//=======checkout  and total price
var checkOut_btn=document.querySelector(".checkOut-btn")
function checkOut(){
  var sum=0;
  for (let i = 0; i < cartList.length; i++) {
   sum +=(cartList[i].price * cartList[i].count)
    
  }
  document.querySelector(".fa-dollar-sign").innerText=sum.toFixed(2)

localStorage.clear("list")

}

checkOut_btn.addEventListener("click",checkOut)
checkOut_btn.addEventListener("click",function(){
    
 main__layout.classList.add("d-none")
alert_check_out.classList.remove("d-none")
resu=document.querySelector(".fa-dollar-sign").innerText
document.querySelector(".check-out-price-inAlert").innerText=resu
})

document.querySelector(".btn-alert-check-out").addEventListener("click",function(){
   main__layout.classList.remove("d-none")
alert_check_out.classList.add("d-none")
 open("../home.html", "_self")
})
var continue_btn=document.querySelector(".back-to-home-btn")
continue_btn.addEventListener("click",function(){
  open("../home.html", "_self")
})
showProductAtCart()



 