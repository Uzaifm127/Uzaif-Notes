import { useContext } from "react";
import { Context } from "../AppWrapper";

const Profile = () => {
  const { user, setDeletePopup, deletePopup } = useContext(Context);

  const showDeletePopup = () => {
    setDeletePopup((prev) => !prev);
  };

  return (
    <article className="absolute top-1/3 z-10 right-1/2 sm:right-0 bg-slate-100 translate-x-1/2 -translate-y-1/2 sm:-translate-x-1/3 sm:-translate-y-1/2 p-4 rounded-lg w-64 flex flex-col items-center">
      <h2 className="text-2xl text-center font-bold">Welcome {user.name}</h2>
      <p className="my-5 text-center">{user.email}</p>
      <p className="text-center">
        Joined at {new Date(user.createdAt).toLocaleDateString()}
      </p>
      <button
        onClick={showDeletePopup}
        disabled={deletePopup}
        className="px-5 py-3 mr-3 bg-[#ff0000] text-white rounded-lg mt-5"
      >
        Delete account
      </button>
    </article>
  );
};

export default Profile;
