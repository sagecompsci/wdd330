import { setLocalStorage, getLocalStorage, getParam,
  loadFooterHeader } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetail from "./ProductDetail.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetail(productId, dataSource);
product.init();

loadFooterHeader();


// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }
//
// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
