import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

const API_URL = "http://localhost:5000/api";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ employees: [], admin: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empRes = await axios.get(`${API_URL}/employees`);
        // If you add admin endpoint, fetch admin here as well
        setUserData({ employees: empRes.data });
      } catch (err) {
        setUserData({ employees: [], admin: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
