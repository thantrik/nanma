import React, { useRef, useState, useCallback } from "react";
import { toDayString } from "../../../../lib/toDayString";

export const DocumentTitle = ({
  onChange,
  defaultValue = toDayString(),
}: {
  onChange?: (v: string) => void;
  defaultValue?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);

  const handleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = event.target;
      value = value || toDayString();
      setValue(value);
      onChange && onChange(value);
    },
    [onChange]
  );

  return (
    <input
      style={{
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "dotted 1px gray",
        backgroundColor: "transparent",
        color: "white",
        outline: "none",
        width: "100%",
        lineHeight: 1.8,
        paddingLeft: 3,
        fontSize: "0.8rem",
      }}
      type="text"
      ref={inputRef}
      value={value}
      onChange={handleChange}
    ></input>
  );
};
