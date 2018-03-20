import React from "react";
import { Field } from "redux-form";
import { RaisedButton, Divider } from "material-ui";
import { TextField } from "redux-form-material-ui";

import StyledTagForm from "./TagForm.style";

class TagForm extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <StyledTagForm onSubmit={handleSubmit}>
        <div className={"title"}>
          <div className={"field"}>
            <Field
              name="title"
              component={TextField}
              type="text"
              placeholder="Title"
              underlineShow={false}
              fullWidth
            />
          </div>
          <div className={"buttons"}>
            <div className="action">
              <RaisedButton type="submit" disabled={pristine || submitting}>
                Save
              </RaisedButton>
            </div>
            <div className="action">
              <RaisedButton
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Cancel
              </RaisedButton>
            </div>
          </div>
        </div>
        <Divider />
        <Field
          name="body"
          component={TextField}
          multiLine={true}
          rows={5}
          type="text"
          placeholder="Body"
          underlineShow={false}
          fullWidth
        />
        <Divider />
      </StyledTagForm>
    );
  }
}

export default TagForm;
