import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import NotFound from "./containers/NotFound.tsx";
import Login from "./containers/Login/Login.tsx";
import Signup from "./containers/SignUp/SignUp.tsx";
import LoggedInHome from "./containers/LoggedInHome/LoggedInHome.tsx";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />;
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/loggedInHome" element={<LoggedInHome />} />
    </Routes>
  );
}