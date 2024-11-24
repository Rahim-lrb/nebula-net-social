import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/loading/Loading";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState("");
  const [ load, setLoad ] = useState(false)

  const queryClient = useQueryClient();

  const validateForm = () => {
    if (!formData.email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email address";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6) return "Password must be at least 6 characters long";
    return null;
  };


  const { mutate: loginMutation, isLoading, isError, error } = useMutation({
    mutationFn: async ({ email, password }) => {
      setLoad(true)
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoad(false)
      if (isLoading) {
        console.log("loading login")
      }
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError("");
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-[#0c0e17] px-6 py-12">
      <div className="w-full max-w-md space-y-8 bg-[#1f2235] border border-gray-700 p-8 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 justify-center">
          <img src="/icon.png" alt="NebulaNet Logo" className="h-10 w-auto" />
          <h2 className="text-3xl font-extrabold text-center text-white">Log in </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <div className="flex items-center gap-2 mt-2 bg-[#232635] rounded-md border border-gray-600 px-4 py-2">
              <MdOutlineMail className="text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="flex-grow bg-transparent text-gray-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <div className="flex items-center gap-2 mt-2 bg-[#232635] rounded-md border border-gray-600 px-4 py-2">
              <MdPassword className="text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="flex-grow bg-transparent text-gray-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <button type="submit" className={`w-full flex justify-center items-center rounded-md bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-white font-medium transition duration-200 ${load ? "opacity-75" : ""} disabled:bg-indigo-800`} disabled={load}>
              {load ? <Loading /> : "Log in"}
            </button>
            {validationError && <p className="text-red-400 text-sm mt-2">{validationError}</p>}
            {isError && <p className="text-red-400 text-md mt-2">{error.message}</p>}
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400"><Link to="/signup" className="text-indigo-500 hover:text-indigo-400">Don't have an account? Sign up</Link></div>
      </div>

      <div className="flex-col justify-center text-lg gap-4 font-bold">
        some accounts to test:
        <p>rahim.laribi16@gmail.com ------- 123azeqsd</p>
        <p>moh123@gmail.com ------- 123azeqsd</p>
      </div>
    </div>
  );
};

export default Login;
