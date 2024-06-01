import CreaterNoteButton from "../../components/CreaterNoteButton";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../.config/firebase";
import { useState, useEffect } from "react";
import NoteCard from "../../components/Card/NoteCard";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

const NotePage = () => {
  const { email } = useGetUserInfo();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchedNoteValue, setSearchedNoteValue] = useState("");
  const [filteredNote, setFilteredNote] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"), where("email", "==", email));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const notesData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotes(notesData);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [email]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchedNoteValue(query);
    const filteredNoteResult = notes.filter((note) => {
      return note.title.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredNote(filteredNoteResult);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-slate-200 w-full h-screen p-5">
      <div className="mb-4 text-center">
        <CreaterNoteButton />
      </div>

      <div className="text-center m-4">
        <input
          type="text"
          placeholder="Search Notes..."
          className="placeholder-text-slate-700 px-4 py-2 rounded-md shadow-md lg:w-1/2 sm:w-full focus:outline-none"
          value={searchedNoteValue}
          onChange={handleInputChange}
        />
      </div>

      <div className="text-center">
        <h1 className="font-bold text-4xl p-4">Notes</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchedNoteValue === ""
          ? notes.map((note) => (
              <NoteCard key={note.id} title={note.title} id={note.id} />
            ))
          : filteredNote.map((note) => (
              <NoteCard key={note.id} title={note.title} id={note.id} />
            ))}
      </div>
    </div>
  );
};

export default NotePage;
