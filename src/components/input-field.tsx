import React, { forwardRef } from "react";

export type InputRef = HTMLInputElement;

type InputProps = {
  defaultValue: string;
  type: "text" | "email" | "password"
  name: string
  required: boolean
};

export const InputField = forwardRef<InputRef, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});
