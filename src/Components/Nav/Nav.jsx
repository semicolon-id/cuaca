import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "../Dashboard/Home";
import API from "../Dashboard/components/API/API";
import Login from "../Login/Login";

const Nav = () => {
  return (
    <Router>
      <div className="sticky justify-between px-20 pt-5 pb-5 bg-sky-800 items-center">
        <div className=" items-center">
          <Link to="/" className="text-white">
            <h1 className="text-2xl font-bold">
              <span className="text-sky-400">Perkiraan Cuaca</span>
             <ul className="flex">
            <li className="px-5">
              <Link to="/">Weather</Link>
            </li>
            <li className="px-5">
              <Link to="/countries">Countries</Link>
            </li>
            <li className="px-5">
              <Link to="/login">Log In</Link>
            </li>
          </ul>
            </h1>
          </Link>
          

          <hr />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/countries" element={<API />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={"Page Not Found"} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Nav;
