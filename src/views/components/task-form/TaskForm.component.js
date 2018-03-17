import React from "react";
import { Field } from "redux-form";
import { RaisedButton, Divider } from "material-ui";
import { TextField } from "redux-form-material-ui";

import StyledTaskForm from "./TaskForm.style";

class TaskForm extends React.Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      initialValues
    } = this.props;

    return (
      <StyledTaskForm onSubmit={handleSubmit}>
        <div className={"field"}>
          <Field
            name="label"
            component={TextField}
            type="text"
            placeholder="Task"
            underlineShow={false}
            fullWidth
          />
        </div>
        <div className={"buttons"}>
          <div className={"action"}>
            <RaisedButton type="submit" disabled={pristine || submitting}>
              Save
            </RaisedButton>
          </div>
          <div className={"action"}>
            <RaisedButton
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Cancel
            </RaisedButton>
          </div>
          <div className={"action"}>
            <RaisedButton
              type="button"
              onClick={() => this.props.remove(initialValues)}
            >
              Delete
            </RaisedButton>
          </div>
        </div>
        <Divider />
      </StyledTaskForm>
    );
  }
}

export default TaskForm;
