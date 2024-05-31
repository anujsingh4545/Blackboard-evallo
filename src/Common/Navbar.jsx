import React, { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../Recoil/UserAtom";
import userLoading from "../Recoil/UserLoading";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const userLoad = useRecoilValue(userLoading);
  const [user, setUser] = useRecoilState(userAtom);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      await axios
        .post("https://blackboard-backend-two.vercel.app/api/v1/user/login", { accessToken: tokenResponse.code }, { withCredentials: true })
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.user);
            setLoading(false);
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
            setLoading(false);
          }
        })
        .catch((e) => {
          toast.error("Something went wrong!");
          setLoading(false);
        });
    },
    flow: "auth-code",
    access_type: "offline", // Request offline access
    prompt: "consent",
    scope: "openid email profile https://www.googleapis.com/auth/calendar",
  });

  const logOut = async () => {
    await axios
      .get("https://blackboard-backend-two.vercel.app/api/v1/user/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setUser(null);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        toast.error("Something went wrong !");
      });
  };

  return (
    <nav className=" w-full font-mono  px-5 md:px-10 flex items-center  justify-between py-2 shadow-md h-14 ">
      {/*  */}

      <section className=" flex items-center justify-between  gap-x-5 text-[1.2rem]  py-1">
        <FaAnglesLeft />
        <h1>Calendar</h1>
        <FaAnglesRight />
      </section>

      {/*  */}

      <section>
        {userLoad ? (
          <>
            <div className=" bg-black/10 animate-pulse h-2 rounded-full w-32"></div>
            <div className=" bg-black/10 animate-pulse h-2 rounded-full w-32 mt-2"></div>
          </>
        ) : (
          <div className=" bg-zinc-50 shadow-md pl-5 pr-1 py-1 rounded-full flex gap-x-3 items-center justify-center text-zinc-700 ">
            {user && user._id ? (
              <>
                <p>
                  <span className=" md:hidden ">{user.name.split(" ")[0]}</span>
                  <span className="hidden md:flex">{user.name}</span>
                </p>
                <section className=" p-2 bg-black text-white rounded-full cursor-pointer " onClick={logOut}>
                  <AiOutlineLogout size={15} />
                </section>
              </>
            ) : (
              <>
                <button> Login </button>

                <section
                  className=" p-2 bg-black text-white rounded-full cursor-pointer "
                  onClick={() => {
                    setLoading(true);
                    login();
                  }}
                >
                  <AiOutlineLogin size={15} />
                </section>
              </>
            )}
          </div>
        )}
      </section>

      {/*  */}
    </nav>
  );
};

export default Navbar;
