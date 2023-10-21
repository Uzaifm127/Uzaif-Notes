import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./routes/Register";
import Login from "./routes/Login";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./AppWrapper";
import Lock from "./components/Lock";

function App() {
  const { authenticated, setAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/v1/user/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setAuthenticated(true);
      })
      .catch(() => {
        setUser({});
        setAuthenticated(false);
      });
  }, [authenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authenticated ? <Home /> : <Lock />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
