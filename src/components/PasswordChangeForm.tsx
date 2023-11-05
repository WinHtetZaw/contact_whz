import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordChange, ResponseRegister } from "../shared/type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { useAppSelector } from "../rtk/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleLabelClick, removeLocalStorage } from "../shared/helper";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import { usePasswordChangeMutation } from "../rtk/services/contactApi";

type IsFocus = {
  current_password: boolean;
  password: boolean;
  password_confirmation: boolean;
};

const PasswordChangeForm = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordChange>();
  const [show, setShow] = useState({
    current_password: false,
    password: false,
    password_confirmation: false,
  });
  const navigate = useNavigate();

  const [passwordChange, { isLoading }] = usePasswordChangeMutation();

  const [isFocus, setIsFocus] = useState<IsFocus>({
    current_password: false,
    password: false,
    password_confirmation: false,
  });

  const onSubmit: SubmitHandler<PasswordChange> = async (data) => {
    const userData:
      | { data: ResponseRegister }
      | {
          error: FetchBaseQueryError | SerializedError;
        } = await passwordChange({ token: user?.token, data });

    if ("data" in userData) {
      if (userData.data.success) {
        toast.success("Your password has been successfully changed!");
        removeLocalStorage("contact_user");
        navigate("/auth");
      } else {
        toast.error("Something wrong!");
      }
    }

    if ("error" in userData) {
      toast.error("Something wrong!");
    }
  };

  return (
    <>
      <Tooltip
      closeDelay={0}
        content={
          "You need to log in again after your password has been changed."
        }
      >
        <button onClick={onOpen} className=" select-none capitalize">
          change password
        </button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className=" mx-auto">Password Change</ModalHeader>
              <ModalBody>
                <form
                  id="password_change_form"
                  className=" w-full flex flex-col gap-y-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* current password field  */}
                  <section className="flex flex-col gap-y-1 relative">
                    <label
                      onClick={handleLabelClick}
                      className={`${
                        watch("current_password")?.length > 0 ||
                        isFocus.current_password
                          ? "-top-3 text-slate-500"
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
                        {...register("current_password", {
                          required: true,
                          maxLength: 16,
                          minLength: 6,
                        })}
                        type={show.current_password ? "text" : "password"}
                        onFocus={() =>
                          setIsFocus({ ...isFocus, current_password: true })
                        }
                        onBlur={() =>
                          setIsFocus({ ...isFocus, current_password: false })
                        }
                      />
                      <button
                        onClick={() =>
                          setShow({
                            ...show,
                            current_password: !show.current_password,
                          })
                        }
                        className="px-4 border-slate-400 border-l-[1.5px]"
                        type="button"
                      >
                        {show.current_password ? (
                          <PiEyeLight />
                        ) : (
                          <PiEyeClosedLight />
                        )}
                      </button>
                    </div>
                    {errors.current_password &&
                      errors.current_password.type === "required" && (
                        <span className="text-sm text-rose-600">
                          Current password field is required
                        </span>
                      )}
                    {errors.current_password &&
                      errors.current_password.type === "maxLength" && (
                        <span className="text-sm text-rose-600">
                          Current Password should be 16 characters or fewer
                        </span>
                      )}
                    {errors.current_password &&
                      errors.current_password.type === "minLength" && (
                        <span className="text-sm text-rose-600">
                          Current Password should be 8 characters or more
                        </span>
                      )}
                  </section>

                  {/* password field  */}
                  <section className="flex flex-col gap-y-1 relative">
                    <label
                      onClick={handleLabelClick}
                      className={`${
                        watch("password")?.length > 0 || isFocus.password
                          ? "-top-3 text-slate-500"
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
                        onFocus={() =>
                          setIsFocus({ ...isFocus, password: true })
                        }
                        onBlur={() =>
                          setIsFocus({ ...isFocus, password: false })
                        }
                      />
                      <button
                        onClick={() =>
                          setShow({ ...show, password: !show.password })
                        }
                        className="px-4 border-slate-400 border-l-[1.5px]"
                        type="button"
                      >
                        {show.password ? <PiEyeLight /> : <PiEyeClosedLight />}
                      </button>
                    </div>
                    {errors.password && errors.password.type === "required" && (
                      <span className="text-sm text-rose-600">
                        Password field is required
                      </span>
                    )}
                    {errors.password &&
                      errors.password.type === "maxLength" && (
                        <span className="text-sm text-rose-600">
                          Password should be 16 characters or fewer
                        </span>
                      )}
                    {errors.password &&
                      errors.password.type === "minLength" && (
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
                          ? "-top-3 text-slate-500"
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
                          setIsFocus({
                            ...isFocus,
                            password_confirmation: true,
                          })
                        }
                        onBlur={() =>
                          setIsFocus({
                            ...isFocus,
                            password_confirmation: false,
                          })
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
                          Confirm password field is required
                        </span>
                      )}
                    {errors.password_confirmation &&
                      errors.password_confirmation.type === "validate" && (
                        <span className="text-sm text-rose-600">
                          Password doesn't match
                        </span>
                      )}
                  </section>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  form="password_change_form"
                  type="submit"
                  color="primary"
                  //   onPress={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PasswordChangeForm;
