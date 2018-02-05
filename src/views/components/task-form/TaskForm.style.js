import styled from "styled-components";

const StyledTaskForm = styled.form`
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
`;

export default StyledTaskForm;
