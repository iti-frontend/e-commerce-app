
const toggleBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu-desktop');

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('active');

});


window.addEventListener('scroll', function () {
  const nav = document.querySelector('.wrap-menu-desktop');
  if (window.scrollY > 0) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


// Select all top-level <li> items in the main menu
const menuItems = document.querySelectorAll('.main-menu > li');

menuItems.forEach(item => {
  item.addEventListener('click', function () {
    // Remove active-menu from all
    menuItems.forEach(i => i.classList.remove('active-menu'));
    // Add to the clicked one
    this.classList.add('active-menu');
  });
});

// Get elements
const modal = document.getElementById('searchModal');
const openBtn = document.querySelector('.js-show-modal-search');
const closeBtn = document.getElementById('closeModal');

// Show modal
openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close when clicking outside modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const listItems = document.querySelectorAll('#searchResults li'); // or your actual elements

// Apply saved mode on load
if (localStorage.getItem("mode") === "dark") {
  document.body.classList.add("dark-mode");
}

// Toggle and save preference
document.getElementById("toggleMode").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("mode", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// var itemNumber_InCart=JSON.parse(localStorage.shoppingcart)
//  document.querySelector(".cart___counter").innerHTML=itemNumber_InCart.length
//  console.log(itemNumber_InCart)


var cart = document.querySelector('.js-show-cart')
var isSigned = false
cart.addEventListener('click', function () {
  isSigned = sessionStorage.getItem('signed')
  console.log(isSigned)
  if (isSigned) {
    open('/cart/cart.html')

  } else {
    alert('sign in to continue')
    open('/sign/signIn.html')
  }
})

if(localStorage.shoppingcart !=undefined ){
var itemNumber_InCart=JSON.parse(localStorage.shoppingcart)
 document.querySelector(".cart___counter").innerHTML=itemNumber_InCart.length
}else{
 document.querySelector(".cart___counter").innerHTML=0
}

var toTopBtn = document.getElementById("toTopBtn");

    // Show/hide the button based on scroll position
    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            toTopBtn.style.display = "block";
        } else {
            toTopBtn.style.display = "none";
        }
    };

    // Scroll to top when clicked
    toTopBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
