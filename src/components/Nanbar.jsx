import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
const Nanbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex justify-between items-center shadow-md p-4">
        <div className="pl-4 text-3xl px-2 font-bold">
          <h1>
            Note<span className="text-red-500">Menia</span>
          </h1>
        </div>

        <div className="">
          <ul className="flex flex-row gap-4">
            <li
              className="text-3xl font-serif font-bold hover:text-[#0ef] cursor-pointer"
              onClick={() => {
                navigate("/notes");
              }}
            >
              Notes
            </li>
          </ul>
        </div>

        <div className="pr-4 font-bold text-6xl text-black cursor-pointer hover:scale-110">
          <span
            onClick={() => {
              navigate("/profile");
            }}
          >
            <CgProfile />
          </span>
        </div>
      </nav>
    </>
  );
};

export default Nanbar;
