import { Fragment,  } from "react";

import "./App.css";
import Register from "./Components/register/register";
import Login from './Components/Login/Login'
import Nav from "./Components/Nav/Nav";


function App() {
 
  const name = localStorage.getItem("name");
  const phone = localStorage.getItem("phone");
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

    const login = localStorage.getItem("isLoggedin")
  if (login === undefined) {
    localStorage.setItem("isLoggedin", "0")//0 artinya false(belum login)
  }

  
// console.log(name, phone, email, password);
  return (
    <Fragment>
    <div className="App">
      
        {login === null || login === "0" || login === "1" && email === null && password === null ? <Register /> : null}
        {login === "1" && name !== null && email !== null && phone !== null && password !== null ? <Login /> : null}
        {login === "2" && <Nav />}
      </div>
    </Fragment>
  );
}

export default App;
