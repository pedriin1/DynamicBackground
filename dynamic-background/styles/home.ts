import styled from "styled-components";

export const Container = styled.div`
  .container {
    position: relative;
    height: 100vh;
    width: 100vw;
  }
  .canvas {
    height: 100%;
    width: 100%;
    // background-color: rgb(29, 32, 33);
  }
  .content {
    position: absolute;
    width: 100%;
    top: 0;

    z-index: 0;
  }
`;
