import { getParam, loadFooterHeader } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetail from "./ProductDetail.mjs";

loadFooterHeader();

const dataSource = new ExternalServices("tents");
const productId = getParam("product");

const product = new ProductDetail(productId, dataSource);
product.init();



