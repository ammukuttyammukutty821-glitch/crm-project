import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  const fetchCustomers = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/customers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomers(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to fetch customers"
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchCustomers, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchCustomers]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!/^[0-9]{10}$/.test(form.phone)) {
      setMessage("Phone number must contain exactly 10 digits");
      return;
    }

    try {
      if (editingId) {
        const response = await axios.put(
          `http://localhost:5000/api/customers/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(response.data.message);
        setEditingId(null);
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/customers",
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(response.data.message);
      }

      clearForm();
      fetchCustomers();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Operation failed"
      );
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer._id);

    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      address: customer.address,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/customers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      fetchCustomers();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to delete customer"
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    clearForm();
    setMessage("");
  };

  // Search + Filter
  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      customer.name.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText) ||
      customer.phone.includes(searchText);

    const matchesCompany =
      companyFilter === "" ||
      customer.company === companyFilter;

    return matchesSearch && matchesCompany;
  });

  const companies = [
    ...new Set(customers.map((customer) => customer.company)),
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-8">
            Customer Management
          </h1>

          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center mb-6">
              {message}
            </div>
          )}

          {/* Add / Update Form */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-5">
              {editingId
                ? "Update Customer"
                : "Add Customer"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="10 Digit Phone"
                value={form.phone}
                onChange={handleChange}
                maxLength="10"
                className="border border-gray-300 p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="company"
                placeholder="Company"
                value={form.company}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg md:col-span-2"
                required
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
              >
                {editingId
                  ? "Update Customer"
                  : "Add Customer"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-5 rounded-2xl shadow-lg mb-8">

            <h2 className="text-2xl font-bold mb-4">
              Search Customers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg"
              />

              <select
                value={companyFilter}
                onChange={(e) =>
                  setCompanyFilter(e.target.value)
                }
                className="border border-gray-300 p-3 rounded-lg"
              >
                <option value="">
                  All Companies
                </option>

                {companies.map((company) => (
                  <option
                    key={company}
                    value={company}
                  >
                    {company}
                  </option>
                ))}
              </select>

            </div>

            {(search || companyFilter) && (
              <button
                onClick={() => {
                  setSearch("");
                  setCompanyFilter("");
                }}
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Clear Search
              </button>
            )}
          </div>

          {/* Customer List */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">
              Customer List
            </h2>

            <span className="text-gray-600">
              {filteredCustomers.length} customer(s)
            </span>
          </div>

          {loading ? (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              Loading customers...
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              No customers found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {filteredCustomers.map((customer) => (
                <div
                  key={customer._id}
                  className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold text-blue-600 mb-3">
                    {customer.name}
                  </h3>

                  <p className="mb-1">
                    <strong>Email:</strong>{" "}
                    {customer.email}
                  </p>

                  <p className="mb-1">
                    <strong>Phone:</strong>{" "}
                    {customer.phone}
                  </p>

                  <p className="mb-1">
                    <strong>Company:</strong>{" "}
                    {customer.company}
                  </p>

                  <p className="mb-1">
                    <strong>Address:</strong>{" "}
                    {customer.address}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => handleEdit(customer)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(customer._id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Customers;