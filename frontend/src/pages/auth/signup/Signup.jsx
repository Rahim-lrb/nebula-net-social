import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../../../components/loading/Loading";

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });
    const [ load, setLoad ] = useState(false)


    const { mutate: signupMutation, isLoading, isError, error } = useMutation({
        mutationFn: async ({ fullName, username, email, password }) => {
            setLoad(true)
            const res = await fetch(`/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullName, username, email, password }),
            });

            const data = await res.json();
            setLoad(false)

            if (!res.ok) {
                throw new Error(data.message || "Signup failed");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["authUser"]);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        signupMutation(formData);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex h-screen flex-col justify-center px-6 py-8 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex items-center space-x-4 justify-center">
                    <img src="/icon.png" alt="NebulaNet Logo" className="h-10 w-auto" />
                    <h2 className="text-3xl font-extrabold text-center text-white">Create Account</h2>
                </div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-[#232635] border border-gray-700 p-10 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                            Full Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                                className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm sm:leading-6 px-4"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm sm:leading-6 px-4"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm sm:leading-6 px-4"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm sm:leading-6 px-4"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${load ? "opacity-75" : ""} disabled:bg-indigo-800`} disabled={load} >
                            {load ? <Loading /> : "Sign up"}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    <Link to="/login" className="text-indigo-500 hover:text-indigo-400">You have an account?</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
