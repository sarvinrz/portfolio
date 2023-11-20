import axios from "axios";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import PinInput from "react-pin-input";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";

const OTP = function () {
  const { t } = useTranslation();

  const [pin, setPin] = useState();
  const { state } = useLocation();

  const mutation = useMutation({
    mutationFn: (credentials) => {
      return axios.post("https://api.zarindax.ir/v2/auth/login", credentials);
    },
  });

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      mutation.mutate({ otpToken: pin, phoneNumber: state.username });
    },
    [mutation, pin, state.username]
  );

  console.log(pin);
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
