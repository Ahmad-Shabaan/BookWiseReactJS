import React from "react";

const AuthCard = ({
  children,
  greeting,
  message,
}: {
  children: React.ReactNode;
  greeting: string;
  message: string;
}) => {
  return (
    <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 xl:px-24">
      {/* Mobile logo */}
      <div className="mb-10 lg:hidden text-center">
        <span className="text-gradient font-modern-negra text-3xl tracking-tight">
          Book Wise
        </span>
      </div>

      <div className="mx-auto w-full max-w-md" data-animate="card">
        {/* Header */}
        <div data-animate="header" className="mb-8 space-y-1.5">
          <h1 className="text-3xl font-black tracking-tight text-on-surface">
            {greeting}
          </h1>
          <p className="text-on-surface-variant">{message}</p>
        </div>

        {/* Form */}
        {/* <div data-animate="form">{children}</div> */}
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
