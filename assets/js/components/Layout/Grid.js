import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 16px;
  margin: 16px;

  @media (max-width: 532px) {
    grid-template-columns: 1fr;
  }
`;

export default Grid;
