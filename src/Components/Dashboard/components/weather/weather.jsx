import React from "react";

const Weather = (props) => {
  return (
    <div className=" flex flex-col items-center rounded   w-full  sm:w-1/4  grow-2    border-t-2 sm:border-t-0 sm:border-r-4 gap-2 p-3 sm:p-0 ">
      <h2 className="text-sm  sm:text-xl font-bold ">{props.hari}</h2>
      <div className="w-20 sm:w-20 ">
        <img className="object-cover " src={props.img} alt="" />
      </div>
      <h2 className="text-sm sm:text-xl font-semibold">{props.desc}</h2>
    </div>
  );
};

export default Weather;
