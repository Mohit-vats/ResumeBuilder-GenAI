import {Link, useNavigate} from "react-router-dom";

import Button from "../components/Button";
import InputField from "../components/InputField";

const register = () => {
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
        <form className="space-y-5">

          <InputField
            label="Username"
            type="text"
            name="username"
            placeholder="Enter your username"
            required
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />

          <InputField
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