import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constraints";
import { Navigate } from "react-router-dom";
import api from "../api";

function ProductRoute({ children }) {
  const [isAuthorized, SetIsAuthorize] = useState(null);

  useEffect(() => {
    auth().catch(() => SetIsAuthorize(false));
  }, []);

  const refreshtoken = async () => {
    const refreshtoken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh,
        refreshtoken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        SetIsAuthorize(true);
      } else {
        SetIsAuthorize(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      SetIsAuthorize(false);
      return;
    }
    const decode = jwtDecode(token);
    const tokenExpiration = decode.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshtoken();
    } else {
      SetIsAuthorize(true);
    }
  };

  if (isAuthorized == null) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? children : <Navigate to="/login/" />;
}

export default ProductRoute;
