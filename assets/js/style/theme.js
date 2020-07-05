import theme from "styled-theming";

export const background = theme("mode", {
  light: "#ffffff",
  dark: "#11151c",
});
export const foreground = theme("mode", {
  light: "#00171f",
  dark: "#FAFAFA",
});

export const skeleton = theme("mode", {
  light: "#fafafa",
  dark: "#0e1117",
});
export const skeletonHighlight = theme("mode", {
  light: "#e0e0e0",
  dark: "#0b0d12",
});

export const primary = theme("mode", {
  light: "#00a8e8",
  dark: "#d66853",
});
export const secondary = theme("mode", {
  light: "#007ea7",
  dark: "#7d4e57",
});
export const tertiary = theme("mode", {
  light: "#003459",
  dark: "#364156",
});
