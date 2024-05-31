import axios from "axios";

export const verifyUser = async () => {
  let userSession = document.cookie.includes("token");
  if (!userSession) return null;

  try {
    const res = await axios.post("https://blackboard-backend-two.vercel.app/api/v1/user/getuser", {}, { withCredentials: true });
    if (res.data.success) {
      return res.data.user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
