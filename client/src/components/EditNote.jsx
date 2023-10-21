import { useContext, useState } from "react";
import cross from "../assets/close.png";
import { Context } from "../AppWrapper";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

const EditNote = () => {
  const {
    setEditPopup,
    noteId,
    setNoteId,
    loading,
    setLoading,
    setNotesNotification,
    clickedNoteContent,
  } = useContext(Context);
  const [input, setInput] = useState({
    title: clickedNoteContent.title,
    description: clickedNoteContent.description,
  });

  const handleInput = (event) => {
    const { name, value } = event.target;

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const editNote = async (event) => {
    event.preventDefault();
    if (noteId) {
      const { title, description } = input;

      setLoading(true);
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_SERVER}/api/v1/note/edit/${noteId}`,
          { title, description },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        toast.success(response.data.message);
        setLoading(false);
        setNotesNotification((prev) => !prev);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
      setNoteId();
      setEditPopup(false);
    }
    return;
  };

  const closeEditPopup = () => setEditPopup(false);

  return (
    <article className="border p-5 sm:p-7 rounded-xl max-[580px]:w-[19rem] w-[22rem] fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
      <Loader />
      <img
        className="h-5 absolute top-0 right-0 -translate-x-full translate-y-full cursor-pointer"
        onClick={closeEditPopup}
        disabled={loading}
        src={cross}
        alt="close"
      />
      <h1 className="text-2xl text-center">Edit a note</h1>
      <form onSubmit={editNote}>
        <div className="flex flex-col my-5">
          <label htmlFor="title">title</label>
          <input
            className="rounded-lg mt-2 border-2 outline-none p-2"
            value={input.title}
            onChange={handleInput}
            name="title"
            id="title"
            type="text"
          />
        </div>
        <div className="flex flex-col my-5">
          <label htmlFor="description">Description</label>
          <textarea
            value={input.description}
            onChange={handleInput}
            className="resize-none rounded-lg mt-2 border-2 outline-none p-2 w-full"
            name="description"
            id="description"
            rows="7"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            disabled={loading}
            className="cursor-pointer bg-sky-400 px-4 py-2 rounded-md text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </article>
  );
};

export default EditNote;
