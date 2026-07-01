import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/userApi";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await getProfile();

        setUser(res.data.user);

        // Keep localStorage updated
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (error) {
        console.error(error);

        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const refreshUser = async () => {
    try {
      const res = await getProfile();

      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider
       value={{
    user,
    token,
    login,
    logout,
    loading,
    refreshUser,
  }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
