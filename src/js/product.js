import { getParam, loadFooterHeader } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetail from "./ProductDetail.mjs";

loadFooterHeader();

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetail(productId, dataSource);
product.init();



