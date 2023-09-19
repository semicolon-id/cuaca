import { Fragment, useState } from "react";
import image1 from "./img1.jpg";


const Login = () => {
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPass, setCheckPass] = useState(false);

  const [matchEmail, setMatchEmail] = useState(false);
  const [matchPass, setMatchPass] = useState(false);

  const [emailEntered, setEmailEntered] = useState("");
  const [passwordEntered, setPasswordEntered] = useState("");

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  const submitHandler = (event) => {
    event.preventDefault();

    if (event.target.email.value.includes("@")) {
      setCheckEmail(false);
    } else {
      setCheckEmail(true);
    }

    if (event.target.password.value.trim().length >= 8) {
      setCheckPass(false);
    } else {
      setCheckPass(true);
    }

    if (email === emailEntered && password === passwordEntered) {
      localStorage.setItem("isLoggedin", "2");
      setMatchEmail(false);
      setMatchPass(false);
      window.location.reload();
    } else {
      setMatchEmail(true);
      setMatchPass(true);
      // alert("Email or Password not match");
    }
  };

  // const validateEmail = () => {
  //   if (setCheckEmail === true)  {

  //   }
  // }

  const emailInputHandler = (event) => {
    setEmailEntered(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPasswordEntered(event.target.value);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedin', "0")
    localStorage.clear();
    window.location.reload();
  }
  return (
    <Fragment>
      <div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ml-2 min-h-screen ">
        <div className="w-1/2 p-8  sm:w-full  min-[320px]:w-full">
          <h1 className="font-bold text-4xl">Login</h1>
          <p className="mb-10 mt-10">
            Create an account to run wild through our curated experiences
          </p>

          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center items-center gap-2"
          >
            <div class="mb-3">
              <input
                name="email"
                type="text"
                onChange={emailInputHandler}
                value={emailEntered}
                className={`py-2 px-2 w-80 border ${
                  !checkEmail && !matchEmail
                    ? "border-purple-700 bg-purple-300"
                    : "border-red-700 bg-red-300"
                } `}
                placeholder="E-Mail"
              />
              {checkEmail && (
                <p className="text-red-500 text-left text-sm">
                  Please fill the E-Mail field.
                </p>
              )}
              {matchEmail && !checkEmail && (
                <p className="text-red-500 text-left text-sm">
                  E-Mail does not match.
                </p>
              )}
            </div>
            <div class="mb-3">
              <input
                name="password"
                type="password"
                onChange={passwordInputHandler}
                value={passwordEntered}
                className={`py-2 px-2 w-80 border ${
                  !checkPass && !matchPass
                    ? "border-purple-700 bg-purple-300"
                    : "border-red-700 bg-red-300"
                } `}
                placeholder="E-Mail test"
              />
              {checkPass && (
                <p className="text-red-500 text-left text-sm">
                  Please fill the Password field.
                </p>
              )}
              {matchPass && !checkEmail && (
                <p className="text-red-500 text-left text-sm">
                  Password does not match.
                </p>
              )}
            </div>

            {/* <div className="mb-3">
              <input
                name="password"
                type="password"
                onChange={passwordInputHandler}
                value={passwordEntered}
                className={`py-2 px-2 w-80 border ${
                  !checkPass
                    ? "border-purple-700 bg-purple-300"
                    : "border-red-700 bg-red-300"
                }`}
                placeholder="Password"
                required
              />
              {checkPass && <p className="text-message">Please fill the E-Mail field.</p>}
            </div> */}

            <button
              className="mb-6 mt-3 rounded-none py-2 px-3 w-80 border border-slate-950"
              type="submit"
            >
              Log In
            </button>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox" />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-600"
              >
                <p>Remember me for 30 days</p>
              </label>
            </div>
            <p>
              <a href="#" className="text-sm underline">
                Forgot Password?
              </a>
            </p>
            <div>
              <label className="ml-2 text-sm font-medium  dark:text-gray-600">
                You do not have account ?
                <button onClick={loginHandler} className="text-black font-bold">
                  Sign In
                </button>
              </label>
            </div>
          </form>
        </div>
        <div className="w-1/2 sm:w-full min-[320px]:hidden sm:hidden lg:block">
          <img
            className="h-screen w-full object-cover"
            src={image1}
            alt=""
          ></img>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
