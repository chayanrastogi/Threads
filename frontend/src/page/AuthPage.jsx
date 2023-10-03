import SignUp from "../components/SignUp";
import Login from "../components/Login";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
    
    const authScreenState = useRecoilValue(authScreenAtom);

  return (
    <>
      {authScreenState === "login" ? <Login/> : <SignUp/>}
    </>
  )
}

export default AuthPage;
