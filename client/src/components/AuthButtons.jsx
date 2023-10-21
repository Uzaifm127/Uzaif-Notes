import { Link } from "react-router-dom";

const buttonClass = "px-3 sm:px-5 py-2 sm:py-3 text-white rounded-lg mx-2";

const AuthButtons = () => {
  return (
    <section className="ml-auto max-[500px]:mr-0 mr-5">
      <Link to={"/register"}>
        <button type="button" className={buttonClass + " bg-emerald-400"}>
          Sign Up
        </button>
      </Link>
      <Link to={"/login"}>
        <button className={buttonClass + " bg-slate-800"} type="button">
          Log in
        </button>
      </Link>
    </section>
  );
};

export default AuthButtons;
