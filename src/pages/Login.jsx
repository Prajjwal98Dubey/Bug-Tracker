import { useState } from "react";
import toast from "react-hot-toast";
import userData from "../data/users.data.json";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handeLoginUser = (e) => {
    e.preventDefault();
    if (!userName || !password)
      return toast.error("Enter all mandatory fields !!!", {
        duration: 1500,
      });
    let user = {};
    for (let u of userData) {
      if (u.userName.toLowerCase().trim() == userName.toLowerCase().trim()) {
        user = { ...u };
        break;
      }
    }
    if (Object.keys(user).length === 0)
      return toast.error("user does not exist", { duration: 1500 });
    if (user.password !== password)
      return toast.error("wrong password", { duration: 1500 });
    localStorage.setItem(
      "tira-auth",
      JSON.stringify({
        userName,
        userImage: user.avatar,
        userRole: user.role,
        userId: user.userId,
        manager: user.manager,
      })
    );
    navigate("/dashboard");
  };
  return (
    <div>
      <div className="flex justify-center items-center py-2 w-full h-full">
        <p className="w-fit text-center py-2 text-2xl font-bold">
          Welcome to Tira Tracker
        </p>
      </div>
      <div className="flex justify-center items-center py-2 w-full">
        <form onSubmit={handeLoginUser}>
          <div className="m-2">
            <label htmlFor="username">
              <div className="">
                <div className="flex justify-start items-center lg:w-[150px] lg:h-[45px] w-[70px] h-[35px] px-1 ">
                  username
                </div>
                <input
                  type="text"
                  placeholder="enter username"
                  className="w-[300px] h-[45px] rounded-md border border-blue-400 py-2 px-1 bg-[#313131]"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="m-2">
            <label htmlFor="password">
              <div className="">
                <div className="lg:w-[150px] lg:h-[45px] w-[70px] h-[35px] px-1 flex justify-start items-center">
                  password
                </div>
                <input
                  type="password"
                  placeholder="enter password"
                  className="w-[300px] h-[45px] rounded-md border border-blue-400 py-2 px-1 bg-[#313131]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="flex justify-center items-center py-2">
            <button
              type="submit"
              className="w-fit h-fit py-2 px-4 font-bold bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-md"
            >
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
