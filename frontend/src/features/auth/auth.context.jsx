import {createContext, useState,useEffect} from "react";
import { getME } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAndSetUser = async () => {
    try {
      const data = await getME();
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAndSetUser();
  }, []);

  // const login = (userData) => {
  //   setUser(userData);
  // };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};