import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../AppWrapper";
import Note from "../components/Note";
import DeleteAccount from "../components/DeleteAccount";
import Loader from "../components/Loader";
import Profile from "../components/Profile";
import EditNote from "../components/EditNote";
import ReadNote from "../components/ReadNote";

const Home = () => {
  const [isExpand, setExpand] = useState(false);
  const [notes, setNotes] = useState([]);

  const {
    setLoading,
    loading,
    authenticated,
    note,
    setNote,
    setEditPopup,
    setNoteId,
    notesNotification,
    setNotesNotification,
    profileToggle,
    deletePopup,
    setClickedNoteContent,
    readPopup,
    editPopup,
    setReadPopup,
  } = useContext(Context);

  useEffect(() => {
    authenticated &&
      axios
        .get(`${import.meta.env.VITE_SERVER}/api/v1/note/all`, {
          withCredentials: true,
        })
        .then((res) => setNotes(res.data.notes));
  }, [notesNotification, authenticated]);

  const expandInput = () => {
    setExpand(true);
  };

  const collapseInput = async (event) => {
    const { relatedTarget } = event;
    if (relatedTarget) {
      return;
    }

    setExpand(false);

    const { title, description } = note;

    if (!description && !title) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/note/add`,
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setNotesNotification((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setExpand(true);
    }
    setNote({
      title: "",
      description: "",
    });
    setLoading(false);
  };

  const deleteNote = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/note/remove/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setNotesNotification((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  return (
    <>
      {deletePopup && <DeleteAccount />}
      {profileToggle && <Profile />}
      {editPopup && <EditNote />}
      {readPopup && <ReadNote />}
      <Header />
      <Loader />
      <main className={`py-7`}>
        <div className="text-center flex flex-col items-center mb-3">
          <input
            disabled={
              loading || deletePopup || profileToggle || editPopup || readPopup
            }
            name="title"
            value={note.title}
            onBlur={collapseInput}
            onChange={handleInput}
            onClick={expandInput}
            className="w-[80vw] sm:w-[60vw] md:w-[30rem] lg:w-2/5 outline-none border-none shadow-md px-4 py-2 text-xl rounded-lg"
            type="text"
            placeholder={isExpand ? "Title..." : "Take a note..."}
            autoComplete="off"
          />
          <textarea
            style={{ opacity: isExpand ? "1" : "0" }}
            onBlur={collapseInput}
            onChange={handleInput}
            name="description"
            value={note.description}
            id="description"
            className="w-[80vw] sm:w-[60vw] md:w-[30rem] lg:w-2/5 outline-none border-none shadow-md px-4 py-2 text-xl rounded-lg mt-3 resize-none"
            cols="30"
            rows="5"
            placeholder="Add description..."
            autoComplete="off"
          ></textarea>
        </div>
        <section className="flex justify-center items-start flex-wrap">
          {authenticated &&
            notes.map((element) => (
              <Note
                key={element._id}
                title={element.title}
                description={element.description}
                deleteClick={() => deleteNote(element._id)}
                editClick={() => {
                  setEditPopup(true);
                  setNoteId(element._id);
                }}
                readClick={() => {
                  setReadPopup(true);
                  setClickedNoteContent({
                    title: element.title,
                    description: element.description,
                  });
                }}
              />
            ))}
        </section>
      </main>
    </>
  );
};

export default Home;
