import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import Note from "../components/Note/Note";
const CreaterNoteButton = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    console.log("Note created");
    navigate("/note")
    return 
  };
  return (
    <div className="bg-white">
      <button
        type="button"
        onClick={handleClick}
        className="rounded-md shadow-md"
      >
        <span className="flex flex-col justify-center items-center text-5xl gap-5 p-4">
          <FaPlus />
          <span className="text-2xl">Create a New Note</span>
        </span>
      </button>

      
    </div>
  );
};

export default CreaterNoteButton;
