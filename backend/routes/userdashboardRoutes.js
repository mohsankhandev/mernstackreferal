const express = require("express");
const HomeProducts = require("../controllers/HomeProducts");
const router = new express.Router();
const userdashboardController = require("../controllers/userdashboardqController");
const Authorization = require("../services/Authorization");
const productValidations = require("../validations/productValidations");

//coming from depositg component and dashboard service come  2 front end 
router.put(
    "/productdp",
    [Authorization.authorized],
    userdashboardController.updateProductdp
  );


 //coming from withdraw componnent  page 3 dashboard service front end 
     router.put(
    "/updateuserdeposit",
    [Authorization.authorized],
    userdashboardController.updateuserdeposit
  );

//coming from user dashboard componennt 1 dashboard service front end 
  router.get("/productsforref/:refcode", Authorization.authorized, userdashboardController.getref);


// get user for  withdraw page from user dashboard 4  dashboard service front end 
 router.get("/getuserdepandwit/:refcode", Authorization.authorized, userdashboardController.getuserdepandwit);

module.exports = router;
