import styled from "styled-components";

const StyledTagForm = styled.form`
  .title {
    display: flex;
    justify-content: space-between;

    .field {
      flex: 1;
    }
    .buttons {
      display: flex;

      .action {
        padding: 5px;
      }
    }
  }
`;

export default StyledTagForm;
