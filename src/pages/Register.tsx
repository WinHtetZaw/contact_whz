import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterUserInfo, ResponseRegister } from "../shared/type";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useCreateRegisterMutation } from "../rtk/services/contactApi";

type FocusItem = {
  name: boolean;
  email: boolean;
  password: boolean;
  password_confirmation: boolean;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterUserInfo>({
    defaultValues: {
      name: "john",
      email: "doedoe762000@gmail.com",
      password: "aaaaaaaa",
      password_confirmation: "aaaaaaaa",
    },
  });
  const [focusItem, setFocusItem] = useState<FocusItem>({
    name: false,
    email: false,
    password: false,
    password_confirmation: false,
  });
  const [show, setShow] = useState({
    password: false,
    password_confirmation: false,
  });

  const [createRegister] = useCreateRegisterMutation();

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
    console.log(data);

    const userData: { data: ResponseRegister } | { error: unknown } =
      await createRegister(data);

    if ("data" in userData) {
      console.log("work");
    }

    console.log(userData);
  };

  // console.log(watch("example")); // watch input value by passing the name of it
  return (
    <main className="mt-10">
      <button onClick={() => {
        console.log("cli noti")
      }}>cli</button>
      <h1 className="text-lg font-semibold uppercase text-center">register</h1>
      <form
        className=" p-5 flex flex-col gap-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* name field */}
        <section className="flex flex-col justify-center gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              focusItem.name ? "-top-3 text-slate-700" : "top-2 text-slate-400"
            } input-label`}
            htmlFor="name"
          >
            Name
          </label>
          <input
            onFocus={() => setFocusItem({ ...focusItem, name: true })}
            className="form-input"
            {...register("name", { required: true, maxLength: 50 })}
            autoComplete="off"
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
              focusItem.email ? "-top-3 text-slate-700" : "top-2 text-slate-400"
            } input-label`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            onFocus={() => setFocusItem({ ...focusItem, email: true })}
            className="form-input"
            {...register("email", {
              required: true,
              maxLength: 50,
              validate: (value) => validateEmail(value),
            })}
            autoComplete="off"
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
          {/* {!errors.email && emailError.current && (
            <span className="text-sm text-rose-600">Invalid Email</span>
          )} */}
        </section>

        {/* password field  */}
        <section className="flex flex-col gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              focusItem.password
                ? "-top-3 text-slate-700"
                : "top-2 text-slate-400"
            } input-label`}
            htmlFor="password"
          >
            Password
          </label>
          <div className="password-input-border">
            <input
              onFocus={() => setFocusItem({ ...focusItem, password: true })}
              className="password-input"
              {...register("password", {
                required: true,
                maxLength: 16,
                minLength: 6,
              })}
              type={show.password ? "text" : "password"}
            />
            <button
              onClick={() => setShow({ ...show, password: !show.password })}
              className="px-4 border-slate-400 border-l-[1.5px]"
              type="button"
            >
              {show.password ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
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
              focusItem.password_confirmation
                ? "-top-3 text-slate-700"
                : "top-2 text-slate-400"
            } input-label`}
            htmlFor="password"
          >
            Confirm Password
          </label>
          <div className="password-input-border">
            <input
              onFocus={() =>
                setFocusItem({ ...focusItem, password_confirmation: true })
              }
              className="password-input"
              {...register("password_confirmation", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
              type={show.password_confirmation ? "text" : "password"}
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
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
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

        <button className="btn-2" type="submit">
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;
