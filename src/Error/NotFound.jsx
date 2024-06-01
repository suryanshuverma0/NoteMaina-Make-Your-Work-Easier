import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center mt-20 flex-col gap-8">
      <h1 className="text-8xl font-sans font-bold">404</h1>
      <span className="text-4xl font-bold text-red-500">Not Found</span>
      <p className="text-2xl text-black text-center ">The page you are trying to access is currently not aviliable or the page mitght be removed by the owner.</p>
      <button className="text-6xl font-bold text-black text-center hover:scale-125">
        <span onClick={()=>{navigate("/")}} >
          <IoIosArrowRoundBack />
        </span>
      </button>
    </div>
  );
};

export default NotFound;
