import LoginForm from "../components/auth_forms/LoginForm";
import RegisterForm from "../components/auth_forms/RegisterForm";
import { useState } from "react";

const AuthPage = () => {
  const [isLoginSection, setIsLoginSection] = useState<boolean>(false);
  return (
    <main className="relative h-screen overflow-hidden mx-auto bg-gradient-2">
      <div
        className={` ${
          isLoginSection ? "h-[85vh]" : "h-[15vh]"
        } absolute flex justify-center items-center top-0 z-20 w-full bg-slate-700 text-slate-100 transition-all duration-150`}
      >
        <div
          style={{ left: "calc(50% - 1.5rem)" }}
          className="absolute bottom-[1.5rem] w-full h-fit bg-sky-50"
        >
          <button
            onClick={() => setIsLoginSection(!isLoginSection)}
            className={`absolute ${
              isLoginSection && "-rotate-180"
            } bg-[#696A86] w-[3rem] aspect-square flex items-center justify-center border-2 border-white rounded-full transition-all duration-700`}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </div>

        <section className="w-full">
          <h1 className="form-title mt-7">Login</h1>
          {isLoginSection && (
            <div className="">
              <LoginForm />
            </div>
          )}
        </section>
      </div>
      <section className={`mt-[25vh]`}>
        <h1 className="form-title">register</h1>
        <RegisterForm setIsLoginSection={setIsLoginSection} />
      </section>
    </main>
  );
};

export default AuthPage;
