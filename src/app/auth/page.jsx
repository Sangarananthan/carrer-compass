"use client";
import { supabase } from "../utils/supabase-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });

      if (error) {
        console.error("Sign Up Error:", error.message);
        return;
      }
    
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        console.error("Error signing in:", error);
        return;
      }
      const session = data?.session;
      if (session?.access_token) {
        const expires = new Date(Date.now() + session.expires_in * 1000);
        document.cookie = `sb-access-token=${
          session.access_token
        }; expires=${expires.toUTCString()}; path=/`;
      }
      router.push("/");
      console.log("Sign In Payload:", {
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br relative  mb-8 flex items-center justify-center">
            <Image
              src="/images/appLogo.png"
              alt="Logo"
              fill
              className="object-contain rounded-[20px] scale-105"
            />
          </div>
          <h1 className="text-4xl xl:text-5xl font-light mb-6 leading-tight">
            Welcome to <br />
            <span className="font-medium"> Career Compass</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Experience the future of productivity with our minimalist design and
            powerful features.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br relative  mb-8 flex items-center justify-center">
              <Image
                src="/images/appLogo.png"
                alt="Logo"
                fill
                className="object-contain rounded-[20px] scale-95"
              />
            </div>
            <h2 className="text-2xl font-light">Career Compass</h2>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-light mb-2">
              {isSignUp ? "Create account" : "Sign in"}
            </h2>
            <p className="text-gray-400">
              {isSignUp ? "Join us today" : "Welcome back"}
            </p>
          </div>

          <div className="space-y-6">
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-white placeholder-gray-500"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-white placeholder-gray-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-white placeholder-gray-500"
                placeholder="Enter your password"
              />
            </div>

            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSignUp ? "Create account" : "Sign in"}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={toggleAuthMode}
                className="text-blue-400 hover:text-blue-300 ml-2 font-medium transition-colors duration-200"
              >
                {isSignUp ? "Sign in" : "Create account"}
              </button>
            </p>
          </div>

          {/* Footer Links */}
          <div className="mt-12 flex justify-center space-x-6 text-sm text-gray-500">
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Help
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
