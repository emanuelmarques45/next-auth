import { createGlobalStyle } from "styled-components"

export const devices = {
  mobile: `(max-width: 768px)`,
  tablet: `(max-width: 1024px)`,
  desktop: `(min-width: 1440px)`
}

export default createGlobalStyle`
  :root {
    --clr-athens-gray: hsl(220, 19%, 94%);
    --clr-oslo-gray: hsl(220, 3%, 58%);
    --clr-lochmara: hsl(205, 100%, 39%);
    --clr-lochmara-light: hsl(205, 100%, 50%);
    --clr-non-photo-blue: hsl(192, 76%, 75%);
    --clr-white: hsl(0, 0%, 100%);
    --clr-rich-black: hsl(218, 24%, 9%);

    --br-default: 0.3rem;

    --transition-default: all 0.2s ease-in-out;

    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
  }

  html, body {
    height: 100%;
    font-size: 1.6rem;
    font-family: 'Open Sans', sans-serif;
  }

  button {
    cursor: pointer;
  }
`