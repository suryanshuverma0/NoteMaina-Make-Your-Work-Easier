import { auth, provider } from "./.config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useGetUserInfo } from "./hooks/useGetUserInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const handleSignInWithGoogle = async () => {
    const resullts = await signInWithPopup(auth, provider);
    console.log(resullts);
    const authInfo = {
      userID: resullts.user.uid,
      email: resullts.user.email,
      name: resullts.user.displayName,
      profilePhoto: resullts.user.photoURL,
      isAuth: true,
      emailVerified: resullts.user.emailVerified,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    if (authInfo.isAuth) {
      toast.success("Login Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/notes");
    }
  };

  if (isAuth) {
    return <Navigate to="/notes" />;
  }
  return (
    <>
      <div className="flex justify-center items-center text-center h-[100vh] bg-slate-100 text-black">
        <div className=" flex justify-center items-center flex-col">
          <p className="text-5xl p-5 font-bold font-seri">
            Sign In with Google to Continue
          </p>
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            className="bg-blue-600 text-3xl px-4 py-4 rounded-xl m-10 hover:bg-blue-700 flex flex-row gap-3 justify-center items-center text-center"
          >
            <span className="text-white">
              {" "}
              <FaGoogle className="text-yellow-500" />
            </span>
            <span className="text-white"> Sign In With Google</span>
          </button>
        </div>
      </div>
      <ToastContainer />
      ``
    </>
  );
}

export default App;
