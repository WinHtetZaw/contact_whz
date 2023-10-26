import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import {
  RegisterUserInfo,
  ResponseRegister,
  ResponseRegisterError,
} from "../../shared/type";
import { useCreateRegisterMutation } from "../../rtk/services/contactApi";
import { toast } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Button } from "@nextui-org/react";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";

type IsFocus = {
  name: boolean;
  email: boolean;
  password: boolean;
  password_confirmation: boolean;
};

const RegisterForm = (props: {
  setIsLoginSection: (value: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterUserInfo>({
    defaultValues: {
      name: "johndoe",
      email: "doedoe762000@gmail.com",
      password: "aaaaaaaa",
      password_confirmation: "aaaaaaaa",
    },
  });
  const [show, setShow] = useState({
    password: false,
    password_confirmation: false,
  });

  const [isFocus, setIsFocus] = useState<IsFocus>({
    name: false,
    email: false,
    password: false,
    password_confirmation: false,
  });

  const [createRegister, { isLoading }] = useCreateRegisterMutation();

  const handleLabelClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const nextElement = target.nextElementSibling as HTMLElement | null;
    nextElement && nextElement.focus();
  };

  const validateEmail = (value: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value);
  };

  const onSubmit: SubmitHandler<RegisterUserInfo> = async (data) => {
    // const userData: { data: ResponseRegister } | { error: unknown } =
    const userData:
      | { data: ResponseRegister }
      | {
          error: FetchBaseQueryError | SerializedError | ResponseRegisterError;
        } = await createRegister(data);

    if ("data" in userData) {
      if (userData.data.success) {
        reset();
        toast.success("Successfully Register!");
        props.setIsLoginSection(true);
      }

      if (!userData.data.success) {
        toast.success("Something wrong!");
      }
    }

    if ("error" in userData) {
      toast.error("Something wrong!");
    }
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* name field */}
        <section className="flex flex-col justify-center gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              watch("name")?.length > 0 || isFocus.name
                ? "-top-3 text-slate-700"
                : "top-2 text-slate-400"
            } input-label`}
            htmlFor="name"
          >
            Name
          </label>
          <input
            disabled={isLoading}
            className="form-input"
            {...register("name", { required: true, maxLength: 50 })}
            autoComplete="off"
            onFocus={() => setIsFocus({ ...isFocus, name: true })}
            onBlur={() => setIsFocus({ ...isFocus, name: false })}
          />
          {errors.name && errors.name.type === "required" && (
            <span className="text-sm text-rose-600">
              The name field is required
            </span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <span className="text-sm text-rose-600">
              Name should be 50 characters or fewer
            </span>
          )}
        </section>

        {/* email field  */}
        <section className="flex flex-col gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              watch("email")?.length > 0 || isFocus.email
                ? "-top-3 text-slate-700"
                : "top-2 text-slate-400"
            } input-label`}
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
            <span className="text-sm text-rose-600">
              The email field is required
            </span>
          )}
          {errors.email && errors.email.type === "maxLength" && (
            <span className="text-sm text-rose-600">
              Email should be 50 characters or fewer
            </span>
          )}
          {errors.email && errors.email.type === "validate" && (
            <span className="text-sm text-rose-600">Invalid Email</span>
          )}
        </section>

        {/* password field  */}
        <section className="flex flex-col gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              watch("password")?.length > 0 || isFocus.password
                ? "-top-3 text-slate-700"
                : "top-2 text-slate-400"
            } input-label`}
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
            <span className="text-sm text-rose-600">
              The password field is required
            </span>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <span className="text-sm text-rose-600">
              Password should be 16 characters or fewer
            </span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span className="text-sm text-rose-600">
              Password should be 8 characters or more
            </span>
          )}
        </section>

        {/* password confirmation field  */}
        <section className="flex flex-col gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              watch("password_confirmation")?.length > 0 ||
              isFocus.password_confirmation
                ? "-top-3 text-slate-700"
                : "top-2 text-slate-400"
            } input-label`}
            htmlFor="password"
          >
            Confirm Password
          </label>
          <div className="password-input-border">
            <input
              disabled={isLoading}
              className="password-input"
              {...register("password_confirmation", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
              type={show.password_confirmation ? "text" : "password"}
              onFocus={() =>
                setIsFocus({ ...isFocus, password_confirmation: true })
              }
              onBlur={() =>
                setIsFocus({ ...isFocus, password_confirmation: false })
              }
            />
            <button
              onClick={() =>
                setShow({
                  ...show,
                  password_confirmation: !show.password_confirmation,
                })
              }
              className="px-4 border-slate-400 border-l-[1.5px]"
              type="button"
            >
              {show.password_confirmation ? (
                <PiEyeLight />
              ) : (
                <PiEyeClosedLight />
              )}
            </button>
          </div>
          {errors.password_confirmation &&
            errors.password_confirmation.type === "required" && (
              <span className="text-sm text-rose-600">
                The confirm password field is required
              </span>
            )}
          {errors.password_confirmation &&
            errors.password_confirmation.type === "validate" && (
              <span className="text-sm text-rose-600">
                Password doesn't match
              </span>
            )}
        </section>

        {/* <button disabled={isLoading} className="btn-2" type="submit">
          {isLoading ? "Saving..." : "Register"}
        </button> */}

        <Button
          type="submit"
          isLoading={isLoading}
          className="submit-btn rounded-lg bg-slate-700 text-slate-100"
        >
          Register
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
