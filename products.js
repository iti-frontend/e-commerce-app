let selectedCategory = "all";
let selectedPrice = "all";

// get products from json and store it in local storage ---- START -----
window.addEventListener('DOMContentLoaded', function () { //to make sure script loads after html
  var req = new XMLHttpRequest();
  req.open("GET", '../products.json');
  req.send();
  req.onreadystatechange = function () {
    if (req.status === 200 && req.readyState === 4) {
      console.log(req);
      const productsObject = JSON.parse(req.responseText); // parse response to json
      console.log(productsObject);
      const productsArray = productsObject.products;       // get products array
      localStorage.setItem("products", JSON.stringify(productsArray));   //saves products in localstorage as string
      const storedProducts = JSON.parse(localStorage.getItem("products")); //get products from localstorage and parse it to json
      console.log(storedProducts);
      const grid = document.getElementById("product-grid"); //get grid from html

      storedProducts.forEach(product => { //loop on products 
        const card = document.createElement("div"); //creates a card div
        card.className = "product-card";
        cardStyle(product, card);


        grid.appendChild(card);  //adds card to the grid
      });
    }
  };
});
// ---- END -----


// expand and collapse filters ---- START -----
function toggleFilters() {
  const filterSection = document.getElementById('filterSection');
  if (filterSection.style.display === 'none') { filterSection.style.display = 'flex'; }
  else filterSection.style.display = 'none';
}
// ---- END -----


// set category & price ,and calls filter function ---- START -----
function setCategory(category) {
  selectedCategory = category;
  filter(selectedCategory, selectedPrice);
}

function setPrice(price) {
  selectedPrice = price;
  filter(selectedCategory, selectedPrice);
}
// ---- END -----

// filters products by category and/or price   ---- START ----
function filter(category, price) {
  
  const storedProducts = JSON.parse(localStorage.getItem("products"));  
  const filteredProducts = [];

  for (let i = 0; i < storedProducts.length; i++) {
    const product = storedProducts[i];

    var matchedCategory=true;
    if(category === "all" || product.category.toLowerCase() === category.toLowerCase()){
      matchedCategory = true;
    }
    else matchedCategory=false;
    let matchedPrice = true;

    if (price === "100-1000") {
      if (product.price <= 1000) {
        matchedPrice = true;
      }
      else matchedPrice = false;
    } else if (price === "1000-2000") {
      if (product.price > 1000 && product.price <= 2000) {
        matchedPrice = true;
      }
      else matchedPrice = false;

    } else if (price === "2000+") {
      if (product.price > 2000) {
        matchedPrice = true;
      }
      else matchedPrice = false;

    }

    if (matchedCategory && matchedPrice) {
      filteredProducts.push(product);
    }
  }

  showProducts(filteredProducts);
}
// ---- END -----


// show produts in grid  ---- START -----

function showProducts(filteredProducts) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = '';
var noFound = document.getElementById("noFound");
  if (filteredProducts.length === 0) {
    noFound.style.display = "block";
  }
  else {
    noFound.style.display = "none";
    filteredProducts.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product-card';

      cardStyle(product, div);

      grid.appendChild(div);

    });
  }
}
// ---- END -----

// fill card details and style   ---- START -----
function cardStyle(product, card) {
  card.innerHTML = ` 
            <div class="product-image-div">
            <img src="${product.images[0]}" class="product-image" alt="${product.name}">
            <button class="quick-view">Quick View</button>
            </div>
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
          `;
} 
// ---- END -----

// Close filter section --- START ---
function closeFilter(){
  const filterSection = document.getElementById('filterSection');
  filterSection.style.display = 'none';
}
// ---- END -----