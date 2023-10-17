import React from "react";
import { PancakeStack, PancakeInput, PancakeLabel } from "./StyledPancakeToggle";
import { RoshiniToggleProps, scales } from "./types";

const RoshiniToggle: React.FC<React.PropsWithChildren<RoshiniToggleProps>> = ({
  checked,
  scale = scales.LG,
  ...props
}) => (
  <PancakeStack scale={scale}>
    <PancakeInput id={props.id || "roshini-toggle"} scale={scale} type="checkbox" checked={checked} {...props} />
    <PancakeLabel scale={scale} checked={checked} htmlFor={props.id || "roshini-toggle"}>
      <div className="pancakes">
        <div className="pancake" />
        <div className="pancake" />
        <div className="pancake" />
        <div className="butter" />
      </div>
    </PancakeLabel>
  </PancakeStack>
);

export default RoshiniToggle;
