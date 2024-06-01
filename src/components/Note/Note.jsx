import { useState } from "react";
import { useAddNote } from "../../hooks/useAddNote";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {useGetUserInfo} from "../../hooks/useGetUserInfo"
const Note = () => {
  const {email} = useGetUserInfo()

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { addNote } = useAddNote();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log("title", title,email);
  };
  const handleBodyChange = (e) => {
    setBody(e.target.value);
    console.log("body", body);
  };

  const handleClick = async () => {
    try {
      await addNote(title, body, email);
      toast.success("Data Added Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/notes");
      }, 2000);
    } catch (e) {
      console.error(e);
      toast.error("Something Went Wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-[100vh] bg-slate-100 rounded-md shadow-md">
        <div className="flex flex-col gap-4 m-4 lg:w-1/2 justify-center items-center min-h-screen  sm:w-full md:w-full ">
            <input
              type="text"
              autoFocus
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter the title here..."
              className="border-none placeholder:text-slate-400 text-4xl text-black focus:border-none focus:outline-none w-full p-4"
            />

            <textarea
              placeholder="Enter your body here...."
              className="resize-none border-none outline-none placeholder:text-slate-400 p-2 text-xl w-full p-2"
              rows={15}
              cols={80}
              value={body}
              onChange={handleBodyChange}
            />

          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-3xl font-serif w-full m-2"
            onClick={handleClick}
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Note;
