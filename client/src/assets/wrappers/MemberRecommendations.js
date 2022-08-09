import styled from "styled-components";

const Wrapper = styled.section`
  .recommendation-section {
    margin: 2em 5px;
  }

  .no-recommendation-msg {
    font-size: 0.8em;
    color: red;
  }

  .alumni-list,
  .staff-list,
  .student-list {
    height: 200px;
    max-height: 200px;
    overflow-y: scroll;
  }
`;

export default Wrapper;
