const validateCustomer = (req, res, next) => {
  const { name, email, phone, company, address } = req.body;

  if (!name || !email || !phone || !company || !address) {
    return res.status(400).json({
      message: "All customer fields are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email",
    });
  }

  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      message: "Phone number must contain exactly 10 digits",
    });
  }

  next();
};

module.exports = validateCustomer;