let carts = document.querySelectorAll('.add-cart');

let products = [
  {
    id: 1,
    name: "Anantara Uluwatu Bali Resort",
    tag: "Anantara Uluwatu Bali Resort",
    price: 175,
    inCart: 0
  },
  {
    id: 2,
    name: "The Stanley Hotel",
    tag: "The Stanley Hotel",
    price: 149,
    inCart: 0
  },
  {
    id: 3,
    name: "Post Ranch Inn",
    tag: "Post Ranch Inn",
    price: 199,
    inCart: 0
  },
];
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
  })
}
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(product) {

  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);


  if (cartItems != null) {

    if (cartItems[product.id] == undefined) {
      cartItems = {
        ...cartItems,
        [product.id]: product
      }

    }
    cartItems[product.id].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.id]: product
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
  // console.log("the product price is", product.price);
  let cartCost = localStorage.getItem('totalCost');

  console.log("your total cost is", cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost +
      product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }

}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector
    (".products");
  let cartCost = localStorage.getItem('totalCost');
  console.log(cartItems);

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';

    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
  <div class="product">
       <ion-icon id="delete-${item.id}" onclick="remove(${item.id})" name="close-circle-outline"></ion-icon>
       <img src="./pic/${item.tag}.jpg" >
          <span>${item.name}</span>
      </div>
      <div  class="price">${item.price}$</div>
      <div class="quantity">    
      <ion-icon name="caret-back-circle-outline"></ion-icon>
      <span>${item.inCart}</span>
      <ion-icon name="caret-forward-circle-outline"></ion-icon>
      </div>
      <div class="total">
      ${item.inCart * item.price}$
      </div>
  `
    });
    productContainer.innerHTML += `
   <div class="basketTotalContainer">
   <h4 class="basketTotalTitle">
       Basket Total
       </h4>
       <h4 class="basketTotal">
       ${cartCost}$
       </h4>
`
      // removeProduct(item.tag);
    // function removeProduct(productTag) {
    //   let cartItems = localStorage.getItem('productsInCart');
    //   cartItems = JSON.parse(cartItems);

    //   // Check if the product is in the cart
    //   if (cartItems[productTag]) {
    //     // Remove the product from the cart
    //     cartItems[productTag].inCart -= 1;
    //     if (cartItems[productTag].inCart === 0) {
    //       delete cartItems[productTag];
    //     }

    //     // Update the localStorage and UI
    //     localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    //     displayCart();
    //   }
    // }

  }

}

const remove = (id) => {
  let  cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems[id]) {

    // Remove the product from the cart
    cartItems[id].inCart -= 1;
    if (cartItems[id].inCart == 0) {
      delete cartItems[id];
    }

    if(cartItems.length == 0) {
      localStorage.setItem('cartNumbers', JSON.stringify(0));
      localStorage.setItem('totalCost', JSON.stringify(0));
    }

    // decrease cartNumbers
    let cartNumbers = localStorage.getItem('cartNumbers');
    localStorage.setItem('cartNumbers', JSON.stringify(cartNumbers-1));

    // decrease totalCost
    let totalCost = localStorage.getItem('totalCost');
    localStorage.setItem('totalCost', JSON.stringify(totalCost-products[id-1].price));

  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  displayCart();
}



// document.getElementById("dn").addEventListener("click", function(){ alert("Thank you so much for donated"); });
onLoadCartNumbers();
displayCart();



