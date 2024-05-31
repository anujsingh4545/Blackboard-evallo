import { useEffect } from "react";
import Navbar from "./Common/Navbar";
import Home from "./Pages/Home";
import { useRecoilState } from "recoil";
import loadingUser from "./Recoil/UserLoading";
import userAtom from "./Recoil/UserAtom";
import { verifyUser } from "./Common/VerifyUser";

function App() {
  const [loading, setLoading] = useRecoilState(loadingUser);
  const [user, setuser] = useRecoilState(userAtom);

  useEffect(() => {
    setLoading(true);
    const getdata = async () => {
      const data = await verifyUser();
      if (data) {
        setuser(data);
        setLoading(false);
      } else {
        setuser(null);
        setLoading(false);
      }
    };
    getdata();
  }, []);

  return (
    <main>
      <Navbar />
      <Home />
    </main>
  );
}

export default App;
