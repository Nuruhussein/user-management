const Customer = require("../models/Customer");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const locals = {
    title: "NodeJs",
    description: "Free NodeJs User Management System",
  };

  let perPage = 3;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Customer.countDocuments();

    res.render("index", {
      locals,
      count,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages: req.flash("info"),
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * New Customer Form
 */
exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer - NodeJs",
    description: "Free NodeJs User Management System",
  };

  res.render("customer/add", locals);
};

/**
 * POST /
 * Create New Customer
 */
exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added.");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

//add
exports.addCustomer = (req, res) => {
  res.render("customer/add");
};
/**
 * GET /view/:id
 * view customer
 */
exports.viewCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer - NodeJs",
    description: "Free NodeJs User Management System",
  };

  // console.log(req.params);
  try {
    const customer = await Customer.findById(req.params.id);
    // console.log(customer);
    res.render("customer/view", { locals, customer });
  } catch (error) {
    console.log(error);
  }
};
exports.editCustomer = async (req, res) => {
  const locals = {
    title: "edit Customer - NodeJs",
    description: "Free NodeJs User Management System",
  };

  // console.log(req.params);
  try {
    const customer = await Customer.findById(req.params.id);
    // console.log(customer);
    res.render("customer/edit", { locals, customer });
  } catch (error) {
    console.log(error);
  }
};
/**
 * GET /
 * Update Customer Data
 */
exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};
exports.deletePost = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    await res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "Free NodeJs User Management System",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};
/**
 * Get /
 * Search Customer Data
 */
exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
