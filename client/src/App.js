import Navbar from "./components/navbar";
import React, { createContext, useContext, useReducer } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/screens/home";
import Signin from "./components/screens/signin";
import Signup from "./components/screens/signup";
import Createpost from "./components/screens/createpost";
import { useEffect } from "react";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      history("/");
    } else {
      history("/signin");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create" element={<Createpost />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
