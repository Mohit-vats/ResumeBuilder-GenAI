import {authUser} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

const Protected = ({children}) => {
  const {loading,user} = authUser();

  if(loading){
    return <div>Loading...</div>
  }

  if(!user){
    return <Navigate to="/login" />
  }
  return children;
};

export default Protected;