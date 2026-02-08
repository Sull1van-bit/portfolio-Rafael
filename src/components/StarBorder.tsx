import React from "react";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary';
  }

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  variant = 'primary',
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return "bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-200 cursor-pointer";
      case 'secondary':
        return "bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-full border border-gray-300 transition-all duration-200 cursor-pointer";
      default:
        return "bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-200 cursor-pointer";
    }
  };

  return (
    <Component
      className={`inline-block ${getVariantStyles()} ${className}`}
      {...(rest as any)}
    >
      {children}
    </Component>
  );
};

export default StarBorder;
