import { Fragment } from "react";
import image2 from "./img2.jpg";
import { useState } from "react";
const Register = () => {
  const [checkName, setCheckName] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPass, setCheckPass] = useState(false);

  const buttonHandler = (event) => {
    event.preventDefault();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (event.target.name.value.trim() !== "") {
      setCheckName(false); //diatas false,false x false = true

      // alert("Form Is Valid")
    } else {
      setCheckName(true); //false x true = false
      // alert("Form Is Invalid")
    }

    if (event.target.phone.value.trim().length === 12) {
      setCheckPhone(false);
    } else {
      setCheckPhone(true);
    }

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

    if (
      event.target.name.value.trim() !== "" &&
      event.target.phone.value.trim().length === 12 &&
      event.target.email.value.includes("@") &&
      event.target.password.value.trim().length >= 8
    ) {
      localStorage.setItem("isLoggedin", "1");
      window.location.reload();
      
    } else {
      localStorage.setItem("isLoggedin", "0");
      
      
    }
    

    localStorage.setItem("name", event.target.name.value);
    localStorage.setItem("phone", event.target.phone.value);
    localStorage.setItem("email", event.target.email.value);
    localStorage.setItem("password", event.target.password.value);
    // localStorage.clear();
  };

  const signinHandler = () => {
    localStorage.setItem("isLoggedin", "1");
    window.location.reload();
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center px-6 py-8 mt-10 mx-auto md:h-screen lg:py-0 ml-2 min-h-screen ">
        <div className="w-1/2 p-8  sm:w-full  min-[320px]:w-full">
          <h1 className="font-bold text-4xl">Register</h1>
          <p className="mb-5 mt-10">
            Create an account to run wild through our curated experiences
          </p>

          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center items-center gap-2"
          >
            <button
              onClick={buttonHandler}
              className=" rounded-none mt-2 py-2 px-2 w-80 flex justify-center gap-2 border border-slate-950"
            >
              <img
                width="30"
                height="20"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
            <h4 className="text-xs mb-5 mt-5">or</h4>
            <div className="mb-3">
              <input
                name="name"
                type="text"
                id="name"
                className={`py-2 px-2 w-80 border ${
                  !checkName
                    ? "border-purple-700 bg-purple-300"
                    : "border-red-700 bg-red-300"
                } `}
                placeholder="Name"
              />
            </div>

            <div class="mb-3">
              <input
                name="phone"
                type="tel"
                id="phone"
                className={`py-2 px-2 w-80 border ${
                  !checkPhone
                    ? "border-purple-700 bg-purple-300"
                    : "border-red-700 bg-red-300"
                } `}
                placeholder="Phone Number"
              />
            </div>
            <div class="mb-3">
              <input
                name="email"
                type="email"
                id="email"
                className={`py-2 px-2 w-80 border ${
                  !checkEmail
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
            </div>

            <div className="mb-3">
              <input
                name="password"
                type="password"
                id="password"
                className={`py-2 px-2 w-80 border ${
                  !checkPass
                    ? "border-purple-700 bg-purple-300"
                    : "border-red-700 bg-red-300"
                }`}
                placeholder="Password"
                required
              />
            </div>

            <button
              className="mb-6 mt-3 rounded-none py-2 px-3 w-80 border border-slate-950"
              type="submit"
              // disabled={!checkName}
            >
              Create Account
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
              <a href="# " className="text-sm underline">
                Forgot Password?
              </a>
            </p>
            <div>
              <label className="ml-2 text-sm font-medium  dark:text-gray-600">
                You already have account ?
                <button
                  onClick={signinHandler}
                  className="text-black font-bold"
                >
                  Log In
                </button>
              </label>
            </div>
          </form>
        </div>
        <div className="w-1/2 sm:w-full min-[320px]:hidden sm:hidden lg:block">
          <img
            className="h-screen w-full object-cover"
            src={image2}
            alt=""
          ></img>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
