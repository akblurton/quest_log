import theme from "styled-theming";

export const background = theme("mode", {
  light: "#a8aaaa",
  dark: "#111111",
});
export const backgroundAlt = theme("mode", {
  light: "#989a9a",
  dark: "#222222",
});
export const foreground = theme("mode", {
  light: "#080907",
  dark: "#C1BED1",
});

// #C1BED1,#069330,#FFC001,#011DA9,#C20D02,#C1BED1,#069330,#FFC001

export const skeleton = theme("mode", {
  light: "#C1BED1",
  dark: "#000000",
});
export const skeletonHighlight = theme("mode", {
  light: "#D1CEE1",
  dark: "#0b0d12",
});

export const primary = theme("mode", {
  light: "#eb1a1d",
  dark: "#069330",
});
export const secondary = theme("mode", {
  light: "#0749b4",
  dark: "#FFC001",
});
export const tertiary = theme("mode", {
  light: "#fece15",
  dark: "#011DA9",
});
