import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement){
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  })
}

function packageItems(items){
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess{
  constructor(key){
    this.key = key;
    this.subTotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
    this.list = [];
  }

  async init(){
    this.list = getLocalStorage(this.key);
    this.calculateSummary();
  }

  calculateSummary(){
    const prices = this.list.map((item) => item.FinalPrice);
    this.subTotal = prices.reduce((sum, item) => sum + item);
    this.tax = this.subTotal * 0.06;
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.total = this.subTotal + this.tax + this.shipping;

    this.displaySummary();
  }

  displaySummary(){
    document.getElementById("subtotal").textContent = this.subTotal;
    document.getElementById("tax").textContent = this.tax;
    document.getElementById("shipping").textContent = this.shipping;
    document.getElementById("total").textContent = this.total;
  }

  async checkout(){
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.total;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log(response);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err){
      removeAllAlert();
      for (let message in err.message){
        alertMessage(err.message[message]);
      }

      console.log(err);

    }
  }
}
