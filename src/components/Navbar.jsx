import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userDetails = JSON.parse(localStorage.getItem("tira-auth"));
  const navigate = useNavigate();
  const handleUserLogout = () => {
    localStorage.removeItem("tira-auth");
    // delete all the tasks from the redux store
    navigate("/");
  };
  return (
    <div className="flex justify-between items-center py-2 text-3xl font-bold w-full h-full px-10">
      <div className="flex justify-center items-center">Tira Tracker</div>
      <div className=" flex justify-center items-center">
        <div className=" w-fit h-fit cursor-pointer rounded-full flex justify-center items-center">
          <img
            src={userDetails.userImage}
            alt="user_image"
            className="w-[45px] h-[45px] rounded-full border border-gray-400"
          />
        </div>
        <div
          className=" w-fit h-fit cursor-pointer rounded-full flex justify-center items-center ml-1 px-1 py-1 hover:bg-gray-500"
          onClick={handleUserLogout}
        >
          <LogOut size="20" color="#e5e1e1" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
