//import { useState } from "react";
import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  //[state yang dikelola oleh reducer, selalu merupakan function dispach (pengiriman) yang memungkinkan kita mengirimkan tindakan terhadap dispach reduser itu]

  const valueIsValid = validateValue(inputState.value);//form valid ketika semua inputan tanpa terkecuali valid
  const hasError = !valueIsValid && inputState.isTouched;//error ketika input user invalid dan sudah tersentuh

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });//mengambil nilai inputan user
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };};

export default useInput;
