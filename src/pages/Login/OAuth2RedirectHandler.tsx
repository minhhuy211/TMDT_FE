import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname !== "/oauth2-redirect") return;
  
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("token", token);
      dispatch(loginSuccess({ token }));
      navigate("/");
    } else {
      console.error("OAuth2 token not found in URL");
      navigate("/login?error=oauth");
    }
  }, [dispatch, navigate]);
  

  return <div>Redirecting...</div>;
};

export default OAuth2RedirectHandler;
