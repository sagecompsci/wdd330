import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetail{
  constructor(productId, dataSouce) {
    this.productId = productId;
    this.dataSource = dataSouce;
    this.product = {};
  }

  async init(){
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(this.product);
    document.getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart(product){
    const items = getLocalStorage("so-cart") || [];
    items.push(product);
    setLocalStorage("so-cart", items);
  }

  renderProductDetails(product){
    document.title = `Sleep Outside | ${product.NameWithoutBrand}`;

    document.getElementById("productBrand").textContent = product.Brand.Name;
    document.getElementById("productName").textContent = product.NameWithoutBrand;

    const image = document.getElementById("productImage")
    image.src = product.Image;
    image.alt = product.Name;

    document.getElementById("productPrice").textContent = `$${product.FinalPrice}`
    document.getElementById("productColor").textContent = product.Colors.ColorName;
    document.getElementById("productDesription").textContent = product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id

  }

}
