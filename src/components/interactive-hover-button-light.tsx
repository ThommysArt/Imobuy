import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonLightProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const InteractiveHoverButtonLight = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonLightProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full bg-white text-black p-3 px-6 text-center font-medium group-hover:border transition-colors duration-300 group-hover:bg-black group-hover:text-white",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-black transition-all duration-300 group-hover:scale-[100.8] group-hover:bg-white"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-black group-hover:text-white">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span className="transition-colors duration-300">{children}</span>
        <ArrowRight className="transition-colors duration-300" />
      </div>
    </button>
  );
});

InteractiveHoverButtonLight.displayName = "InteractiveHoverButtonLight";

