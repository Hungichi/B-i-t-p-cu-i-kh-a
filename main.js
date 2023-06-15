let carts =document.querySelectorAll('add-cart');

let products = [
    {
        name : "Anantara Uluwatu Bali Resort" ,
        tag: "AnantaraUluwatuBaliResort",
        price: 175,
        incart: 0
    },
    {
        name : "The Stanley Hotel" ,
        tag: "TheStanleyHotel",
        price: 149,
        incart: 0
    },
    {
        name : "Post Ranch Inn" ,
        tag: "PostRanchInn",
        price: 199,
        incart: 0
    },
];
for (let i=0; i < carts.length ; i++ ) {
    carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
    })
}
function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(product) {
  
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);
  if (productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1 );
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else{
    localStorage.setItem('cartNumbers', 1 );
    document.querySelector('.cart span').textContent = 1;
  }
  setItems(product);
}

function setItems(product){
let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);


if(cartItems != null){

  if(cartItems[product.tag]  ==  undefined ){
    cartItems = {
      ...cartItems,
      [product.tag]: product
    }
    
  }
  cartItems[product.tag].inCart +=1;
} else {
  product.inCart = 1;
  cartItems = {
    [product.tag]: product
  }
}

localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
// console.log("the product price is", product.price);
let cartCost = localStorage.getItem('totalCost');

console.log("your total cost is", cartCost);
console.log(typeof cartCost);

if(cartCost != null){
  cartCost = parseInt(cartCost);
  localStorage.setItem("totalCost", cartCost +
  product.price);
} else {
  localStorage.setItem("totalCost", product.price);
}

}

function displayCart(){
let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);
let productContainer = document.querySelector
( ".products");
let cartCost = localStorage.getItem('totalCost');
console.log(cartItems);

if(cartItems && productContainer ) {
productContainer.innerHTML = '';
Object.values(cartItems).map(item =>{
  productContainer.innerHTML += `
  <div class="product">
       <ion-icon name="close-circle-outline"></ion-icon>
       <img src="./pic/${item.tag}.jpg" >
          <span>${item.name}</span>
      </div>
      <div  class="price">${item.price}</div>
      <div class="quantity">    
      <ion-icon name="caret-back-circle-outline"></ion-icon>
      <span>${item.inCart}</span>
      <ion-icon name="caret-forward-circle-outline"></ion-icon>
      </div>
      <div class="total">
      ${item.inCart * item.price}
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
}
}
// document.getElementById("dn").addEventListener("click", function(){ alert("Thank you so much for donated"); });
onLoadCartNumbers();
displayCart();



