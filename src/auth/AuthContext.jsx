import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from 'react-query';
import { useCart } from "@/components/CartContext";

axios.defaults.withCredentials = true;
const AuthContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearCart }  = useCart();

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isAuthenticated, user]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        localStorage.setItem("user", JSON.stringify(response.data));
        queryClient.invalidateQueries('fetchMyRestaurant');
        queryClient.invalidateQueries('fetchMyRestaurantOrders');
        navigate("/");
        //window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed, please try again");
    }
  };

  const signup = async (email, password, name) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        { email, password, name },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setIsAuthenticated(true);
        setUser(response.data);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        localStorage.setItem("user", JSON.stringify(response.data));
        queryClient.invalidateQueries('fetchMyRestaurant');
        queryClient.invalidateQueries('fetchMyRestaurantOrders');
        navigate("/");
        //window.location.reload();
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Signup failed, please try again");
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      sessionStorage.removeItem("cart-restaurantId");
      sessionStorage.removeItem("cartItems");
      clearCart();
      queryClient.resetQueries('fetchMyRestaurant');
      queryClient.resetQueries('fetchMyRestaurantOrders');
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
