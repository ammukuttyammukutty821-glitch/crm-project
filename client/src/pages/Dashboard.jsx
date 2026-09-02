import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchCustomers = async () => {
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
        console.log(
          error.response?.data?.message ||
            "Failed to fetch customers"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">

          {/* Welcome */}
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h1 className="text-3xl font-bold text-blue-600">
              Welcome to CRM Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome, {user.name || "User"}!
            </p>

            <p className="text-gray-500 mt-1">
              Manage your customers easily from this dashboard.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Total Customers */}
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-500 text-lg">
                Total Customers
              </p>

              <h2 className="text-4xl font-bold text-blue-600 mt-3">
                {loading ? "..." : customers.length}
              </h2>
            </div>

            {/* CRM Status */}
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-500 text-lg">
                CRM Status
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-3">
                Active
              </h2>
            </div>

            {/* Account */}
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-500 text-lg">
                Account
              </p>

              <h2 className="text-xl font-bold text-gray-700 mt-3">
                {user.email || "User Account"}
              </h2>
            </div>

          </div>

          {/* Quick Access */}
          <div className="bg-white rounded-2xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Quick Access
            </h2>

            <p className="text-gray-600">
              Use the Customers section to add, update,
              view and delete customer records.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;