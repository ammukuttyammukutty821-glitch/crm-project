import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (name.trim().length < 3) {
      setMessage("Name must contain at least 3 characters");
      return;
    }

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: name.trim(),
          email,
          password,
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">

        {/* Heading */}
        <div className="text-center mb-8">

          <div className="text-5xl mb-3">
            👥
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            CRM System
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>

        </div>

        {/* Message */}
        {message && (
          <div className="mb-5 p-3 rounded-lg bg-blue-50 text-blue-700 text-center font-medium">
            {message}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border border-gray-300 p-3 rounded-lg pr-20 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-3 text-blue-600 font-semibold"
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            <p className="text-sm text-gray-500 mt-2">
              Password must contain at least 6 characters.
            </p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold transition"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-bold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;