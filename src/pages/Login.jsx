import axios from "axios";
import React, { useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import formReducer from "../reducers/formReducer";
import Input from "../components/Input";
import PATHS from "../routes/paths";
import { toast } from "react-toastify";
import useTheme from "../hooks/useTheme";

const initialState = {
  username: "",
};

const Login = function () {
  const { t } = useTranslation();
  const { language } = useTheme();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [formState, dispatch] = useReducer(formReducer, initialState);

  const mutation = useMutation({
    mutationFn: (credentials) => {
      return axios.post("https://api.zarindax.ir/v2/auth/ott", credentials, {
        headers: {
          "Accept-Language": language,
        },
      });
    },
    onSuccess: () => {
      navigate(PATHS.otp, { state: { username: formState?.username } });
      toast(t("The code has been sent."), { type: "success" });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["tokens"] }),
    onError: (error) => {
      toast(error.response.data.message, { type: "error" });
    },
  });

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      mutation.mutate({ recipient: formState.username, type: "SMS_OTP" });
    },
    [formState.username, mutation]
  );
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col space-y-8 dark:bg-gray-700 bg-indigo-300 text-indigo-700 max-w-3xl rounded-xl shadow-sm py-6 px-10 justify-center items-center "
    >
      <h3 className="font-bold text-3xl dark:text-white ">
        {t("Login to Account")}
      </h3>
      <Input
        className="px-6 py-4 rounded-xl text-xl dark:bg-gray-900"
        name="username"
        placeholder={t("Enter Your Email or Phone Number")}
        value={formState.username}
        setValue={handleInputChange}
      />
      <button
        type="submit"
        className="p-4 text-center w-full rounded-xl shadow-sm text-2xl dark:text-white bg-indigo-800 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-indigo-900 focus:ring-indigo-500 text-indigo-200"
      >
        {mutation.isLoading ? "..." : t("Send Code")}
      </button>
    </form>
  );
};

export default React.memo(Login);
