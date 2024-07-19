// src/admin/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  #root {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
  }
`;
