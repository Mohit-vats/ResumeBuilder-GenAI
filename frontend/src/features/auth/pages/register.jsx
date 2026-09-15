import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import { authUser } from "../hooks/useAuth";

import Button from "../components/Button";
import InputField from "../components/InputField";

const register = () => {

  const navigate = useNavigate();
  const {loading , handleRegister} = authUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [registerError, setRegisterError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError(null);
    const data = await handleRegister(username, email, password);
    console.log("REGISTER RESPONSE:", data);
    if (data.user){
      navigate("/login");
    }else {
      if (data.message === "Username already exists") setRegisterError("Username");
      else if (data.message === "Email already registered") setRegisterError("Email");
    }
  }
  return (
     <div className="min-h-screen bg-gray-100 px-4 flex items-center justify-center">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome New User
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Register to start building your resume
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <InputField
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            type="text"
            name="username"
            placeholder="Enter your username"
            required
          />
          {registerError === "Username" &&( <div className="mb-8 text-center">
            <p className="mt-2 text-l text-red-500">
              Username already taken.
            </p>
          </div>)}

          <InputField
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
          {registerError === "Email" &&( <div className="mb-8 text-center">
            <p className="mt-2 text-l text-red-500">
              Email alrwady registered.
            </p>
          </div>)}

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
            Register
          </Button>

        </form>

        {/* Register */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Log in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default register