import React from "react";
import { Field } from "redux-form";
import { RaisedButton, Divider } from "material-ui";
import { TextField } from "redux-form-material-ui";

import StyledTaskForm from "./TaskForm.style";

class TaskForm extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <StyledTaskForm onSubmit={handleSubmit}>
        <Field
          name="label"
          component={TextField}
          type="text"
          placeholder="Task"
          underlineShow={false}
        />
        <RaisedButton type="submit" disabled={pristine || submitting}>
          Save
        </RaisedButton>
        <RaisedButton
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Cancel
        </RaisedButton>
        <Divider />
      </StyledTaskForm>
    );
  }
}

export default TaskForm;
