import React from 'react';
import { Field, reduxForm } from 'redux-form';

class TagForm extends React.Component {

  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="title"
                component="input"
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
    )
  };
}

export default reduxForm()(TagForm);
