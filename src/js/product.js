import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetail from "./ProductDetail";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetail(productId, dataSource);
product.init();

console.log(dataSource.findProductById(productId));



// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
