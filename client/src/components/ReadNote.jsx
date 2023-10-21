import { useContext } from "react";
import cross from "../assets/close.png";
import { Context } from "../AppWrapper";

const EditNote = () => {
  const { setReadPopup, clickedNoteContent } = useContext(Context);

  const closeReadPopup = () => setReadPopup(false);

  return (
    <article className="border w-[80vw] h-[90vh] p-5 sm:p-7 rounded-xl fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
      <img
        className="h-5 absolute top-0 right-0 -translate-x-full translate-y-full cursor-pointer"
        onClick={closeReadPopup}
        src={cross}
        alt="close"
      />
      <h1 className="text-2xl font-bold text-center">
        {clickedNoteContent.title}
      </h1>
      <textarea
        cols={100}
        className="outline-none w-full h-[89%] resize-none mt-5"
        readOnly
      >
        {clickedNoteContent.description}
      </textarea>
    </article>
  );
};

export default EditNote;
