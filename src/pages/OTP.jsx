import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PinInput from "react-pin-input";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PATHS from "../routes/paths";

const OTP = function () {
  const { t } = useTranslation();

  const [pin, setPin] = useState();
  const { state } = useLocation();

  const navigate = useNavigate();

  const { setIsLoggedIn } = useAuth();

  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(1);

  const mutation = useMutation({
    mutationFn: (credentials) => {
      return axios.post("https://api.zarindax.ir/v2/auth/login", credentials);
    },
    onSuccess: ({ data }) => {
      navigate(PATHS.portfolio);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    },
  });

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      mutation.mutate({ otpToken: pin, phoneNumber: state.username });
    },
    [mutation, pin, state.username]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [minutes]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col space-y-8 dark:bg-gray-700 bg-indigo-300 text-indigo-700 max-w-3xl rounded-xl shadow-sm py-6 px-10 justify-center items-center "
    >
      <PinInput
        length={7}
        onChange={setPin}
        type="numeric"
        inputMode="number"
        inputStyle={{
          background: "#fff",
          borderRadius: "5px",
          direction: "ltr",
        }}
      />
      <span className="flex flex-row items-center p-2 rounded-xl space-x-2 rtl:space-x-reverse text-indigo-500 bg-white dark:bg-gray-900 dark:text-white">
        <p className="text-xl font-light">{minutes}</p>
        <p className="text-lg font-bold">:</p>
        <p className="text-xl font-light">{seconds}</p>
      </span>
      <button
        type="submit"
        className="p-4 text-center w-full rounded-xl shadow-sm text-2xl dark:text-white bg-indigo-800 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-indigo-900 focus:ring-indigo-500 text-indigo-200"
      >
        {mutation.isLoading ? "..." : t("Login")}
      </button>
    </form>
  );
};

export default React.memo(OTP);
