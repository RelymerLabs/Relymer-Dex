import { darkColors, lightColors } from "../../theme/colors";
import { RoshiniToggleTheme } from "./types";

export const light: RoshiniToggleTheme = {
  handleBackground: lightColors.backgroundAlt,
  handleShadow: lightColors.textDisabled,
};

export const dark: RoshiniToggleTheme = {
  handleBackground: darkColors.backgroundAlt,
  handleShadow: darkColors.textDisabled,
};
