import { useState, createContext } from "react";
import App from "./App";
export const Context = createContext();

const AppWrapper = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickedNoteContent, setClickedNoteContent] = useState({});
  const [readPopup, setReadPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [notesNotification, setNotesNotification] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [noteId, setNoteId] = useState();
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [user, setUser] = useState({});

  const { Provider } = Context;

  return (
    <Provider
      value={{
        clickedNoteContent,
        setClickedNoteContent,
        deletePopup,
        setDeletePopup,
        profileToggle,
        setProfileToggle,
        noteId,
        setNoteId,
        note,
        readPopup,
        setReadPopup,
        setNote,
        editPopup,
        setEditPopup,
        authenticated,
        setAuthenticated,
        notesNotification,
        setNotesNotification,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      <App />
    </Provider>
  );
};

export default AppWrapper;
