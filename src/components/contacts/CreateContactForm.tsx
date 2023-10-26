import { SubmitHandler, useForm } from "react-hook-form";
import {
  Contact,
  ResponseRegister,
  ResponseRegisterError,
} from "../../shared/type";
import { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { Button } from "@nextui-org/react";
import { useCreateContactMutation } from "../../rtk/services/contactApi";
import { useAppSelector } from "../../rtk/hooks";

type IsFocus = {
  name: boolean;
  phone: boolean;
  email: boolean;
  address: boolean;
};

const CreateContactForm = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Contact>();

  const [isFocus, setIsFocus] = useState<IsFocus>({
    name: false,
    phone: false,
    email: false,
    address: false,
  });

  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleLabelClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const nextElement = target.nextElementSibling as HTMLElement | null;
    nextElement && nextElement.focus();
  };

  const validateEmail = (value: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value);
  };

  const onSubmit: SubmitHandler<Contact> = async (data) => {
    const contactData:
      | { data: ResponseRegister }
      | {
          error: FetchBaseQueryError | SerializedError | ResponseRegisterError;
        } = await createContact({ data, token: user?.token });

    if ("data" in contactData) {
      if (contactData.data.success) {
        reset();
        toast.success("Successfully Register!");
      }

      if (!contactData.data.success) {
        toast.success("Something wrong!");
      }
    }

    if ("error" in contactData) {
      toast.error("Something wrong!");
    }
  };
  return (
    <>
      <h2 className="form-title mt-10">Create Contact</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* name field */}
        <section className="flex flex-col justify-center gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              watch("name")?.length > 0 || isFocus.name
                ? "-top-3 text-sm text-slate-700"
                : "top-2 text-base text-slate-400"
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

        {/* phone field */}
        <section className="flex flex-col justify-center gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              watch("phone")?.toString().length > 0 || isFocus.phone
                ? "-top-3 text-sm text-slate-700"
                : "top-2 text-base text-slate-400"
            } input-label`}
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            disabled={isLoading}
            className="form-input"
            {...register("phone", {
              required: true,
              maxLength: 12,
              minLength: 8,
            })}
            type="number"
            autoComplete="off"
            onFocus={() => setIsFocus({ ...isFocus, phone: true })}
            onBlur={() => setIsFocus({ ...isFocus, phone: false })}
          />
          {errors.phone && errors.phone.type === "required" && (
            <span className="text-sm text-rose-600">
              The phone field is required
            </span>
          )}
          {errors.phone && errors.phone.type === "minLength" && (
            <span className="text-sm text-rose-600">
              Phone number length should be 8 or more
            </span>
          )}
          {errors.phone && errors.phone.type === "maxLength" && (
            <span className="text-sm text-rose-600">
              Phone number length should be 12 or fewer
            </span>
          )}
        </section>

        {/* email field  */}
        <section className="flex flex-col gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              watch("email")?.length > 0 || isFocus.email
                ? "-top-3 text-sm text-slate-700"
                : "top-2 text-base text-slate-400"
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

        {/* address field */}
        <section className="flex flex-col justify-center gap-y-1 relative">
          <label
            onClick={handleLabelClick}
            className={`${
              watch("address")?.length > 0 || isFocus.address
                ? "-top-3 text-sm text-slate-700"
                : "top-2 text-base text-slate-400"
            } input-label`}
            htmlFor="address"
          >
            Address
          </label>
          <textarea
            disabled={isLoading}
            className="form-input"
            {...register("address", { required: true, maxLength: 50 })}
            autoComplete="off"
            rows={3}
            onFocus={() => setIsFocus({ ...isFocus, address: true })}
            onBlur={() => setIsFocus({ ...isFocus, address: false })}
          />
          {errors.address && errors.address.type === "required" && (
            <span className="text-sm text-rose-600">
              The address field is required
            </span>
          )}
          {errors.address && errors.address.type === "maxLength" && (
            <span className="text-sm text-rose-600">
              Address should be 50 characters or fewer
            </span>
          )}
        </section>

        <Button
          type="submit"
          isLoading={isLoading}
          className="submit-btn rounded-lg bg-slate-700 text-slate-100"
        >
          Create
        </Button>
      </form>
    </>
  );
};

export default CreateContactForm;
