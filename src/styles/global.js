import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100vh;
    overflow: auto;
  }

  body {
    background-color: #312e2b;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    &, input, button {
      font: 14px 'Ubuntu', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
  }

  #root{
    max-width: 1180px;
    margin: 0 auto;
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    cursor: pointer;
  }
`;