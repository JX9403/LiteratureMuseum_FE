import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const saveLogin = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log("Token decoded:", decoded);

      setUser(decoded.sub);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Token không hợp lệ:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect về login nếu muốn
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.sub);

        const exp = decoded.exp * 1000; // Convert to ms
        const now = Date.now();
        const timeUntilExpiry = exp - now;

        if (timeUntilExpiry > 0) {
          const timer = setTimeout(() => {
            logout();
          }, timeUntilExpiry);

          return () => clearTimeout(timer); // Clear on unmount
        } else {
          logout(); // Token đã hết hạn
        }
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        logout();
      }
    }
  }, []);

  return (
    <LoginContext.Provider value={{ user, saveLogin, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
