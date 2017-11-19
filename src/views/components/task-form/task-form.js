import React from 'react';
import { Field, reduxForm } from 'redux-form';

class TaskForm extends React.Component {

  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="label"
                component="input"
                type="text"
                placeholder="Label"
            />
            <button type="submit" disabled={pristine || submitting}>
                Save
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
                Cancel
            </button>
        </form>
    )
  };
}

export default reduxForm()(TaskForm);
