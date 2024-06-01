import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../.config/firebase";
import { useState, useEffect } from "react";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { FaUndoAlt } from "react-icons/fa";
import { jsPDF } from "jspdf";

const NoteDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { noteId } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "notes", noteId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
          setNewTitle(docSnap.data().title);
          setNewBody(docSnap.data().body);
        } else {
          console.log("No such document!");
          setError("No such document!");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [noteId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-4xl font-bold">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-4xl font-bold text-red-500">Error: {error}</p>
      </div>
    );

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "notes", noteId);
      await deleteDoc(docRef);
      navigate("/notes");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "notes", noteId);
      await updateDoc(docRef, {
        title: newTitle,
        body: newBody,
      });
      setData({ ...data, title: newTitle, body: newBody });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const handlePrint = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
  
    doc.setFont("helvetica", "bold"); 
    doc.text("Note Details", 15, 15);
    doc.line(15, 17, 55, 17);
  
    doc.setFont("helvetica", "normal"); 
    doc.text(`Title: ${data.title}`, 15, 30);
    doc.text(`Body: ${data.body}`, 15, 40);
    doc.rect(10, 10, 190, 80);
    doc.save("note.pdf");
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <div className="flex justify-end">
          <button
            className="text-3xl text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/notes")}
          >
            <FaUndoAlt />
          </button>
        </div>

        <div className="mt-4">
          {isEditing ? (
            <>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="New Title"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <textarea
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="New Body"
                  className="p-2 border border-gray-300 rounded h-32 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="text-center mt-6">
                <button
                  className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md shadow-sm mr-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="text-white bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded-md shadow-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-4xl font-bold mt-2 text-gray-800">
                <h1>{data.title}</h1>
              </div>
              <div className="text-center text-2xl mt-4 text-gray-700">
                <p>{data.body}</p>
              </div>
              <div className="text-center mt-6">
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md shadow-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>

        <div className="text-right mt-6">
          <span className="text-xl font-bold text-gray-600">Created At: </span>
          <span className="text-green-600">{noteId}</span>
        </div>

        <div className="text-center mt-4 flex justify-around flex-row gap-4">
          <button
            className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md shadow-sm"
            onClick={handleDelete}
          >
            Delete
          </button>

          <button
            className="text-white bg-cyan-500 hover:bg-cyan-700 px-4 py-2 rounded-md shadow-sm"
            onClick={handlePrint}
          >
            Print PDf
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
