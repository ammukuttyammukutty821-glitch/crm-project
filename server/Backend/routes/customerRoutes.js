const express = require("express");

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const protect = require("../middleware/auth");
const validateCustomer = require("../middleware/validate");
const router = express.Router();

// All customer routes are protected
router.use(protect);

// Create customer
router.post("/", validateCustomer, createCustomer);

// Get all customers
router.get("/", getCustomers);

// Get single customer
router.get("/:id", getCustomerById);

// Update customer
router.put("/:id", validateCustomer, updateCustomer);

// Delete customer
router.delete("/:id", deleteCustomer);

module.exports = router;