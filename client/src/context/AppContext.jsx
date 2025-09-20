import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [credit, setCredit] = useState(0); // ✅ consistent naming

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // ✅ Load user credits + info
const loadCreditsData = async () => {
  if (!token) return;
  try {
    const { data } = await axios.get(`${backendUrl}/api/users/credits`, {
      headers: { token },
    });

    console.log("Credits API response:", data);

    if (data.success) {
      setCredit(data.credits ?? data.credit ?? 0);
      setUser(data.user ?? null);
    } else {
      // if backend returns token issue
      if (data.message?.toLowerCase().includes("not authorized") || 
          data.message?.toLowerCase().includes("invalid")) {
        logout();
        toast.error("Session expired, please login again.");
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    console.error(error.response?.data || error);
    toast.error(error?.response?.data?.message || error.message);
  }
};



  // ✅ Generate image
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        await loadCreditsData();
        return data.resultImage; // base64 string
      } else {
        toast.error(data.message);
        await loadCreditsData();

        if ((data.credits ?? data.credit ?? 0) === 0) {
          navigate("/buy");
        }
        return null;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
