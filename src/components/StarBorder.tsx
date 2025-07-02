import React from "react";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties['animationDuration'];
    thickness?: number;
    variant?: 'primary' | 'secondary' | 'submit' | 'github';
  }

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  variant = 'primary',
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  // Define styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return "bg-[#32E0C4] hover:bg-[#0D7377] text-[#212121] font-bold py-2 px-6 rounded-full transition duration-300 cursor-pointer";
      case 'secondary':
        return "bg-[#212121] border-2 border-[#32E0C4] text-[#32E0C4] hover:bg-[#32E0C4] hover:text-[#212121] font-bold py-2 px-6 rounded-full transition duration-300 cursor-pointer";
      case 'submit':
        return "bg-[#32E0C4] hover:bg-[#0D7377] text-[#212121] font-bold py-2 px-6 rounded-full transition duration-300 cursor-pointer";
      case 'github':
        return "bg-[#0D7377] hover:bg-[#32E0C4] text-[#EEEEEE] hover:text-[#212121] font-bold py-2 px-6 rounded-full transition duration-300";
      default:
        return "bg-[#32E0C4] hover:bg-[#0D7377] text-[#212121] font-bold py-2 px-6 rounded-full transition duration-300 cursor-pointer";
    }
  };

  return (
    <Component 
      className={`relative inline-block overflow-hidden rounded-full ${className}`} 
      {...(rest as any)}
      style={{
        padding: `${thickness}px`,
        ...(rest as any).style,
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className={`relative z-10 ${getVariantStyles()}`}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
