import { doc, setDoc } from "firebase/firestore";
import { db } from "../.config/firebase";
export const useAddNote = () => {
  const addNote = async (title, body,email) => {
    await setDoc(doc(db, "notes", new Date().toISOString()), {
      title: title,
      body: body,
      email: email,
    });
  };
  return { addNote };
};
