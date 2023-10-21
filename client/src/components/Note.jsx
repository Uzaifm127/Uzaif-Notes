import PropTypes from "prop-types";
import { useContext } from "react";
import { Context } from "../AppWrapper";

const Note = ({ title, description, deleteClick, editClick, readClick }) => {
  const { editPopup, deletePopup, readPopup, profileToggle, loading } =
    useContext(Context);

  return (
    <>
      <article className="m-3 bg-yellow-100 max-h-[20rem] w-[19rem] sm:w-[22rem] rounded-xl p-3 sm:p-4 flex flex-col">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <p className="text-md sm:text-lg my-5 overflow-hidden text-center">
          {description}
        </p>
        <div className="flex justify-between mt-auto">
          <button
            type="button"
            disabled={
              loading || editPopup || readPopup || deletePopup || profileToggle
            }
            className="px-3 sm:px-5 py-2 sm:py-3 ml-3 bg-emerald-500 text-white rounded-lg"
            onClick={readClick}
          >
            Read
          </button>
          <button
            type="button"
            disabled={
              loading || editPopup || readPopup || deletePopup || profileToggle
            }
            className="px-3 sm:px-5 py-2 sm:py-3 ml-3 bg-orange-500 text-white rounded-lg"
            onClick={editClick}
          >
            Edit
          </button>
          <button
            type="button"
            disabled={
              loading || editPopup || readPopup || deletePopup || profileToggle
            }
            className="px-3 sm:px-5 py-2 sm:py-3 mr-3 bg-[#ff0000] text-white rounded-lg"
            onClick={deleteClick}
          >
            Delete
          </button>
        </div>
      </article>
    </>
  );
};

Note.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
  readClick: PropTypes.func,
};

export default Note;
