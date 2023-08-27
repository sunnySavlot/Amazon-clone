import { cart } from "../data/cart.js";

const productsGrid = document.querySelector(".js-products-grid"); // in that we will render all of our products
let productsHTML = ""; // this will have all the html that we are going to dynamically generate

// looping products array to dynamically generate html for rendering
products.forEach((product) => {
  // products array is coming from 'products.js'
  productsHTML += `
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src=${product.image}>
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart  js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
        product.id
      }">
        Add to Cart
      </button>
    </div>
  `;
});

productsGrid.innerHTML = productsHTML;

let timerId //  for clearing the setTimer for "added" message after add to cart click

document
  .querySelectorAll(".js-add-to-cart") // selecting all of the 'add to cart' buttons
  .forEach((button) => { // looping those selected buttons
    button.addEventListener("click", () => { // setting up click event listener on all of the 'add to cart' buttons
      // const productId = button.dataset.productId; // to find the id of the product related to the button we used html attribute 'data- '
      const {productId} = button.dataset

      // select input
      const selectInput = document.querySelector(
        `.js-quantity-selector-${productId}`
      );

      let matchingItem;
      let quantityCounter = 0;

      // For 'added' message when adding items to cart 
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)
      addedMessage.classList.add('added-to-cart-visible')

      clearTimeout(timerId)
      timerId = setTimeout(() => { // remove the "Added" message after 2 seconds
        addedMessage.classList.remove('added-to-cart-visible')
      }, 2000);

      cart.forEach((item) => { // handling the case when same item is added to cart multiple times, thus incresing the quantity
        if (productId === item.productId) {
          matchingItem = item; // first we find the matching item
        }
        quantityCounter += item.quantity; // calculate the quantity of item
      });

      if (matchingItem) { // If there is matching item then it will increase the quantity of item
        matchingItem.quantity += Number(selectInput.value); // adding quantity according to 'select' input value even when it is duplicate item
      } else {
        cart.push({ // if not duplicate then it will push the new item object in the cart array
          productId,
          quantity: Number(selectInput.value), // it addes quantity to the cart array according to the 'select' input's value
        });
      }
      // console.log(cart);

      let cartQuantity = 0; // total items in the cart calculator
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      //DOM for cart total quantity
      document.querySelector(".js-cart-quantity").textContent = cartQuantity;
    });
  });
