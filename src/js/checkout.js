import { loadFooterHeader } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadFooterHeader();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document.querySelector("#checkout-submit").addEventListener("click", (e) => {
  e.preventDefault();
  myCheckout.checkout();
})
