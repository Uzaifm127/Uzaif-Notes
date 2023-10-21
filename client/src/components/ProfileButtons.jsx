import PropTypes from "prop-types";
import { useContext } from "react";
import { Context } from "../AppWrapper";

const buttonClass = "px-3 sm:px-5 py-2 sm:py-3 text-white rounded-lg mx-2";

const ProfileButtons = ({ logoutClick }) => {
  const {
    loading,
    setProfileToggle,
    profileToggle,
    deletePopup,
    editPopup,
    readPopup,
  } = useContext(Context);

  const toggleProfile = () => {
    setProfileToggle((prev) => !prev);
  };

  return (
    <section className="max-[350px]:flex max-[350px]:flex-col ml-auto max-[500px]:mr-0 mr-5">
      <button
        onClick={toggleProfile}
        className={buttonClass + " bg-slate-800 max-[350px]:mb-2"}
        disabled={loading || deletePopup || editPopup || readPopup}
      >
        Profile
      </button>

      <button
        disabled={
          loading || deletePopup || profileToggle || editPopup || readPopup
        }
        onClick={logoutClick}
        className={buttonClass + " bg-purple-700"}
      >
        Logout
      </button>
    </section>
  );
};

ProfileButtons.propTypes = {
  logoutClick: PropTypes.func,
};

export default ProfileButtons;
