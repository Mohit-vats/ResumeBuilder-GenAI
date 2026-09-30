import {Link, useNavigate} from "react-router-dom";

import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
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
    return <div className="flex min-h-screen items-center justify-center bg-[#0B0E14] text-sm text-[#8B94A3]">Loading...</div>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0E14] px-4 py-12 font-sans antialiased">

      <div className="w-full max-w-md rounded-lg border border-[#1B212B] bg-[#0F131A]/80 p-8 shadow-2xl shadow-black/20 sm:p-10">
        {loginError &&( <div className="mb-8 text-center">
          <p className="mt-2 text-sm text-rose-400">
            Invalid email or password
          </p>
        </div>)}
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-[#E7E9EC]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#8B94A3]">
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
              className="text-sm font-medium text-[#E8AA3C] transition-colors hover:text-[#F0B959]"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit">
            Login
          </Button>

        </form>

        {/* Register */}
        <p className="mt-8 text-center text-sm text-[#8B94A3]">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-[#E8AA3C] transition-colors hover:text-[#F0B959]"
          >
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
