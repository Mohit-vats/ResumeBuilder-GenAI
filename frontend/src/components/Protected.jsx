import {authUser} from "../features/auth/hooks/useAuth";
import {Navigate} from "react-router-dom";
import Loading from "./Loading";

const Protected = ({children}) => {
  const {loading,user} = authUser();

  if(loading){
    return <Loading title="Checking your session" />
  }

  if(!user){
    return <Navigate to="/login" />
  }
  return children;
};

export default Protected;
