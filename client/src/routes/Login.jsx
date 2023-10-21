import { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../AppWrapper";
import Loader from "../components/Loader";

const inputClass =
  "outline-none w-full border-none sm:px-4 px-3 sm:py-3 py-2 rounded-md sm:w-80 w-72 bg-slate-100";
const labelClass = "mb-1";

const Register = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { authenticated, setAuthenticated, loading, setLoading } =
    useContext(Context);

  const inputHandler = (event) => {
    const { name, value } = event.target;

    setInput((preValue) => ({ ...preValue, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { email, password } = input;

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/login`,
        {
          email,
          password,
        },
        { headers: "Content-Type: application/json", withCredentials: true }
      );
      toast.success(response.data.message);
      setLoading(false);
      setAuthenticated(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setAuthenticated(false);
      setLoading(false);
    }
  };

  if (authenticated) return <Navigate to={"/"} />;

  return (
    <main className="h-screen w-full flex items-center justify-center">
      <Loader />
      <form
        onSubmit={submitHandler}
        className="sm:p-8 mx-5 w-[22rem] sm:w-auto max-[480px]:w-[80vw] p-5 rounded-2xl bg-yellow-200"
      >
        <h1 className="text-3xl font-bold text-center sm:mb-10 mb-7">Log in</h1>
        <div className="my-5 flex flex-col">
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            value={input.email}
            className={inputClass}
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            name="email"
            onChange={inputHandler}
            disabled={loading}
            required
          />
        </div>
        <div className="my-5 flex flex-col">
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <input
            value={input.password}
            className={inputClass}
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="off"
            name="password"
            onChange={inputHandler}
            disabled={loading}
            required
          />
        </div>
        <div className="text-center mt-7">
          <button
            disabled={loading}
            type="submit"
            className="px-5 py-3 bg-slate-800 text-white rounded-lg"
          >
            Log in
          </button>
        </div>
        <p className="text-center sm:my-2">or</p>
        <p className="text-center">
          Don&apos;t have an account.{" "}
          <Link className="underline" to={loading ? "/login" : "/register"}>
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
