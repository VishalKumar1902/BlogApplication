import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import "./App.css";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase-config";
import PrivateRoute from "./pages/PrivateRoute";

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const SignUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>

          {!isAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/createpost">Createpost</Link>
              <a className="Logout-btn" onClick={SignUserOut}>
                Logout
              </a>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route
            path="/createpost"
            element={
              <PrivateRoute isAuth={isAuth}>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
