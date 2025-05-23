"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TypeAnimation } from "react-type-animation";

const Header = () => {
  const pathName = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full px-4 md:px-12 lg:px-32 xl:px-42 2xl:px-48">
      <div className="relative flex flex-col lg:flex-row justify-between items-center w-full py-4 lg:py-10">
        <Link
          href="/"
          className="hidden lg:block text-4xl lg:text-5xl text-primary font-primary"
        >
          PAXERR
        </Link>
        <p className="hidden lg:block text-[#3E3E3E] text-xs lg:text-xl">
          <TypeAnimation
            sequence={[
              "Welcome Back", // English
              1500,
              "欢迎回来", // Chinese
              1500,
              "お帰りなさい", // Japanese
              1500,
              "Bienvenido de nuevo", // Spanish
              1500,
              "Willkommen zurück", // German
              1500,
              "Bienvenue de retour", // French
              1500,
              "Bentornato", // Italian
              1500,
              "다시 오신 걸 환영합니다", // Korean
              1500,
              "Bem-vindo de volta", // Portuguese
              1500,
              "Välkommen tillbaka", // Swedish
              1500,
            ]}
            wrapper="span"
            speed={250}
            deletionSpeed={200}
            repeat={Infinity}
          />
        </p>
        <span className="hidden lg:block text-3xl lg:text-5xl text-primary font-primary invisible">
          PAXERR
        </span>
        {pathName === "/" && (
          <>
            <Link
              href="/"
              className="absolute size-10 lg:size-16 2xl:size-24 bg-primary rounded-full lg:hidden left-0"
            ></Link>
            <div className="hidden absolute -right-36 w-[200px] lg:flex justify-center items-center">
              <Link
                href="/signin"
                className="text-sm italic font-semibold lg:text-xl text-[#3E3E3E] hover:text-primary duration-300"
              >
                SIGN IN
              </Link>
            </div>
            <div className="lg:hidden absolute right-6 top-6 ">
              <Link
                href="/signin"
                className="text-xs font-tomorrow text-primary hover:text-primary duration-300"
              >
                /// SIGN IN _
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
