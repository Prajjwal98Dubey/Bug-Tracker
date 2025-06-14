import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userDetails = JSON.parse(localStorage.getItem("tira-auth"));
  const navigate = useNavigate();
  const handleUserLogout = () => {
    // delete all the tasks from the redux store
    localStorage.removeItem("tira-auth");
    navigate("/login");
  };
  return (
    <>
      {localStorage.getItem("tira-auth") && (
        <div className="flex justify-between items-center py-2 lg:text-3xl text-xl font-bold w-full h-full lg:px-10 px-4">
          <div className="flex justify-center items-center">
            Tira Tracker
            <sub className="text-[11px] w-fit h-fit px-1 py-2 border border-purple-400 bg-gradient-to-r from-purple-400 to-purple-500 rounded-[20px] ml-1">
              {JSON.parse(localStorage.getItem("tira-auth")).userRole}
            </sub>
          </div>
          <div className=" flex justify-center items-center">
            <div className=" w-fit h-fit cursor-pointer rounded-full flex justify-center items-center">
              <img
                src={userDetails.userImage}
                alt="user_image"
                className="lg:w-[45px] lg:h-[45px] w-[30px] h-[30px] rounded-full border border-gray-400"
              />
            </div>
            <div
              className="w-fit h-fit cursor-pointer rounded-full flex justify-center items-center ml-1 px-1 py-1 hover:bg-gray-500"
              onClick={handleUserLogout}
            >
              <LogOut size="20" color="#e5e1e1" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
