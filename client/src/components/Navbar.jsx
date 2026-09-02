import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-4 shadow">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

        <Link
          to="/dashboard"
          className="text-2xl font-bold"
        >
          CRM System
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-3">

          <Link
            to="/dashboard"
            className="font-semibold hover:text-gray-200"
          >
            Dashboard
          </Link>

          <Link
            to="/customers"
            className="font-semibold hover:text-gray-200"
          >
            Customers
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;