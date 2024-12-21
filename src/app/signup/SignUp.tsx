"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const SignUp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("new-username") as string;
    const email = formData.get("new-email") as string;
    const password = formData.get("new-password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://shopping-cart-backend-ten.vercel.app/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setError(null);

        // Redirect with delay
        setTimeout(() => {
          router.push("/"); // Redirect to home page
        }, 1000); // 1 second delay
      } else {
        setError(result.error || "Something went wrong");
        setSuccess(null);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Internal server error");
      setSuccess(null);
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div
        id="sign-up-form"
        className={`w-full max-w-sm mx-auto p-6 md:p-8 rounded-lg shadow-2xl bg-white dark:bg-primaryDark dark:text-white transition-all duration-500 ease-in-out my-6
          ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-44 opacity-0"
          }
        `}
      >
        <div className="mb-6">
          <h2 className="font-bold text-2xl text-gray-700 dark:text-gray-200 text-center">
            Sign Up Form
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="new-username" className="sr-only">
              Username
            </label>
            <input
              type="text"
              id="new-username"
              name="new-username"
              placeholder="Username"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md transition duration-300 focus:outline-none focus:border-green-500 mb-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-700"
            />
            <label htmlFor="new-email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="new-email"
              name="new-email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md transition duration-300 focus:outline-none focus:border-green-500 mb-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-700"
            />
            <label htmlFor="new-password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md transition duration-300 focus:outline-none focus:border-green-500 mb-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-700"
            />
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md transition duration-300 focus:outline-none focus:border-green-500 mb-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-700"
            />
          </div>
          <div className="text-center">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
          </div>
          <div className="form-group mb-4">
            <input
              type="submit"
              value="Sign Up"
              className="w-full px-4 py-2 bg-primary text-white rounded-md cursor-pointer transition duration-300 hover:bg-gray-700"
            />
          </div>
          <div className="or mb-4 flex items-center justify-center space-x-6">
            <div className="w-1/2 h-px bg-gray-300 dark:bg-gray-400"></div>
            <span className="text-base font-bold text-gray-700 dark:text-gray-300">
              OR
            </span>
            <div className="w-1/2 h-px bg-gray-300 dark:bg-gray-400"></div>
          </div>
          <div className="social-login mb-4">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md transition duration-200 hover:bg-gray-100 mb-2 dark:border-gray-700 dark:hover:bg-gray-600"
            >
              <i className="fab fa-google mr-2 text-gray-700 dark:text-gray-200"></i>
              <span className="text-gray-700 dark:text-gray-200">
                Continue with Google
              </span>
            </button>
          </div>
          <p className="create-account text-center mb-4 text-gray-700 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-green-500">
              Log In
            </Link>
          </p>
          <hr className="border-t border-gray-300 dark:border-gray-600 my-4" />
          <div className="terms text-xs text-gray-700 dark:text-gray-400">
            By signing up, you agree to Terms and policy.
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
