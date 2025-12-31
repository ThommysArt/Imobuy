import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, asChild, ...props }, ref) => {
  const isWhiteBg = className?.includes('bg-white')
  
  const baseClassName = cn(
    "group relative w-auto cursor-pointer overflow-hidden rounded-full p-3 px-6 text-center font-medium group-hover:border transition-colors duration-300",
    isWhiteBg 
      ? "bg-white group-hover:bg-black"
      : "bg-black group-hover:bg-white",
    className,
  );

  // Dot color: inverse of background at all times
  const dotColor = isWhiteBg 
    ? 'bg-black group-hover:bg-white transition-colors duration-300' 
    : 'bg-white group-hover:bg-black transition-colors duration-300'
  
  // Initial text: inverse of initial background
  const initialTextColor = isWhiteBg 
    ? 'text-black group-hover:text-white transition-colors duration-300' 
    : 'text-white group-hover:text-black transition-colors duration-300'
  
  // Hover text: inverse of hover background
  const hoverTextColor = isWhiteBg 
    ? 'text-white' 
    : 'text-black'

  const buttonContent = (
    <>
      <div className="flex items-center gap-2">
        <div className={`size-2 rounded-full ${dotColor} transition-all duration-300 group-hover:scale-[100.8]`}></div>
        <span className={`inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 ${initialTextColor}`}>
          {children}
        </span>
      </div>
      <div className={`absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 ${hoverTextColor} opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100`}>
        <span>{children}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </>
  );

  if (asChild && React.isValidElement(children) && children.type === Link) {
    const childProps = (children as React.ReactElement<any>).props || {};
    return React.cloneElement(children as React.ReactElement<any>, {
      className: cn(baseClassName, childProps.className),
      ref,
      ...props,
      children: buttonContent,
    });
  }

  return (
    <button
      ref={ref}
      className={baseClassName}
      {...props}
    >
      {buttonContent}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
