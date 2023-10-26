import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  LoginUserInfo,
  ResponseLogin,
  ResponseRegisterError,
} from "../../shared/type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { Button } from "@nextui-org/react";
import { useCreateLoginMutation } from "../../rtk/services/contactApi";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import { useAppDispatch } from "../../rtk/hooks";
import { setUser } from "../../rtk/features/userSlice";
import { useNavigate } from "react-router-dom";

type IsFocus = {
  email: boolean;
  password: boolean;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<LoginUserInfo>({
    defaultValues: {
      email: "doedoe@gmail.com",
      password: "aaaaaaaa",
    },
  });

  const [isFocus, setIsFocus] = useState<IsFocus>({
    email: false,
    password: false,
  });

  const [show, setShow] = useState({
    password: false,
    password_confirmation: false,
  });

  const [createLogin, { isLoading }] = useCreateLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLabelClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const nextElement = target.nextElementSibling as HTMLElement | null;
    nextElement && nextElement.focus();
  };

  const validateEmail = (value: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value);
  };

  const onSubmit: SubmitHandler<LoginUserInfo> = async (data) => {
    // const userData: { data: ResponseLogin } =await createLogin(data);
    const userData:
      | { data: ResponseLogin }
      | {
          error: FetchBaseQueryError | SerializedError | ResponseRegisterError;
        } = await createLogin(data);

    if ("data" in userData) {
      if (userData.data.success) {
        toast.success("Successfully Login!");
        dispatch(
          setUser({ ...userData.data.user, token: userData.data.token })
        );
        reset();
        navigate("/");
      } else {
        toast.error("Something wrong!");
      }
      // if(userData.data.success) //navigate
    }

    if ("error" in userData) {
      toast.error("Something wrong!");
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* email field  */}
        <section className="flex flex-col gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              watch("email")?.length > 0 || isFocus.email
                ? "-top-3 text-slate-100"
                : "top-2 text-slate-300"
            } input-label-login`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            disabled={isLoading}
            className="form-input"
            {...register("email", {
              required: true,
              maxLength: 50,
              validate: (value) => validateEmail(value),
            })}
            autoComplete="off"
            onFocus={() => setIsFocus({ ...isFocus, email: true })}
            onBlur={() => setIsFocus({ ...isFocus, email: false })}
          />
          {errors.email && errors.email.type === "required" && (
            <span className="text-sm text-rose-500 text-error">
              The email field is required
            </span>
          )}
          {errors.email && errors.email.type === "maxLength" && (
            <span className="text-sm text-rose-500 text-error">
              Email should be 50 characters or fewer
            </span>
          )}
          {errors.email && errors.email.type === "validate" && (
            <span className="text-sm text-rose-500 text-error">
              Invalid Email
            </span>
          )}
        </section>

        {/* password field  */}
        <section className="flex flex-col gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              watch("password")?.length > 0 || isFocus.password
                ? "-top-3 text-slate-100"
                : "top-2 text-slate-300"
            } input-label-login`}
            htmlFor="password"
          >
            Password
          </label>
          <div className="password-input-border">
            <input
              disabled={isLoading}
              className="password-input"
              {...register("password", {
                required: true,
                maxLength: 16,
                minLength: 6,
              })}
              type={show.password ? "text" : "password"}
              onFocus={() => setIsFocus({ ...isFocus, password: true })}
              onBlur={() => setIsFocus({ ...isFocus, password: false })}
            />
            <button
              onClick={() => setShow({ ...show, password: !show.password })}
              className="px-4 border-slate-400 border-l-[1.5px]"
              type="button"
            >
              {show.password ? <PiEyeLight /> : <PiEyeClosedLight />}
            </button>
          </div>
          {errors.password && errors.password.type === "required" && (
            <span className="text-sm text-rose-500 text-error">
              The password field is required
            </span>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <span className="text-sm text-rose-500 text-error">
              Password should be 16 characters or fewer
            </span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span className="text-sm text-rose-500 text-error">
              Password should be 8 characters or more
            </span>
          )}
        </section>

        <Button
          type="submit"
          isLoading={isLoading}
          className="submit-btn rounded-lg bg-slate-600 text-slate-100"
        >
          Register
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
