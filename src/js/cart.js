import {getLocalStorage, setLocalStorage, loadFooterHeader} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <span class="remove" data-id="${index}">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeFromCart(index){
  const items = getLocalStorage("so-cart");
  items.splice(index, 1);
  setLocalStorage("so-cart", items);
}

function removeButton(){
  const buttons = document.querySelectorAll(".remove");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.id);
      location.reload();
    })
  })

}


loadFooterHeader();

renderCartContents();

removeButton();

