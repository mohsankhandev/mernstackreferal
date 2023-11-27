const express = require("express");
// const HomeProducts = require("../controllers/HomeProducts");
const router = new express.Router();
const Product = require("../controllers/Product");
const Authorization = require("../services/Authorization");
const productValidations = require("../validations/productValidations");
router.post("/create-product", [Authorization.authorized], Product.create);
router.get("/products/:page", Authorization.authorized, Product.get);
router.get("/productspdspot/:page", Authorization.authorized, Product.getpd);
router.get("/productspdeposit/:page", Authorization.authorized, Product.getpddespot);
router.get("/user/search/:email", Authorization.authorized, Product.getsearchuserdata);



//3
// router.get("/productsforref/:refcode", Authorization.authorized, Product.getref);

//4
// router.get("/getuserdepandwit/:refcode", Authorization.authorized, Product.getuserdepandwit);

router.get("/product/:id", Product.getProduct);
// router.put(
//   "/product",
//   [Authorization.authorized, productValidations],
//   Product.updateProduct
// );

router.put(
  "/product",
  [Authorization.authorized],
  Product.updateProduct
);





router.put(
  "/withdrawstatuscgro",
  [Authorization.authorized],
  Product.updateWithdrawalStatus
);

router.put(
  "/depositstatuscgro",
  [Authorization.authorized],
  Product.updateDepositStatus
);
//1
// router.put(
//   "/productdp",
//   [Authorization.authorized],
//   Product.updateProductdp
// );
//2
// router.put(
//   "/updateuserdeposit",
//   [Authorization.authorized],
//   Product.updateuserdeposit
// );


// updateuserdeposit



router.delete("/delete/:id", Authorization.authorized, Product.deleteProduct);
// router.get("/cat-products/:name/:page?", HomeProducts.catProducts);
// router.get("/search-products/:keyword/:page?", HomeProducts.catProducts);


module.exports = router;
