import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PinInput from "react-pin-input";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PATHS from "../routes/paths";
import { toast } from "react-toastify";

const OTP = function () {
  const { t } = useTranslation();

  const [pin, setPin] = useState();
  const { state } = useLocation();

  const navigate = useNavigate();

  const { setIsLoggedIn } = useAuth();

  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(1);

  const loginMutation = useMutation({
    mutationFn: (credentials) => {
      return axios.post("https://api.zarindax.ir/v2/auth/login", credentials);
    },
    onSuccess: ({ data }) => {
      navigate(PATHS.portfolio);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    },
  });

  const resendCodeMutation = useMutation({
    mutationFn: (credentials) => {
      return axios.post("https://api.zarindax.ir/v2/auth/ott", credentials, {});
    },
    onSuccess: () => {
      setSeconds(59);
      setMinutes(1);
      toast(t("The code has been resent."), { type: "success" });
    },

    onError: (error) => {
      toast(error.response.data.message, { type: "error" });
    },
  });

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      loginMutation.mutate({ otpToken: pin, phoneNumber: state.username });
    },
    [loginMutation, pin, state?.username]
  );

  const onClickHandler = useCallback(
    (e) => {
      e.preventDefault();

      resendCodeMutation.mutate({
        recipient: state.username,
        type: "SMS_OTP",
      });
    },
    [resendCodeMutation, state.username]
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

  useEffect(() => {
    if (!state) {
      navigate(PATHS.login);
    }
  }, [navigate, state]);

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
        style={{
          direction: "ltr",
        }}
        inputStyle={{
          background: "#fff",
          borderRadius: "5px",
        }}
      />

      {minutes === 0 && seconds === 0 ? (
        <button onClick={onClickHandler}>
          {resendCodeMutation.isLoading ? "..." : t("Resend Code")}
        </button>
      ) : (
        <span className="flex flex-row rtl:flex-row-reverse items-center p-2 w-32 justify-center rounded-xl space-x-2 text-indigo-500 bg-white dark:bg-gray-900  dark:text-white">
          <p className="text-xl font-light">{minutes}</p>
          <p className="text-lg font-bold">:</p>
          <p className="text-xl font-light">
            {seconds > 10 ? seconds : `0${seconds}`}
          </p>
        </span>
      )}
      <button
        type="submit"
        className="p-4 text-center w-full rounded-xl shadow-sm text-2xl dark:text-white bg-indigo-800 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-indigo-900 focus:ring-indigo-500 text-indigo-200"
      >
        {loginMutation.isLoading ? "..." : t("Login")}
      </button>
    </form>
  );
};

export default React.memo(OTP);
