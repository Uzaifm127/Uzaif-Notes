import { useContext } from "react";
import cross from "../assets/close.png";
import { Context } from "../AppWrapper";
import Loader from "./Loader";
import axios from "axios";
import toast from "react-hot-toast";

const buttonClass = "px-3 sm:px-5 py-2 sm:py-3 text-white rounded-lg mx-2";

const EditNote = () => {
  const {
    setDeletePopup,
    setProfileToggle,
    setAuthenticated,
    setLoading,
    loading,
    user,
  } = useContext(Context);

  const deleteAccount = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/user/delete/${user._id}`,
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
    setDeletePopup(false);
    setProfileToggle((prev) => !prev);
  };

  const closeDeletePopup = () => {
    setDeletePopup(false);
    setProfileToggle((prev) => !prev);
  };

  return (
    <article className="border min-w-[19rem] min-[500px]:w-[22rem] sm:w-96 p-7 rounded-xl fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
      <Loader />
      <img
        className="h-5 absolute top-0 right-0 -translate-x-full translate-y-full cursor-pointer"
        onClick={closeDeletePopup}
        src={cross}
        alt="close"
      />
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        Delete account
      </h1>
      <p className="my-10 text-lg sm:text-xl">
        Do you want to permanently delete your account?
      </p>
      <article className="w-full flex justify-between">
        <button
          type="button"
          onClick={closeDeletePopup}
          disabled={loading}
          className={buttonClass + " bg-emerald-400"}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={deleteAccount}
          className={buttonClass + " bg-[#ff0000]"}
          type="button"
        >
          Delete
        </button>
      </article>
    </article>
  );
};

export default EditNote;
