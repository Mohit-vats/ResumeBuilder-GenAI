import {Link, useNavigate} from "react-router-dom";

import Button from "../components/Button";
import InputField from "../components/InputField";
import { authUser } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const {loading , handleLogin} = authUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(false);
    const user = await handleLogin(email, password);
    if (user){
      navigate("/");
    }else{
      setLoginError(true);
    }

  }

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 flex items-center justify-center">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {loginError &&( <div className="mb-8 text-center">
          <p className="mt-2 text-l text-red-500">
            Invalid email or password
          </p>
        </div>)}
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue building your resume
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <InputField
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />

          <InputField
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit">
            Login
          </Button>

        </form>

        {/* Register */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;