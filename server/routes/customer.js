const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

/**
 *  Customer Routes
 */
router.get("/", customerController.homepage);

router.get("/add", customerController.addCustomer);
router.get("/about", customerController.about);
router.post("/add", customerController.postCustomer);
router.get("/view/:id", customerController.viewCustomer);
router.get("/edit/:id", customerController.editCustomer);
router.put("/edit/:id", customerController.editPost);
router.delete("/edit/:id", customerController.deletePost);
router.post("/search", customerController.searchCustomers);
module.exports = router;
