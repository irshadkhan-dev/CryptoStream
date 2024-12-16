import { cn } from "@/lib/utils";
import React from "react";

const MaxwidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("max-w-7xl w-full px-4 md:px-8 mx-auto", className)}>
      {children}
    </div>
  );
};

export default MaxwidthWrapper;
