import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../.config/firebase";
import { useNavigate } from "react-router-dom";
import { MdSettingsBackupRestore } from "react-icons/md";

function Profile() {
  const { name, email, profilePhoto, emailVerified } = useGetUserInfo();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="bg-slate-100 h-screen w-full test-white">
        <header className="flex items-center justify-end px-6 py">
          <button
            className="text-black px-3 py-4"
            onClick={() => {
              navigate("/notes");
            }}
          >
            <span className="text-6xl">
              <MdSettingsBackupRestore />
            </span>{" "}
          </button>
        </header>
        <div className="flex justify-center items-center text-center h-[80vh] ">
          <div>
            <div>
              {profilePhoto && (
                <div>
                  {""}
                  <img className="w-80 h-80 rounded-full" src={profilePhoto} />
                </div>
              )}
            </div>
            <div className="flex flex-row gap-4">
              <h1 className="text-black text-5xl font-bold m-4 p-4">
                <span className="text-2xl">Hi, </span> {name}
              </h1>
            </div>
            <div>
              <h2 className="text-2xl text-black">{email}</h2>
              <span
                className={`${
                  emailVerified ? "text-green-500" : "text-red-500"
                }`}
              >
                {emailVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
            <div className="mt-5">
              <button
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-3 text-3xl font-bold rounded-md"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
