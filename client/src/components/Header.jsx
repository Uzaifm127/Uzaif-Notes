import headerIcon from "../assets/header-icon.png";
import { useContext } from "react";
import { Context } from "../AppWrapper";
import AuthButtons from "./AuthButtons";
import ProfileButtons from "./ProfileButtons";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { authenticated, setAuthenticated, setLoading } = useContext(Context);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setAuthenticated(true);
    }
    setLoading(false);
  };

  return (
    <>
      <header className="flex items-center p-5 w-full">
        <img
          className=" h-12 mr-3 sm:mr-5"
          src={headerIcon}
          alt="header-icon"
        />
        <h1 className="text-xl sm:text-2xl text-slate-500">Notes</h1>
        {authenticated ? (
          <ProfileButtons logoutClick={handleLogout} />
        ) : (
          <AuthButtons />
        )}
      </header>
      <hr />
    </>
  );
};

export default Header;
