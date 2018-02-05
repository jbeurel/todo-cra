import React from "react";
import { Field, reduxForm } from "redux-form";
import SimpleMDEReact from "react-simplemde-editor";

class TagForm extends React.Component {
  handleChange = data => console.log("coucou SimpleMDE data", data);

  renderField = field => (
    <SimpleMDEReact value={field.input.value} onChange={field.input.onChange} />
  );

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="body"
          component={this.renderField}
          type="text"
          onChange={this.handleChange}
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

export default reduxForm()(TagForm);
