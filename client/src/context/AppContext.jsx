import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [credit, setCredit] = useState(0);

  // Guest free trial state
  const [hasFreeTrial, setHasFreeTrial] = useState(
    !localStorage.getItem("guestTrialUsed")
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Check guest trial status from server on mount (only if not logged in)
  const checkGuestStatus = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/image/guest-status`);
      if (data.success) {
        setHasFreeTrial(data.hasFreeTrial);
        if (!data.hasFreeTrial) {
          localStorage.setItem("guestTrialUsed", "true");
        }
      }
    } catch (error) {
      console.error("Error checking guest status:", error.message);
    }
  };

  // Load user credits + info
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
        if (
          data.message?.toLowerCase().includes("not authorized") ||
          data.message?.toLowerCase().includes("invalid")
        ) {
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

  // Guest image generation (no auth needed)
  const guestGenerateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/guest-generate`,
        { prompt }
      );

      if (data.success) {
        // Mark guest trial as used
        localStorage.setItem("guestTrialUsed", "true");
        setHasFreeTrial(false);
        return data.resultImage;
      } else {
        if (data.guestLimitReached) {
          toast.info("Free trial used! Sign up to generate more images.");
          setHasFreeTrial(false);
          localStorage.setItem("guestTrialUsed", "true");
          setShowLogin(true);
        } else {
          toast.error(data.message);
        }
        return null;
      }
    } catch (error) {
      const errData = error?.response?.data;
      if (errData?.guestLimitReached) {
        toast.info("Free trial used! Sign up to generate more images.");
        setHasFreeTrial(false);
        localStorage.setItem("guestTrialUsed", "true");
        setShowLogin(true);
      } else {
        toast.error(errData?.message || error.message);
      }
      return null;
    }
  };

  // Authenticated image generation
  const generateImage = async (prompt) => {
    // If user is not logged in, use guest generation
    if (!token) {
      return await guestGenerateImage(prompt);
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        await loadCreditsData();
        return data.resultImage;
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
    } else {
      // Check guest trial status when not logged in
      checkGuestStatus();
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
    hasFreeTrial,
    guestGenerateImage,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
