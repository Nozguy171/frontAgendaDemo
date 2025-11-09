import * as React from "react";
import { cn } from "@/lib/utils";


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
<input ref={ref} className={cn("w-full rounded-xl border px-4 py-2", className)} {...props} />
));
Input.displayName = "Input";