import React, { useRef } from "react";
import { TextField, Label, TextFieldBase } from "@fluentui/react";

export const FormField = (props: any) => {
  const {
    isPreview,
    value,
    id,
    label,
    placeholder,
    setRef,
    multiline = false,
  } = props;
  const ref = useRef(null);
  setRef(ref);
  console.log(value);
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      {!isPreview ? (
        <TextField
          multiline={multiline}
          defaultValue={value}
          id={id}
          componentRef={setRef}
          placeholder={placeholder}
        />
      ) : (
        <Label>{value}</Label>
      )}
    </>
  );
};

export interface IFormField {
  isPreview: boolean;
  id: string;
  ref: React.MutableRefObject<TextFieldBase> | undefined;
  value: string;
  label: string;
  setRef: (ref: React.MutableRefObject<TextFieldBase>) => void;
}
