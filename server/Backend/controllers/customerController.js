const Customer = require("../models/Customer");

// CREATE Customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, address } = req.body;

    const customer = await Customer.create({
      name,
      email,
      phone,
      company,
      address,
    });

    res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
};

// GET All Customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};

// GET Single Customer
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer",
      error: error.message,
    });
  }
};

// UPDATE Customer
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

// DELETE Customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};