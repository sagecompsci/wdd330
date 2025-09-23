import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetail{
  constructor(productId, dataSouce) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSouce;
  }

  async init(){
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(this.product);
    document.getElementById("add-to-cart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart(){
    const items = getLocalStorage("so-cart") || [];
    items.push(this.product);
    setLocalStorage("so-cart", items);
  }

  renderProductDetails(product){
    document.title = `Sleep Outside | ${product.NameWithoutBrand}`;

    document.getElementById("productBrand").textContent = product.Brand.Name;
    document.getElementById("productName").textContent = product.NameWithoutBrand;

    const image = document.getElementById("productImage")
    image.src = product.Images.PrimaryExtraLarge;
    image.alt = product.Name;

    document.getElementById("productPrice").textContent = `$${product.FinalPrice}`
    document.getElementById("productColor").textContent = product.Colors.ColorName;
    document.getElementById("productDescription").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("add-to-cart").dataset.id = product.Id

  }

}
