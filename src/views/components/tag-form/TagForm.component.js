import React from "react";
import { Field } from "redux-form";
import { TextField } from "redux-form-material-ui";

class TagForm extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="body"
          component={TextField}
          multiLine={true}
          rows={5}
          type="text"
          placeholder="Title"
        />
        <button type="submit" disabled={pristine || submitting}>
          Save
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Cancel
        </button>
      </form>
    );
  }
}

export default TagForm;
