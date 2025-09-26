import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import {loadFooterHeader, getParam} from "./utils.mjs";

loadFooterHeader();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list")
const productList = new ProductList(category, dataSource, element);

productList.init();

